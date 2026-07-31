// labs/lab13_wave.js
// 1D wave equation using finite differences

const NInput = document.getElementById('N');
const LInput = document.getElementById('L');
const cInput = document.getElementById('c');
const dtInput = document.getElementById('dt');
const dampingInput = document.getElementById('damping');
const initShapeSelect = document.getElementById('initShape');
const speedInput = document.getElementById('speed');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const clearDataBtn = document.getElementById('clearDataBtn');
const statusMsg = document.getElementById('statusMsg');

const waveCanvas = document.getElementById('waveCanvas');
const energyCanvas = document.getElementById('energyCanvas');
const wctx = waveCanvas.getContext('2d');
const ectx = energyCanvas.getContext('2d');

let running = false;
let animId = null;
let uPrev = [];
let uCurr = [];
let uNext = [];
let t = 0;
let energyHistory = [];
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

function initializeField(N, shape) {
  const arr = new Array(N).fill(0);
  if (shape === 'pluck') {
    const mid = Math.floor(N / 2);
    for (let i = 0; i < N; i++) {
      const x = i <= mid ? i / mid : (N - 1 - i) / (N - 1 - mid);
      arr[i] = x;
    }
  } else {
    const sigma = N / 12;
    const mu = N / 2;
    for (let i = 0; i < N; i++) {
      const z = (i - mu) / sigma;
      arr[i] = Math.exp(-0.5 * z * z);
    }
  }
  return arr;
}

function initSimulation() {
  setStatus('');
  const N = readNumber(NInput, { name: 'N', min: 20 });
  const L = readNumber(LInput, { name: 'L', min: 0.1 });
  const c = readNumber(cInput, { name: 'c', min: 0.01 });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  const damping = readNumber(dampingInput, { name: 'damping', min: 0 });
  if (N === null || L === null || c === null || dt === null || damping === null) return false;

  const dx = L / (N - 1);
  const s = (c * dt) / dx;
  if (s > 1) {
    setStatus(`Stability warning: cΔt/Δx = ${s.toFixed(2)} > 1. Reduce Δt or increase N.`, true);
  }

  uCurr = initializeField(N, initShapeSelect.value);
  uPrev = [...uCurr];
  uNext = new Array(N).fill(0);
  t = 0;
  energyHistory = [{ t: 0, E: computeEnergy(uCurr, uPrev, c, dt, dx) }];
  clearCanvases();
  drawWave();
  drawEnergy();
  hasRun = false;
  return true;
}

function computeEnergy(u, uPrevLocal, c, dt, dx) {
  let KE = 0;
  let PE = 0;
  for (let i = 1; i < u.length - 1; i++) {
    const ut = (u[i] - uPrevLocal[i]) / dt;
    const ux = (u[i + 1] - u[i - 1]) / (2 * dx);
    KE += 0.5 * ut * ut;
    PE += 0.5 * c * c * ux * ux;
  }
  return (KE + PE) * dx;
}

function drawWave() {
  const w = waveCanvas.width;
  const h = waveCanvas.height;
  wctx.clearRect(0, 0, w, h);

  const maxA = Math.max(...uCurr.map(v => Math.abs(v))) || 1;
  const sx = (w - 40) / (uCurr.length - 1);
  const sy = (h - 40) / (2 * maxA);

  wctx.strokeStyle = '#4fd1c5';
  wctx.beginPath();
  uCurr.forEach((val, i) => {
    const x = 20 + i * sx;
    const y = h / 2 - val * sy;
    if (i === 0) wctx.moveTo(x, y);
    else wctx.lineTo(x, y);
  });
  wctx.stroke();
}

function drawEnergy() {
  const w = energyCanvas.width;
  const h = energyCanvas.height;
  ectx.clearRect(0, 0, w, h);

  if (energyHistory.length < 2) return;

  const tMax = energyHistory[energyHistory.length - 1].t || 1;
  const eMax = Math.max(...energyHistory.map(d => d.E)) || 1;

  const tx = (w - 60) / tMax;
  const ey = (h - 50) / eMax;

  ectx.strokeStyle = '#ffa502';
  ectx.beginPath();
  energyHistory.forEach((d, i) => {
    const x = 40 + d.t * tx;
    const y = h - 30 - d.E * ey;
    if (i === 0) ectx.moveTo(x, y);
    else ectx.lineTo(x, y);
  });
  ectx.stroke();

  ectx.strokeStyle = '#555';
  ectx.beginPath();
  ectx.moveTo(40, 10);
  ectx.lineTo(40, h - 30);
  ectx.lineTo(w - 10, h - 30);
  ectx.stroke();
}

function step() {
  const N = readNumber(NInput, { name: 'N', min: 20 });
  const L = readNumber(LInput, { name: 'L', min: 0.1 });
  const c = readNumber(cInput, { name: 'c', min: 0.01 });
  const dt = readNumber(dtInput, { name: 'Δt', min: 1e-6 });
  const damping = readNumber(dampingInput, { name: 'damping', min: 0 });
  if (N === null || L === null || c === null || dt === null || damping === null) return;

  const dx = L / (N - 1);
  const s2 = (c * dt / dx) ** 2;
  const steps = Math.max(1, parseInt(speedInput.value, 10));

  for (let k = 0; k < steps; k++) {
    for (let i = 1; i < N - 1; i++) {
      uNext[i] = (2 - damping) * uCurr[i] - (1 - damping) * uPrev[i] + s2 * (uCurr[i + 1] - 2 * uCurr[i] + uCurr[i - 1]);
    }
    uNext[0] = 0;
    uNext[N - 1] = 0;

    uPrev = uCurr;
    uCurr = uNext;
    uNext = new Array(N).fill(0);
    t += dt;

    energyHistory.push({ t, E: computeEnergy(uCurr, uPrev, c, dt, dx) });
    if (energyHistory.length > MAX_POINTS) energyHistory.shift();
  }

  drawWave();
  drawEnergy();

  if (running) animId = requestAnimationFrame(step);
}

function clearCanvases() {
  wctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
  ectx.clearRect(0, 0, energyCanvas.width, energyCanvas.height);
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

initSimulation();
updateStartButton();
