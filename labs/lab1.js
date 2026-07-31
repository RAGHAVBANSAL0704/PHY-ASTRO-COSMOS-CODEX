// labs/lab1.js
// UI + visualization logic for Lab 1 (1D motion)
// Uses physics/motion_1d.js

// ================= DOM ELEMENTS =================
const x0Input = document.getElementById('x0');
const v0Input = document.getElementById('v0');
const accInput = document.getElementById('acc');
const dtInput  = document.getElementById('dt');

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const statusMsg = document.getElementById('statusMsg');
const speedInput = document.getElementById('speed');
const clearDataBtn = document.getElementById('clearDataBtn');

const motionCanvas = document.getElementById('motionCanvas');
const mctx = motionCanvas.getContext('2d');

const graphCanvas = document.getElementById('graphCanvas');
const gctx = graphCanvas.getContext('2d');

const errorTimeCanvas = document.getElementById('errorTimeCanvas');
const etctx = errorTimeCanvas.getContext('2d');

const errorDtCanvas = document.getElementById('errorDtCanvas');
const edctx = errorDtCanvas.getContext('2d');

const dtSweepInput = document.getElementById('dtSweep');
const runDtSweepBtn = document.getElementById('runDtSweep');

const tableBody = document.querySelector('#dataTable tbody');

// ================= SIMULATION STATE =================
let running = false;
let animationId = null;
let hasRun = false;

// Data storage for plotting & CSV
let history = [];
let errorHistory = [];
let dtSweepHistory = [];

const MAX_ROWS = 500;
const MAX_POINTS = 1000;

// ================= VALIDATION =================
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
  const x0 = readNumber(x0Input, { name: 'x₀' });
  const v0 = readNumber(v0Input, { name: 'v₀' });
  const a = readNumber(accInput, { name: 'a' });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  if (x0 === null || v0 === null || a === null || dt === null) return false;

  Motion1D.init({ x0, v0, a, dt });

  history = [];
  errorHistory = [];
  tableBody.innerHTML = '';
  clearCanvases();
  const state = Motion1D.getState();
  history.push(state);
  errorHistory.push({ t: state.t, err: Math.abs(state.error) });
  drawMotion(state);
  drawGraph();
  drawErrorTime();
  hasRun = false;
  return true;
}

// ================= DRAWING FUNCTIONS =================
function clearCanvases() {
  mctx.clearRect(0, 0, motionCanvas.width, motionCanvas.height);
  gctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  etctx.clearRect(0, 0, errorTimeCanvas.width, errorTimeCanvas.height);
  edctx.clearRect(0, 0, errorDtCanvas.width, errorDtCanvas.height);
}

// 1D motion animation
function drawMotion(state) {
  const w = motionCanvas.width;
  const h = motionCanvas.height;

  mctx.clearRect(0, 0, w, h);

  // Ground line
  mctx.strokeStyle = '#888';
  mctx.beginPath();
  mctx.moveTo(20, h / 2);
  mctx.lineTo(w - 20, h / 2);
  mctx.stroke();

  // Scale position to canvas
  const scale = 10; // pixels per unit distance
  const xCenter = 20;

  const xNum = xCenter + state.xNum * scale;
  const xExact = xCenter + state.xExact * scale;

  // Numerical position (blue)
  mctx.fillStyle = '#4fd1c5';
  mctx.beginPath();
  mctx.arc(xNum, h / 2, 6, 0, Math.PI * 2);
  mctx.fill();

  // Exact position (green)
  mctx.fillStyle = '#7CFC00';
  mctx.beginPath();
  mctx.arc(xExact, h / 2, 4, 0, Math.PI * 2);
  mctx.fill();
}

