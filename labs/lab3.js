// labs/lab3.js
// UI + visualization for Lab 3: Two-Body Gravitation
// Orbit (with trajectory), Energy vs Time, Angular Momentum vs Time

// ================= DOM ELEMENTS =================
const GMInput = document.getElementById('GM');
const r0Input = document.getElementById('r0');
const v0Input = document.getElementById('v0');
const dtInput = document.getElementById('dt');
const integratorSelect = document.getElementById('integrator');

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const statusMsg = document.getElementById('statusMsg');
const speedInput = document.getElementById('speed');
const clearDataBtn = document.getElementById('clearDataBtn');

const orbitCanvas = document.getElementById('orbitCanvas');
const octx = orbitCanvas.getContext('2d');

const energyCanvas = document.getElementById('energyCanvas');
const ectx = energyCanvas.getContext('2d');

const angularCanvas = document.getElementById('angularCanvas');
const actx = angularCanvas.getContext('2d');

// ================= ENERGY TOGGLES =================
const energyControls = document.createElement('div');
energyControls.style.marginBottom = '0.5rem';
energyControls.innerHTML = `
  <label><input type="checkbox" id="showKE" checked /> KE</label>
  <label><input type="checkbox" id="showPE" checked /> PE</label>
  <label><input type="checkbox" id="showE" checked /> Total E</label>
`;
energyCanvas.parentElement.insertBefore(energyControls, energyCanvas);

const showKE = document.getElementById('showKE');
const showPE = document.getElementById('showPE');
const showE  = document.getElementById('showE');

function isChecked(control) {
  return !control || control.checked;
}

// ================= STATE =================
let running = false;
let animId = null;
let history = [];
let trajectory = [];
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

// ================= INIT =================
function initSimulation() {
  setStatus('');
  const GM = readNumber(GMInput, { name: 'GM', min: 1e-6 });
  const r0 = readNumber(r0Input, { name: 'r₀', min: 1e-6 });
  const v0 = readNumber(v0Input, { name: 'v₀' });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  if (GM === null || r0 === null || v0 === null || dt === null) return false;

  TwoBody.init({
    units: 'dimless',
    GM,
    x0: r0,
    y0: 0,
    vx0: 0,
    vy0: v0,
    dt,
    integrator: integratorSelect.value
  });

  history = [];
  trajectory = [];
  clearCanvases();
  const state = TwoBody.getState();
  history.push(state);
  trajectory.push({ x: state.x, y: state.y });
  drawOrbit(state);
  drawEnergy();
  drawAngularMomentum();
  hasRun = false;
  return true;
}

function clearCanvases() {
  octx.clearRect(0, 0, orbitCanvas.width, orbitCanvas.height);
  ectx.clearRect(0, 0, energyCanvas.width, energyCanvas.height);
  actx.clearRect(0, 0, angularCanvas.width, angularCanvas.height);
}

// ================= DRAWING =================

function drawOrbit(state) {
  const w = orbitCanvas.width;
  const h = orbitCanvas.height;

  octx.clearRect(0, 0, w, h);

  const scale = 60;
  const cx = w / 2;
  const cy = h / 2;

  // Central mass
  octx.fillStyle = '#ff6b6b';
  octx.beginPath();
  octx.arc(cx, cy, 5, 0, Math.PI * 2);
  octx.fill();

  // Trajectory
  octx.strokeStyle = '#4fd1c5';
  octx.beginPath();
  trajectory.forEach((p, i) => {
    const x = cx + p.x * scale;
    const y = cy + p.y * scale;
    if (i === 0) octx.moveTo(x, y);
    else octx.lineTo(x, y);
  });
  octx.stroke();

  // Current position
  const px = cx + state.x * scale;
  const py = cy + state.y * scale;
  octx.fillStyle = '#7bed9f';
  octx.beginPath();
  octx.arc(px, py, 4, 0, Math.PI * 2);
  octx.fill();
}

function drawEnergy() {
  const w = energyCanvas.width;
  const h = energyCanvas.height;
  ectx.clearRect(0, 0, w, h);

  if (history.length < 2) return;

  const tMax = history[history.length - 1].t;
  const eMax = Math.max(...history.map(d => Math.max(Math.abs(d.KE), Math.abs(d.PE), Math.abs(d.E)))) || 1;

  const tx = (w - 50) / tMax;
  const ey = (h - 40) / eMax;

  function plot(values, color) {
    ectx.strokeStyle = color;
    ectx.beginPath();
    values.forEach((d, i) => {
      const x = 40 + d.t * tx;
      const y = h / 2 - d.val * ey * 0.5;
      if (i === 0) ectx.moveTo(x, y);
      else ectx.lineTo(x, y);
    });
    ectx.stroke();
  }

  if (isChecked(showKE)) plot(history.map(d => ({ t: d.t, val: d.KE })), '#ffa502');
  if (isChecked(showPE)) plot(history.map(d => ({ t: d.t, val: d.PE })), '#7bed9f');
  if (isChecked(showE))  plot(history.map(d => ({ t: d.t, val: d.E  })), '#ff6b6b');
}

function drawAngularMomentum() {
  const w = angularCanvas.width;
  const h = angularCanvas.height;
  actx.clearRect(0, 0, w, h);

  if (history.length < 2) return;

  const tMax = history[history.length - 1].t;
  const L0 = Math.abs(history[0].L) || 1;

  const tx = (w - 50) / tMax;
  const ly = (h - 40) / L0;

  actx.strokeStyle = '#4fd1c5';
  actx.beginPath();

  history.forEach((d, i) => {
    const x = 40 + d.t * tx;
    const y = h - 30 - Math.abs(d.L) * ly;
    if (i === 0) actx.moveTo(x, y);
    else actx.lineTo(x, y);
  });

  actx.stroke();
}

// ================= LOOP =================
function step() {
  const steps = Math.max(1, parseInt(speedInput?.value || '1', 10));
  let state = null;

  for (let i = 0; i < steps; i++) {
    TwoBody.step();
    state = TwoBody.getState();

    history.push(state);
    trajectory.push({ x: state.x, y: state.y });
    if (history.length > MAX_POINTS) history.shift();
    if (trajectory.length > MAX_POINTS) trajectory.shift();
  }

  if (state) {
    drawOrbit(state);
    drawEnergy();
    drawAngularMomentum();
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

integratorSelect.addEventListener('change', () => {
  TwoBody.setIntegrator(integratorSelect.value);
});

dtInput.addEventListener('change', () => {
  TwoBody.setTimeStep(parseFloat(dtInput.value));
});

// ================= STARTUP =================
initSimulation();
updateStartButton();
