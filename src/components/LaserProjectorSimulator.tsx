import React, { useState, useEffect } from 'react';
import { evaluateLaserSafety, calculateKeystoneWarp, LASER_SPECS } from '../utils/laserMath.ts';
import { ShieldAlert, ShieldCheck, Hand, Activity, Sparkles, Volume2, Mic, Eye, Zap } from 'lucide-react';

export const LaserProjectorSimulator: React.FC = () => {
  const [distanceMm, setDistanceMm] = useState<number>(220);
  const [pitchDeg, setPitchDeg] = useState<number>(0);
  const [rollDeg, setRollDeg] = useState<number>(0);
  const [caseTemp, setCaseTemp] = useState<number>(36.8);
  const [activePreset, setActivePreset] = useState<'LISTENING' | 'THINKING' | 'WEATHER' | 'STANDUP' | 'NAV'>('LISTENING');
  const [laserColor, setLaserColor] = useState<'green' | 'amber' | 'red'>('green');
  const [touchpadHeld, setTouchpadHeld] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [streamingText, setStreamingText] = useState<string>('Listening to your query...');

  const safety = evaluateLaserSafety(distanceMm, 5000, caseTemp);
  const keystone = calculateKeystoneWarp(pitchDeg, rollDeg);

  useEffect(() => {
    if (activePreset === 'LISTENING') {
      setStreamingText('Listening... (speak now)');
    } else if (activePreset === 'THINKING') {
      setStreamingText('Gemini 2.5 Flash analyzing context...');
    } else if (activePreset === 'WEATHER') {
      setStreamingText('72°F Clear Sky • Humidity 45% • UV 2');
    } else if (activePreset === 'STANDUP') {
      setStreamingText('Team Sync in 12 min • Room B / Meet');
    } else if (activePreset === 'NAV') {
      setStreamingText('Turn Right in 40ft onto Market St');
    }
  }, [activePreset]);

  // Color mapping
  const colorMap = {
    green: {
      beam: '#00ff66',
      glow: 'rgba(0, 255, 102, 0.45)',
      scanline: 'rgba(0, 255, 102, 0.25)',
      hex: '#00ff66',
    },
    amber: {
      beam: '#f59e0b',
      glow: 'rgba(245, 158, 11, 0.45)',
      scanline: 'rgba(245, 158, 11, 0.25)',
      hex: '#f59e0b',
    },
    red: {
      beam: '#ef4444',
      glow: 'rgba(239, 68, 68, 0.55)',
      scanline: 'rgba(239, 68, 68, 0.3)',
      hex: '#ef4444',
    },
  };

  const currentColor = safety.status === 'SAFETY_TRIP' || safety.status === 'THERMAL_SHUTDOWN'
    ? colorMap.red
    : colorMap[laserColor];

  const handleTouchpadDown = () => {
    setTouchpadHeld(true);
    setActivePreset('LISTENING');
  };

  const handleTouchpadUp = () => {
    setTouchpadHeld(false);
    setActivePreset('THINKING');
    setTimeout(() => {
      setActivePreset('STANDUP');
    }, 1200);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-2xl backdrop-blur-md">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Laser Ink™ Palm Projector Simulator
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                720x720 MEMS
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Direct-diode laser projection engine with live keystone warping and IEC 60825-1 interlock
            </p>
          </div>
        </div>

        {/* Safety indicator badge */}
        <div className="flex items-center gap-2">
          {safety.status === 'EMITTING' ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              LASER ARMED • EMITTING (520nm)
            </div>
          ) : safety.status === 'STANDBY' ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-mono font-medium">
              <Activity className="w-4 h-4 text-blue-400" />
              OPTICAL STANDBY (Distance &gt; 450mm)
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-mono font-medium animate-pulse">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              INTERLOCK TRIPPED: {safety.status}
            </div>
          )}
        </div>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Palm & Laser Canvas (Left / Center 7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950 rounded-xl border border-slate-800 p-6 relative overflow-hidden min-h-[460px]">
          {/* Ambient room background texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(15,23,42,0.8),rgba(2,6,23,1))] pointer-events-none" />

          {/* Humane AI Pin Virtual Emitter (Top) */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <div className="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[10px] font-mono text-slate-300 flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              HUMANE AI PIN • EMITTER HEAD
            </div>
            {/* Emitter lens dot */}
            <div
              className="w-5 h-5 rounded-full mt-2 border-2 border-slate-700 flex items-center justify-center transition-colors duration-300"
              style={{
                backgroundColor: safety.status === 'EMITTING' ? currentColor.beam : '#334155',
                boxShadow: safety.status === 'EMITTING' ? `0 0 16px ${currentColor.glow}` : 'none',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Diverging Laser Beam Visualization */}
          {safety.status === 'EMITTING' && (
            <div
              className="absolute top-16 w-64 h-32 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${currentColor.glow} 0%, transparent 70%)`,
                filter: 'blur(8px)',
                opacity: 0.8,
              }}
            />
          )}

          {/* Palm Surface Rendering with Keystone Transform */}
          <div
            className="relative z-10 w-72 h-80 rounded-[48px] bg-gradient-to-b from-amber-900/30 via-amber-950/20 to-slate-900/60 border-2 border-amber-900/40 p-5 flex flex-col items-center justify-center transition-transform duration-200 shadow-2xl select-none"
            style={{
              transform: `perspective(600px) rotateX(${pitchDeg}deg) rotateZ(${rollDeg}deg) scale(${
                1 - (distanceMm - 200) / 1000
              })`,
              boxShadow: safety.status === 'EMITTING' ? `0 0 40px ${currentColor.glow}` : 'none',
            }}
          >
            {/* Palm skin texture creases */}
            <div className="absolute inset-0 rounded-[48px] overflow-hidden pointer-events-none opacity-20">
              <div className="absolute w-40 h-1 bg-amber-500/40 rounded-full top-28 left-8 rotate-12" />
              <div className="absolute w-48 h-1 bg-amber-500/30 rounded-full top-40 left-12 -rotate-6" />
              <div className="absolute w-32 h-1 bg-amber-500/30 rounded-full top-56 left-16 rotate-45" />
            </div>

            {/* Projected Laser Ink HUD */}
            {safety.status === 'EMITTING' ? (
              <div
                className="relative z-20 w-full flex flex-col items-center text-center font-mono transition-transform duration-200"
                style={{
                  transform: `scaleX(${keystone.bottomWidthScale}) skewX(${keystone.horizontalSkew}deg)`,
                  color: currentColor.hex,
                  textShadow: `0 0 10px ${currentColor.glow}`,
                }}
              >
                {/* Laser Reticle & Clock */}
                <div className="flex items-center justify-between w-full px-4 text-xs font-bold border-b border-emerald-500/40 pb-2 mb-3">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span>AETHER</span>
                  </div>
                  <span className="text-sm">10:42 AM</span>
                  <span>72°F</span>
                </div>

                {/* Laser Status Circle / Mode Graphic */}
                <div className="my-2 relative flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center animate-spin"
                    style={{ borderColor: currentColor.hex, animationDuration: '8s' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {activePreset === 'LISTENING' && <Mic className="w-6 h-6 animate-pulse" />}
                    {activePreset === 'THINKING' && <Sparkles className="w-6 h-6 animate-spin" />}
                    {activePreset === 'WEATHER' && <Eye className="w-6 h-6" />}
                    {activePreset === 'STANDUP' && <Volume2 className="w-6 h-6" />}
                    {activePreset === 'NAV' && <Activity className="w-6 h-6" />}
                  </div>
                </div>

                {/* Projected Title */}
                <h4 className="text-sm font-bold tracking-wider uppercase mt-2">
                  {customPrompt ? 'CUSTOM PROMPT' : activePreset}
                </h4>

                {/* Projected Streaming Text Body */}
                <p className="text-xs mt-1.5 px-3 leading-relaxed opacity-90 max-h-24 overflow-hidden">
                  {customPrompt || streamingText}
                </p>

                {/* Palm Gesture Prompt Footer */}
                <div className="mt-4 pt-2 border-t border-emerald-500/30 w-full flex justify-between items-center text-[10px] opacity-75">
                  <span>Pinch: Select</span>
                  <span>Tilt: Scroll</span>
                  <span>Dist: {distanceMm}mm</span>
                </div>
              </div>
            ) : (
              <div className="relative z-20 flex flex-col items-center justify-center text-center p-4">
                <Hand className="w-12 h-12 text-slate-600 mb-2" />
                <p className="text-xs font-mono text-slate-400 font-medium">
                  {safety.reason || 'Laser beam disabled by safety governor.'}
                </p>
                <span className="text-[10px] text-slate-500 mt-2">
                  Adjust distance or skin temp to arm laser
                </span>
              </div>
            )}
          </div>

          {/* Real-time Telemetry Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>ToF: {distanceMm}mm</span>
            <span>Pitch: {pitchDeg}°</span>
            <span>Roll: {rollDeg}°</span>
            <span>Temp: {caseTemp.toFixed(1)}°C</span>
            <span className="text-emerald-400">FPS: 60Hz</span>
          </div>
        </div>

        {/* Interactive Controls & Telemetry (Right 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Hardware Touchpad Surface Simulation */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Hardware Capacitive Touchpad
              </span>
              <span className="text-[10px] font-mono text-slate-500">/dev/input/event0</span>
            </div>
            <button
              onMouseDown={handleTouchpadDown}
              onMouseUp={handleTouchpadUp}
              onTouchStart={handleTouchpadDown}
              onTouchEnd={handleTouchpadUp}
              className={`w-full py-4 rounded-xl border-2 font-mono text-sm font-semibold transition-all duration-150 flex flex-col items-center justify-center gap-1 ${
                touchpadHeld
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20 scale-[0.98]'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${touchpadHeld ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />
                <span>{touchpadHeld ? 'RECORDING TOUCHPAD HOLD...' : 'PRESS & HOLD TOUCHPAD'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">
                {touchpadHeld ? 'Release to dispatch query to Gemini API' : 'Simulates physical AI Pin capacitive tap & hold'}
              </span>
            </button>
          </div>

          {/* Sliders for Physical Distance and Angles */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Optical & Thermal Geometry
            </h4>

            {/* Distance Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Palm Distance (ToF)</span>
                <span className={distanceMm < 80 || distanceMm > 450 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                  {distanceMm} mm {distanceMm < 80 ? '(TOO CLOSE)' : distanceMm > 450 ? '(OUT OF RANGE)' : '(OPTIMAL)'}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="5"
                value={distanceMm}
                onChange={(e) => setDistanceMm(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>50mm (Cutoff &lt;80)</span>
                <span>200mm (Nominal)</span>
                <span>500mm (Cutoff &gt;450)</span>
              </div>
            </div>

            {/* Pitch Tilt Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Palm Pitch Tilt (Keystone)</span>
                <span className="text-cyan-400">{pitchDeg}°</span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                value={pitchDeg}
                onChange={(e) => setPitchDeg(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Roll Tilt Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Palm Roll (Skew)</span>
                <span className="text-purple-400">{rollDeg}°</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={rollDeg}
                onChange={(e) => setRollDeg(Number(e.target.value))}
                className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Skin / Case Temp Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>Skin Contact Temp</span>
                <span className={caseTemp >= 43.0 ? 'text-red-400 font-bold' : 'text-amber-400'}>
                  {caseTemp.toFixed(1)}°C {caseTemp >= 43.0 ? '(IEC SHUTDOWN)' : '(SAFE)'}
                </span>
              </div>
              <input
                type="range"
                min="34.0"
                max="45.0"
                step="0.2"
                value={caseTemp}
                onChange={(e) => setCaseTemp(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Quick HUD Presets */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
              Projection Content Presets
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['LISTENING', 'THINKING', 'WEATHER', 'STANDUP', 'NAV'] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setActivePreset(preset);
                    setCustomPrompt('');
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activePreset === preset && !customPrompt
                      ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Custom Prompt Input */}
            <div className="mt-3">
              <input
                type="text"
                placeholder="Or type custom laser message..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Color Palette Switcher */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-mono">Laser Diode:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLaserColor('green')}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    laserColor === 'green' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  520nm Green
                </button>
                <button
                  onClick={() => setLaserColor('amber')}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    laserColor === 'amber' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Amber Night
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
