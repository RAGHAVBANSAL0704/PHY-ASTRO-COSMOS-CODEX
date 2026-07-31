// labs/lab12_diffusion.js
// 1D random walk and diffusion

const NInput = document.getElementById('N');
const stepInput = document.getElementById('step');
const dtInput = document.getElementById('dt');
const totalStepsInput = document.getElementById('totalSteps');
const speedInput = document.getElementById('speed');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const clearDataBtn = document.getElementById('clearDataBtn');
const exportBtn = document.getElementById('exportBtn');
const statusMsg = document.getElementById('statusMsg');

const histCanvas = document.getElementById('histCanvas');
const msdCanvas = document.getElementById('msdCanvas');
const hctx = histCanvas.getContext('2d');
const mctx = msdCanvas.getContext('2d');

let running = false;
let animId = null;
let positions = [];
let stepCount = 0;
let msdHistory = [];
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
  const N = readNumber(NInput, { name: 'N', min: 2 });
  const stepSize = readNumber(stepInput, { name: 'ℓ', min: 1e-6 });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  const totalSteps = readNumber(totalStepsInput, { name: 'Total Steps', min: 1 });
  if (N === null || stepSize === null || dt === null || totalSteps === null) return false;

  positions = new Array(N).fill(0);
  stepCount = 0;
  msdHistory = [{ t: 0, msd: 0, theory: 0 }];
  clearCanvases();
  drawHistogram();
  drawMSD();
  hasRun = false;
  return true;
}

function clearCanvases() {
  hctx.clearRect(0, 0, histCanvas.width, histCanvas.height);
  mctx.clearRect(0, 0, msdCanvas.width, msdCanvas.height);
}

function computeMSD(stepSize, dt) {
  let sum = 0;
  positions.forEach(x => {
    sum += x * x;
  });
  const msd = sum / positions.length;
  const D = (stepSize * stepSize) / (2 * dt);
  const t = stepCount * dt;
  const theory = 2 * D * t;
  return { t, msd, theory };
}

function drawHistogram() {
  const w = histCanvas.width;
  const h = histCanvas.height;
  hctx.clearRect(0, 0, w, h);

  const bins = 30;
  const minX = Math.min(...positions);
  const maxX = Math.max(...positions);
  if (Math.abs(maxX - minX) < 1e-9) {
    hctx.strokeStyle = '#555';
    hctx.beginPath();
    hctx.moveTo(30, 10);
    hctx.lineTo(30, h - 20);
    hctx.lineTo(w - 10, h - 20);
    hctx.stroke();
    hctx.fillStyle = '#4fd1c5';
    hctx.fillRect(w / 2 - 12, h * 0.24, 24, h * 0.66);
    return;
  }
  const range = Math.max(1e-6, maxX - minX);
  const binWidth = range / bins;
  const counts = new Array(bins).fill(0);

  positions.forEach(x => {
    const idx = Math.min(bins - 1, Math.floor((x - minX) / binWidth));
    counts[idx] += 1;
  });

  const maxCount = Math.max(...counts) || 1;
  const barWidth = (w - 40) / bins;

  hctx.fillStyle = '#4fd1c5';
  for (let i = 0; i < bins; i++) {
    const barHeight = (counts[i] / maxCount) * (h - 40);
    const x = 30 + i * barWidth;
    const y = h - 20 - barHeight;
    hctx.fillRect(x, y, barWidth - 2, barHeight);
  }
}

function drawMSD() {
  const w = msdCanvas.width;
  const h = msdCanvas.height;
  mctx.clearRect(0, 0, w, h);

  const tMax = msdHistory[msdHistory.length - 1].t || 1;
  const yMax = Math.max(...msdHistory.map(d => Math.max(d.msd, d.theory))) || 1;

  const tx = (w - 60) / tMax;
  const ty = (h - 50) / yMax;

  function plot(values, color) {
    mctx.strokeStyle = color;
    mctx.beginPath();
    values.forEach((d, i) => {
      const x = 40 + d.t * tx;
      const y = h - 30 - d.val * ty;
      if (i === 0) mctx.moveTo(x, y);
      else mctx.lineTo(x, y);
    });
    mctx.stroke();
  }

  plot(msdHistory.map(d => ({ t: d.t, val: d.msd })), '#ffa502');
  plot(msdHistory.map(d => ({ t: d.t, val: d.theory })), '#7bed9f');

  mctx.strokeStyle = '#555';
  mctx.beginPath();
  mctx.moveTo(40, 10);
  mctx.lineTo(40, h - 30);
  mctx.lineTo(w - 10, h - 30);
  mctx.stroke();
}

function step() {
  const N = readNumber(NInput, { name: 'N', min: 2 });
  const stepSize = readNumber(stepInput, { name: 'ℓ', min: 1e-6 });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  const totalSteps = readNumber(totalStepsInput, { name: 'Total Steps', min: 1 });
  if (N === null || stepSize === null || dt === null || totalSteps === null) return;

  const stepsPerFrame = Math.max(1, parseInt(speedInput.value, 10));
  for (let k = 0; k < stepsPerFrame; k++) {
    if (stepCount >= totalSteps) {
      running = false;
      updateStartButton();
      break;
    }

    for (let i = 0; i < positions.length; i++) {
      positions[i] += Math.random() < 0.5 ? -stepSize : stepSize;
    }
    stepCount += 1;

    const msd = computeMSD(stepSize, dt);
    msdHistory.push(msd);
    if (msdHistory.length > MAX_POINTS) msdHistory.shift();
  }

  drawHistogram();
  drawMSD();

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
  if (msdHistory.length === 0) {
    setStatus('Run the simulation before exporting.', true);
    return;
  }
  let csv = 't,msd,theory\n';
  msdHistory.forEach(d => {
    csv += `${d.t},${d.msd},${d.theory}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lab12_diffusion_msd.csv';
  a.click();
});

initSimulation();
updateStartButton();