// Graph: x vs t
function drawGraph() {
  const w = graphCanvas.width;
  const h = graphCanvas.height;

  gctx.clearRect(0, 0, w, h);

  // Axes
  gctx.strokeStyle = '#555';
  gctx.beginPath();
  gctx.moveTo(40, 10);
  gctx.lineTo(40, h - 30);
  gctx.lineTo(w - 10, h - 30);
  gctx.stroke();

  if (history.length < 2) return;

  const tMax = history[history.length - 1].t;
  const xMax = Math.max(...history.map(d => Math.max(Math.abs(d.xNum), Math.abs(d.xExact)))) + 1;

  // Scaling
  const tx = (w - 60) / tMax;
  const xx = (h - 50) / (2 * xMax);

  // Numerical curve (blue)
  gctx.strokeStyle = '#4fd1c5';
  gctx.beginPath();
  history.forEach((d, i) => {
    const x = 40 + d.t * tx;
    const y = h - 30 - (d.xNum + xMax) * xx;
    if (i === 0) gctx.moveTo(x, y);
    else gctx.lineTo(x, y);
  });
  gctx.stroke();

  // Exact curve (green)
  gctx.strokeStyle = '#7CFC00';
  gctx.beginPath();
  history.forEach((d, i) => {
    const x = 40 + d.t * tx;
    const y = h - 30 - (d.xExact + xMax) * xx;
    if (i === 0) gctx.moveTo(x, y);
    else gctx.lineTo(x, y);
  });
  gctx.stroke();
}

// Error vs time
function drawErrorTime() {
  const w = errorTimeCanvas.width;
  const h = errorTimeCanvas.height;
  etctx.clearRect(0, 0, w, h);

  if (errorHistory.length < 2) return;

  const tMax = errorHistory[errorHistory.length - 1].t;
  const eMax = Math.max(...errorHistory.map(d => d.err)) || 1;

  const tx = (w - 50) / tMax;
  const ey = (h - 40) / eMax;

  etctx.strokeStyle = '#ffa502';
  etctx.beginPath();
  errorHistory.forEach((d, i) => {
    const x = 40 + d.t * tx;
    const y = h - 30 - d.err * ey;
    if (i === 0) etctx.moveTo(x, y);
    else etctx.lineTo(x, y);
  });
  etctx.stroke();
}

// Error vs Δt (sweep)
function drawErrorDt() {
  const w = errorDtCanvas.width;
  const h = errorDtCanvas.height;
  edctx.clearRect(0, 0, w, h);

  if (dtSweepHistory.length < 2) return;

  const dtMax = Math.max(...dtSweepHistory.map(d => d.dt)) || 1;
  const eMax = Math.max(...dtSweepHistory.map(d => d.err)) || 1;

  const dx = (w - 50) / dtMax;
  const ey = (h - 40) / eMax;

  edctx.strokeStyle = '#7bed9f';
  edctx.beginPath();
  dtSweepHistory.forEach((d, i) => {
    const x = 40 + d.dt * dx;
    const y = h - 30 - d.err * ey;
    if (i === 0) edctx.moveTo(x, y);
    else edctx.lineTo(x, y);
  });
  edctx.stroke();
}

