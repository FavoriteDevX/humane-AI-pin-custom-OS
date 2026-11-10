/**
 * Laser projection mathematics, safety interlocks, and keystone warping
 * for the Humane AI Pin MEMS Laser Display Subsystem.
 */

export interface LaserSafetyState {
  distanceMm: number;
  continuousOnTimeMs: number;
  caseTempCelsius: number;
  isInterlockEngaged: boolean;
  status: 'EMITTING' | 'STANDBY' | 'SAFETY_TRIP' | 'THERMAL_SHUTDOWN';
  reason?: string;
}

export const LASER_SPECS = {
  MIN_SAFE_DISTANCE_MM: 80,    // Interlock cutoff below 80mm (prevent eye/skin thermal hazard)
  MAX_PROJECTION_DISTANCE_MM: 450, // Beyond 450mm projection loses cohesion
  MAX_CONTINUOUS_ON_MS: 30000,  // 30 seconds max single projection run without palm touch
  THERMAL_LIMIT_CELSIUS: 43.0, // Human contact safety limit (IEC 62368-1)
  NOMINAL_WAVELENGTH_NM: 520,  // Green direct diode laser
  RESOLUTION_WIDTH: 720,
  RESOLUTION_HEIGHT: 720,
};

/**
 * Validates whether laser emission is safe according to IEC 60825-1 Class 2 specs.
 */
export function evaluateLaserSafety(
  distanceMm: number,
  continuousOnTimeMs: number,
  caseTempCelsius: number,
  userInterlockOverride: boolean = false
): LaserSafetyState {
  if (caseTempCelsius >= LASER_SPECS.THERMAL_LIMIT_CELSIUS) {
    return {
      distanceMm,
      continuousOnTimeMs,
      caseTempCelsius,
      isInterlockEngaged: true,
      status: 'THERMAL_SHUTDOWN',
      reason: `Case temperature ${caseTempCelsius.toFixed(1)}°C exceeds IEC 62368-1 limit (43.0°C).`,
    };
  }

  if (distanceMm < LASER_SPECS.MIN_SAFE_DISTANCE_MM) {
    return {
      distanceMm,
      continuousOnTimeMs,
      caseTempCelsius,
      isInterlockEngaged: true,
      status: 'SAFETY_TRIP',
      reason: `Target distance (${distanceMm}mm) is closer than minimum safe optical threshold (80mm).`,
    };
  }

  if (distanceMm > LASER_SPECS.MAX_PROJECTION_DISTANCE_MM) {
    return {
      distanceMm,
      continuousOnTimeMs,
      caseTempCelsius,
      isInterlockEngaged: false,
      status: 'STANDBY',
      reason: `No palm detected within focal projection window (80mm - 450mm).`,
    };
  }

  if (!userInterlockOverride && continuousOnTimeMs > LASER_SPECS.MAX_CONTINUOUS_ON_MS) {
    return {
      distanceMm,
      continuousOnTimeMs,
      caseTempCelsius,
      isInterlockEngaged: true,
      status: 'SAFETY_TRIP',
      reason: `Continuous emission timeout (${(continuousOnTimeMs / 1000).toFixed(0)}s) reached.`,
    };
  }

  return {
    distanceMm,
    continuousOnTimeMs,
    caseTempCelsius,
    isInterlockEngaged: false,
    status: 'EMITTING',
  };
}

/**
 * Calculates trapezoidal keystone correction factors based on palm tilt angle (degrees).
 */
export function calculateKeystoneWarp(pitchDeg: number, rollDeg: number) {
  // Pitch causes vertical compression/expansion
  const pitchRad = (pitchDeg * Math.PI) / 180;
  const rollRad = (rollDeg * Math.PI) / 180;

  const topWidthScale = Math.max(0.6, Math.min(1.4, 1.0 - Math.tan(pitchRad) * 0.45));
  const bottomWidthScale = Math.max(0.6, Math.min(1.4, 1.0 + Math.tan(pitchRad) * 0.45));
  const horizontalSkew = Math.sin(rollRad) * 15; // pixels skew

  return {
    topWidthScale: Number(topWidthScale.toFixed(3)),
    bottomWidthScale: Number(bottomWidthScale.toFixed(3)),
    horizontalSkew: Number(horizontalSkew.toFixed(2)),
    pitchDeg,
    rollDeg,
  };
}
