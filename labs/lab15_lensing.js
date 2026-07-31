(function initLensing() {
  const lensCanvas = document.getElementById('lensCanvas');
  const measureCanvas = document.getElementById('measureCanvas');
  const mass = document.getElementById('mass');
  const offset = document.getElementById('offset');
  const sourceSize = document.getElementById('sourceSize');
  const massReadout = document.getElementById('massReadout');
  const offsetReadout = document.getElementById('offsetReadout');
  const sizeReadout = document.getElementById('sizeReadout');
  const stats = document.getElementById('lensStats');
  const resetBtn = document.getElementById('resetBtn');
  const ctx = lensCanvas.getContext('2d');
  const mctx = measureCanvas.getContext('2d');
  let tick = 0;

  function v(input) {
    return Number(input.value);
  }

  function drawSky() {
    const width = lensCanvas.width;
    const height = lensCanvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const thetaE = v(mass) * 0.9;
    const beta = v(offset);
    const size = v(sourceSize);
    const disc = Math.sqrt(beta * beta + 4 * thetaE * thetaE);
    const imageA = (beta + disc) / 2;
    const imageB = (beta - disc) / 2;

    ctx.clearRect(0, 0, width, height);
    const bg = ctx.createRadialGradient(cx, cy, 20, cx, cy, width * 0.6);
    bg.addColorStop(0, '#101b3c');
    bg.addColorStop(1, '#050711');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.16 + (i % 6) * 0.06})`;
      ctx.beginPath();
      ctx.arc((i * 71) % width, (i * 37) % height, 0.8 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(63,243,255,0.28)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, thetaE, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,221,87,0.28)';
    ctx.beginPath();
    ctx.arc(cx + beta, cy - 116, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffdd57';
    ctx.font = '14px system-ui';
    ctx.fillText('true source', cx + beta - 34, cy - 144);

    drawArc(cx + imageA, cy, size * 1.4, thetaE, '#3ff3ff', 0.9);
    drawArc(cx + imageB, cy, size * 1.1, thetaE, '#64a7ff', 0.72);

    const lensGlow = ctx.createRadialGradient(cx - 10, cy - 10, 8, cx, cy, 48);
    lensGlow.addColorStop(0, '#ffffff');
    lensGlow.addColorStop(0.3, '#ffdd57');
    lensGlow.addColorStop(1, '#101830');
    ctx.fillStyle = lensGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#eaf6ff';
    ctx.fillText('foreground mass', cx - 52, cy + 62);

    stats.textContent = `Einstein radius: ${thetaE.toFixed(1)} px · image positions: ${imageA.toFixed(1)} px and ${imageB.toFixed(1)} px`;
    drawMeasure(thetaE, beta, imageA, imageB);
    tick += 1;
  }

  function drawArc(x, y, size, thetaE, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(tick * 0.01) * 0.02);
    ctx.strokeStyle = color;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = Math.max(5, size * 0.5);
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(size * 1.3, thetaE * 0.2), -1.25, 1.25);
    ctx.stroke();
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawMeasure(thetaE, beta, imageA, imageB) {
    const width = measureCanvas.width;
    const height = measureCanvas.height;
    mctx.clearRect(0, 0, width, height);
    mctx.fillStyle = '#070b18';
    mctx.fillRect(0, 0, width, height);
    const cx = width / 2;
    const y = height / 2;
    mctx.strokeStyle = 'rgba(255,255,255,0.14)';
    mctx.beginPath();
    mctx.moveTo(40, y);
    mctx.lineTo(width - 40, y);
    mctx.stroke();
    [
      ['Lens', 0, '#ffdd57'],
      ['Source', beta, '#ff4fa3'],
      ['Image A', imageA, '#3ff3ff'],
      ['Image B', imageB, '#64a7ff'],
      ['Einstein radius', thetaE, '#29d391']
    ].forEach(([label, pos, color], index) => {
      const x = cx + pos * 1.25;
      mctx.fillStyle = color;
      mctx.beginPath();
      mctx.arc(x, y + (index - 2) * 18, 7, 0, Math.PI * 2);
      mctx.fill();
      mctx.fillStyle = '#eaf6ff';
      mctx.font = '13px system-ui';
      mctx.fillText(label, Math.min(width - 120, Math.max(12, x + 12)), y + (index - 2) * 18 + 4);
    });
  }

  function update() {
    massReadout.textContent = `Mass scale: ${v(mass)}`;
    offsetReadout.textContent = `Angular source offset: ${v(offset)} px`;
    sizeReadout.textContent = `Source radius: ${v(sourceSize)} px`;
    drawSky();
  }

  [mass, offset, sourceSize].forEach((input) => input.addEventListener('input', update));
  resetBtn.addEventListener('click', () => {
    mass.value = 82;
    offset.value = 42;
    sourceSize.value = 20;
    update();
  });

  function loop() {
    drawSky();
    requestAnimationFrame(loop);
  }
  update();
  loop();
})();
