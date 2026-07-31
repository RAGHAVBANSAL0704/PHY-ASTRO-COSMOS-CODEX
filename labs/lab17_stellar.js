(function initStellarLife() {
  const mass = document.getElementById('mass');
  const massReadout = document.getElementById('massReadout');
  const starStats = document.getElementById('starStats');
  const resetBtn = document.getElementById('resetBtn');
  const starCanvas = document.getElementById('starCanvas');
  const hrCanvas = document.getElementById('hrCanvas');
  const sctx = starCanvas.getContext('2d');
  const hctx = hrCanvas.getContext('2d');
  let tick = 0;

  function m() {
    return Number(mass.value);
  }

  function properties(stellarMass) {
    const luminosity = stellarMass < 0.43 ? 0.23 * stellarMass ** 2.3 : stellarMass ** 3.5;
    const lifetime = 10 * stellarMass / Math.max(0.0001, luminosity);
    const temp = 5800 * stellarMass ** 0.5;
    const fate = stellarMass < 0.5 ? 'helium white dwarf after an extremely long life' :
      stellarMass < 8 ? 'white dwarf after a red giant phase' :
      stellarMass < 20 ? 'neutron star after a supernova' :
      'black hole candidate after core collapse';
    return { luminosity, lifetime, temp, fate };
  }

  function starColor(temp) {
    if (temp < 3700) return '#ff7a4a';
    if (temp < 5200) return '#ffd166';
    if (temp < 7500) return '#fff7d6';
    if (temp < 12000) return '#b8d8ff';
    return '#7aa7ff';
  }

  function drawStar() {
    const stellarMass = m();
    const prop = properties(stellarMass);
    const width = starCanvas.width;
    const height = starCanvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(130, 30 + Math.log10(stellarMass + 1) * 72);
    const color = starColor(prop.temp);
    sctx.clearRect(0, 0, width, height);
    sctx.fillStyle = '#050711';
    sctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 7; i++) {
      sctx.strokeStyle = `rgba(63,243,255,${0.04 + i * 0.025})`;
      sctx.beginPath();
      sctx.arc(cx, cy, radius + i * 18 + Math.sin(tick * 0.03 + i) * 4, 0, Math.PI * 2);
      sctx.stroke();
    }
    const glow = sctx.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.1, cx, cy, radius * 1.2);
    glow.addColorStop(0, '#ffffff');
    glow.addColorStop(0.32, color);
    glow.addColorStop(1, '#3b1608');
    sctx.fillStyle = glow;
    sctx.beginPath();
    sctx.arc(cx, cy, radius, 0, Math.PI * 2);
    sctx.fill();
    sctx.fillStyle = '#eaf6ff';
    sctx.font = '15px system-ui';
    sctx.fillText(`Fusion rate scales steeply with mass`, 22, 30);
    starStats.textContent = `Temperature ≈ ${Math.round(prop.temp).toLocaleString()} K · luminosity ≈ ${prop.luminosity.toPrecision(3)} L☉ · lifetime ≈ ${prop.lifetime.toPrecision(3)} billion years · fate: ${prop.fate}.`;
  }

  function drawHR() {
    const stellarMass = m();
    const prop = properties(stellarMass);
    const width = hrCanvas.width;
    const height = hrCanvas.height;
    hctx.clearRect(0, 0, width, height);
    hctx.fillStyle = '#070b18';
    hctx.fillRect(0, 0, width, height);
    hctx.strokeStyle = 'rgba(255,255,255,0.14)';
    hctx.beginPath();
    hctx.moveTo(58, 24);
    hctx.lineTo(58, height - 44);
    hctx.lineTo(width - 26, height - 44);
    hctx.stroke();

    hctx.strokeStyle = 'rgba(63,243,255,0.45)';
    hctx.lineWidth = 3;
    hctx.beginPath();
    for (let i = 0; i <= 140; i++) {
      const t = i / 140;
      const x = 74 + t * (width - 122);
      const y = height - 58 - Math.pow(t, 1.7) * (height - 100);
      if (i === 0) hctx.moveTo(x, y);
      else hctx.lineTo(x, y);
    }
    hctx.stroke();

    const x = 74 + Math.min(1, Math.log10(prop.temp / 2800) / Math.log10(42000 / 2800)) * (width - 122);
    const y = height - 58 - Math.min(1, (Math.log10(prop.luminosity + 0.02) + 2) / 7) * (height - 100);
    hctx.fillStyle = starColor(prop.temp);
    hctx.beginPath();
    hctx.arc(x, y, 10, 0, Math.PI * 2);
    hctx.fill();
    hctx.strokeStyle = '#ffffff';
    hctx.stroke();
    hctx.fillStyle = '#a8bdd3';
    hctx.font = '13px system-ui';
    hctx.fillText('Luminosity ↑', 12, 24);
    hctx.fillText('Temperature →', width - 128, height - 15);
  }

  function update() {
    massReadout.textContent = `${m().toFixed(1)} solar masses`;
    drawStar();
    drawHR();
  }

  mass.addEventListener('input', update);
  resetBtn.addEventListener('click', () => {
    mass.value = 1;
    update();
  });

  function loop() {
    tick += 1;
    drawStar();
    requestAnimationFrame(loop);
  }
  update();
  loop();
})();
