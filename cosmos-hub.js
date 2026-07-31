(function initCosmosHub() {
  const simulations = [
    { title: '1D Motion', topic: 'Motion', difficulty: 'Starter', href: 'labs/lab1.html?a=1.2&dt=0.04', summary: 'Numerical stepping, velocity, acceleration, and error intuition.', icon: '↗' },
    { title: 'Harmonic Oscillator', topic: 'Waves', difficulty: 'Starter', href: 'labs/lab2.html?x0=1&v0=0&k=1', summary: 'Energy shuttles between motion and stored spring potential.', icon: '〰' },
    { title: 'Two-Body Orbit', topic: 'Orbits', difficulty: 'Core', href: 'labs/lab3.html?r0=2&v0=0.72&integrator=verlet', summary: 'Gravity bends a moving body into ellipses, loops, and escapes.', icon: '☉' },
    { title: 'Three-Body Chaos', topic: 'Orbits', difficulty: 'Challenge', href: 'labs/lab4.html?preset=figure8', summary: 'Tiny starting differences grow into dramatic gravitational surprises.', icon: '✦' },
    { title: 'ISS Ground Track', topic: 'Spacecraft', difficulty: 'Core', href: 'labs/lab5_iss.html?run=1', summary: 'Watch a low-Earth satellite sweep around a rotating planet.', icon: '🛰' },
    { title: 'Kepler Laws', topic: 'Orbits', difficulty: 'Core', href: 'labs/lab6_kepler.html?ecc=0.45', summary: 'Area sweep and orbital periods become visible geometry.', icon: '◌' },
    { title: 'Lyapunov Chaos', topic: 'Systems', difficulty: 'Challenge', href: 'labs/lab7_lyapunov.html?run=1', summary: 'Estimate how quickly nearby paths split apart.', icon: 'λ' },
    { title: 'N-Body Galaxy', topic: 'Galaxies', difficulty: 'Challenge', href: 'labs/lab8_nbody.html?N=180&run=1', summary: 'Many simple gravitational pulls become clusters, arms, and swirls.', icon: '✺' },
    { title: 'Radioactive Decay', topic: 'Matter', difficulty: 'Starter', href: 'labs/lab9_decay.html?N0=900&lambda=0.08', summary: 'Half-life curves emerge from probabilistic atomic events.', icon: '☢' },
    { title: 'Photoelectric Effect', topic: 'Quantum', difficulty: 'Core', href: 'labs/lab10_photoelectric.html?frequency=7&intensity=70', summary: 'Photon energy thresholds reveal quantum behavior.', icon: 'γ' },
    { title: 'RC Circuit', topic: 'Circuits', difficulty: 'Starter', href: 'labs/lab11_rc.html?R=1200&C=0.001', summary: 'Capacitors charge and discharge through elegant exponential curves.', icon: '⚡' },
    { title: 'Diffusion Walk', topic: 'Matter', difficulty: 'Core', href: 'labs/lab12_diffusion.html?particles=420&run=1', summary: 'Random microscopic steps build a smooth macroscopic spread.', icon: '⋱' },
    { title: 'Wave Equation', topic: 'Waves', difficulty: 'Core', href: 'labs/lab13_wave.html?mode=pluck&run=1', summary: 'A string carries energy through reflections and interference.', icon: '≈' },
    { title: 'Exoplanet Transit', topic: 'Cosmos', difficulty: 'Core', href: 'labs/lab14_exoplanet.html?radiusRatio=0.11&inclination=88.5', summary: 'Measure tiny starlight dips to infer hidden planets.', icon: '◐' },
    { title: 'Gravitational Lensing', topic: 'Cosmos', difficulty: 'Challenge', href: 'labs/lab15_lensing.html?mass=92&offset=24', summary: 'Mass bends light into arcs, rings, and duplicate images.', icon: '◎' },
    { title: 'Hubble Expansion', topic: 'Cosmology', difficulty: 'Core', href: 'labs/lab16_hubble.html?H0=70&run=1', summary: 'Use galaxy redshift patterns to explore expansion rate.', icon: '⇱' },
    { title: 'Stellar Life', topic: 'Stars', difficulty: 'Core', href: 'labs/lab17_stellar.html?mass=8', summary: 'Change stellar mass to compare brightness, lifetime, and fate.', icon: '✹' },

    { title: 'Solar System Orrery', topic: 'Cosmos', difficulty: 'Core', href: 'labs/lab18_orrery.html?speed=1.2&scale=1', summary: 'Compare planetary speeds, distances, and orbital periods.', icon: '☉' },
    { title: 'Moon Phases & Eclipses', topic: 'Cosmos', difficulty: 'Starter', href: 'labs/lab19_moon.html?phase=35&tilt=5.1', summary: 'Explore phases, shadows, orbital tilt, and eclipse alignment.', icon: '☾' },
    { title: 'Telescope Resolution', topic: 'Astronomy', difficulty: 'Core', href: 'labs/lab20_telescope.html?aperture=130&wavelength=540', summary: 'See diffraction blur respond to aperture and wavelength.', icon: '🔭' },
    { title: 'Spectroscopy Lab', topic: 'Astronomy', difficulty: 'Core', href: 'labs/lab21_spectroscopy.html?redshift=0.04&temperature=6200', summary: 'Use spectral lines to identify elements and measure motion.', icon: '▥' },
    { title: 'Exoplanet Radial Velocity', topic: 'Cosmos', difficulty: 'Challenge', href: 'labs/lab22_radial_velocity.html?mass=2.4&period=110', summary: 'Detect hidden planets from stellar wobble curves.', icon: '〽' },
    { title: 'Galaxy Rotation Curve', topic: 'Galaxies', difficulty: 'Challenge', href: 'labs/lab23_rotation_curve.html?halo=0.55&disk=1', summary: 'Compare visible mass with dark matter halo behavior.', icon: '◉' },
    { title: 'CMB Map', topic: 'Cosmology', difficulty: 'Core', href: 'labs/lab24_cmb.html?contrast=1.2&smooth=4', summary: 'Visualize early-universe temperature fluctuations.', icon: '▦' },
    { title: 'Black Hole Lensing', topic: 'Cosmos', difficulty: 'Challenge', href: 'labs/lab25_blackhole.html?mass=1.2&impact=96', summary: 'Bend light near an event horizon and photon sphere.', icon: '●' },
    { title: 'Projectile Motion 2D', topic: 'Motion', difficulty: 'Starter', href: 'labs/lab26_projectile.html?angle=42&speed=58&drag=0.01', summary: 'Launch projectiles with angle, gravity, and drag.', icon: '↗' },
    { title: 'Collisions & Momentum', topic: 'Motion', difficulty: 'Core', href: 'labs/lab27_collisions.html?elasticity=0.85&massRatio=1.5', summary: 'Compare elastic and inelastic momentum transfer.', icon: '◌' },
    { title: 'Electromagnetic Field Lines', topic: 'Fields', difficulty: 'Core', href: 'labs/lab28_electric_fields.html?separation=150&strength=1', summary: 'Map electric fields around charges and dipoles.', icon: '⊕' },
    { title: 'Magnetic Lorentz Force', topic: 'Fields', difficulty: 'Core', href: 'labs/lab29_lorentz.html?field=1&velocity=1.6', summary: 'Watch charged particles curve in magnetic fields.', icon: '⟲' },
    { title: 'Double Slit Interference', topic: 'Waves', difficulty: 'Core', href: 'labs/lab30_double_slit.html?wavelength=520&spacing=1.4', summary: 'Tune wave interference fringes from two slits.', icon: '≈' },
    { title: 'Thermodynamics Gas Box', topic: 'Matter', difficulty: 'Core', href: 'labs/lab31_gas.html?temperature=1.6&particles=90', summary: 'Connect particle motion, temperature, and pressure.', icon: '✣' },
    { title: 'Pendulum Chaos', topic: 'Systems', difficulty: 'Challenge', href: 'labs/lab32_pendulum.html?energy=1.4&coupling=0.65', summary: 'Compare regular swing motion with chaotic sensitivity.', icon: '⌁' },
    { title: 'Standing Waves & Resonance', topic: 'Waves', difficulty: 'Core', href: 'labs/lab33_standing_waves.html?mode=3&amplitude=42', summary: 'Explore nodes, antinodes, modes, and resonance.', icon: '≋' },
    { title: 'Escape Velocity', topic: 'Cosmos', difficulty: 'Core', href: 'labs/lab34_escape.html?mass=1&radius=1&launch=1.5', summary: 'Compare launch speed with gravity’s escape threshold.', icon: '⇡' },
    { title: 'Lagrange Points', topic: 'Cosmos', difficulty: 'Challenge', href: 'labs/lab35_lagrange.html?massRatio=0.22&separation=240', summary: 'Find orbital balance regions in two-body systems.', icon: '△' },
    { title: 'Roche Limit & Tides', topic: 'Cosmos', difficulty: 'Challenge', href: 'labs/lab36_roche.html?distance=150&density=1', summary: 'Explore tidal stretching and disruption near massive bodies.', icon: '☽' },
    { title: 'Neutron Star Pulsar', topic: 'Stars', difficulty: 'Core', href: 'labs/lab37_pulsar.html?spin=1.4&beam=24', summary: 'Watch rotating beams produce precise pulses.', icon: '✺' },
    { title: 'Supernova Light Curve', topic: 'Stars', difficulty: 'Core', href: 'labs/lab38_supernova.html?energy=1.1&nickel=0.55', summary: 'Model peak brightness and radioactive tail fading.', icon: '✷' },
    { title: 'Gravitational Waves', topic: 'Relativity', difficulty: 'Challenge', href: 'labs/lab39_gravitational_waves.html?mass=1.4&distance=1.8', summary: 'Visualize inspiral chirps from compact binary mergers.', icon: '〰' },
    { title: 'Light Polarization', topic: 'Waves', difficulty: 'Core', href: 'labs/lab40_polarization.html?angle=35&intensity=1', summary: 'Rotate filters and test Malus law.', icon: '↕' },
    { title: 'Heat Conduction', topic: 'Matter', difficulty: 'Core', href: 'labs/lab41_heat.html?diffusivity=1&gradient=1.2', summary: 'Watch thermal energy diffuse from hot to cool.', icon: '▤' }
  ];

  const missions = [
    { title: 'Orbit Architect', text: 'Design a stable orbit, then compare it with Kepler geometry.', links: [['Two-body orbit', 'labs/lab3.html?r0=2&v0=0.72&integrator=verlet'], ['Kepler laws', 'labs/lab6_kepler.html?ecc=0.35']] },
    { title: 'Chaos Detective', text: 'Start with three bodies, then measure sensitivity with Lyapunov growth.', links: [['Three-body chaos', 'labs/lab4.html?preset=figure8'], ['Lyapunov estimator', 'labs/lab7_lyapunov.html?run=1']] },
    { title: 'Galaxy Builder', text: 'Zoom from orbital gravity to many-body structure.', links: [['N-body galaxy', 'labs/lab8_nbody.html?N=180&run=1'], ['Cosmos explorer', 'cosmos-explorer.html']] },
    { title: 'Quantum Spark', text: 'Connect photons, atoms, thresholds, and probability.', links: [['Photoelectric effect', 'labs/lab10_photoelectric.html?frequency=7&intensity=70'], ['Radioactive decay', 'labs/lab9_decay.html?N0=900&lambda=0.08']] },
    { title: 'Wave Rider', text: 'Move from simple oscillation to full wave propagation.', links: [['Oscillator', 'labs/lab2.html?x0=1&v0=0&k=1'], ['Wave equation', 'labs/lab13_wave.html?mode=pluck&run=1']] },
    { title: 'Systems Pulse', text: 'See exponential change in matter, circuits, and diffusion.', links: [['RC circuit', 'labs/lab11_rc.html?R=1200&C=0.001'], ['Diffusion walk', 'labs/lab12_diffusion.html?particles=420&run=1']] },
    { title: 'Planet Hunter', text: 'Detect an unseen world from a star’s repeating light dip.', links: [['Exoplanet transit', 'labs/lab14_exoplanet.html?radiusRatio=0.11&inclination=88.5'], ['Stellar life', 'labs/lab17_stellar.html?mass=1']] },
    { title: 'Relativity Lens', text: 'Use curved spacetime to magnify and split background light.', links: [['Gravitational lensing', 'labs/lab15_lensing.html?mass=100&offset=18'], ['Hubble expansion', 'labs/lab16_hubble.html?H0=70&run=1']] },

    { title: 'Sky Geometry', text: 'Compare orrery motion with Moon phase and eclipse alignment.', links: [['Solar system orrery', 'labs/lab18_orrery.html?speed=1.2&scale=1'], ['Moon phases', 'labs/lab19_moon.html?phase=35&tilt=5.1']] },
    { title: 'Light Decoder', text: 'Use telescopes, spectra, slits, and lenses to understand cosmic light.', links: [['Spectroscopy lab', 'labs/lab21_spectroscopy.html?redshift=0.04'], ['Double slit', 'labs/lab30_double_slit.html?wavelength=520&spacing=1.4']] },
    { title: 'Hidden Matter', text: 'Compare galaxy rotation curves, lensing, and black-hole light bending.', links: [['Rotation curve', 'labs/lab23_rotation_curve.html?halo=0.55'], ['Black hole lensing', 'labs/lab25_blackhole.html?mass=1.2']] },
    { title: 'Classical Physics Pack', text: 'Launch projectiles, collide masses, map fields, and bend charges.', links: [['Projectile motion', 'labs/lab26_projectile.html?angle=42&speed=58'], ['Field lines', 'labs/lab28_electric_fields.html?separation=150']] },

    { title: 'Relativity & Remnants', text: 'Explore escape speed, black holes, pulsars, supernovae, and gravitational waves.', links: [['Escape velocity', 'labs/lab34_escape.html?mass=1&radius=1'], ['Gravitational waves', 'labs/lab39_gravitational_waves.html?mass=1.4']] },
    { title: 'Thermal & Light Lab', text: 'Compare heat diffusion with light polarization and wave interference.', links: [['Heat conduction', 'labs/lab41_heat.html?diffusivity=1'], ['Light polarization', 'labs/lab40_polarization.html?angle=35']] }
  ];

  const dashboard = document.getElementById('simulationDashboard');
  const filterRow = document.getElementById('simFilterRow');
  const search = document.getElementById('simSearch');
  const missionGrid = document.getElementById('missionPresetGrid');
  if (!dashboard || !filterRow || !search || !missionGrid) return;

  const topics = ['All', ...new Set(simulations.map((sim) => sim.topic))];
  let activeTopic = 'All';

  filterRow.innerHTML = topics.map((topic) => `<button class="filter-btn ${topic === 'All' ? 'active' : ''}" data-topic="${topic}">${topic}</button>`).join('');
  missionGrid.innerHTML = missions.map((mission) => `
    <article class="mission-card">
      <span class="mission-orbit"></span>
      <h3>${mission.title}</h3>
      <p>${mission.text}</p>
      <div class="card-links">
        ${mission.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
      </div>
    </article>
  `).join('');

  filterRow.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      filterRow.querySelectorAll('button').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      activeTopic = button.dataset.topic;
      renderDashboard();
    });
  });
  search.addEventListener('input', renderDashboard);

  function renderDashboard() {
    const query = search.value.trim().toLowerCase();
    const filtered = simulations.filter((sim) => {
      const topicMatch = activeTopic === 'All' || sim.topic === activeTopic;
      const textMatch = `${sim.title} ${sim.topic} ${sim.summary}`.toLowerCase().includes(query);
      return topicMatch && textMatch;
    });
    dashboard.innerHTML = filtered.map((sim, index) => `
      <article class="sim-tile">
        <div class="sim-thumb">
          <canvas class="sim-preview" width="300" height="160" data-preview="${sim.topic}" data-title="${sim.title}" data-index="${index}" aria-hidden="true"></canvas>
          <span class="thumb-label">${sim.icon} ${sim.difficulty}</span>
        </div>
        <div class="sim-tile-body">
          <div class="item-top">
            <span class="badge badge-sim">${sim.topic}</span>
            <span class="item-date">${sim.difficulty}</span>
          </div>
          <h3>${sim.icon} ${sim.title}</h3>
          <p>${sim.summary}</p>
          <div class="card-links">
            <a href="${sim.href}">Launch simulation</a>
            <a href="compare.html?left=${encodeURIComponent(sim.href)}">Compare it</a>
          </div>
        </div>
      </article>
    `).join('') || '<p class="empty-state">No matching simulation yet. Try orbit, wave, quantum, matter, or circuit.</p>';
    paintPreviews();
  }

  function paintPreviews() {
    dashboard.querySelectorAll('.sim-preview').forEach((canvas) => {
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      const topic = canvas.dataset.preview;
      const shift = Number(canvas.dataset.index) * 0.8;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#081026');
      gradient.addColorStop(0.55, '#101b3c');
      gradient.addColorStop(1, '#050711');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < 34; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.18 + (i % 5) * 0.08})`;
        ctx.beginPath();
        ctx.arc((i * 53 + shift * 19) % width, (i * 29 + shift * 31) % height, 0.8 + (i % 3), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = '#3ff3ff';
      ctx.lineWidth = 2;
      const title = canvas.dataset.title || '';
      if (title.includes('Transit')) drawTransitThumb(ctx, width, height);
      else if (title.includes('Lensing')) drawLensThumb(ctx, width, height);
      else if (title.includes('Hubble')) drawExpansionThumb(ctx, width, height);
      else if (title.includes('Stellar')) drawStarThumb(ctx, width, height);
      else if (topic === 'Waves') drawWave(ctx, width, height);
      else if (topic === 'Matter' || topic === 'Quantum') drawAtom(ctx, width, height);
      else if (topic === 'Circuits') drawCircuit(ctx, width, height);
      else if (topic === 'Galaxies' || topic === 'Cosmology' || topic === 'Stars' || topic === 'Relativity') drawGalaxy(ctx, width, height);
      else drawOrbit(ctx, width, height);
    });
  }

  function drawOrbit(ctx, width, height) {
    ctx.translate(width / 2, height / 2);
    ctx.strokeStyle = 'rgba(63,243,255,0.7)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 94, 42, -0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#ffdd57';
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#64a7ff';
    ctx.beginPath();
    ctx.arc(76, 24, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function drawWave(ctx, width, height) {
    ctx.beginPath();
    for (let x = 20; x < width - 20; x += 4) {
      const y = height / 2 + Math.sin(x * 0.055) * 34;
      if (x === 20) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function drawAtom(ctx, width, height) {
    ctx.translate(width / 2, height / 2);
    ['0', '0.8', '-0.8'].forEach((rotation) => {
      ctx.rotate(Number(rotation));
      ctx.strokeStyle = 'rgba(63,243,255,0.55)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 80, 28, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.fillStyle = '#ff4fa3';
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function drawCircuit(ctx, width, height) {
    ctx.strokeStyle = '#29d391';
    ctx.beginPath();
    ctx.moveTo(42, height / 2);
    ctx.lineTo(102, height / 2);
    ctx.moveTo(132, height / 2 - 34);
    ctx.lineTo(132, height / 2 + 34);
    ctx.moveTo(160, height / 2 - 34);
    ctx.lineTo(160, height / 2 + 34);
    ctx.moveTo(160, height / 2);
    ctx.lineTo(width - 42, height / 2);
    ctx.stroke();
    ctx.fillStyle = '#ffdd57';
    ctx.beginPath();
    ctx.arc(220, height / 2, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawGalaxy(ctx, width, height) {
    ctx.translate(width / 2, height / 2);
    for (let i = 0; i < 120; i++) {
      const radius = i * 0.78;
      const angle = i * 0.31;
      ctx.fillStyle = i % 6 === 0 ? '#ffdd57' : '#64a7ff';
      ctx.globalAlpha = 0.35 + (i % 6) * 0.08;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.46, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function drawTransitThumb(ctx, width, height) {
    ctx.translate(width / 2, height / 2);
    const star = ctx.createRadialGradient(-16, -12, 4, 0, 0, 46);
    star.addColorStop(0, '#ffffff');
    star.addColorStop(0.35, '#ffdd57');
    star.addColorStop(1, '#9b4d12');
    ctx.fillStyle = star;
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#050711';
    ctx.beginPath();
    ctx.arc(20, 2, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.strokeStyle = '#3ff3ff';
    ctx.beginPath();
    ctx.moveTo(38, height - 34);
    ctx.lineTo(108, height - 34);
    ctx.lineTo(130, height - 54);
    ctx.lineTo(156, height - 54);
    ctx.lineTo(178, height - 34);
    ctx.lineTo(width - 34, height - 34);
    ctx.stroke();
  }

  function drawLensThumb(ctx, width, height) {
    ctx.translate(width / 2, height / 2);
    ctx.strokeStyle = 'rgba(63,243,255,0.75)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 62, -1.2, 1.1);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,79,163,0.7)';
    ctx.beginPath();
    ctx.arc(0, 0, 42, 2.1, 4.2);
    ctx.stroke();
    ctx.fillStyle = '#ffdd57';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function drawExpansionThumb(ctx, width, height) {
    const cx = width / 2;
    const cy = height / 2;
    ctx.strokeStyle = 'rgba(63,243,255,0.18)';
    [30, 58, 86].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    for (let i = 0; i < 18; i++) {
      const angle = i * 2.399;
      const radius = 22 + (i % 6) * 18;
      ctx.fillStyle = i % 2 ? '#ff4fa3' : '#3ff3ff';
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius * 0.72, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawStarThumb(ctx, width, height) {
    const cx = width / 2;
    const cy = height / 2;
    const glow = ctx.createRadialGradient(cx - 20, cy - 20, 5, cx, cy, 58);
    glow.addColorStop(0, '#ffffff');
    glow.addColorStop(0.32, '#ffdd57');
    glow.addColorStop(1, '#ff4fa3');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(42, height - 36);
    ctx.quadraticCurveTo(width / 2, 36, width - 38, 58);
    ctx.stroke();
  }

  renderDashboard();
  animateStarfield(document.getElementById('cosmosStarfield'), 100);
  animateCosmosMap(document.getElementById('cosmosMapCanvas'));
})();

function animateStarfield(canvas, count) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.max(300, Math.round(rect.width * ratio));
    canvas.height = Math.max(220, Math.round(rect.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      z: 0.3 + Math.random() * 1.4
    }));
  }
  function draw() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      star.y += star.z * 0.18;
      if (star.y > height) star.y = 0;
      ctx.fillStyle = `rgba(255,255,255,${0.25 + star.z * 0.3})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.z, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();
}

function animateCosmosMap(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let time = 0;
  function draw() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#07122a');
    gradient.addColorStop(0.5, '#111c3e');
    gradient.addColorStop(1, '#050711');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const nodes = [
      ['Motion', 150, 260, '#3ff3ff'],
      ['Orbits', 345, 160, '#64a7ff'],
      ['Waves', 540, 295, '#29d391'],
      ['Matter', 735, 150, '#ffdd57'],
      ['Systems', 920, 275, '#ff4fa3']
    ];
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    nodes.forEach((node, index) => {
      if (index === 0) ctx.moveTo(node[1], node[2]);
      else ctx.lineTo(node[1], node[2]);
    });
    ctx.stroke();

    nodes.forEach(([label, x, y, color], index) => {
      const pulse = 10 + Math.sin(time * 0.03 + index) * 4;
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      ctx.arc(x, y, 42 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#eaf6ff';
      ctx.font = '600 20px system-ui, sans-serif';
      ctx.fillText(label, x - 42, y + 72);
    });
    time += 1;
    requestAnimationFrame(draw);
  }
  draw();
}
