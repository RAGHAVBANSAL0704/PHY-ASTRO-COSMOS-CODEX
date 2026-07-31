(function initExtraSimulation() {
  const page = window.location.pathname.split('/').pop();
  const configs = {
    'lab18_orrery.html': {
      title: 'Solar System Orrery',
      subtitle: 'Compare orbital periods, distances, and relative planetary motion.',
      type: 'orrery',
      controls: [['speed', 'Time speed', 0.2, 4, 0.1, 1.2], ['scale', 'Orbit scale', 0.6, 1.4, 0.05, 1]]
    },
    'lab19_moon.html': {
      title: 'Moon Phases & Eclipses',
      subtitle: 'Explore Sun-Earth-Moon geometry, phases, and eclipse alignment.',
      type: 'moon',
      controls: [['phase', 'Moon orbit angle', 0, 360, 1, 35], ['tilt', 'Orbital tilt', 0, 8, 0.2, 5.1]]
    },
    'lab20_telescope.html': {
      title: 'Telescope Resolution',
      subtitle: 'Change aperture and wavelength to see diffraction blur shrink or grow.',
      type: 'telescope',
      controls: [['aperture', 'Aperture diameter', 40, 240, 5, 110], ['wavelength', 'Wavelength', 380, 760, 5, 540]]
    },
    'lab21_spectroscopy.html': {
      title: 'Spectroscopy Lab',
      subtitle: 'Identify elements using absorption lines and Doppler redshift.',
      type: 'spectroscopy',
      controls: [['redshift', 'Redshift z', -0.08, 0.18, 0.01, 0.04], ['temperature', 'Star temperature', 3200, 12000, 100, 6200]]
    },
    'lab22_radial_velocity.html': {
      title: 'Exoplanet Radial Velocity',
      subtitle: 'Detect an unseen planet from the wobble of its star.',
      type: 'radial',
      controls: [['mass', 'Planet mass', 0.2, 8, 0.1, 2.4], ['period', 'Orbital period', 30, 220, 5, 110]]
    },
    'lab23_rotation_curve.html': {
      title: 'Galaxy Rotation Curve',
      subtitle: 'Compare visible matter with a dark matter halo model.',
      type: 'rotation',
      controls: [['halo', 'Dark halo strength', 0, 1, 0.05, 0.55], ['disk', 'Visible disk mass', 0.3, 1.6, 0.05, 1]]
    },
    'lab24_cmb.html': {
      title: 'Cosmic Microwave Background Map',
      subtitle: 'Visualize tiny early-universe temperature fluctuations.',
      type: 'cmb',
      controls: [['contrast', 'Fluctuation contrast', 0.2, 2.4, 0.1, 1.2], ['smooth', 'Angular smoothing', 1, 9, 1, 4]]
    },
    'lab25_blackhole.html': {
      title: 'Black Hole Lensing',
      subtitle: 'Bend light near a photon sphere and compact event horizon.',
      type: 'blackhole',
      controls: [['mass', 'Black hole mass', 0.6, 2.4, 0.1, 1.2], ['impact', 'Light impact parameter', 35, 170, 2, 96]]
    },
    'lab26_projectile.html': {
      title: 'Projectile Motion 2D',
      subtitle: 'Launch a projectile with gravity, range, and optional drag intuition.',
      type: 'projectile',
      controls: [['angle', 'Launch angle', 10, 80, 1, 42], ['speed', 'Launch speed', 20, 90, 1, 58], ['drag', 'Drag strength', 0, 0.05, 0.005, 0.01]]
    },
    'lab27_collisions.html': {
      title: 'Collisions & Momentum',
      subtitle: 'Compare elastic and inelastic collisions with center-of-mass motion.',
      type: 'collisions',
      controls: [['elasticity', 'Elasticity', 0, 1, 0.05, 0.85], ['massRatio', 'Mass ratio', 0.4, 3, 0.1, 1.5]]
    },
    'lab28_electric_fields.html': {
      title: 'Electromagnetic Field Lines',
      subtitle: 'Map electric field patterns around charges and dipoles.',
      type: 'fields',
      controls: [['separation', 'Charge separation', 60, 240, 5, 150], ['strength', 'Charge strength', 0.5, 2, 0.1, 1]]
    },
    'lab29_lorentz.html': {
      title: 'Magnetic Lorentz Force',
      subtitle: 'Watch charged particles curve in magnetic fields.',
      type: 'lorentz',
      controls: [['field', 'Magnetic field', 0.2, 2.4, 0.1, 1], ['velocity', 'Particle velocity', 0.5, 3, 0.1, 1.6]]
    },
    'lab30_double_slit.html': {
      title: 'Double Slit Interference',
      subtitle: 'Tune wavelength and slit spacing to reshape interference fringes.',
      type: 'slit',
      controls: [['wavelength', 'Wavelength', 380, 760, 5, 520], ['spacing', 'Slit spacing', 0.6, 2.8, 0.1, 1.4]]
    },
    'lab31_gas.html': {
      title: 'Thermodynamics Gas Box',
      subtitle: 'Connect particle motion, temperature, pressure, and kinetic theory.',
      type: 'gas',
      controls: [['temperature', 'Temperature', 0.5, 4, 0.1, 1.6], ['particles', 'Particle count', 30, 160, 5, 90]]
    },
    'lab32_pendulum.html': {
      title: 'Pendulum Chaos',
      subtitle: 'Compare regular motion with sensitive double-pendulum behavior.',
      type: 'pendulum',
      controls: [['energy', 'Initial energy', 0.5, 2.8, 0.1, 1.4], ['coupling', 'Coupling', 0, 1, 0.05, 0.65]]
    },
    'lab33_standing_waves.html': {
      title: 'Standing Waves & Resonance',
      subtitle: 'Explore modes on strings and pipes through nodes and antinodes.',
      type: 'standing',
      controls: [['mode', 'Mode number', 1, 7, 1, 3], ['amplitude', 'Amplitude', 10, 80, 1, 42]]
    },

    'lab34_escape.html': {
      title: 'Escape Velocity Simulator',
      subtitle: 'Compare launch speed with the threshold needed to leave gravity.',
      type: 'escape',
      controls: [['mass', 'Planet mass', 0.2, 5, 0.1, 1], ['radius', 'Planet radius', 0.4, 3, 0.1, 1], ['launch', 'Launch speed', 0.2, 4, 0.1, 1.5]]
    },
    'lab35_lagrange.html': {
      title: 'Lagrange Points Simulator',
      subtitle: 'Locate balance regions in a two-body gravitational system.',
      type: 'lagrange',
      controls: [['massRatio', 'Mass ratio', 0.05, 0.8, 0.01, 0.22], ['separation', 'Body separation', 160, 320, 5, 240]]
    },
    'lab36_roche.html': {
      title: 'Roche Limit & Tides Simulator',
      subtitle: 'Explore tidal stretching and disruption near massive bodies.',
      type: 'roche',
      controls: [['distance', 'Moon distance', 80, 260, 5, 150], ['density', 'Moon density', 0.4, 2.4, 0.1, 1]]
    },
    'lab37_pulsar.html': {
      title: 'Neutron Star Pulsar Simulator',
      subtitle: 'Watch rotating beams create periodic pulses.',
      type: 'pulsar',
      controls: [['spin', 'Spin rate', 0.4, 4, 0.1, 1.4], ['beam', 'Beam width', 8, 55, 1, 24]]
    },
    'lab38_supernova.html': {
      title: 'Supernova Light Curve Simulator',
      subtitle: 'Model rapid brightening and radioactive tail fading.',
      type: 'supernova',
      controls: [['energy', 'Explosion energy', 0.4, 2.5, 0.1, 1.1], ['nickel', 'Nickel mass', 0.1, 1.4, 0.05, 0.55]]
    },
    'lab39_gravitational_waves.html': {
      title: 'Gravitational Waves Simulator',
      subtitle: 'Visualize inspiral chirps from compact binary mergers.',
      type: 'gwaves',
      controls: [['mass', 'Binary mass', 0.5, 3, 0.1, 1.4], ['distance', 'Source distance', 0.5, 4, 0.1, 1.8]]
    },
    'lab40_polarization.html': {
      title: 'Light Polarization Simulator',
      subtitle: 'Rotate filters and watch transmitted intensity follow Malus law.',
      type: 'polarization',
      controls: [['angle', 'Filter angle', 0, 90, 1, 35], ['intensity', 'Input intensity', 0.2, 2, 0.1, 1]]
    },
    'lab41_heat.html': {
      title: 'Heat Conduction Simulator',
      subtitle: 'Watch temperature smooth out through diffusion of thermal energy.',
      type: 'heat',
      controls: [['diffusivity', 'Thermal diffusivity', 0.2, 3, 0.1, 1], ['gradient', 'Initial gradient', 0.2, 2, 0.1, 1.2]]
    }
  };

  const config = configs[page];
  if (!config) return;

  const header = document.querySelector('.site-header');
  if (header) {
    header.querySelector('h1').textContent = config.title;
    header.querySelector('.muted').textContent = config.subtitle;
  }

  document.querySelector('main').innerHTML = `
    <section class="card">
      <h2>Core Idea</h2>
      <p>${coreIdea(config.type)}</p>
      <ul>${questions(config.type).map((item) => `<li>${item}</li>`).join('')}</ul>
    </section>
    <section class="card">
      <h2>Controls</h2>
      ${config.controls.map(([id, label, min, max, step, value]) => `
        <label for="${id}">${label}</label>
        <input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" />
        <div class="unit-hint" id="${id}Readout"></div>
      `).join('')}
      <button class="btn" id="resetBtn" type="button">Reset</button>
    </section>
    <section class="card visual-card">
      <h2>Simulation View</h2>
      <canvas id="mainCanvas" width="680" height="420" class="sim-canvas"></canvas>
      <p class="muted" id="mainReadout"></p>
    </section>
    <section class="card visual-card">
      <h2>Measurement View</h2>
      <canvas id="plotCanvas" width="620" height="300" class="sim-canvas"></canvas>
      <p class="muted">Use the graph or pattern to explain the physical relationship.</p>
    </section>
  `;

  const canvas = document.getElementById('mainCanvas');
  const plot = document.getElementById('plotCanvas');
  const ctx = canvas.getContext('2d');
  const pctx = plot.getContext('2d');
  const readout = document.getElementById('mainReadout');
  let tick = 0;

  document.getElementById('resetBtn').addEventListener('click', () => {
    config.controls.forEach(([id, , , , , value]) => {
      document.getElementById(id).value = value;
    });
  });

  function val(id) {
    return Number(document.getElementById(id)?.value || 0);
  }

  function updateReadouts() {
    config.controls.forEach(([id, label]) => {
      const target = document.getElementById(`${id}Readout`);
      if (target) target.textContent = `${label}: ${val(id).toFixed(Number.isInteger(val(id)) ? 0 : 2)}`;
    });
  }

  function loop() {
    updateReadouts();
    drawBackground(ctx, canvas.width, canvas.height);
    drawBackground(pctx, plot.width, plot.height);
    render(config.type);
    tick += 1;
    requestAnimationFrame(loop);
  }

  function render(type) {
    const map = {
      orrery, moon, telescope, spectroscopy, radial, rotation, cmb, blackhole,
      projectile, collisions, fields, lorentz, slit, gas, pendulum, standing,
      escape, lagrange, roche, pulsar, supernova, gwaves, polarization, heat
    };
    map[type]();
  }

  function drawBackground(context, width, height) {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#071028');
    gradient.addColorStop(1, '#050711');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 45; i++) {
      context.fillStyle = `rgba(255,255,255,${0.12 + (i % 5) * 0.04})`;
      context.beginPath();
      context.arc((i * 83 + tick * 0.15) % width, (i * 47) % height, 0.8 + (i % 2), 0, Math.PI * 2);
      context.fill();
    }
  }

  function orrery() {
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const scale = val('scale'), speed = val('speed');
    ctx.fillStyle = '#ffdd57'; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
    [[55, 0.24, '#aaa'], [82, 0.62, '#d6a65a'], [112, 1, '#3ff3ff'], [148, 1.88, '#ff6b4a'], [205, 11.86, '#ffdd57']].forEach(([r, period, color]) => {
      const radius = r * scale;
      const angle = tick * speed / (period * 38);
      ctx.strokeStyle = 'rgba(255,255,255,.16)'; ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, 6, 0, Math.PI * 2); ctx.fill();
    });
    readout.textContent = 'Inner planets move faster because shorter orbits have shorter periods.';
    linePlot((x) => 220 / Math.sqrt(x + 1), 'Orbital speed decreases with distance');
  }

  function moon() {
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const angle = val('phase') * Math.PI / 180, tilt = val('tilt');
    ctx.fillStyle = '#ffdd57'; ctx.fillRect(30, cy - 30, 60, 60);
    ctx.fillStyle = '#3f7cff'; ctx.beginPath(); ctx.arc(cx, cy, 34, 0, Math.PI * 2); ctx.fill();
    const mx = cx + Math.cos(angle) * 145, my = cy + Math.sin(angle) * 145 * Math.cos(tilt * Math.PI / 180);
    ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.ellipse(cx, cy, 145, 145 * Math.cos(tilt * Math.PI / 180), 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#d7e8f8'; ctx.beginPath(); ctx.arc(mx, my, 18, 0, Math.PI * 2); ctx.fill();
    readout.textContent = Math.abs(Math.sin(angle)) < 0.08 && tilt < 1 ? 'Eclipse alignment: Sun, Earth, and Moon are nearly lined up.' : 'Phase changes come from viewing the Moon’s sunlit half from different angles.';
    wavePlot((x) => Math.max(0, (1 - Math.cos(x / 34 + angle)) / 2), 'Moon brightness fraction');
  }

  function telescope() {
    const aperture = val('aperture'), wavelength = val('wavelength');
    const blur = Math.max(5, wavelength / aperture * 9);
    for (let x = 100; x < canvas.width; x += 110) {
      for (let y = 110; y < canvas.height; y += 90) {
        const g = ctx.createRadialGradient(x, y, 1, x, y, blur * 7);
        g.addColorStop(0, '#fff'); g.addColorStop(0.25, '#3ff3ff'); g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; ctx.fillRect(x - blur * 7, y - blur * 7, blur * 14, blur * 14);
      }
    }
    readout.textContent = `Diffraction scale is proportional to wavelength / aperture: ${(wavelength / aperture).toFixed(2)}.`;
    linePlot((x) => 180 / (x + aperture / 30), 'Angular blur shrinks with aperture');
  }

  function spectroscopy() {
    const z = val('redshift'), temp = val('temperature');
    const spectrum = ctx.createLinearGradient(70, 0, canvas.width - 70, 0);
    ['#6b4cff', '#3f8cff', '#29d391', '#ffdd57', '#ff8c42', '#ff4f6d'].forEach((c, i) => spectrum.addColorStop(i / 5, c));
    ctx.fillStyle = spectrum; ctx.fillRect(70, 155, canvas.width - 140, 90);
    [410, 486, 517, 589, 656].forEach((line) => {
      const x = 70 + ((line * (1 + z) - 380) / 400) * (canvas.width - 140);
      ctx.fillStyle = '#050711'; ctx.fillRect(x, 145, 5, 110);
    });
    readout.textContent = `Redshift z=${z.toFixed(2)} shifts spectral lines; temperature ${Math.round(temp)} K shapes the color balance.`;
    linePlot((x) => Math.exp(-((x - temp / 55) ** 2) / 900) * 180, 'Approximate thermal color curve');
  }

  function radial() {
    const mass = val('mass'), period = val('period');
    const cx = 250, cy = 210;
    const angle = tick / period * 8;
    ctx.fillStyle = '#ffdd57'; ctx.beginPath(); ctx.arc(cx + Math.cos(angle + Math.PI) * mass * 4, cy, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#64a7ff'; ctx.beginPath(); ctx.arc(cx + Math.cos(angle) * 135, cy + Math.sin(angle) * 70, 10, 0, Math.PI * 2); ctx.fill();
    readout.textContent = `Stellar wobble amplitude grows with planet mass: ${(mass * 9).toFixed(1)} m/s model scale.`;
    wavePlot((x) => Math.sin(x / period * 48) * mass * 16 + 120, 'Radial velocity curve');
  }

  function rotation() {
    const halo = val('halo'), disk = val('disk');
    linePlot((x) => Math.sqrt(disk) * 190 * Math.exp(-x / 120) + halo * 130 * (1 - Math.exp(-x / 45)), 'Rotation curve');
    ctx.fillStyle = '#64a7ff';
    for (let i = 0; i < 160; i++) {
      const a = i * 0.35, r = i * 1.1;
      ctx.globalAlpha = 0.35 + halo * 0.25;
      ctx.beginPath(); ctx.arc(canvas.width / 2 + Math.cos(a) * r, canvas.height / 2 + Math.sin(a) * r * 0.45, 2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    readout.textContent = halo > 0.4 ? 'A dark halo keeps outer rotation speeds flatter.' : 'Visible matter alone drops too quickly at large radius.';
  }

  function cmb() {
    const contrast = val('contrast'), smooth = val('smooth');
    const cell = smooth * 8;
    for (let x = 0; x < canvas.width; x += cell) for (let y = 0; y < canvas.height; y += cell) {
      const n = Math.sin(x * 0.03 + y * 0.017 + tick * 0.002) * contrast;
      ctx.fillStyle = n > 0 ? `rgba(255,221,87,${0.22 + n * 0.18})` : `rgba(63,243,255,${0.22 - n * 0.18})`;
      ctx.fillRect(x, y, cell + 1, cell + 1);
    }
    readout.textContent = 'Tiny warm and cool patches represent early density seeds, exaggerated for visibility.';
    wavePlot((x) => 100 + Math.sin(x / 12) * contrast * 28 + Math.sin(x / 31) * 20, 'Temperature fluctuation scan');
  }

  function blackhole() {
    const mass = val('mass'), impact = val('impact');
    const cx = canvas.width / 2, cy = canvas.height / 2;
    ctx.strokeStyle = '#3ff3ff'; ctx.lineWidth = 2;
    for (let y = -130; y <= 130; y += 32) {
      ctx.beginPath();
      for (let x = -300; x <= 300; x += 8) {
        const bend = mass * 2600 / (Math.abs(x) + impact);
        const px = cx + x, py = cy + y + Math.sin(x / 80) * bend;
        if (x === -300) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, 38 * mass, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ffdd57'; ctx.beginPath(); ctx.arc(cx, cy, 58 * mass, 0, Math.PI * 2); ctx.stroke();
    readout.textContent = 'Light bends more strongly near compact mass; the photon sphere marks unstable circular light paths.';
    linePlot((x) => mass * 2200 / (x + impact), 'Light deflection strength');
  }

  function projectile() {
    const angle = val('angle') * Math.PI / 180, speed = val('speed'), drag = val('drag');
    let x = 35, y = canvas.height - 45, vx = Math.cos(angle) * speed, vy = -Math.sin(angle) * speed;
    ctx.strokeStyle = '#3ff3ff'; ctx.beginPath(); ctx.moveTo(x, y);
    for (let i = 0; i < 180; i++) {
      vx *= 1 - drag; vy = vy * (1 - drag) + 0.7; x += vx * 0.09; y += vy * 0.09;
      ctx.lineTo(x, y); if (y > canvas.height - 45) break;
    }
    ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.moveTo(20, canvas.height - 44); ctx.lineTo(canvas.width - 20, canvas.height - 44); ctx.stroke();
    readout.textContent = 'Range depends on launch angle, speed, gravity, and drag losses.';
    wavePlot((t) => Math.max(0, 210 - (t - 90) ** 2 / (speed / 5)), 'Trajectory height profile');
  }

  function collisions() {
    const e = val('elasticity'), ratio = val('massRatio');
    const x1 = 220 + Math.sin(tick * 0.03) * 80, x2 = 430 - Math.sin(tick * 0.03) * 55;
    ctx.fillStyle = '#3ff3ff'; ctx.beginPath(); ctx.arc(x1, 210, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffdd57'; ctx.beginPath(); ctx.arc(x2, 210, 22 * Math.sqrt(ratio), 0, Math.PI * 2); ctx.fill();
    readout.textContent = `Elasticity ${e.toFixed(2)} controls kinetic energy kept after collision; momentum stays central.`;
    linePlot((x) => 80 + e * 90 + Math.sin(x / 20) * ratio * 12, 'Post-collision kinetic energy scale');
  }

  function fields() {
    const sep = val('separation'), strength = val('strength');
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const charges = [[cx - sep / 2, cy, 1], [cx + sep / 2, cy, -1]];
    for (let x = 60; x < canvas.width; x += 38) for (let y = 60; y < canvas.height; y += 38) {
      let ex = 0, ey = 0;
      charges.forEach(([qx, qy, q]) => { const dx = x - qx, dy = y - qy, r2 = dx * dx + dy * dy + 300; ex += q * dx / r2 * strength; ey += q * dy / r2 * strength; });
      const a = Math.atan2(ey, ex), len = 15;
      ctx.strokeStyle = 'rgba(63,243,255,.65)'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); ctx.stroke();
    }
    charges.forEach(([x, y, q]) => { ctx.fillStyle = q > 0 ? '#ff4fa3' : '#64a7ff'; ctx.beginPath(); ctx.arc(x, y, 24, 0, Math.PI * 2); ctx.fill(); });
    readout.textContent = 'Field arrows show the direction a positive test charge would accelerate.';
    linePlot((x) => strength * 220 / Math.max(1, Math.abs(x - 95)), 'Field strength near charge');
  }

  function lorentz() {
    const b = val('field'), v = val('velocity');
    const r = 95 * v / b;
    ctx.strokeStyle = '#3ff3ff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, Math.PI * 1.65); ctx.stroke();
    const a = tick * 0.025 * b;
    ctx.fillStyle = '#ffdd57'; ctx.beginPath(); ctx.arc(canvas.width / 2 + Math.cos(a) * r, canvas.height / 2 + Math.sin(a) * r, 10, 0, Math.PI * 2); ctx.fill();
    readout.textContent = 'Stronger magnetic field curves charged particles more tightly.';
    linePlot((x) => 30 + 180 * v / (b * (x / 40 + 1)), 'Curvature radius trend');
  }

  function slit() {
    const wavelength = val('wavelength'), spacing = val('spacing');
    for (let x = 0; x < canvas.width; x++) {
      const intensity = Math.cos((x - canvas.width / 2) * spacing / wavelength * 22) ** 2;
      ctx.fillStyle = `rgba(63,243,255,${0.08 + intensity * 0.82})`;
      ctx.fillRect(x, 80, 1, 260);
    }
    readout.textContent = 'Fringe spacing grows with wavelength and shrinks with slit separation.';
    wavePlot((x) => 30 + Math.cos((x - 95) * spacing / wavelength * 90) ** 2 * 190, 'Interference intensity');
  }

  function gas() {
    const temp = val('temperature'), count = val('particles');
    for (let i = 0; i < count; i++) {
      const x = 40 + ((i * 71 + tick * temp * (i % 5 + 1)) % (canvas.width - 80));
      const y = 50 + ((i * 43 + tick * temp * (i % 7 + 1)) % (canvas.height - 100));
      ctx.fillStyle = i % 3 ? '#3ff3ff' : '#ffdd57'; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    }
    readout.textContent = `Higher temperature means faster average particle motion and higher pressure tendency.`;
    linePlot((x) => 30 + temp * 40 + Math.sqrt(count) * 7, 'Pressure trend');
  }

  function pendulum() {
    const energy = val('energy'), coupling = val('coupling');
    const cx = canvas.width / 2, cy = 80;
    const a1 = Math.sin(tick * 0.035) * energy, a2 = Math.sin(tick * 0.052 + coupling * 4) * energy * coupling;
    const x1 = cx + Math.sin(a1) * 115, y1 = cy + Math.cos(a1) * 115;
    const x2 = x1 + Math.sin(a2) * 105, y2 = y1 + Math.cos(a2) * 105;
    ctx.strokeStyle = '#d7e8f8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.fillStyle = '#3ff3ff'; ctx.beginPath(); ctx.arc(x1, y1, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff4fa3'; ctx.beginPath(); ctx.arc(x2, y2, 14, 0, Math.PI * 2); ctx.fill();
    readout.textContent = coupling > 0.45 ? 'Coupled pendulums can become sensitive and chaotic.' : 'Low coupling behaves closer to regular periodic motion.';
    wavePlot((x) => 120 + Math.sin(x / 10) * energy * 30 + Math.sin(x / 7) * coupling * 50, 'Angle sensitivity');
  }

  function standing() {
    const mode = val('mode'), amplitude = val('amplitude');
    ctx.strokeStyle = '#3ff3ff'; ctx.lineWidth = 3; ctx.beginPath();
    for (let x = 40; x <= canvas.width - 40; x += 4) {
      const phase = (x - 40) / (canvas.width - 80);
      const y = canvas.height / 2 + Math.sin(phase * Math.PI * mode) * Math.sin(tick * 0.06) * amplitude;
      if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    readout.textContent = `Mode ${mode} has ${mode + 1} nodes including fixed ends.`;
    wavePlot((x) => 120 + Math.sin((x / 190) * Math.PI * mode) * amplitude, 'Standing-wave shape');
  }


  function escape() {
    const mass = val('mass'), radius = val('radius'), launch = val('launch');
    const threshold = Math.sqrt(2 * mass / radius);
    const cx = canvas.width / 2, cy = canvas.height / 2 + 60;
    ctx.fillStyle = '#64a7ff'; ctx.beginPath(); ctx.arc(cx, cy, 45 * radius, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = launch >= threshold ? '#29d391' : '#ff4fa3'; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(cx, cy - 45 * radius);
    for (let i = 0; i < 120; i++) {
      const t = i / 10;
      const y = cy - 45 * radius - launch * 42 * t + mass * 3.6 * t * t;
      const x = cx + t * 9;
      ctx.lineTo(x, y);
      if (y > cy - 45 * radius && i > 8) break;
    }
    ctx.stroke();
    readout.textContent = `Escape threshold ≈ ${threshold.toFixed(2)} model units; launch is ${launch >= threshold ? 'escaping' : 'bound'}.`;
    linePlot((x) => 190 / Math.sqrt(x / 35 + radius) * mass, 'Escape speed trend');
  }

  function lagrange() {
    const ratio = val('massRatio'), sep = val('separation');
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const x1 = cx - sep * ratio, x2 = cx + sep * (1 - ratio);
    ctx.fillStyle = '#ffdd57'; ctx.beginPath(); ctx.arc(x1, cy, 28, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#64a7ff'; ctx.beginPath(); ctx.arc(x2, cy, 16, 0, Math.PI * 2); ctx.fill();
    const points = [[cx - sep * 0.48, cy, 'L3'], [cx + sep * 0.72, cy, 'L2'], [cx + sep * 0.43, cy, 'L1'], [cx + sep * 0.12, cy - sep * 0.55, 'L4'], [cx + sep * 0.12, cy + sep * 0.55, 'L5']];
    points.forEach(([x, y, label]) => { ctx.fillStyle = '#3ff3ff'; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#eaf6ff'; ctx.fillText(label, x + 10, y + 4); });
    readout.textContent = 'Lagrange points are balance regions in the rotating frame of two orbiting bodies.';
    linePlot((x) => 120 + Math.sin(x / 18) * 35 * ratio, 'Effective potential sketch');
  }

  function roche() {
    const distance = val('distance'), density = val('density');
    const limit = 135 / Math.cbrt(density);
    const cx = 210, cy = canvas.height / 2;
    ctx.fillStyle = '#ffdd57'; ctx.beginPath(); ctx.arc(cx, cy, 52, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,79,163,.7)'; ctx.beginPath(); ctx.arc(cx, cy, limit, 0, Math.PI * 2); ctx.stroke();
    const stretch = Math.max(1, limit / distance);
    ctx.fillStyle = distance < limit ? '#ff4fa3' : '#3ff3ff'; ctx.beginPath(); ctx.ellipse(cx + distance, cy, 24 * stretch, 18 / stretch, 0, 0, Math.PI * 2); ctx.fill();
    readout.textContent = distance < limit ? 'Inside the Roche limit: tides can disrupt a weak moon.' : 'Outside the Roche limit: the moon can remain intact.';
    linePlot((x) => 220 / ((x + 20) / 30) ** 3, 'Tidal force falls with distance');
  }

  function pulsar() {
    const spin = val('spin'), beam = val('beam');
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const a = tick * 0.04 * spin;
    ctx.fillStyle = '#d7e8f8'; ctx.beginPath(); ctx.arc(cx, cy, 32, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#3ff3ff'; ctx.lineWidth = beam / 8;
    [-1, 1].forEach((dir) => { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * 260 * dir, cy + Math.sin(a) * 260 * dir); ctx.stroke(); });
    const pulse = Math.max(0, Math.cos(a)) ** (65 / beam);
    readout.textContent = `Observed pulse brightness: ${(pulse * 100).toFixed(0)}%.`;
    wavePlot((x) => 35 + Math.max(0, Math.cos(x / 18 * spin)) ** (65 / beam) * 210, 'Pulse profile');
  }

  function supernova() {
    const energy = val('energy'), nickel = val('nickel');
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const r = 45 + Math.sin(tick * 0.025) * 8 + energy * 28;
    const g = ctx.createRadialGradient(cx, cy, 5, cx, cy, r * 2.4);
    g.addColorStop(0, '#fff'); g.addColorStop(0.25, '#ffdd57'); g.addColorStop(0.7, '#ff4fa3'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(cx - r * 2.4, cy - r * 2.4, r * 4.8, r * 4.8);
    readout.textContent = 'Explosion energy controls peak brightness; nickel mass extends the radioactive tail.';
    linePlot((x) => energy * 180 * Math.exp(-x / 38) + nickel * 90 * Math.exp(-x / 120), 'Supernova light curve');
  }

  function gwaves() {
    const mass = val('mass'), distance = val('distance');
    const amp = 90 * mass / distance;
    ctx.strokeStyle = '#3ff3ff'; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 30; x < canvas.width - 30; x += 3) {
      const grow = (x - 30) / (canvas.width - 60);
      const y = canvas.height / 2 + Math.sin(x * (0.04 + grow * mass * 0.12) - tick * 0.1) * amp * grow;
      if (x === 30) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    readout.textContent = 'Inspiral signals chirp: frequency and amplitude rise before merger.';
    wavePlot((x) => 120 + Math.sin(x * (0.02 + x / 1600)) * amp * (x / 190), 'Gravitational-wave chirp');
  }

  function polarization() {
    const angle = val('angle'), intensity = val('intensity');
    const transmitted = intensity * Math.cos(angle * Math.PI / 180) ** 2;
    const cx = canvas.width / 2, cy = canvas.height / 2;
    ctx.strokeStyle = '#3ff3ff'; ctx.lineWidth = 3;
    for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(80, cy + i * 22); ctx.lineTo(cx - 55, cy + i * 22); ctx.stroke(); }
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle * Math.PI / 180); ctx.strokeStyle = '#ffdd57'; for (let i=-4;i<=4;i++){ctx.beginPath();ctx.moveTo(i*14,-90);ctx.lineTo(i*14,90);ctx.stroke();} ctx.restore();
    ctx.strokeStyle = '#29d391'; for (let i = -3; i <= 3; i++) { ctx.globalAlpha = transmitted / intensity; ctx.beginPath(); ctx.moveTo(cx + 60, cy + i * 22); ctx.lineTo(canvas.width - 80, cy + i * 22); ctx.stroke(); } ctx.globalAlpha = 1;
    readout.textContent = `Malus law: transmitted intensity = ${(transmitted).toFixed(2)} model units.`;
    linePlot((x) => Math.cos((x / 190) * Math.PI / 2) ** 2 * 210, 'I = I₀ cos²θ');
  }

  function heat() {
    const diffusivity = val('diffusivity'), gradient = val('gradient');
    for (let x = 0; x < canvas.width; x += 8) {
      const t = x / canvas.width;
      const smooth = Math.exp(-tick * diffusivity * 0.002);
      const hot = (1 - t) * gradient * smooth + 0.35 * (1 - smooth);
      ctx.fillStyle = `rgb(${Math.min(255, 70 + hot * 160)},${Math.min(220, 50 + hot * 90)},${Math.max(80, 200 - hot * 120)})`;
      ctx.fillRect(x, 90, 9, 220);
    }
    readout.textContent = 'Heat conduction smooths temperature differences over time.';
    linePlot((x) => 40 + gradient * 170 * Math.exp(-tick * diffusivity * 0.001) * (1 - x / 190), 'Temperature profile');
  }

  function linePlot(fn, label) {
    pctx.strokeStyle = 'rgba(255,255,255,.18)'; pctx.beginPath(); pctx.moveTo(42, 24); pctx.lineTo(42, plot.height - 34); pctx.lineTo(plot.width - 22, plot.height - 34); pctx.stroke();
    pctx.strokeStyle = '#3ff3ff'; pctx.lineWidth = 2; pctx.beginPath();
    for (let i = 0; i < 190; i++) {
      const x = 42 + i * ((plot.width - 70) / 189);
      const y = plot.height - 34 - Math.max(0, Math.min(plot.height - 70, fn(i)));
      if (i === 0) pctx.moveTo(x, y); else pctx.lineTo(x, y);
    }
    pctx.stroke();
    pctx.fillStyle = '#a8bdd3'; pctx.font = '13px system-ui'; pctx.fillText(label, 52, 24);
  }

  function wavePlot(fn, label) {
    linePlot(fn, label);
  }

  function coreIdea(type) {
    const ideas = {
      orrery: 'Planetary orbits reveal how distance, period, and speed are linked by gravity.',
      moon: 'Moon phases and eclipses come from geometry: sunlight, shadows, and orbital alignment.',
      telescope: 'A telescope’s resolving power depends on aperture and wavelength through diffraction.',
      spectroscopy: 'Spectral lines are atomic fingerprints; shifts reveal motion and cosmic expansion.',
      radial: 'A planet and star orbit their shared center of mass, creating a measurable stellar wobble.',
      rotation: 'Galaxy rotation curves show why visible matter alone cannot explain outer-star speeds.',
      cmb: 'The cosmic microwave background preserves tiny temperature differences from the early universe.',
      blackhole: 'Compact mass curves spacetime strongly enough to bend light into extreme paths.',
      projectile: 'Two-dimensional motion combines horizontal motion with vertical acceleration from gravity.',
      collisions: 'Momentum is conserved in collisions, while kinetic energy depends on elasticity.',
      fields: 'Electric fields show the force direction on a positive test charge.',
      lorentz: 'A magnetic field bends moving charges sideways through the Lorentz force.',
      slit: 'Interference patterns reveal wave behavior through path differences.',
      gas: 'Gas pressure and temperature emerge from many microscopic particle collisions.',
      pendulum: 'Coupled pendulums can shift from regular motion into chaotic sensitivity.',
      standing: 'Standing waves form when reflections create stable nodes and antinodes.',
      escape: 'Escape velocity is the threshold speed needed to leave a gravitational field without more thrust.',
      lagrange: 'Lagrange points are locations where gravity and orbital motion create balance regions.',
      roche: 'Strong tidal forces can stretch and disrupt a body inside its Roche limit.',
      pulsar: 'A pulsar is a rotating neutron star whose beams sweep past observers like a lighthouse.',
      supernova: 'Supernova light curves reveal explosion energy and radioactive decay in expanding debris.',
      gwaves: 'Gravitational waves are ripples in spacetime from accelerating massive objects.',
      polarization: 'Polarization describes the orientation of light waves and how filters transmit them.',
      heat: 'Heat conduction spreads thermal energy from hotter regions into cooler regions.'
    };
    return ideas[type];
  }

  function questions(type) {
    return {
      orrery: ['Which planet moves fastest?', 'How does orbit size affect period?', 'Why are scales often distorted in diagrams?'],
      moon: ['When can eclipses occur?', 'Why do phases repeat monthly?', 'What changes when tilt is near zero?'],
      telescope: ['How does aperture sharpen detail?', 'Why does wavelength matter?', 'What does diffraction blur hide?'],
      spectroscopy: ['Which lines shift most visibly?', 'How does redshift imply motion?', 'Why are line patterns unique?'],
      radial: ['How does planet mass change wobble?', 'How does period shape the curve?', 'What can the star reveal about the planet?'],
      rotation: ['Why should visible-only speed fall?', 'What keeps outer speed flat?', 'How does halo strength alter the graph?'],
      cmb: ['What do warm and cool spots represent?', 'Why exaggerate contrast?', 'How can tiny differences seed galaxies?'],
      blackhole: ['What is the photon sphere?', 'Why does impact parameter matter?', 'How does mass change bending?'],
      projectile: ['Which angle gives long range?', 'How does drag change motion?', 'Where is vertical speed smallest?'],
      collisions: ['What does elasticity change?', 'What stays conserved?', 'How does mass ratio affect motion?'],
      fields: ['Where is the field strongest?', 'How do opposite charges shape arrows?', 'What would a positive test charge do?'],
      lorentz: ['Why is the path circular?', 'What happens if field increases?', 'How does speed change radius?'],
      slit: ['Why do bright and dark bands form?', 'How does wavelength change spacing?', 'What does slit spacing control?'],
      gas: ['How does temperature affect motion?', 'Why does pressure emerge statistically?', 'What changes with particle count?'],
      pendulum: ['When is motion regular?', 'When does sensitivity grow?', 'How does coupling affect chaos?'],
      standing: ['Where are the nodes?', 'How does mode number change shape?', 'What does resonance mean?'],
      escape: ['What changes escape speed?', 'When does launch become bound?', 'Why does radius matter?'],
      lagrange: ['Where are stable points?', 'How does mass ratio shift them?', 'Why are L4 and L5 special?'],
      roche: ['When does disruption occur?', 'How does density help survival?', 'Why do tides stretch objects?'],
      pulsar: ['Why do pulses repeat?', 'What changes pulse width?', 'How does spin rate affect timing?'],
      supernova: ['What controls peak brightness?', 'Why does the tail fade slowly?', 'What does nickel mass represent?'],
      gwaves: ['Why does frequency rise?', 'How does distance reduce amplitude?', 'What creates the chirp?'],
      polarization: ['What happens at 90 degrees?', 'Why follows cos squared?', 'How do filters select wave direction?'],
      heat: ['Why does profile smooth?', 'How does diffusivity change speed?', 'Where is gradient steepest?']
    }[type];
  }

  loop();
})();
