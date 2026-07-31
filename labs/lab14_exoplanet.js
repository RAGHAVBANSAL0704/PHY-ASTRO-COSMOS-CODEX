(function initExoplanetTransit() {
  const transitCanvas = document.getElementById('transitCanvas');
  const curveCanvas = document.getElementById('curveCanvas');
  const radiusRatio = document.getElementById('radiusRatio');
  const orbitDistance = document.getElementById('orbitDistance');
  const inclination = document.getElementById('inclination');
  const speed = document.getElementById('speed');
  const radiusReadout = document.getElementById('radiusReadout');
  const distanceReadout = document.getElementById('distanceReadout');
  const inclinationReadout = document.getElementById('inclinationReadout');
  const speedReadout = document.getElementById('speedReadout');
  const stats = document.getElementById('transitStats');
  const toggleRun = document.getElementById('toggleRun');
  const resetBtn = document.getElementById('resetBtn');
  const tctx = transitCanvas.getContext('2d');
  const cctx = curveCanvas.getContext('2d');

  let phase = -Math.PI;
  let running = true;
  const history = [];

  function value(input) {
    return Number(input.value);
  }

  function drawStar(ctx, x, y, radius) {
    const glow = ctx.createRadialGradient(x - radius * 0.28, y - radius * 0.28, radius * 0.1, x, y, radius * 1.15);
    glow.addColorStop(0, '#ffffff');
    glow.addColorStop(0.28, '#ffdd57');
    glow.addColorStop(1, '#9b4d12');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function fluxAt(projectedX, projectedY, starRadius, planetRadius) {
    const distance = Math.hypot(projectedX, projectedY);
    if (distance > starRadius + planetRadius) return 1;
    if (distance < starRadius - planetRadius) return 1 - (planetRadius / starRadius) ** 2;
    const overlap = Math.max(0, 1 - (distance - starRadius + planetRadius) / (2 * planetRadius));
    return 1 - (planetRadius / starRadius) ** 2 * overlap;
  }

  function updateReadouts() {
    radiusReadout.textContent = `Ratio: ${value(radiusRatio).toFixed(2)} · max dip ${(value(radiusRatio) ** 2 * 100).toFixed(2)}%`;
    distanceReadout.textContent = `Visual orbit radius: ${value(orbitDistance)} px`;
    inclinationReadout.textContent = `Inclination: ${value(inclination).toFixed(1)}°`;
    speedReadout.textContent = `Animation speed: ${value(speed).toFixed(1)}×`;
  }

  function drawTransit() {
    const width = transitCanvas.width;
    const height = transitCanvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const starRadius = Math.min(width, height) * 0.23;
    const planetRadius = starRadius * value(radiusRatio);
    const orbit = value(orbitDistance);
    const impact = Math.cos(value(inclination) * Math.PI / 180) * orbit;
    const x = cx + Math.sin(phase) * orbit;
    const y = cy + impact;
    const flux = fluxAt(x - cx, y - cy, starRadius, planetRadius);

    tctx.clearRect(0, 0, width, height);
    const bg = tctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#070b18');
    bg.addColorStop(1, '#121a36');
    tctx.fillStyle = bg;
    tctx.fillRect(0, 0, width, height);

    tctx.strokeStyle = 'rgba(63,243,255,0.22)';
    tctx.beginPath();
    tctx.ellipse(cx, cy, orbit, Math.max(18, orbit * 0.18), 0, 0, Math.PI * 2);
    tctx.stroke();
    drawStar(tctx, cx, cy, starRadius);
    tctx.fillStyle = '#111827';
    tctx.beginPath();
    tctx.arc(x, y, planetRadius, 0, Math.PI * 2);
    tctx.fill();
    tctx.strokeStyle = '#64a7ff';
    tctx.stroke();

    history.push(flux);
    if (history.length > 180) history.shift();
    stats.textContent = `Current brightness: ${(flux * 100).toFixed(3)}% · transit depth: ${((1 - Math.min(...history)) * 100).toFixed(3)}%`;
    drawCurve();
  }

  function drawCurve() {
    const width = curveCanvas.width;
    const height = curveCanvas.height;
    cctx.clearRect(0, 0, width, height);
    cctx.fillStyle = '#070b18';
    cctx.fillRect(0, 0, width, height);
    cctx.strokeStyle = 'rgba(255,255,255,0.12)';
    cctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = 36 + i * ((height - 70) / 4);
      cctx.beginPath();
      cctx.moveTo(42, y);
      cctx.lineTo(width - 20, y);
      cctx.stroke();
    }
    cctx.strokeStyle = '#3ff3ff';
    cctx.lineWidth = 2;
    cctx.beginPath();
    history.forEach((flux, index) => {
      const x = 42 + index * ((width - 70) / 179);
      const y = 36 + (1 - (flux - 0.95) / 0.05) * (height - 70);
      if (index === 0) cctx.moveTo(x, y);
      else cctx.lineTo(x, y);
    });
    cctx.stroke();
    cctx.fillStyle = '#a8bdd3';
    cctx.font = '14px system-ui';
    cctx.fillText('Brightness', 18, 24);
    cctx.fillText('Time →', width - 78, height - 18);
  }

  function step() {
    updateReadouts();
    drawTransit();
    if (running) phase += 0.018 * value(speed);
    requestAnimationFrame(step);
  }

  toggleRun.addEventListener('click', () => {
    running = !running;
    toggleRun.textContent = running ? 'Pause' : 'Run';
  });

  resetBtn.addEventListener('click', () => {
    phase = -Math.PI;
    history.length = 0;
  });

  step();
})();
