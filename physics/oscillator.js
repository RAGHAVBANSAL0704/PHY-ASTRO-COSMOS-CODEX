// physics/oscillator.js
// Pure physics engine for Lab 2: 1D Harmonic Oscillator
// Integrators: Euler, Velocity Verlet, RK4
// No DOM, no canvas, no UI code

const Oscillator = (function () {
  // Parameters
  let k = 1;      // spring constant
  let m = 1;      // mass
  let dt = 0.05;  // time step

  // State
  let x = 0;      // position
  let v = 0;      // velocity
  let t = 0;      // time

  // Initial conditions (for reset/reference)
  let x0 = 0;
  let v0 = 0;

  // Selected integrator
  let integrator = 'verlet';

  // ------------------ Helpers ------------------
  function accel(px) {
    // a = -(k/m) x
    return -(k / m) * px;
  }

  function energies(px, pv) {
    const KE = 0.5 * m * pv * pv;
    const PE = 0.5 * k * px * px;
    const E = KE + PE;
    return { KE, PE, E };
  }

  // ------------------ Init ------------------
  function init(params) {
    k = params.k;
    m = params.m;
    dt = params.dt;
    integrator = params.integrator || 'verlet';

    x0 = params.x0;
    v0 = params.v0;

    x = x0;
    v = v0;
    t = 0;
  }

  // ------------------ Integrators ------------------

  // Euler forward
  function stepEuler() {
    const a = accel(x);
    const vPrev = v;
    v = v + a * dt;
    x = x + vPrev * dt;
    t = t + dt;
  }

  // Velocity Verlet (symplectic)
  function stepVerlet() {
    const a1 = accel(x);
    x = x + v * dt + 0.5 * a1 * dt * dt;
    const a2 = accel(x);
    v = v + 0.5 * (a1 + a2) * dt;
    t = t + dt;
  }

  // Runge–Kutta 4
  function stepRK4() {
    const a1 = accel(x);
    const k1x = v;
    const k1v = a1;

    const a2 = accel(x + 0.5 * k1x * dt);
    const k2x = v + 0.5 * k1v * dt;
    const k2v = a2;

    const a3 = accel(x + 0.5 * k2x * dt);
    const k3x = v + 0.5 * k2v * dt;
    const k3v = a3;

    const a4 = accel(x + k3x * dt);
    const k4x = v + k3v * dt;
    const k4v = a4;

    x = x + (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    v = v + (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
    t = t + dt;
  }

  // ------------------ Step Dispatcher ------------------
  function step() {
    if (integrator === 'euler') stepEuler();
    else if (integrator === 'rk4') stepRK4();
    else stepVerlet();
  }

  // ------------------ State ------------------
  function getState() {
    const { KE, PE, E } = energies(x, v);
    return { t, x, v, KE, PE, E };
  }

  function setIntegrator(name) {
    integrator = name;
  }

  function setTimeStep(newDt) {
    dt = newDt;
  }

  // ------------------ Public API ------------------
  return {
    init,
    step,
    getState,
    setIntegrator,
    setTimeStep
  };
})();
