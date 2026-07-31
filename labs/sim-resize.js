(function resizeSimulationCanvases() {
  document.querySelectorAll('canvas.sim-canvas').forEach((canvas) => {
    const originalWidth = Number(canvas.getAttribute('width')) || 500;
    const originalHeight = Number(canvas.getAttribute('height')) || 250;
    const aspect = originalWidth / originalHeight;
    const card = canvas.closest('.card');
    const availableWidth = card
      ? Math.max(260, card.clientWidth - 40)
      : Math.max(260, canvas.clientWidth || originalWidth);
    const displayWidth = Math.min(Math.max(availableWidth, 260), 760);
    let displayHeight = Math.max(96, Math.round(displayWidth / aspect));
    if (aspect < 0.9) displayHeight = Math.min(displayHeight, 520);
    if (aspect > 3.2) displayHeight = Math.max(displayHeight, 120);
    if (aspect >= 0.9 && aspect <= 1.25) displayHeight = Math.min(displayHeight, 620);

    canvas.style.width = '100%';
    canvas.style.height = `${displayHeight}px`;
    canvas.width = Math.round(displayWidth);
    canvas.height = Math.round(displayHeight);
    canvas.dataset.renderWidth = String(displayWidth);
    canvas.dataset.renderHeight = String(displayHeight);
  });
})();
