// physics/two_body.js
// Two-body gravitational solver for Lab 3
// Supports: Euler, Velocity Verlet, RK4
// Units: dimensionless (default) OR physical (toggle)

const TwoBody = (function () {
  // ------------------ Parameters ------------------
  let GM = 1;          // gravitational parameter
  let dt = 0.01;      // time step
  let integrator = 'verlet';
  let softening = 1e-6;

  // Unit system
  // 'dimless' : GM = 1, arbitrary units
  // 'physical': km, s (GM ~ 398600 for Earth)
  let units = 'dimless';

  // ------------------ State ------------------
  let x = 0, y = 0;     // position
  let vx = 0, vy = 0;  // velocity
  let t = 0;           // time

  // Initial conditions
  let x0 = 0, y0 = 0;
  let vx0 = 0, vy0 = 0;

  // ------------------ Helpers ------------------
  function accel(px, py) {
    const r2 = px * px + py * py + softening * softening;
    const r = Math.sqrt(r2);
    const factor = -GM / (r2 * r);
    return {
      ax: factor * px,
      ay: factor * py,
      r: r
    };
  }

  function energies(px, py, pvx, pvy) {
    const v2 = pvx * pvx + pvy * pvy;
    const KE = 0.5 * v2;
    const PE = -GM / Math.sqrt(px * px + py * py + softening * softening);
    const E = KE + PE;
    return { KE, PE, E };
  }

  function angularMomentum(px, py, pvx, pvy) {
    return px * pvy - py * pvx;
  }

  // ------------------ Init ------------------
  function init(params) {
    units = params.units || 'dimless';

    if (units === 'physical') {
      // Earth GM in km^3/s^2 by default
      GM = params.GM || 398600;
    } else {
      GM = params.GM || 1;
    }

    dt = params.dt;
    integrator = params.integrator || 'verlet';
    softening = params.softening || softening;

    x0 = params.x0;
    y0 = params.y0;
    vx0 = params.vx0;
    vy0 = params.vy0;

    x = x0; y = y0;
    vx = vx0; vy = vy0;
    t = 0;
  }

  // ------------------ Integrators ------------------

  function stepEuler() {
    const a = accel(x, y);
    const vxPrev = vx;
    const vyPrev = vy;
    vx += a.ax * dt;
    vy += a.ay * dt;
    x += vxPrev * dt;
    y += vyPrev * dt;
    t += dt;
  }

  function stepVerlet() {
    const a1 = accel(x, y);
    x += vx * dt + 0.5 * a1.ax * dt * dt;
    y += vy * dt + 0.5 * a1.ay * dt * dt;

    const a2 = accel(x, y);
    vx += 0.5 * (a1.ax + a2.ax) * dt;
    vy += 0.5 * (a1.ay + a2.ay) * dt;
    t += dt;
  }

  function stepRK4() {
    const a1 = accel(x, y);
    const k1x = vx;
    const k1y = vy;
    const k1vx = a1.ax;
    const k1vy = a1.ay;

    const a2 = accel(x + 0.5 * k1x * dt, y + 0.5 * k1y * dt);
    const k2x = vx + 0.5 * k1vx * dt;
    const k2y = vy + 0.5 * k1vy * dt;
    const k2vx = a2.ax;
    const k2vy = a2.ay;

    const a3 = accel(x + 0.5 * k2x * dt, y + 0.5 * k2y * dt);
    const k3x = vx + 0.5 * k2vx * dt;
    const k3y = vy + 0.5 * k2vy * dt;
    const k3vx = a3.ax;
    const k3vy = a3.ay;

    const a4 = accel(x + k3x * dt, y + k3y * dt);
    const k4x = vx + k3vx * dt;
    const k4y = vy + k3vy * dt;
    const k4vx = a4.ax;
    const k4vy = a4.ay;

    x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    y += (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    vx += (dt / 6) * (k1vx + 2 * k2vx + 2 * k3vx + k4vx);
    vy += (dt / 6) * (k1vy + 2 * k2vy + 2 * k3vy + k4vy);
    t += dt;
  }

  // ------------------ Dispatcher ------------------
  function step() {
    if (integrator === 'euler') stepEuler();
    else if (integrator === 'rk4') stepRK4();
    else stepVerlet();
  }

  // ------------------ State ------------------
  function getState() {
    const { KE, PE, E } = energies(x, y, vx, vy);
    const L = angularMomentum(x, y, vx, vy);
    return { t, x, y, vx, vy, KE, PE, E, L };
  }

  function setIntegrator(name) {
    integrator = name;
  }

  function setTimeStep(newDt) {
    dt = newDt;
  }

  function setUnits(newUnits) {
    units = newUnits;
  }

  // ------------------ Public API ------------------
  return {
    init,
    step,
    getState,
    setIntegrator,
    setTimeStep,
    setUnits
  };
})();
