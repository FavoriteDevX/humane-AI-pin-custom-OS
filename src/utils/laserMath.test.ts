import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateLaserSafety, calculateKeystoneWarp, LASER_SPECS } from './laserMath.ts';

test('Laser safety: trips if palm is closer than minimum safe optical distance (80mm)', () => {
  const result = evaluateLaserSafety(50, 1000, 35);
  assert.equal(result.isInterlockEngaged, true);
  assert.equal(result.status, 'SAFETY_TRIP');
  assert.match(result.reason || '', /minimum safe optical threshold/);
});

test('Laser safety: switches to STANDBY if palm is further than 450mm', () => {
  const result = evaluateLaserSafety(500, 1000, 35);
  assert.equal(result.isInterlockEngaged, false);
  assert.equal(result.status, 'STANDBY');
});

test('Laser safety: permits EMITTING within safe zone (80-450mm) under thermal threshold', () => {
  const result = evaluateLaserSafety(220, 5000, 36.5);
  assert.equal(result.isInterlockEngaged, false);
  assert.equal(result.status, 'EMITTING');
});

test('Laser safety: enforces thermal shutdown at or above 43.0 C skin contact limit', () => {
  const result = evaluateLaserSafety(200, 2000, 43.2);
  assert.equal(result.isInterlockEngaged, true);
  assert.equal(result.status, 'THERMAL_SHUTDOWN');
});

test('Laser keystone: calculates top and bottom scale factors based on palm pitch', () => {
  const level = calculateKeystoneWarp(0, 0);
  assert.equal(level.topWidthScale, 1.0);
  assert.equal(level.bottomWidthScale, 1.0);
  assert.equal(level.horizontalSkew, 0);

  const tilted = calculateKeystoneWarp(15, 5);
  assert.ok(tilted.topWidthScale < 1.0);
  assert.ok(tilted.bottomWidthScale > 1.0);
  assert.ok(tilted.horizontalSkew > 0);
});
