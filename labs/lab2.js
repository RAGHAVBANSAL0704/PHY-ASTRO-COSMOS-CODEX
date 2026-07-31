// labs/lab2.js
// UI + visualization logic for Lab 2 (Harmonic Oscillator)
// Uses physics/oscillator.js

// ================= DOM ELEMENTS =================
const kInput = document.getElementById('k');
const mInput = document.getElementById('m');
const x0Input = document.getElementById('x0');
const v0Input = document.getElementById('v0');
const dtInput = document.getElementById('dt');
const integratorSelect = document.getElementById('integrator');

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const statusMsg = document.getElementById('statusMsg');
const speedInput = document.getElementById('speed');
const clearDataBtn = document.getElementById('clearDataBtn');

const motionCanvas = document.getElementById('motionCanvas');
const mctx = motionCanvas.getContext('2d');

const energyCanvas = document.getElementById('energyCanvas');
const ectx = energyCanvas.getContext('2d');

const phaseCanvas = document.getElementById('phaseCanvas');
const pctx = phaseCanvas.getContext('2d');

// ================= ENERGY TOGGLES =================
// Create checkboxes dynamically
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

// ================= SIMULATION STATE =================
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

// ================= INITIALIZATION =================
function initSimulation() {
  setStatus('');
  const k = readNumber(kInput, { name: 'k', min: 1e-6 });
  const m = readNumber(mInput, { name: 'm', min: 1e-6 });
  const x0 = readNumber(x0Input, { name: 'x₀' });
  const v0 = readNumber(v0Input, { name: 'v₀' });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  if (k === null || m === null || x0 === null || v0 === null || dt === null) return false;

  Oscillator.init({ k, m, x0, v0, dt, integrator: integratorSelect.value });

  history = [];
  clearCanvases();
  const state = Oscillator.getState();
  history.push(state);
  drawMotion(state);
  drawEnergy();
  drawPhase();
  hasRun = false;
  return true;
}

function clearCanvases() {
  mctx.clearRect(0, 0, motionCanvas.width, motionCanvas.height);
  ectx.clearRect(0, 0, energyCanvas.width, energyCanvas.height);
  pctx.clearRect(0, 0, phaseCanvas.width, phaseCanvas.height);
}

// ================= DRAWING =================

function drawMotion(state) {
  const w = motionCanvas.width;
  const h = motionCanvas.height;
  mctx.clearRect(0, 0, w, h);

  // equilibrium line
  mctx.strokeStyle = '#666';
  mctx.beginPath();
  mctx.moveTo(20, h / 2);
  mctx.lineTo(w - 20, h / 2);
  mctx.stroke();

  const scale = 60;
  const xCenter = w / 2;
  const xPos = xCenter + state.x * scale;

  mctx.fillStyle = '#4fd1c5';
  mctx.beginPath();
  mctx.arc(xPos, h / 2, 6, 0, Math.PI * 2);
  mctx.fill();
}

function drawEnergy() {
  const w = energyCanvas.width;
  const h = energyCanvas.height;
  ectx.clearRect(0, 0, w, h);

  if (history.length < 2) return;

  const tMax = history[history.length - 1].t;
  const eMax = Math.max(...history.map(d => Math.max(d.KE, d.PE, d.E))) || 1;

  const tx = (w - 50) / tMax;
  const ey = (h - 40) / eMax;

  function plot(values, color) {
    ectx.strokeStyle = color;
    ectx.beginPath();
    values.forEach((d, i) => {
      const x = 40 + d.t * tx;
      const y = h - 30 - d.val * ey;
      if (i === 0) ectx.moveTo(x, y);
      else ectx.lineTo(x, y);
    });
    ectx.stroke();
  }

  if (isChecked(showKE)) plot(history.map(d => ({ t: d.t, val: d.KE })), '#ffa502');
  if (isChecked(showPE)) plot(history.map(d => ({ t: d.t, val: d.PE })), '#7bed9f');
  if (isChecked(showE))  plot(history.map(d => ({ t: d.t, val: d.E  })), '#ff6b6b');
}

function drawPhase() {
  const w = phaseCanvas.width;
  const h = phaseCanvas.height;
  pctx.clearRect(0, 0, w, h);

  if (history.length < 2) return;

  const xMax = Math.max(...history.map(d => Math.abs(d.x))) || 1;
  const vMax = Math.max(...history.map(d => Math.abs(d.v))) || 1;

  const sx = (w - 40) / (2 * xMax);
  const sy = (h - 40) / (2 * vMax);

  pctx.strokeStyle = '#4fd1c5';
  pctx.beginPath();

  history.forEach((d, i) => {
    const x = w / 2 + d.x * sx;
    const y = h / 2 - d.v * sy;
    if (i === 0) pctx.moveTo(x, y);
    else pctx.lineTo(x, y);
  });

  pctx.stroke();
}

// ================= MAIN LOOP =================
function step() {
  const steps = Math.max(1, parseInt(speedInput?.value || '1', 10));
  let state = null;

  for (let i = 0; i < steps; i++) {
    Oscillator.step();
    state = Oscillator.getState();
    history.push(state);
    if (history.length > MAX_POINTS) history.shift();
  }

  if (state) {
    drawMotion(state);
    drawEnergy();
    drawPhase();
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
  Oscillator.setIntegrator(integratorSelect.value);
});

dtInput.addEventListener('change', () => {
  Oscillator.setTimeStep(parseFloat(dtInput.value));
});

// ================= STARTUP =================
initSimulation();
updateStartButton();
