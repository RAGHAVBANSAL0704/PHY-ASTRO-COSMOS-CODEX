// labs/lab10_photoelectric.js
// Photoelectric effect: threshold and I–V curve

const phiInput = document.getElementById('phi');
const inputMode = document.getElementById('inputMode');
const freqInput = document.getElementById('freq');
const lambdaInput = document.getElementById('lambda');
const intensityInput = document.getElementById('intensity');
const vRangeInput = document.getElementById('vRange');
const runBtn = document.getElementById('runBtn');
const exportBtn = document.getElementById('exportBtn');
const statusMsg = document.getElementById('statusMsg');
const resultText = document.getElementById('resultText');

const ivCanvas = document.getElementById('ivCanvas');
const ctx = ivCanvas.getContext('2d');

const h_eVs = 4.135667696e-15; // eV*s
const c = 299792458; // m/s

let curve = [];

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

function syncInputs() {
  if (inputMode.value === 'freq') {
    freqInput.disabled = false;
    lambdaInput.disabled = true;
  } else {
    freqInput.disabled = true;
    lambdaInput.disabled = false;
  }
}

function compute() {
  setStatus('');
  const phi = readNumber(phiInput, { name: 'φ', min: 0.01 });
  const intensity = readNumber(intensityInput, { name: 'Intensity', min: 1 });
  const vRange = readNumber(vRangeInput, { name: 'Voltage range', min: 0.1 });
  if (phi === null || intensity === null || vRange === null) return;

  let f;
  let lambda;

  if (inputMode.value === 'freq') {
    const fTHz = readNumber(freqInput, { name: 'Frequency', min: 1 });
    if (fTHz === null) return;
    f = fTHz * 1e12;
    lambda = c / f;
    lambdaInput.value = (lambda * 1e9).toFixed(1);
  } else {
    const lambdaNm = readNumber(lambdaInput, { name: 'Wavelength', min: 1 });
    if (lambdaNm === null) return;
    lambda = lambdaNm * 1e-9;
    f = c / lambda;
    freqInput.value = (f / 1e12).toFixed(1);
  }

  const Kmax = h_eVs * f - phi; // eV
  const Vs = Math.max(0, Kmax); // volts when eV
  const f0 = phi / h_eVs;
  const lambda0 = c / f0;

  const I0 = intensity;
  const samples = 200;
  curve = [];
  for (let i = 0; i <= samples; i++) {
    const V = -vRange + (2 * vRange * i) / samples;
    let I;
    if (Vs <= 0) {
      I = 0;
    } else if (V < 0) {
      I = I0;
    } else if (V <= Vs) {
      I = I0 * (1 - V / Vs);
    } else {
      I = 0;
    }
    curve.push({ V, I });
  }

  drawCurve(vRange, I0);

  resultText.textContent = `Kmax = ${Kmax.toFixed(3)} eV,  Vs = ${Vs.toFixed(3)} V,  f0 = ${(f0 / 1e12).toFixed(2)} THz,  λ0 = ${(lambda0 * 1e9).toFixed(1)} nm`;
}

function drawCurve(vRange, I0) {
  ctx.clearRect(0, 0, ivCanvas.width, ivCanvas.height);

  const w = ivCanvas.width;
  const h = ivCanvas.height;

  // Axes
  ctx.strokeStyle = '#555';
  ctx.beginPath();
  ctx.moveTo(40, 10);
  ctx.lineTo(40, h - 30);
  ctx.lineTo(w - 10, h - 30);
  ctx.stroke();

  if (curve.length < 2) return;

  const yMax = Math.max(I0, 1);

  ctx.strokeStyle = '#4fd1c5';
  ctx.beginPath();
  curve.forEach((d, i) => {
    const x = 40 + ((d.V + vRange) / (2 * vRange)) * (w - 60);
    const y = h - 30 - (d.I / yMax) * (h - 50);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

runBtn.addEventListener('click', compute);
inputMode.addEventListener('change', () => {
  syncInputs();
  compute();
});

exportBtn.addEventListener('click', () => {
  if (curve.length === 0) {
    setStatus('Generate the I–V curve before exporting.', true);
    return;
  }
  let csv = 'V,I\n';
  curve.forEach(d => {
    csv += `${d.V},${d.I}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lab10_photoelectric_iv.csv';
  a.click();
});

syncInputs();
compute();
