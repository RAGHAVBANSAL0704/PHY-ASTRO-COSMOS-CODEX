// labs/lab4.js
// Visualization + experiments for Lab 4: Three-Body Chaos

const presetSelect = document.getElementById('preset');
const dtInput = document.getElementById('dt');
const integratorSelect = document.getElementById('integrator');
const epsInput = document.getElementById('epsilon');

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const statusMsg = document.getElementById('statusMsg');
const exportSepBtn = document.getElementById('exportSepBtn');
const speedInput = document.getElementById('speed');
const clearDataBtn = document.getElementById('clearDataBtn');

const motionCanvas = document.getElementById('motionCanvas');
const mctx = motionCanvas.getContext('2d');

const sepCanvas = document.getElementById('sepCanvas');
const sctx = sepCanvas.getContext('2d');

let running = false;
let animId = null;
let history = [];
let hasRun = false;
const MAX_POINTS = 2000;

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

// ================= PRESETS =================
function getPreset(name, eps) {
  if (name === 'figure8') {
    return {
      bodies: [
        { m: 1, x: -0.970, y: 0.243, vx: 0.466, vy: 0.432 },
        { m: 1, x:  0.970, y: -0.243, vx: 0.466, vy: 0.432 },
        { m: 1, x:  0, y: 0, vx: -0.932, vy: -0.864 }
      ],
      shadow: [
        { m: 1, x: -0.970 + eps, y: 0.243, vx: 0.466, vy: 0.432 },
        { m: 1, x:  0.970, y: -0.243, vx: 0.466, vy: 0.432 },
        { m: 1, x:  0, y: 0, vx: -0.932, vy: -0.864 }
      ]
    };
  }

  if (name === 'binary') {
    return {
      bodies: [
        { m: 1, x: -0.5, y: 0, vx: 0, vy: 0.8 },
        { m: 1, x:  0.5, y: 0, vx: 0, vy: -0.8 },
        { m: 0.2, x: 0, y: 1.2, vx: -0.7, vy: 0 }
      ],
      shadow: [
        { m: 1, x: -0.5 + eps, y: 0, vx: 0, vy: 0.8 },
        { m: 1, x:  0.5, y: 0, vx: 0, vy: -0.8 },
        { m: 0.2, x: 0, y: 1.2, vx: -0.7, vy: 0 }
      ]
    };
  }

  // Triangle (unstable)
  return {
    bodies: [
      { m: 1, x: -1, y: 0, vx: 0.3, vy: 0.3 },
      { m: 1, x:  1, y: 0, vx: -0.3, vy: 0.3 },
      { m: 1, x:  0, y: 1.5, vx: 0, vy: -0.6 }
    ],
    shadow: [
      { m: 1, x: -1 + eps, y: 0, vx: 0.3, vy: 0.3 },
      { m: 1, x:  1, y: 0, vx: -0.3, vy: 0.3 },
      { m: 1, x:  0, y: 1.5, vx: 0, vy: -0.6 }
    ]
  };
}

// ================= INIT =================
function initSimulation() {
  setStatus('');
  const eps = readNumber(epsInput, { name: 'ε', min: 0 });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  if (eps === null || dt === null) return false;
  const preset = getPreset(presetSelect.value, eps);

  NBody.init({
    G: 1,
    dt,
    integrator: integratorSelect.value,
    bodies: preset.bodies,
    shadow: preset.shadow
  });

  history = [];
  clearCanvases();
  const state = NBody.getState();
  drawMotion(state);
  drawSeparation();
  hasRun = false;
  return true;
}

function clearCanvases() {
  mctx.clearRect(0, 0, motionCanvas.width, motionCanvas.height);
  sctx.clearRect(0, 0, sepCanvas.width, sepCanvas.height);
}

// ================= DRAWING =================
function drawMotion(state) {
  const w = motionCanvas.width;
  const h = motionCanvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 80;

  mctx.clearRect(0, 0, w, h);

  const colors = ['#4fd1c5', '#ffa502', '#ff6b6b'];

  state.bodies.forEach((b, i) => {
    mctx.fillStyle = colors[i % colors.length];
    mctx.beginPath();
    mctx.arc(cx + b.x * scale, cy + b.y * scale, 4, 0, Math.PI * 2);
    mctx.fill();
  });

  if (state.shadowBodies) {
    mctx.setLineDash([4, 4]);
    state.shadowBodies.forEach((b, i) => {
      mctx.strokeStyle = colors[i % colors.length];
      mctx.beginPath();
      mctx.arc(cx + b.x * scale, cy + b.y * scale, 4, 0, Math.PI * 2);
      mctx.stroke();
    });
    mctx.setLineDash([]);
  }
}

function drawSeparation() {
  const w = sepCanvas.width;
  const h = sepCanvas.height;
  sctx.clearRect(0, 0, w, h);

  sctx.strokeStyle = '#555';
  sctx.beginPath();
  sctx.moveTo(30, 10);
  sctx.lineTo(30, h - 20);
  sctx.lineTo(w - 10, h - 20);
  sctx.stroke();

  if (history.length < 2) return;

  const tMax = history[history.length - 1].t;
  const logValues = history.map(d => Math.log10(Math.max(d.sep, 1e-12)));
  const logMin = Math.min(...logValues);
  const logMax = Math.max(...logValues);
  const logRange = Math.max(1e-9, logMax - logMin);

  const tx = (w - 40) / tMax;
  const dy = (h - 40) / logRange;

  sctx.strokeStyle = '#7bed9f';
  sctx.beginPath();

  history.forEach((d, i) => {
    const x = 30 + d.t * tx;
    const y = h - 20 - (Math.log10(Math.max(d.sep, 1e-12)) - logMin) * dy;
    if (i === 0) sctx.moveTo(x, y);
    else sctx.lineTo(x, y);
  });

  sctx.stroke();
}

// ================= LOOP =================
function step() {
  const steps = Math.max(1, parseInt(speedInput?.value || '1', 10));
  let state = null;

  for (let i = 0; i < steps; i++) {
    NBody.step();
    state = NBody.getState();

    if (state.shadowBodies) {
      let sep = 0;
      for (let j = 0; j < state.bodies.length; j++) {
        const dx = state.bodies[j].x - state.shadowBodies[j].x;
        const dy = state.bodies[j].y - state.shadowBodies[j].y;
        sep += Math.sqrt(dx * dx + dy * dy);
      }
      sep /= state.bodies.length;

      history.push({ t: state.t, sep });
      if (history.length > MAX_POINTS) history.shift();
    }
  }

  if (state) {
    drawMotion(state);
    drawSeparation();
  }

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

if (clearDataBtn) {
  clearDataBtn.addEventListener('click', () => {
    running = false;
    if (animId) cancelAnimationFrame(animId);
    initSimulation();
    updateStartButton();
  });
}

if (exportSepBtn) {
  exportSepBtn.addEventListener('click', () => {
    if (history.length === 0) {
      setStatus('Run the simulation before exporting.', true);
      return;
    }
    let csv = 't,sep\n';
    history.forEach(d => {
      csv += `${d.t},${d.sep}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lab4_separation.csv';
    a.click();
  });
}

// ================= STARTUP =================
initSimulation();
updateStartButton();
