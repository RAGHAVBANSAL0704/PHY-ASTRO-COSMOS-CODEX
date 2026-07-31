// labs/lab7_lyapunov.js
// Lab 7: Manual Lyapunov Exponent Estimation
// Uses separation data exported from Lab 4 (paste-in workflow)

// ================= DOM =================
const t1Input = document.getElementById('t1');
const t2Input = document.getElementById('t2');
const computeBtn = document.getElementById('computeBtn');
const lambdaOut = document.getElementById('lambdaOut');
const dataInput = document.getElementById('dataInput');
const loadDataBtn = document.getElementById('loadDataBtn');
const statusMsg = document.getElementById('statusMsg');
const resetDataBtn = document.getElementById('resetDataBtn');

const canvas = document.getElementById('lyapCanvas');
const ctx = canvas.getContext('2d');

// ================= DATA =================
// Example separation data (students paste or load from Lab 4 CSV later)
// Format: { t, sep }
const defaultData = [
  { t: 0, sep: 1e-6 },
  { t: 1, sep: 1.8e-6 },
  { t: 2, sep: 3.3e-6 },
  { t: 3, sep: 6.1e-6 },
  { t: 4, sep: 1.1e-5 },
  { t: 5, sep: 2.0e-5 },
  { t: 6, sep: 3.7e-5 },
  { t: 7, sep: 6.7e-5 },
  { t: 8, sep: 1.2e-4 },
  { t: 9, sep: 2.2e-4 },
  { t: 10, sep: 4.0e-4 }
];
let data = [...defaultData];

function setStatus(message, isError = false) {
  if (!statusMsg) return;
  statusMsg.textContent = message || '';
  statusMsg.classList.toggle('status-error', Boolean(isError));
}

// ================= DRAW =================
function drawPlot() {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  if (data.length < 2) return;

  const tMin = Math.min(...data.map(d => d.t));
  const tMax = Math.max(...data.map(d => d.t));
  const logValues = data.map(d => Math.log(d.sep));
  const logMin = Math.min(...logValues);
  const logMax = Math.max(...logValues);
  const tRange = Math.max(1e-9, tMax - tMin);
  const logRange = Math.max(1e-9, logMax - logMin);

  ctx.strokeStyle = '#555';
  ctx.beginPath();
  ctx.moveTo(30, 10);
  ctx.lineTo(30, h - 20);
  ctx.lineTo(w - 10, h - 20);
  ctx.stroke();

  ctx.strokeStyle = '#4fd1c5';
  ctx.beginPath();

  data.forEach((d, i) => {
    const x = 30 + ((d.t - tMin) / tRange) * (w - 40);
    const y = h - 20 - ((Math.log(d.sep) - logMin) / logRange) * (h - 40);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();

  ctx.fillStyle = '#e6e9ff';
  ctx.fillText('ln(separation)', 10, 18);
}

// ================= COMPUTE =================
function computeLambda() {
  const t1 = parseFloat(t1Input.value);
  const t2 = parseFloat(t2Input.value);

  if (!Number.isFinite(t1) || !Number.isFinite(t2) || t2 <= t1) {
    setStatus('Please enter a valid time window where t₂ > t₁.', true);
    return;
  }

  const d1 = data.find(d => d.t >= t1);
  const d2 = data.find(d => d.t >= t2);

  if (!d1 || !d2) {
    setStatus('Time window is outside the data range.', true);
    return;
  }

  const lambda = (Math.log(d2.sep) - Math.log(d1.sep)) / (d2.t - d1.t);
  lambdaOut.textContent = `Estimated Lyapunov exponent λ ≈ ${lambda.toFixed(4)}`;
  setStatus('');
}

// ================= EVENTS =================
computeBtn.addEventListener('click', computeLambda);
if (loadDataBtn) {
  loadDataBtn.addEventListener('click', () => {
    const raw = (dataInput.value || '').trim();
    if (!raw) {
      setStatus('Paste CSV data first (t,sep per line).', true);
      return;
    }
    const rows = raw.split('\n').map(r => r.trim()).filter(Boolean);
    const parsed = [];
    rows.forEach(line => {
      const [tStr, sStr] = line.split(',');
      const t = parseFloat(tStr);
      const sep = parseFloat(sStr);
      if (Number.isFinite(t) && Number.isFinite(sep) && sep > 0) {
        parsed.push({ t, sep });
      }
    });
    if (parsed.length < 2) {
      setStatus('Could not parse enough valid rows. Use "t,sep" format.', true);
      return;
    }
    parsed.sort((a, b) => a.t - b.t);
    data = parsed;
    drawPlot();
    setStatus(`Loaded ${data.length} points.`, false);
  });
}

if (resetDataBtn) {
  resetDataBtn.addEventListener('click', () => {
    data = [...defaultData];
    drawPlot();
    lambdaOut.textContent = '';
    setStatus('Reset to example dataset.', false);
  });
}

// ================= STARTUP =================
drawPlot();