// ================= DATA TABLE =================
function recordRow(state) {
  if (tableBody.children.length >= MAX_ROWS) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${state.t.toFixed(2)}</td>
    <td>${state.xNum.toFixed(4)}</td>
    <td>${state.xExact.toFixed(4)}</td>
    <td>${state.error.toExponential(2)}</td>
  `;
  tableBody.appendChild(tr);
}

// ================= MAIN LOOP =================
function step() {
  const steps = Math.max(1, parseInt(speedInput?.value || '1', 10));
  let state = null;

  for (let i = 0; i < steps; i++) {
    Motion1D.stepEuler();
    state = Motion1D.getState();

    history.push(state);
    errorHistory.push({ t: state.t, err: Math.abs(state.error) });
    if (history.length > MAX_POINTS) history.shift();
    if (errorHistory.length > MAX_POINTS) errorHistory.shift();

    recordRow(state);
  }

  if (state) {
    drawMotion(state);
    drawGraph();
    drawErrorTime();
  }

  if (running) {
    animationId = requestAnimationFrame(step);
  }
}

// ================= DT SWEEP =================
function simulateEulerError({ x0, v0, a, dt, T }) {
  let x = x0;
  let v = v0;
  let t = 0;
  while (t < T - 1e-12) {
    const vPrev = v;
    v = v + a * dt;
    x = x + vPrev * dt;
    t += dt;
  }
  const xExact = x0 + v0 * T + 0.5 * a * T * T;
  return Math.abs(x - xExact);
}

function runDtSweep() {
  setStatus('');
  const x0 = readNumber(x0Input, { name: 'x₀' });
  const v0 = readNumber(v0Input, { name: 'v₀' });
  const a = readNumber(accInput, { name: 'a' });
  const dtMax = readNumber(dtSweepInput, { name: 'Δt (max)', min: 0.01 });
  if (x0 === null || v0 === null || a === null || dtMax === null) return;

  const T = 10;
  dtSweepHistory = [];
  for (let dt = 0.02; dt <= dtMax + 1e-9; dt += 0.02) {
    const err = simulateEulerError({ x0, v0, a, dt, T });
    dtSweepHistory.push({ dt: Number(dt.toFixed(3)), err });
  }
  drawErrorDt();
}

// ================= EVENT HANDLERS =================
function updateStartButton() {
  if (running) startBtn.textContent = 'Pause';
  else if (hasRun) startBtn.textContent = 'Resume';
  else startBtn.textContent = 'Start';
}

startBtn.addEventListener('click', () => {
  if (running) {
    running = false;
    if (animationId) cancelAnimationFrame(animationId);
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
  if (animationId) cancelAnimationFrame(animationId);
  initSimulation();
  updateStartButton();
});

if (clearDataBtn) {
  clearDataBtn.addEventListener('click', () => {
    running = false;
    if (animationId) cancelAnimationFrame(animationId);
    initSimulation();
    updateStartButton();
  });
}

exportBtn.addEventListener('click', () => {
  let csv = 't,x_numeric,x_exact,error\n';
  history.forEach(d => {
    csv += `${d.t},${d.xNum},${d.xExact},${d.error}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'motion_simulation.csv';
  a.click();
});

if (runDtSweepBtn) {
  runDtSweepBtn.addEventListener('click', runDtSweep);
}

// ================= STARTUP =================
initSimulation();
updateStartButton();
// ================= LAB REPORT GENERATOR =================
const genReportBtn = document.getElementById('genReportBtn');
const reportPreview = document.getElementById('reportPreview');

if (genReportBtn) {
  genReportBtn.addEventListener('click', () => {
    if (history.length === 0) {
      alert('Run the simulation before generating the report.');
      return;
    }

    const name = document.getElementById('studentName').value || 'N/A';
    const id = document.getElementById('studentId').value || 'N/A';
    const obs = document.getElementById('studentObs').value || '—';

    const last = history[history.length - 1];
    const maxError = Math.max(...history.map(d => Math.abs(d.error)));

    const report =
`COSMIC PHYSICS LAB

1D Motion Simulation

Student Name: ${name}
Student ID: ${id}

--- Initial Conditions ---
x0 = ${x0Input.value}
v0 = ${v0Input.value}
a  = ${accInput.value}
Δt = ${dtInput.value}

--- Numerical Method ---
Euler Forward Method

--- Observations ---
${obs}

--- Results ---
Final time t = ${last.t.toFixed(2)}
Final numerical x = ${last.xNum.toFixed(4)}
Final exact x = ${last.xExact.toFixed(4)}
Maximum absolute error = ${maxError.toExponential(3)}

--- Conclusion ---
The Euler method accumulates error over time. Smaller Δt reduces error but increases computation cost.

Signature:
`;

    reportPreview.innerText = report;

    const blob = new Blob([report], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Motion_Simulation_Report.txt';
    a.click();
  });
}
// ================= INSTRUCTOR MODE =================
const instructorToggle = document.getElementById('instructorToggle');

if (instructorToggle) {
  instructorToggle.addEventListener('change', () => {
    const instructorBlocks = document.querySelectorAll('.instructor-only');
    instructorBlocks.forEach(block => {
      block.style.display = instructorToggle.checked ? 'block' : 'none';
    });
  });
}
