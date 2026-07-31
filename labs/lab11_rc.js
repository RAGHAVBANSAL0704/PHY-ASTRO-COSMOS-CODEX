// labs/lab11_rc.js
// RC circuit: charging/discharging analytic response

const RInput = document.getElementById('R');
const CInput = document.getElementById('C');
const V0Input = document.getElementById('V0');
const modeSelect = document.getElementById('mode');
const dtInput = document.getElementById('dt');
const TInput = document.getElementById('T');
const speedInput = document.getElementById('speed');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const clearDataBtn = document.getElementById('clearDataBtn');
const exportBtn = document.getElementById('exportBtn');
const statusMsg = document.getElementById('statusMsg');

const vCanvas = document.getElementById('vCanvas');
const iCanvas = document.getElementById('iCanvas');
const vctx = vCanvas.getContext('2d');
const ictx = iCanvas.getContext('2d');

let running = false;
let animId = null;
let history = [];
let t = 0;
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

function initSimulation() {
  setStatus('');
  const R = readNumber(RInput, { name: 'R', min: 1e-6 });
  const C = readNumber(CInput, { name: 'C', min: 1e-9 });
  const V0 = readNumber(V0Input, { name: 'V₀', min: 0 });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  const T = readNumber(TInput, { name: 'Total Time', min: dt || 1e-6 });
  if (R === null || C === null || V0 === null || dt === null || T === null) return false;

  history = [{ t: 0, V: modeSelect.value === 'charge' ? 0 : V0, I: V0 / R }];
  t = 0;
  clearCanvases();
  drawPlots();
  hasRun = false;
  return true;
}

function clearCanvases() {
  vctx.clearRect(0, 0, vCanvas.width, vCanvas.height);
  ictx.clearRect(0, 0, iCanvas.width, iCanvas.height);
}

function computeState(time, R, C, V0) {
  const tau = R * C;
  if (modeSelect.value === 'charge') {
    const V = V0 * (1 - Math.exp(-time / tau));
    const I = (V0 / R) * Math.exp(-time / tau);
    return { V, I };
  }
  const V = V0 * Math.exp(-time / tau);
  const I = -(V0 / R) * Math.exp(-time / tau);
  return { V, I };
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
  const vMax = Math.max(...history.map(d => Math.abs(d.V))) || 1;
  const iAbsMax = Math.max(...history.map(d => Math.abs(d.I))) || 1;

  vctx.clearRect(0, 0, vCanvas.width, vCanvas.height);
  ictx.clearRect(0, 0, iCanvas.width, iCanvas.height);

  drawAxes(vctx);
  drawAxes(ictx);
  drawSeries(vctx, history.map(d => ({ t: d.t, val: d.V })), '#4fd1c5', vMax);
  drawSeries(ictx, history.map(d => ({ t: d.t, val: d.I })), '#ffa502', iAbsMax, -iAbsMax);

  vctx.fillStyle = '#e6e9ff';
  vctx.fillText(`t = ${tMax.toFixed(2)} s`, 10, 20);
  ictx.fillStyle = '#e6e9ff';
  ictx.fillText(`t = ${tMax.toFixed(2)} s`, 10, 20);
}

function step() {
  const R = readNumber(RInput, { name: 'R', min: 1e-6 });
  const C = readNumber(CInput, { name: 'C', min: 1e-9 });
  const V0 = readNumber(V0Input, { name: 'V₀', min: 0 });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  const T = readNumber(TInput, { name: 'Total Time', min: dt || 1e-6 });
  if (R === null || C === null || V0 === null || dt === null || T === null) return;

  const steps = Math.max(1, parseInt(speedInput.value, 10));
  for (let i = 0; i < steps; i++) {
    if (t >= T) {
      running = false;
      updateStartButton();
      break;
    }
    t += dt;
    const { V, I } = computeState(t, R, C, V0);
    history.push({ t, V, I });
    if (history.length > MAX_POINTS) history.shift();
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
  let csv = 't,V,I\n';
  history.forEach(d => {
    csv += `${d.t},${d.V},${d.I}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lab11_rc.csv';
  a.click();
});

modeSelect.addEventListener('change', () => {
  if (!running) {
    initSimulation();
    updateStartButton();
  }
});

initSimulation();
updateStartButton();
