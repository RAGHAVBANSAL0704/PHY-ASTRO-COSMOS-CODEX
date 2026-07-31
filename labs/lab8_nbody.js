// labs/lab8_nbody.js
// Lab 8: N-Body Dynamics at Scale (Direct O(N^2) + Barnes–Hut O(N log N))
// Uses physics/three_body.js (general N-body engine)

// ================= DOM =================
const NInput = document.getElementById('N');
const configSelect = document.getElementById('config');
const integratorSelect = document.getElementById('integrator');
const useBHInput = document.getElementById('useBH');
const dtInput = document.getElementById('dt');
const speedInput = document.getElementById('speed');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const statusMsg = document.getElementById('statusMsg');

const canvas = document.getElementById('nbodyCanvas');
const ctx = canvas.getContext('2d');

// ================= STATE =================
let running = false;
let animId = null;
let bodies = [];
let useBarnesHut = true;
let hasRun = false;

function setStatus(message, isError = false) {
  if (!statusMsg) return;
  statusMsg.textContent = message || '';
  statusMsg.classList.toggle('status-error', Boolean(isError));
}

function readNumber(input, { min = -Infinity, max = Infinity, name = 'value' } = {}) {
  const value = parseFloat(input.value);
  if (!Number.isFinite(value) || value < min || value > max) {
    setStatus(`Invalid ${name}. Please enter a value between ${min} and ${max}.`, true);
    return null;
  }
  return value;
}

// ================= INITIAL CONDITIONS =================
function generateBodies(N, mode) {
  const arr = [];

  if (mode === 'disk') {
    for (let i = 0; i < N; i++) {
      const r = Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const v = Math.sqrt(1 / (r + 0.1));
      arr.push({
        m: 1 / N,
        x,
        y,
        vx: -v * Math.sin(theta),
        vy: v * Math.cos(theta)
      });
    }
    return arr;
  }

  // Star cluster (Plummer-like)
  if (mode === 'cluster') {
    for (let i = 0; i < N; i++) {
      const r = Math.random();
      const theta = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      arr.push({ m: 1 / N, x, y, vx: 0, vy: 0 });
    }
    return arr;
  }

  // Random gas
  for (let i = 0; i < N; i++) {
    arr.push({
      m: 1 / N,
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4,
      vx: (Math.random() - 0.5),
      vy: (Math.random() - 0.5)
    });
  }
  return arr;
}

// ================= BARNES–HUT QUAD TREE =================
class QuadNode {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.mass = 0;
    this.cx = 0;
    this.cy = 0;
    this.body = null;
    this.children = null;
  }

  insert(b) {
    if (!this.children && !this.body) {
      this.body = b;
      this.mass = b.m;
      this.cx = b.x;
      this.cy = b.y;
      return;
    }

    if (!this.children) this.subdivide();

    if (this.body) {
      this._insertIntoChild(this.body);
      this.body = null;
    }

    this._insertIntoChild(b);

    this.mass += b.m;
    this.cx = (this.cx * (this.mass - b.m) + b.m * b.x) / this.mass;
    this.cy = (this.cy * (this.mass - b.m) + b.m * b.y) / this.mass;
  }

  _insertIntoChild(b) {
    const i = (b.x > this.x ? 1 : 0) + (b.y > this.y ? 2 : 0);
    this.children[i].insert(b);
  }

  subdivide() {
    const h = this.size / 2;
    this.children = [
      new QuadNode(this.x - h, this.y - h, h),
      new QuadNode(this.x + h, this.y - h, h),
      new QuadNode(this.x - h, this.y + h, h),
      new QuadNode(this.x + h, this.y + h, h)
    ];
  }
}

function computeForceBH(b, node, theta = 0.6, G = 1) {
  let fx = 0, fy = 0;
  if (!node || node.mass === 0) return { fx, fy };

  const dx = node.cx - b.x;
  const dy = node.cy - b.y;
  const dist = Math.sqrt(dx * dx + dy * dy) + 1e-3;

  if (!node.children || node.size / dist < theta) {
    const f = G * node.mass / (dist * dist);
    fx += f * dx / dist;
    fy += f * dy / dist;
  } else {
    node.children.forEach(c => {
      const res = computeForceBH(b, c, theta, G);
      fx += res.fx;
      fy += res.fy;
    });
  }
  return { fx, fy };
}

// ================= INIT =================
function initSimulation() {
  setStatus('');
  const N = parseInt(NInput.value, 10);
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  if (!Number.isFinite(N) || N < 2 || dt === null) return false;

  useBarnesHut = Boolean(useBHInput && useBHInput.checked);
  bodies = generateBodies(N, configSelect.value);

  NBody.init({
    G: 1,
    dt,
    integrator: integratorSelect.value,
    bodies,
    useReference: true
  });

  running = false;
  hasRun = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw({ bodies });
  return true;
}

// ================= DRAW =================
function draw(state) {
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 80;

  ctx.clearRect(0, 0, w, h);

  state.bodies.forEach(b => {
    ctx.fillStyle = '#4fd1c5';
    ctx.beginPath();
    ctx.arc(cx + b.x * scale, cy + b.y * scale, 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

// ================= LOOP =================
function step() {
  const dt = parseFloat(dtInput.value);
  const steps = Math.max(1, parseInt(speedInput?.value || '1', 10));

  for (let i = 0; i < steps; i++) {
    if (useBarnesHut) {
      // Barnes–Hut acceleration
      const root = new QuadNode(0, 0, 4);
      bodies.forEach(b => root.insert(b));

      bodies.forEach(b => {
        const { fx, fy } = computeForceBH(b, root);
        b.vx += fx * dt;
        b.vy += fy * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      });
    } else {
      NBody.step();
    }
  }

  const state = useBarnesHut ? { bodies } : NBody.getState();
  draw(state);

  if (running) animId = requestAnimationFrame(step);
}

// ================= EVENTS =================
function updateStartButton() {
  if (running) startBtn.textContent = 'Pause';
  else if (hasRun) startBtn.textContent = 'Resume';
  else startBtn.textContent = 'Start';
}

startBtn.addEventListener('click', () => {
  if (running) {
    running = false;
    if (animId) cancelAnimationFrame(animId);
    updateStartButton();
    return;
  }

  if (!hasRun) {
    if (!initSimulation()) return;
    hasRun = true;
  }

  running = true;
  updateStartButton();
  step();
});

resetBtn.addEventListener('click', () => {
  running = false;
  if (animId) cancelAnimationFrame(animId);
  initSimulation();
  updateStartButton();
});

if (useBHInput) {
  useBHInput.addEventListener('change', () => {
    useBarnesHut = useBHInput.checked;
  });
}

[NInput, configSelect, integratorSelect, dtInput].forEach((control) => {
  control.addEventListener('change', () => {
    if (!running) {
      initSimulation();
      updateStartButton();
    }
  });
});

// ================= STARTUP =================
initSimulation();
updateStartButton();
