// labs/lab5_iss.js
// Lab 5: ISS Orbit & Earth Ground Track
// Mode A: Educational Kepler + Earth rotation (implemented)
// Mode B: SGP4 (hook placeholder for later)

// ================= DOM =================
const tleInput = document.getElementById('tleInput');
const loadBtn = document.getElementById('loadTLE');
const toggleBtn = document.getElementById('toggleRun');
const resetBtn = document.getElementById('resetBtn');
const clearDataBtn = document.getElementById('clearDataBtn');
const statusMsg = document.getElementById('statusMsg');
const speedInput = document.getElementById('speed');
const earthCanvas = document.getElementById('earthCanvas');
const groundCanvas = document.getElementById('groundCanvas');
const ectx = earthCanvas.getContext('2d');
const gctx = groundCanvas.getContext('2d');

// ================= CONSTANTS =================
const MU_EARTH = 398600.4418; // km^3/s^2
const R_EARTH = 6378.137;     // km
const OMEGA_EARTH = 7.2921159e-5; // rad/s

// ================= STATE =================
let elements = null; // parsed orbital elements
let t = 0;
let dt = 10; // seconds per step
let animId = null;
let running = false;
let groundTrack = [];
let hasData = false;

function setStatus(message, isError = false) {
  if (!statusMsg) return;
  statusMsg.textContent = message || '';
  statusMsg.classList.toggle('status-error', Boolean(isError));
}

// ================= TLE PARSER (EDUCATIONAL) =================
function parseTLE(tle) {
  const lines = tle.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;

  const l1 = lines.length >= 3 ? lines[1] : lines[0];
  const l2 = lines.length >= 3 ? lines[2] : lines[1];

  const inc = parseFloat(l2.slice(8, 16)) * Math.PI / 180;
  const raan = parseFloat(l2.slice(17, 25)) * Math.PI / 180;
  const ecc = parseFloat('0.' + l2.slice(26, 33));
  const argp = parseFloat(l2.slice(34, 42)) * Math.PI / 180;
  const M0 = parseFloat(l2.slice(43, 51)) * Math.PI / 180;
  const n = parseFloat(l2.slice(52, 63));

  if (![inc, raan, ecc, argp, M0, n].every(Number.isFinite)) return null;

  const n_rad = n * 2 * Math.PI / 86400;                     // rad/s
  const a = Math.pow(MU_EARTH / (n_rad * n_rad), 1 / 3);     // semi-major axis

  return { inc, raan, ecc, argp, M0, n_rad, a };
}

// ================= KEPLER SOLVER =================
function solveKepler(M, e) {
  let E = M;
  for (let i = 0; i < 10; i++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }
  return E;
}

// ================= ORBIT PROPAGATION =================
function propagateKepler(el, time) {
  const M = el.M0 + el.n_rad * time;
  const E = solveKepler(M, el.ecc);

  const x_orb = el.a * (Math.cos(E) - el.ecc);
  const y_orb = el.a * Math.sqrt(1 - el.ecc * el.ecc) * Math.sin(E);

  const cosO = Math.cos(el.raan), sinO = Math.sin(el.raan);
  const cosi = Math.cos(el.inc), sini = Math.sin(el.inc);
  const cosw = Math.cos(el.argp), sinw = Math.sin(el.argp);

  // Perifocal -> ECI
  const x = (cosO * cosw - sinO * sinw * cosi) * x_orb + (-cosO * sinw - sinO * cosw * cosi) * y_orb;
  const y = (sinO * cosw + cosO * sinw * cosi) * x_orb + (-sinO * sinw + cosO * cosw * cosi) * y_orb;
  const z = (sinw * sini) * x_orb + (cosw * sini) * y_orb;

  return { x, y, z };
}

// ================= ECI -> LAT/LON =================
function eciToLatLon(pos, time) {
  const theta = OMEGA_EARTH * time;
  const x = Math.cos(theta) * pos.x + Math.sin(theta) * pos.y;
  const y = -Math.sin(theta) * pos.x + Math.cos(theta) * pos.y;
  const z = pos.z;

  const r = Math.sqrt(x * x + y * y + z * z);
  const lat = Math.asin(z / r);
  const lon = Math.atan2(y, x);

  return { lat, lon };
}

// ================= DRAWING =================
function drawEarthOrbit(pos) {
  const w = earthCanvas.width;
  const h = earthCanvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 0.03;

  ectx.clearRect(0, 0, w, h);

  // Orbital reference ring
  ectx.strokeStyle = 'rgba(79, 209, 197, 0.28)';
  ectx.lineWidth = 1;
  ectx.beginPath();
  ectx.arc(cx, cy, elements ? elements.a * scale : (R_EARTH + 420) * scale, 0, Math.PI * 2);
  ectx.stroke();

  // Earth
  const earthGradient = ectx.createRadialGradient(cx - 16, cy - 18, 10, cx, cy, R_EARTH * scale);
  earthGradient.addColorStop(0, '#8bd3ff');
  earthGradient.addColorStop(0.45, '#2d8cff');
  earthGradient.addColorStop(1, '#0b3f91');
  ectx.fillStyle = '#2d8cff';
  ectx.beginPath();
  ectx.arc(cx, cy, R_EARTH * scale, 0, Math.PI * 2);
  ectx.fillStyle = earthGradient;
  ectx.fill();

  // ISS
  ectx.fillStyle = '#ff6b6b';
  ectx.beginPath();
  ectx.arc(cx + pos.x * scale, cy + pos.y * scale, 3, 0, Math.PI * 2);
  ectx.fill();
}

