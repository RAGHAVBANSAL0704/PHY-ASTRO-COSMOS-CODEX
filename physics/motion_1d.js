// physics/motion_1d.js
// Pure physics engine for Lab 1: 1D motion under constant acceleration
// No DOM, no canvas, no UI code

const Motion1D = (function () {
  // State variables
  let x = 0;      // numerical position
  let v = 0;      // numerical velocity
  let a = 0;      // constant acceleration
  let dt = 0.1;   // time step
  let t = 0;      // current time

  // Initial conditions (for exact solution)
  let x0 = 0;
  let v0 = 0;

  // Initialize the system
  function init(params) {
    x0 = params.x0;
    v0 = params.v0;
    a  = params.a;
    dt = params.dt;

    x = x0;
    v = v0;
    t = 0;
  }

  // One Euler-forward time step
  function stepEuler() {
    // Explicit Euler (use v_n for x update)
    const vPrev = v;
    v = v + a * dt;
    x = x + vPrev * dt;

    t = t + dt;
  }

  // Exact analytical solution at current time
  function exactPosition(time) {
    return x0 + v0 * time + 0.5 * a * time * time;
  }

  function exactVelocity(time) {
    return v0 + a * time;
  }

  // Get current state (numerical + exact)
  function getState() {
    const xExact = exactPosition(t);
    const vExact = exactVelocity(t);

    return {
      t: t,
      xNum: x,
      vNum: v,
      xExact: xExact,
      vExact: vExact,
      error: x - xExact
    };
  }

  // Public API
  return {
    init,
    stepEuler,
    getState,
    exactPosition,
    exactVelocity
  };
})();
