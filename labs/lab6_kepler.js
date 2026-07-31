// labs/lab6_kepler.js
// Lab 6: Numerical Verification of Kepler's Laws (Manual single-orbit mode)
// Uses physics/two_body.js

// ================= DOM =================
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

const areaCanvas = document.getElementById('areaCanvas');
const actx = areaCanvas.getContext('2d');

const thirdCanvas = document.getElementById('thirdLawCanvas');
const tctx = thirdCanvas.getContext('2d');

// ================= STATE =================
let running = false;
let animId = null;
let trajectory = [];
let areaHistory = [];
let sweptArea = 0;
let timeMarks = [];
let periodDetected = false;
let periodT = 0;
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
  const r0 = readNumber(r0Input, { name: 'r₀', min: 1e-6 });
  const v0 = readNumber(v0Input, { name: 'v₀' });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  if (r0 === null || v0 === null || dt === null) return false;

  TwoBody.init({
    units: 'dimless',
    GM: 1,
    x0: r0,
    y0: 0,
    vx0: 0,
    vy0: v0,
    dt,
    integrator: integratorSelect.value
  });

  running = false;
  trajectory = [];
  areaHistory = [];
  timeMarks = [];
  sweptArea = 0;
  periodDetected = false;
  periodT = 0;
  hasRun = false;
  prevState = null;

  clearCanvases();
  const state = TwoBody.getState();
  trajectory.push({ x: state.x, y: state.y });
  prevState = state;
  drawOrbit(state);
  drawAreaPlot();
  drawThirdLaw();
  return true;
}

function clearCanvases() {
  octx.clearRect(0, 0, orbitCanvas.width, orbitCanvas.height);
  actx.clearRect(0, 0, areaCanvas.width, areaCanvas.height);
  tctx.clearRect(0, 0, thirdCanvas.width, thirdCanvas.height);
}

// ================= DRAWING =================
function drawOrbit(state) {
  const w = orbitCanvas.width;
  const h = orbitCanvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 70;

  octx.clearRect(0, 0, w, h);

  // Focus (central mass)
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

  // Planet
  const px = cx + state.x * scale;
  const py = cy + state.y * scale;
  octx.fillStyle = '#7bed9f';
  octx.beginPath();
  octx.arc(px, py, 4, 0, Math.PI * 2);
  octx.fill();
}

function drawAreaPlot() {
  const w = areaCanvas.width;
  const h = areaCanvas.height;
  actx.clearRect(0, 0, w, h);

  if (areaHistory.length < 2) return;

  const tMax = areaHistory[areaHistory.length - 1].t;
  const aMax = Math.max(...areaHistory.map(d => d.area)) || 1;

  const tx = (w - 40) / tMax;
  const ay = (h - 40) / aMax;

  actx.strokeStyle = '#ffa502';
  actx.beginPath();
  areaHistory.forEach((d, i) => {
    const x = 30 + d.t * tx;
    const y = h - 20 - d.area * ay;
    if (i === 0) actx.moveTo(x, y);
    else actx.lineTo(x, y);
  });
  actx.stroke();
}

function drawThirdLaw() {
  const w = thirdCanvas.width;
  const h = thirdCanvas.height;
  tctx.clearRect(0, 0, w, h);

  if (!periodDetected) return;

  const state = TwoBody.getState();
  const E = state.E;
  if (E >= 0) {
    tctx.fillStyle = '#e6e9ff';
    tctx.fillText('Unbound orbit: Kepler 3rd law applies to bound orbits (E < 0).', 10, 20);
    return;
  }

  const a = -1 / (2 * E);
  const T2 = periodT * periodT;
  const a3 = a * a * a;
  const ratio = T2 / a3;

  tctx.fillStyle = '#4fd1c5';
  tctx.beginPath();
  tctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
  tctx.fill();

  tctx.fillStyle = '#e6e9ff';
  tctx.fillText(`T² = ${T2.toFixed(3)},  a³ = ${a3.toFixed(3)}`, 10, 20);
  tctx.fillText(`T² / a³ ≈ ${ratio.toFixed(3)} (expected 4π² ≈ ${(4 * Math.PI * Math.PI).toFixed(3)})`, 10, 40);
}

// ================= PHYSICS =================
function updateArea(state, prevState) {
  if (!prevState) return;
  const dA = 0.5 * Math.abs(prevState.x * state.y - prevState.y * state.x);
  sweptArea += dA;
  areaHistory.push({ t: state.t, area: sweptArea });
  if (areaHistory.length > MAX_POINTS) areaHistory.shift();
}

function detectPeriod(state, prevState) {
  if (periodDetected || !prevState) return;

  if (state.t > 0.05 && prevState.y < 0 && state.y >= 0 && state.x > 0) {
    periodDetected = true;
    periodT = state.t;
  }
}

// ================= LOOP =================
let prevState = null;
function step() {
  const steps = Math.max(1, parseInt(speedInput?.value || '1', 10));
  let state = null;

  for (let i = 0; i < steps; i++) {
    TwoBody.step();
    state = TwoBody.getState();

    trajectory.push({ x: state.x, y: state.y });
    if (trajectory.length > MAX_POINTS) trajectory.shift();

    updateArea(state, prevState);
    detectPeriod(state, prevState);

    prevState = state;
  }

  if (state) {
    drawOrbit(state);
    drawAreaPlot();
    drawThirdLaw();
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