function drawGroundTrack() {
  const w = groundCanvas.width;
  const h = groundCanvas.height;

  gctx.clearRect(0, 0, w, h);

  gctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  gctx.lineWidth = 1;
  for (let lon = -180; lon <= 180; lon += 60) {
    const x = ((lon + 180) / 360) * w;
    gctx.beginPath();
    gctx.moveTo(x, 0);
    gctx.lineTo(x, h);
    gctx.stroke();
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = h - ((lat + 90) / 180) * h;
    gctx.beginPath();
    gctx.moveTo(0, y);
    gctx.lineTo(w, y);
    gctx.stroke();
  }

  gctx.strokeStyle = '#4fd1c5';
  gctx.lineWidth = 2;
  gctx.beginPath();

  groundTrack.forEach((p, i) => {
    const x = (p.lon + Math.PI) / (2 * Math.PI) * w;
    const y = h - (p.lat + Math.PI / 2) / Math.PI * h;
    if (i === 0) gctx.moveTo(x, y);
    else gctx.lineTo(x, y);
  });

  gctx.stroke();

  if (groundTrack.length > 0) {
    const p = groundTrack[groundTrack.length - 1];
    const x = (p.lon + Math.PI) / (2 * Math.PI) * w;
    const y = h - (p.lat + Math.PI / 2) / Math.PI * h;
    gctx.fillStyle = '#ffdd57';
    gctx.beginPath();
    gctx.arc(x, y, 4, 0, Math.PI * 2);
    gctx.fill();
  }
}

// ================= LOOP =================
function step() {
  if (!elements) return;

  const steps = Math.max(1, parseInt(speedInput?.value || '1', 10));
  let lastPos = null;

  for (let i = 0; i < steps; i++) {
    const pos = propagateKepler(elements, t);
    const ll = eciToLatLon(pos, t);

    groundTrack.push(ll);
    if (groundTrack.length > 2000) groundTrack.shift();
    lastPos = pos;
    t += dt;
  }

  if (lastPos) {
    drawEarthOrbit(lastPos);
    drawGroundTrack();
  }
  if (running) animId = requestAnimationFrame(step);
}

// ================= EVENTS =================
loadBtn.addEventListener('click', () => {
  setStatus('');
  const parsed = parseTLE(tleInput.value);
  if (!parsed) {
    setStatus('Invalid TLE format. Please paste a valid 2-line (or 3-line) TLE.', true);
    return;
  }
  elements = parsed;
  t = 0;
  groundTrack = [];
  hasData = true;
  running = false;
  updateToggle();
  drawEarthOrbit(propagateKepler(elements, t));
  drawGroundTrack();
});

function loadDefaultTLE() {
  const parsed = parseTLE(tleInput.value);
  if (!parsed) {
    setStatus('Default TLE could not be loaded. Paste a valid 2-line TLE.', true);
    return;
  }
  elements = parsed;
  t = 0;
  groundTrack = [];
  hasData = true;
  running = false;
  updateToggle();
  drawEarthOrbit(propagateKepler(elements, t));
  drawGroundTrack();
  setStatus('Default ISS TLE loaded. Press Start to animate.');
}

function updateToggle() {
  if (!toggleBtn) return;
  if (!hasData) toggleBtn.textContent = 'Start';
  else toggleBtn.textContent = running ? 'Pause' : 'Start';
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    if (!elements) {
      loadDefaultTLE();
    }
    running = !running;
    updateToggle();
    if (running) step();
  });
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    running = false;
    if (animId) cancelAnimationFrame(animId);
    t = 0;
    groundTrack = [];
    elements = null;
    hasData = false;
    setStatus('');
    updateToggle();
    ectx.clearRect(0, 0, earthCanvas.width, earthCanvas.height);
    gctx.clearRect(0, 0, groundCanvas.width, groundCanvas.height);
    loadDefaultTLE();
  });
}

if (clearDataBtn) {
  clearDataBtn.addEventListener('click', () => {
    running = false;
    if (animId) cancelAnimationFrame(animId);
    t = 0;
    groundTrack = [];
    setStatus('');
    updateToggle();
    if (elements) {
      drawEarthOrbit(propagateKepler(elements, t));
      gctx.clearRect(0, 0, groundCanvas.width, groundCanvas.height);
    }
  });
}

// ================= STARTUP =================
loadDefaultTLE();
