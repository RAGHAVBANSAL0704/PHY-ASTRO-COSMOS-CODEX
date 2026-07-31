(function initHubbleExpansion() {
  const spaceCanvas = document.getElementById('spaceCanvas');
  const plotCanvas = document.getElementById('plotCanvas');
  const H0 = document.getElementById('H0');
  const speed = document.getElementById('speed');
  const h0Readout = document.getElementById('h0Readout');
  const speedReadout = document.getElementById('speedReadout');
  const stats = document.getElementById('hubbleStats');
  const toggleRun = document.getElementById('toggleRun');
  const resetBtn = document.getElementById('resetBtn');
  const sctx = spaceCanvas.getContext('2d');
  const pctx = plotCanvas.getContext('2d');
  const galaxies = Array.from({ length: 36 }, (_, i) => ({
    angle: i * 2.399,
    radius: 0.12 + (i % 12) * 0.055 + Math.floor(i / 12) * 0.04,
    hue: i % 3
  }));
  let scale = 1;
  let running = true;

  function value(input) {
    return Number(input.value);
  }

  function drawSpace() {
    const width = spaceCanvas.width;
    const height = spaceCanvas.height;
    const cx = width / 2;
    const cy = height / 2;
    sctx.clearRect(0, 0, width, height);
    sctx.fillStyle = '#050711';
    sctx.fillRect(0, 0, width, height);
    sctx.strokeStyle = 'rgba(63,243,255,0.12)';
    for (let r = 55; r < Math.min(width, height) * 0.62; r += 55) {
      sctx.beginPath();
      sctx.arc(cx, cy, r * (0.82 + (scale % 0.35)), 0, Math.PI * 2);
      sctx.stroke();
    }
    galaxies.forEach((galaxy) => {
      const distance = galaxy.radius * scale * Math.min(width, height) * 0.72;
      const x = cx + Math.cos(galaxy.angle) * distance;
      const y = cy + Math.sin(galaxy.angle) * distance;
      const color = galaxy.hue === 0 ? '#3ff3ff' : galaxy.hue === 1 ? '#ffdd57' : '#ff4fa3';
      sctx.fillStyle = color;
      sctx.globalAlpha = distance < width * 0.55 ? 0.92 : 0.36;
      sctx.beginPath();
      sctx.arc(x, y, 4 + galaxy.radius * 8, 0, Math.PI * 2);
      sctx.fill();
    });
    sctx.globalAlpha = 1;
    sctx.fillStyle = '#eaf6ff';
    sctx.font = '15px system-ui';
    sctx.fillText(`Scale factor: ${scale.toFixed(2)}×`, 22, 30);
  }

  function drawPlot() {
    const width = plotCanvas.width;
    const height = plotCanvas.height;
    const h0 = value(H0);
    pctx.clearRect(0, 0, width, height);
    pctx.fillStyle = '#070b18';
    pctx.fillRect(0, 0, width, height);
    pctx.strokeStyle = 'rgba(255,255,255,0.16)';
    pctx.beginPath();
    pctx.moveTo(54, 24);
    pctx.lineTo(54, height - 42);
    pctx.lineTo(width - 24, height - 42);
    pctx.stroke();
    pctx.strokeStyle = '#3ff3ff';
    pctx.lineWidth = 2;
    pctx.beginPath();
    pctx.moveTo(54, height - 42);
    pctx.lineTo(width - 28, height - 42 - (h0 / 95) * (height - 78));
    pctx.stroke();
    galaxies.slice(0, 20).forEach((galaxy) => {
      const d = galaxy.radius * 520;
      const v = h0 * d / 100;
      const x = 54 + (d / 410) * (width - 92);
      const y = height - 42 - (v / 390) * (height - 78);
      pctx.fillStyle = '#ffdd57';
      pctx.beginPath();
      pctx.arc(x, y, 4, 0, Math.PI * 2);
      pctx.fill();
    });
    pctx.fillStyle = '#a8bdd3';
    pctx.font = '13px system-ui';
    pctx.fillText('Velocity', 12, 25);
    pctx.fillText('Distance →', width - 96, height - 16);
    stats.textContent = `Slope H₀ = ${h0} km/s/Mpc · a 100 Mpc galaxy recedes at ${h0 * 100} km/s.`;
  }

  function updateReadouts() {
    h0Readout.textContent = `${value(H0)} km/s/Mpc`;
    speedReadout.textContent = `${value(speed).toFixed(1)}× expansion animation`;
  }

  function step() {
    updateReadouts();
    drawSpace();
    drawPlot();
    if (running) scale += value(speed) * value(H0) * 0.000012;
    if (scale > 1.8) scale = 1;
    requestAnimationFrame(step);
  }

  toggleRun.addEventListener('click', () => {
    running = !running;
    toggleRun.textContent = running ? 'Pause' : 'Run';
  });
  resetBtn.addEventListener('click', () => {
    scale = 1;
  });
  step();
})();
