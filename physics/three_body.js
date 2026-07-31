// physics/three_body.js
// General N-body gravitational engine (Lab 4 – Chaos)
// Supports:
//  - Mode A: Fixed 3-body presets (teaching mode)
//  - Mode B: General N-body (future-proof)
// Integrators: Euler, Velocity Verlet, RK4
// Includes optional shadow system for chaos visualization

const NBody = (function () {
  // ---------------- PARAMETERS ----------------
  let G = 1;
  let dt = 0.01;
  let integrator = 'verlet';
  let softening = 1e-3; // avoids singularities

  // ---------------- STATE ----------------
  let bodies = [];        // primary system
  let shadowBodies = []; // perturbed copy (for chaos)
  let t = 0;

  // ---------------- BODY STRUCTURE ----------------
  // { m, x, y, vx, vy }

  // ---------------- HELPERS ----------------
  function cloneBodies(arr) {
    return arr.map(b => ({ ...b }));
  }

  function accelerations(state) {
    const acc = state.map(() => ({ ax: 0, ay: 0 }));

    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        const dx = state[j].x - state[i].x;
        const dy = state[j].y - state[i].y;
        const r2 = dx * dx + dy * dy + softening * softening;
        const r = Math.sqrt(r2);
        const f = G / (r2 * r);

        acc[i].ax += f * state[j].m * dx;
        acc[i].ay += f * state[j].m * dy;
        acc[j].ax -= f * state[i].m * dx;
        acc[j].ay -= f * state[i].m * dy;
      }
    }
    return acc;
  }

  function energies(state) {
    let KE = 0, PE = 0;

    for (let i = 0; i < state.length; i++) {
      KE += 0.5 * state[i].m * (state[i].vx ** 2 + state[i].vy ** 2);
      for (let j = i + 1; j < state.length; j++) {
        const dx = state[j].x - state[i].x;
        const dy = state[j].y - state[i].y;
        const r = Math.sqrt(dx * dx + dy * dy + softening * softening);
        PE -= G * state[i].m * state[j].m / r;
      }
    }
    return { KE, PE, E: KE + PE };
  }

  function angularMomentum(state) {
    let L = 0;
    state.forEach(b => {
      L += b.m * (b.x * b.vy - b.y * b.vx);
    });
    return L;
  }

  // ---------------- INTEGRATORS ----------------
  function stepEuler(state) {
    const a = accelerations(state);
    state.forEach((b, i) => {
      const vxPrev = b.vx;
      const vyPrev = b.vy;
      b.vx += a[i].ax * dt;
      b.vy += a[i].ay * dt;
      b.x += vxPrev * dt;
      b.y += vyPrev * dt;
    });
  }

  function stepVerlet(state) {
    const a1 = accelerations(state);
    state.forEach((b, i) => {
      b.x += b.vx * dt + 0.5 * a1[i].ax * dt * dt;
      b.y += b.vy * dt + 0.5 * a1[i].ay * dt * dt;
    });

    const a2 = accelerations(state);
    state.forEach((b, i) => {
      b.vx += 0.5 * (a1[i].ax + a2[i].ax) * dt;
      b.vy += 0.5 * (a1[i].ay + a2[i].ay) * dt;
    });
  }

  function stepRK4(state) {
    const n = state.length;
    const a1 = accelerations(state);

    const mid1 = cloneBodies(state);
    for (let i = 0; i < n; i++) {
      mid1[i].x += 0.5 * state[i].vx * dt;
      mid1[i].y += 0.5 * state[i].vy * dt;
      mid1[i].vx += 0.5 * a1[i].ax * dt;
      mid1[i].vy += 0.5 * a1[i].ay * dt;
    }

    const a2 = accelerations(mid1);

    const mid2 = cloneBodies(state);
    for (let i = 0; i < n; i++) {
      mid2[i].x += 0.5 * mid1[i].vx * dt;
      mid2[i].y += 0.5 * mid1[i].vy * dt;
      mid2[i].vx += 0.5 * a2[i].ax * dt;
      mid2[i].vy += 0.5 * a2[i].ay * dt;
    }

    const a3 = accelerations(mid2);

    const end = cloneBodies(state);
    for (let i = 0; i < n; i++) {
      end[i].x += mid2[i].vx * dt;
      end[i].y += mid2[i].vy * dt;
      end[i].vx += a3[i].ax * dt;
      end[i].vy += a3[i].ay * dt;
    }

    const a4 = accelerations(end);

    for (let i = 0; i < n; i++) {
      state[i].x += (dt / 6) * (state[i].vx + 2 * mid1[i].vx + 2 * mid2[i].vx + end[i].vx);
      state[i].y += (dt / 6) * (state[i].vy + 2 * mid1[i].vy + 2 * mid2[i].vy + end[i].vy);
      state[i].vx += (dt / 6) * (a1[i].ax + 2 * a2[i].ax + 2 * a3[i].ax + a4[i].ax);
      state[i].vy += (dt / 6) * (a1[i].ay + 2 * a2[i].ay + 2 * a3[i].ay + a4[i].ay);
    }
  }

  function stepSystem(state) {
    if (integrator === 'euler') stepEuler(state);
    else if (integrator === 'rk4') stepRK4(state);
    else stepVerlet(state);
  }

  // ---------------- PUBLIC API ----------------
  function init(params) {
    G = params.G || 1;
    dt = params.dt || 0.01;
    integrator = params.integrator || 'verlet';
    softening = params.softening || softening;

    bodies = params.useReference ? params.bodies : cloneBodies(params.bodies);
    shadowBodies = params.shadow
      ? (params.useReference ? params.shadow : cloneBodies(params.shadow))
      : null;
    t = 0;
  }

  function step() {
    stepSystem(bodies);
    if (shadowBodies) stepSystem(shadowBodies);
    t += dt;
  }

  function getState() {
    return {
      t,
      bodies,
      shadowBodies,
      energy: energies(bodies),
      angularMomentum: angularMomentum(bodies)
    };
  }

  return {
    init,
    step,
    getState
  };
})();
