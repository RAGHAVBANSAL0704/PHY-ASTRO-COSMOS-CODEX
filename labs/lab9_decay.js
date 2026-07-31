// labs/lab9_decay.js
// Radioactive decay: deterministic vs stochastic

const modeSelect = document.getElementById('mode');
const halfLifeInput = document.getElementById('halfLife');
const N0Input = document.getElementById('N0');
const dtInput = document.getElementById('dt');
const TInput = document.getElementById('T');
const simModeSelect = document.getElementById('simMode');
const speedInput = document.getElementById('speed');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const clearDataBtn = document.getElementById('clearDataBtn');
const exportBtn = document.getElementById('exportBtn');
const statusMsg = document.getElementById('statusMsg');

const nCanvas = document.getElementById('nCanvas');
const aCanvas = document.getElementById('aCanvas');
const resCanvas = document.getElementById('resCanvas');
const nctx = nCanvas.getContext('2d');
const actx = aCanvas.getContext('2d');
const rctx = resCanvas.getContext('2d');

let running = false;
let animId = null;
let history = [];
let t = 0;
let N = 0;
let NInitial = 0;
let lambda = 0;
let hasRun = false;

const MAX_POINTS = 2000;

function setStatus(message, isError = false) {
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

function updateHalfLifePreset() {
  const mode = modeSelect.value;
  if (mode === 'alpha') halfLifeInput.value = '5';
  else if (mode === 'beta') halfLifeInput.value = '15';
  else if (mode === 'gamma') halfLifeInput.value = '40';
}

function initSimulation() {
  setStatus('');
  const halfLife = readNumber(halfLifeInput, { name: 'T½', min: 1e-6 });
  const N0 = readNumber(N0Input, { name: 'N₀', min: 1 });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  const T = readNumber(TInput, { name: 'Total Time', min: dt });
  if (halfLife === null || N0 === null || dt === null || T === null) return false;

  lambda = Math.log(2) / halfLife;
  N = N0;
  NInitial = N0;
  t = 0;
  history = [{ t: 0, N: N0, A: lambda * N0 }];
  clearCanvases();
  drawPlots();
  hasRun = false;
  return true;
}

function clearCanvases() {
  nctx.clearRect(0, 0, nCanvas.width, nCanvas.height);
  actx.clearRect(0, 0, aCanvas.width, aCanvas.height);
  rctx.clearRect(0, 0, resCanvas.width, resCanvas.height);
}

function poissonSample(mean) {
  if (mean <= 0) return 0;
  if (mean < 30) {
    const L = Math.exp(-mean);
    let k = 0;
    let p = 1;
    do {
      k += 1;
      p *= Math.random();
    } while (p > L);
    return k - 1;
  }
  // Normal approximation for large mean
  const std = Math.sqrt(mean);
  const u = Math.random();
  const v = Math.random();
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.max(0, Math.round(mean + std * z));
}

function stepOnce(dt, T) {
  if (t >= T) return false;

  const p = 1 - Math.exp(-lambda * dt);
  let decays = 0;

  if (simModeSelect.value === 'stoch') {
    decays = poissonSample(N * p);
  } else {
    decays = N * p;
  }

  decays = Math.min(N, decays);
  N = N - decays;
  t += dt;

  const A = lambda * N;
  history.push({ t, N, A });
  if (history.length > MAX_POINTS) history.shift();
  return true;
}

function drawAxes(ctx) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.strokeStyle = '#555';
  ctx.beginPath();
  ctx.moveTo(40, 10);
  ctx.lineTo(40, h - 30);
  ctx.lineTo(w - 10, h - 30);
  ctx.stroke();
}

function drawSeries(ctx, series, color, yMax, yMin = 0) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const tMax = Math.max(series[series.length - 1].t, 1);
  const yRange = Math.max(1e-9, yMax - yMin);
  ctx.strokeStyle = color;
  ctx.beginPath();
  series.forEach((d, i) => {
    const x = 40 + (d.t / tMax) * (w - 60);
    const y = h - 30 - ((d.val - yMin) / yRange) * (h - 50);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function drawPlots() {
  const tMax = history[history.length - 1].t || 1;
  const nMax = Math.max(...history.map(d => d.N)) || 1;
  const aMax = Math.max(...history.map(d => d.A)) || 1;
  const residuals = history.map(d => ({
    t: d.t,
    val: d.N - NInitial * Math.exp(-lambda * d.t)
  }));
  const rMin = Math.min(...residuals.map(d => d.val), -1);
  const rMax = Math.max(...residuals.map(d => d.val), 1);

  nctx.clearRect(0, 0, nCanvas.width, nCanvas.height);
  actx.clearRect(0, 0, aCanvas.width, aCanvas.height);
  rctx.clearRect(0, 0, resCanvas.width, resCanvas.height);

  drawAxes(nctx);
  drawAxes(actx);
  drawAxes(rctx);
  drawSeries(nctx, history.map(d => ({ t: d.t, val: d.N })), '#4fd1c5', nMax);
  drawSeries(actx, history.map(d => ({ t: d.t, val: d.A })), '#ffa502', aMax);
  drawSeries(rctx, residuals, '#ff6b6b', rMax, rMin);

  nctx.fillStyle = '#e6e9ff';
  nctx.fillText(`t = ${tMax.toFixed(2)} s`, 10, 20);
  actx.fillStyle = '#e6e9ff';
  actx.fillText(`t = ${tMax.toFixed(2)} s`, 10, 20);
  rctx.fillStyle = '#e6e9ff';
  rctx.fillText('simulation - theory', 10, 20);
}

function step() {
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  const T = readNumber(TInput, { name: 'Total Time', min: dt || 1e-6 });
  if (dt === null || T === null) return;

  const steps = Math.max(1, parseInt(speedInput.value, 10));
  for (let i = 0; i < steps; i++) {
    if (!stepOnce(dt, T)) {
      running = false;
      updateStartButton();
      break;
    }
  }

  drawPlots();

  if (running) animId = requestAnimationFrame(step);
}

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

clearDataBtn.addEventListener('click', () => {
  running = false;
  if (animId) cancelAnimationFrame(animId);
  initSimulation();
  updateStartButton();
});

exportBtn.addEventListener('click', () => {
  if (history.length === 0) {
    setStatus('Run the simulation before exporting.', true);
    return;
  }
  let csv = 't,N,Activity\n';
  history.forEach(d => {
    csv += `${d.t},${d.N},${d.A}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lab9_decay.csv';
  a.click();
});

modeSelect.addEventListener('change', () => {
  if (modeSelect.value !== 'custom') updateHalfLifePreset();
});

initSimulation();
updateStartButton();
