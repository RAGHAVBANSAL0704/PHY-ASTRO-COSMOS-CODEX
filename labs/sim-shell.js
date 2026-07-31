(function initSimulationShell() {
  const simulations = {
    'lab1.html': {
      title: '1D Motion Simulator',
      subtitle: 'Compare numerical and analytical motion under constant acceleration.',
      model: 'motion',
      accent: '#3ff3ff'
    },
    'lab2.html': {
      title: 'Harmonic Oscillator Simulator',
      subtitle: 'Explore energy conservation, phase space, and stable oscillation.',
      model: 'oscillator',
      accent: '#29d391'
    },
    'lab3.html': {
      title: 'Two-Body Orbit Simulator',
      subtitle: 'Watch gravity bend motion into bound and open orbital paths.',
      model: 'orbit',
      accent: '#64a7ff'
    },
    'lab4.html': {
      title: 'Three-Body Chaos Simulator',
      subtitle: 'See tiny differences grow into chaotic gravitational paths.',
      model: 'chaos',
      accent: '#ff4fa3'
    },
    'lab5_iss.html': {
      title: 'ISS Orbit and Ground Track Simulator',
      subtitle: 'Follow a satellite orbit and its moving footprint on Earth.',
      model: 'earth',
      accent: '#3ff3ff'
    },
    'lab6_kepler.html': {
      title: 'Kepler Laws Simulator',
      subtitle: 'Test orbital area sweep and the relation between period and orbit size.',
      model: 'kepler',
      accent: '#ffdd57'
    },
    'lab7_lyapunov.html': {
      title: 'Lyapunov Chaos Estimator',
      subtitle: 'Measure how fast nearby paths separate in a chaotic system.',
      model: 'chaos',
      accent: '#ff4fa3'
    },
    'lab8_nbody.html': {
      title: 'N-Body Galaxy Simulator',
      subtitle: 'Explore emergent structure from many-body gravitational motion.',
      model: 'galaxy',
      accent: '#64a7ff'
    },
    'lab9_decay.html': {
      title: 'Radioactive Decay Simulator',
      subtitle: 'Compare half-life curves, activity, and stochastic fluctuations.',
      model: 'atom',
      accent: '#ffdd57'
    },
    'lab10_photoelectric.html': {
      title: 'Photoelectric Effect Simulator',
      subtitle: 'Tune light and work function to reveal photon energy thresholds.',
      model: 'photon',
      accent: '#ffdd57'
    },
    'lab11_rc.html': {
      title: 'RC Circuit Response Simulator',
      subtitle: 'Watch exponential charging and discharging in an electric circuit.',
      model: 'circuit',
      accent: '#29d391'
    },
    'lab12_diffusion.html': {
      title: 'Diffusion Random Walk Simulator',
      subtitle: 'Build a probability distribution from many tiny random steps.',
      model: 'diffusion',
      accent: '#3ff3ff'
    },
    'lab13_wave.html': {
      title: '1D Wave Equation Simulator',
      subtitle: 'Animate a vibrating string and track wave energy over time.',
      model: 'wave',
      accent: '#64a7ff'
    },
    'lab14_exoplanet.html': {
      title: 'Exoplanet Transit Simulator',
      subtitle: 'Infer planet size and orbital alignment from dips in starlight.',
      model: 'transit',
      accent: '#3ff3ff'
    },
    'lab15_lensing.html': {
      title: 'Gravitational Lensing Simulator',
      subtitle: 'Bend background light into arcs, rings, and duplicated images.',
      model: 'lensing',
      accent: '#64a7ff'
    },
    'lab16_hubble.html': {
      title: 'Hubble Expansion Simulator',
      subtitle: 'Connect galaxy distance, recession velocity, and cosmic expansion.',
      model: 'expansion',
      accent: '#ff4fa3'
    },
    'lab17_stellar.html': {
      title: 'Stellar Life Simulator',
      subtitle: 'Change stellar mass and watch lifetime, luminosity, and fate shift.',
      model: 'stellar',
      accent: '#ffdd57'
    },

    'lab18_orrery.html': {
      title: 'Solar System Orrery',
      subtitle: 'Compare orbital periods, distances, and relative planetary motion.',
      model: 'orbit',
      accent: '#ffdd57'
    },
    'lab19_moon.html': {
      title: 'Moon Phases & Eclipses',
      subtitle: 'Explore Sun-Earth-Moon geometry, phases, and eclipse alignment.',
      model: 'earth',
      accent: '#d7e8f8'
    },
    'lab20_telescope.html': {
      title: 'Telescope Resolution',
      subtitle: 'Change aperture and wavelength to see diffraction blur shrink or grow.',
      model: 'photon',
      accent: '#3ff3ff'
    },
    'lab21_spectroscopy.html': {
      title: 'Spectroscopy Lab',
      subtitle: 'Identify elements using absorption lines and Doppler redshift.',
      model: 'photon',
      accent: '#ffdd57'
    },
    'lab22_radial_velocity.html': {
      title: 'Exoplanet Radial Velocity',
      subtitle: 'Detect an unseen planet from the wobble of its star.',
      model: 'orbit',
      accent: '#64a7ff'
    },
    'lab23_rotation_curve.html': {
      title: 'Galaxy Rotation Curve',
      subtitle: 'Compare visible matter with a dark matter halo model.',
      model: 'galaxy',
      accent: '#64a7ff'
    },
    'lab24_cmb.html': {
      title: 'Cosmic Microwave Background Map',
      subtitle: 'Visualize tiny early-universe temperature fluctuations.',
      model: 'expansion',
      accent: '#ff4fa3'
    },
    'lab25_blackhole.html': {
      title: 'Black Hole Lensing',
      subtitle: 'Bend light near a photon sphere and compact event horizon.',
      model: 'lensing',
      accent: '#3ff3ff'
    },
    'lab26_projectile.html': {
      title: 'Projectile Motion 2D',
      subtitle: 'Launch a projectile with gravity, range, and optional drag intuition.',
      model: 'motion',
      accent: '#29d391'
    },
    'lab27_collisions.html': {
      title: 'Collisions & Momentum',
      subtitle: 'Compare elastic and inelastic collisions with center-of-mass motion.',
      model: 'motion',
      accent: '#ffdd57'
    },
    'lab28_electric_fields.html': {
      title: 'Electromagnetic Field Lines',
      subtitle: 'Map electric field patterns around charges and dipoles.',
      model: 'circuit',
      accent: '#3ff3ff'
    },
    'lab29_lorentz.html': {
      title: 'Magnetic Lorentz Force',
      subtitle: 'Watch charged particles curve in magnetic fields.',
      model: 'circuit',
      accent: '#29d391'
    },
    'lab30_double_slit.html': {
      title: 'Double Slit Interference',
      subtitle: 'Tune wavelength and slit spacing to reshape interference fringes.',
      model: 'wave',
      accent: '#64a7ff'
    },
    'lab31_gas.html': {
      title: 'Thermodynamics Gas Box',
      subtitle: 'Connect particle motion, temperature, pressure, and kinetic theory.',
      model: 'diffusion',
      accent: '#ff4fa3'
    },
    'lab32_pendulum.html': {
      title: 'Pendulum Chaos',
      subtitle: 'Compare regular motion with sensitive double-pendulum behavior.',
      model: 'chaos',
      accent: '#ff4fa3'
    },
    'lab33_standing_waves.html': {
      title: 'Standing Waves & Resonance',
      subtitle: 'Explore modes on strings and pipes through nodes and antinodes.',
      model: 'wave',
      accent: '#64a7ff'
    },

    'lab34_escape.html': { title: 'Escape Velocity Simulator', subtitle: 'Compare launch speed with the threshold needed to leave gravity.', model: 'orbit', accent: '#29d391' },
    'lab35_lagrange.html': { title: 'Lagrange Points Simulator', subtitle: 'Locate balance regions in a two-body gravitational system.', model: 'kepler', accent: '#ffdd57' },
    'lab36_roche.html': { title: 'Roche Limit & Tides Simulator', subtitle: 'Explore tidal stretching and disruption near massive bodies.', model: 'earth', accent: '#ff4fa3' },
    'lab37_pulsar.html': { title: 'Neutron Star Pulsar Simulator', subtitle: 'Watch rotating beams create periodic pulses.', model: 'stellar', accent: '#3ff3ff' },
    'lab38_supernova.html': { title: 'Supernova Light Curve Simulator', subtitle: 'Model rapid brightening and radioactive tail fading.', model: 'stellar', accent: '#ffdd57' },
    'lab39_gravitational_waves.html': { title: 'Gravitational Waves Simulator', subtitle: 'Visualize inspiral chirps from compact binary mergers.', model: 'wave', accent: '#64a7ff' },
    'lab40_polarization.html': { title: 'Light Polarization Simulator', subtitle: 'Rotate filters and watch transmitted intensity follow Malus law.', model: 'photon', accent: '#3ff3ff' },
    'lab41_heat.html': { title: 'Heat Conduction Simulator', subtitle: 'Watch temperature smooth out through diffusion of thermal energy.', model: 'diffusion', accent: '#ff4fa3' }
  };

  const pageName = window.location.pathname.split('/').pop();
  const config = simulations[pageName];
  if (!config) return;

  document.body.classList.add('simulation-page');
  document.documentElement.style.setProperty('--accent', config.accent);
  document.title = `${config.title} | Cosmic Physics Lab`;

  const header = document.querySelector('.site-header');
  const heading = header?.querySelector('h1');
  const subhead = header?.querySelector('.muted');
  if (heading) heading.textContent = config.title;
  if (subhead) subhead.textContent = config.subtitle;

  const topbar = document.createElement('div');
  topbar.className = 'simulation-topbar';
  topbar.innerHTML = `
    <a class="simulation-brand" href="../index.html">Cosmic Physics Lab</a>
    <div class="simulation-links">
      <a href="../simulations.html">Simulations</a>
      <a href="../physics.html">Physics</a>
      <a href="../astronomy.html">Astronomy</a>
    </div>
  `;
  document.body.insertBefore(topbar, document.body.firstChild);

  const modelPanel = document.createElement('section');
  modelPanel.className = 'simulation-model-panel';
  modelPanel.innerHTML = `
    <div class="model-copy">
      <p class="model-kicker">Interactive simulation</p>
      <h2>${config.title}</h2>
      <p>${config.subtitle}</p>
    </div>
    <canvas id="cosmicModel" width="520" height="320" aria-label="${config.title} 3D model"></canvas>
  `;
  header.insertAdjacentElement('afterend', modelPanel);

  const toolkit = document.createElement('section');
  toolkit.className = 'simulation-toolkit';
  const lesson = getLearningTrail(config);
  const quiz = getQuiz(config);
  toolkit.innerHTML = `
    <article class="observe-card">
      <p class="model-kicker">What to observe</p>
      <h3>Watch the hidden pattern</h3>
      <ol>
        ${lesson.watch.map((item) => `<li>${item}</li>`).join('')}
      </ol>
    </article>
    <article class="observe-card">
      <p class="model-kicker">Learning mode</p>
      <h3>Try → Explain</h3>
      <ol>
        <li><strong>Try:</strong> ${lesson.try}</li>
        <li><strong>Explain:</strong> ${lesson.explain}</li>
        <li><strong>Challenge:</strong> ${lesson.challenge}</li>
      </ol>
    </article>
    <article>
      <p class="model-kicker">Quick tools</p>
      <h3>Capture your experiment</h3>
      <p>Save the main visual as an image, then compare it with another simulator.</p>
      <div class="simulation-tool-actions">
        <button class="btn" type="button" id="saveSimulationView">Save view</button>
        <button class="btn" type="button" id="exportSimulationCsv">Export CSV</button>
        <a class="btn" href="../compare.html?left=${encodeURIComponent(`labs/${pageName}`)}">Compare mode</a>
        <a class="btn" href="../methodology.html">Model limits</a>
      </div>
    </article>
    <article class="quiz-card">
      <p class="model-kicker">Quiz mode</p>
      <h3>${quiz.question}</h3>
      <div class="quiz-options" id="simulationQuiz">
        ${quiz.options.map((option, index) => `<button class="btn quiz-option" type="button" data-answer="${index === quiz.correct}">${option}</button>`).join('')}
      </div>
      <p class="quiz-feedback" id="quizFeedback">Pick an answer to test your intuition.</p>
    </article>
    <article class="notes-card">
      <p class="model-kicker">Local notes</p>
      <h3>Write an observation</h3>
      <textarea id="simulationNotes" rows="5" placeholder="What changed? What surprised you? What question comes next?"></textarea>
      <div class="simulation-tool-actions">
        <button class="btn" type="button" id="saveSimulationNote">Save note</button>
        <button class="btn" type="button" id="downloadSimulationNote">Download note</button>
      </div>
      <p class="quiz-feedback" id="noteFeedback">Notes save only if progress saving is turned on.</p>
    </article>
  `;
  modelPanel.insertAdjacentElement('afterend', toolkit);

  document.querySelectorAll('section.card h2').forEach((title) => {
    title.textContent = title.textContent
      .replace('📘 Theory', 'Core Idea')
      .replace('⚙️ Controls', 'Controls')
      .replace('📈', '')
      .replace('📊', '')
      .replace('⚡', '')
      .replace('🧮', '')
      .replace('🌍', '')
      .replace('🧭', '')
      .replace('✨', '')
      .trim();
  });

  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.innerHTML = '<a href="../simulations.html">Back to simulations</a>';
  }

  prepareSimulationCanvases();
  applySimulationParams();
  wireSnapshotButton(config.title);
  wireCsvExport(config.title);
  wireQuizMode();
  wireNotes(config.title);
  runCosmicModel(document.getElementById('cosmicModel'), config);
})();

function getLearningTrail(config) {
  const trails = {
    orbit: {
      watch: ['Gravity bends direction continuously, even when speed looks steady.', 'Closed paths and escape paths appear when energy changes.', 'Angular momentum keeps the orbit sweeping around the center.'],
      try: 'Increase starting speed until a closed orbit becomes an escape path.',
      explain: 'Use energy and angular momentum to describe the new path.',
      challenge: 'Find a setting that makes a long-lasting ellipse.'
    },
    earth: {
      watch: ['The spacecraft moves in orbit while Earth rotates below it.', 'Ground tracks shift between repeated passes.', 'Inclination controls how far north and south the track reaches.'],
      try: 'Start the motion, then pause and compare orbit position with ground track.',
      explain: 'Describe why the footprint shifts west or east over repeated passes.',
      challenge: 'Pause after one orbit and compare the new footprint location.'
    },
    kepler: {
      watch: ['The planet speeds up near closest approach.', 'Equal areas sweep out in equal times.', 'Larger orbits take longer to complete.'],
      try: 'Raise eccentricity and compare slow and fast parts of the orbit.',
      explain: 'Connect the pattern to angular momentum conservation.',
      challenge: 'Make the orbit very stretched and identify perihelion.'
    },
    wave: {
      watch: ['Crests travel while points on the medium oscillate.', 'Reflections change the pattern at boundaries.', 'Energy spreads through the string or field.'],
      try: 'Change amplitude, speed, or boundary behavior to alter the pattern.',
      explain: 'Use wavelength, frequency, and reflection to predict the shape.',
      challenge: 'Create a shape that reflects cleanly from an edge.'
    },
    oscillator: {
      watch: ['Kinetic and potential energy trade places.', 'Phase space loops reveal periodic motion.', 'Damping or parameter changes alter the pattern.'],
      try: 'Change mass, spring strength, or starting displacement.',
      explain: 'Describe why the period changes or stays stable.',
      challenge: 'Find a setting with the same shape but different speed.'
    },
    motion: {
      watch: ['Position, velocity, and acceleration evolve step by step.', 'Large time steps create visible numerical error.', 'Smaller steps track the smooth solution better.'],
      try: 'Increase the time step until numerical error becomes visible.',
      explain: 'Explain why smaller steps follow the true curve better.',
      challenge: 'Find the largest time step that still looks accurate.'
    },
    galaxy: {
      watch: ['Many simple pulls create large-scale structure.', 'Dense regions form from local clustering.', 'Initial spread changes the final shape.'],
      try: 'Change the number of bodies or starting spread.',
      explain: 'Describe why local interactions can create large-scale patterns.',
      challenge: 'Make a pattern that resembles a loose galaxy.'
    },
    chaos: {
      watch: ['Nearly identical starts separate over time.', 'Prediction becomes fragile in nonlinear systems.', 'A small change can reshape the entire path.'],
      try: 'Reset with a slightly changed starting condition.',
      explain: 'Explain why long-term prediction becomes fragile.',
      challenge: 'Compare two runs and find where they first diverge.'
    },
    atom: {
      watch: ['Individual events look random.', 'Large groups form smooth exponential curves.', 'Half-life measures proportional change, not fixed subtraction.'],
      try: 'Change decay constant or starting particle count.',
      explain: 'Describe how probability becomes predictable in large groups.',
      challenge: 'Double the starting count and compare curve smoothness.'
    },
    photon: {
      watch: ['Electrons appear only after a threshold frequency.', 'Intensity changes counts, not photon energy.', 'Stopping voltage tracks maximum kinetic energy.'],
      try: 'Change intensity before and after the threshold.',
      explain: 'Explain why frequency controls energy but intensity controls count.',
      challenge: 'Find a frequency that emits electrons at low intensity.'
    },
    circuit: {
      watch: ['Voltage approaches the final value smoothly.', 'Resistance and capacitance stretch the time scale.', 'Charging and discharging mirror exponential behavior.'],
      try: 'Change resistance or capacitance to stretch the curve.',
      explain: 'Use the time constant to explain the response.',
      challenge: 'Create a very slow charging curve.'
    },
    diffusion: {
      watch: ['Random steps spread outward from the start.', 'More particles make the distribution smoother.', 'Average spread grows even though each path is random.'],
      try: 'Increase particle count and compare smoothness.',
      explain: 'Connect microscopic randomness to macroscopic diffusion.',
      challenge: 'Make a smooth bell-like distribution.'
    },
    transit: {
      watch: ['Brightness dips when the planet crosses the star.', 'Bigger planets make deeper dips.', 'Tilted orbits can miss the star entirely.'],
      try: 'Change radius and inclination until the transit vanishes or deepens.',
      explain: 'Use dip depth to estimate the planet-to-star size ratio.',
      challenge: 'Make a shallow transit that still repeats clearly.'
    },
    lensing: {
      watch: ['Foreground mass shifts background light.', 'Better alignment creates stronger arcs or rings.', 'More mass increases the apparent lensing scale.'],
      try: 'Move source offset toward zero to form a near-ring.',
      explain: 'Connect image splitting to mass curving the path of light.',
      challenge: 'Tune the source into a near Einstein ring.'
    },
    expansion: {
      watch: ['Farther galaxies show higher recession speed.', 'The graph slope is the Hubble constant.', 'Changing expansion rate changes every distance-velocity point.'],
      try: 'Change Hubble constant and compare the graph slope.',
      explain: 'Use v = H₀d to describe expansion rate.',
      challenge: 'Predict velocity at 100 Mpc before reading it.'
    },
    stellar: {
      watch: ['Mass changes color, temperature, and luminosity.', 'Massive stars burn fuel much faster.', 'Final fate depends strongly on stellar mass.'],
      try: 'Compare a red dwarf, Sun-like star, and massive blue star.',
      explain: 'Explain why massive stars burn brighter but live shorter lives.',
      challenge: 'Find the transition from white dwarf fate to supernova remnant.'
    }
  };
  return trails[config.model] || trails.orbit;
}

function getQuiz(config) {
  const quizzes = {
    orbit: {
      question: 'What usually turns a closed orbit into an escape path?',
      options: ['Higher starting speed', 'Lower star mass only', 'A darker background'],
      correct: 0
    },
    earth: {
      question: 'Why does an ISS ground track shift between passes?',
      options: ['Earth rotates below the orbit', 'The map is random', 'The satellite stops above one city'],
      correct: 0
    },
    kepler: {
      question: 'What happens near closest approach in an elliptical orbit?',
      options: ['The planet moves faster', 'The planet disappears', 'Gravity turns off'],
      correct: 0
    },
    wave: {
      question: 'What does a wave mainly transport?',
      options: ['Energy', 'Only empty space', 'A permanent pile of matter'],
      correct: 0
    },
    oscillator: {
      question: 'In a simple oscillator, energy moves between:',
      options: ['kinetic and potential forms', 'mass and color', 'temperature and charge only'],
      correct: 0
    },
    motion: {
      question: 'Why do smaller numerical time steps often improve accuracy?',
      options: ['They approximate continuous change better', 'They remove gravity', 'They make units vanish'],
      correct: 0
    },
    galaxy: {
      question: 'What creates structure in an N-body gravity simulation?',
      options: ['Many local gravitational pulls', 'A fixed painted image', 'One particle doing everything'],
      correct: 0
    },
    chaos: {
      question: 'A chaotic system is hard to predict long-term because:',
      options: ['small differences grow over time', 'it has no rules', 'time steps are forbidden'],
      correct: 0
    },
    atom: {
      question: 'Half-life describes:',
      options: ['time for half a sample to remain', 'the exact death time of one atom', 'the age of a star'],
      correct: 0
    },
    photon: {
      question: 'In the photoelectric effect, electron emission first requires enough:',
      options: ['light frequency', 'screen size', 'planet mass'],
      correct: 0
    },
    circuit: {
      question: 'An RC circuit response is shaped mainly by:',
      options: ['the time constant RC', 'the color of the wire', 'the browser speed'],
      correct: 0
    },
    diffusion: {
      question: 'Diffusion becomes smooth at large scale because:',
      options: ['many random walks average into a pattern', 'particles stop moving', 'randomness is impossible'],
      correct: 0
    },
    transit: {
      question: 'A deeper transit dip usually means:',
      options: ['a larger planet relative to the star', 'a smaller telescope', 'a colder universe'],
      correct: 0
    },
    lensing: {
      question: 'Gravitational lensing happens because mass:',
      options: ['curves spacetime and bends light paths', 'absorbs all light perfectly', 'makes stars smaller'],
      correct: 0
    },
    expansion: {
      question: 'In Hubble’s law, a steeper distance-velocity slope means:',
      options: ['a larger Hubble constant', 'no expansion', 'less distance'],
      correct: 0
    },
    stellar: {
      question: 'Massive stars usually live shorter lives because they:',
      options: ['burn fuel much faster', 'have no fusion', 'are colder than planets'],
      correct: 0
    }
  };
  return quizzes[config.model] || quizzes.orbit;
}

function applySimulationParams() {
  const params = new URLSearchParams(window.location.search);
  if ([...params.keys()].length === 0) return;

  let changed = false;
  params.forEach((value, key) => {
    if (key === 'run' || key === 'preset') return;
    const element = document.getElementById(key) || document.querySelector(`[name="${CSS.escape(key)}"]`);
    if (!element) return;
    if ('value' in element) {
      element.value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      changed = true;
    }
  });

  if (changed) {
    const resetButton = document.getElementById('resetBtn') || document.getElementById('loadBtn') || document.getElementById('loadTLE');
    resetButton?.click();
  }

  if (params.get('run') === '1') {
    const startButton =
      document.getElementById('startBtn') ||
      document.getElementById('toggleRun') ||
      document.getElementById('runBtn') ||
      document.getElementById('animateBtn');
    setTimeout(() => startButton?.click(), 120);
  }
}

function wireSnapshotButton(title) {
  const button = document.getElementById('saveSimulationView');
  if (!button) return;
  button.addEventListener('click', () => {
    const canvas = document.querySelector('canvas.sim-canvas');
    if (!canvas) {
      button.textContent = 'No canvas found';
      return;
    }
    const link = document.createElement('a');
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    link.download = `${safeTitle || 'simulation'}-snapshot.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    button.textContent = 'Saved view';
    setTimeout(() => {
      button.textContent = 'Save view';
    }, 1400);
  });
}

function wireCsvExport(title) {
  const button = document.getElementById('exportSimulationCsv');
  if (!button) return;
  button.addEventListener('click', () => {
    const rows = [
      ['field', 'value'],
      ['simulation', title],
      ['page', window.location.pathname.split('/').pop()],
      ['exported_at', new Date().toISOString()]
    ];

    document.querySelectorAll('input, select, textarea').forEach((element) => {
      const label = findLabel(element);
      const value = element.type === 'checkbox' ? String(element.checked) : element.value;
      rows.push([label || element.id || element.name || element.tagName.toLowerCase(), value]);
    });

    document.querySelectorAll('canvas.sim-canvas').forEach((canvas, index) => {
      rows.push([`canvas_${index + 1}_id`, canvas.id || 'unnamed']);
      rows.push([`canvas_${index + 1}_width`, canvas.width]);
      rows.push([`canvas_${index + 1}_height`, canvas.height]);
    });

    document.querySelectorAll('table').forEach((table, tableIndex) => {
      table.querySelectorAll('tr').forEach((tr, rowIndex) => {
        const cells = [...tr.children].map((cell) => cell.textContent.trim()).join(' | ');
        if (cells) rows.push([`table_${tableIndex + 1}_row_${rowIndex + 1}`, cells]);
      });
    });

    document.querySelectorAll('.status, .muted, [id$="Stats"], [id$="Readout"]').forEach((element, index) => {
      const text = element.textContent.trim();
      if (text) rows.push([`visible_readout_${index + 1}`, text]);
    });

    const csv = rows.map((row) => row.map(csvCell).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    link.download = `${safeTitle || 'simulation'}-settings.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    button.textContent = 'CSV exported';
    setTimeout(() => {
      button.textContent = 'Export CSV';
    }, 1400);
  });
}

function wireNotes(title) {
  const textarea = document.getElementById('simulationNotes');
  const saveButton = document.getElementById('saveSimulationNote');
  const downloadButton = document.getElementById('downloadSimulationNote');
  const feedback = document.getElementById('noteFeedback');
  if (!textarea || !saveButton || !downloadButton || !feedback) return;

  const progress = window.cosmicProgress;
  const path = window.location.pathname.split('/').pop();
  const saved = progress?.get?.().notes?.[path]?.text;
  if (saved) textarea.value = saved;

  saveButton.addEventListener('click', () => {
    if (!progress?.enabled?.()) {
      feedback.textContent = 'Turn on progress saving first if you want notes stored in this browser.';
      return;
    }
    progress.saveNote(title, textarea.value.trim());
    feedback.textContent = 'Note saved locally on this device.';
  });

  downloadButton.addEventListener('click', () => {
    const content = `${title}\n${new Date().toLocaleString()}\n\n${textarea.value.trim() || 'No note written yet.'}\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    const safeTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    link.download = `${safeTitle || 'simulation'}-notes.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

function findLabel(element) {
  if (element.id) {
    const explicit = document.querySelector(`label[for="${CSS.escape(element.id)}"]`);
    if (explicit) return explicit.textContent.trim();
  }
  const previous = element.previousElementSibling;
  if (previous?.tagName === 'LABEL') return previous.textContent.trim();
  return '';
}

function csvCell(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function wireQuizMode() {
  const quiz = document.getElementById('simulationQuiz');
  const feedback = document.getElementById('quizFeedback');
  if (!quiz || !feedback) return;
  quiz.querySelectorAll('.quiz-option').forEach((button) => {
    button.addEventListener('click', () => {
      quiz.querySelectorAll('.quiz-option').forEach((option) => {
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
      });
      const isCorrect = button.dataset.answer === 'true';
      button.classList.add(isCorrect ? 'correct' : 'incorrect');
      feedback.textContent = isCorrect
        ? 'Correct — that is the key physics idea. Nice orbit-brain.'
        : 'Not quite. Try again and look closely at the pattern in the simulation.';
      if (isCorrect) window.cosmicProgress?.markQuiz?.(document.title.replace(' | Cosmic Physics Lab', ''));
    });
  });
}

function prepareSimulationCanvases() {
  document.querySelectorAll('canvas.sim-canvas').forEach((canvas) => {
    const card = canvas.closest('.card');
    if (card) card.classList.add('visual-card');

    const ratio = canvas.width / canvas.height;
    let shape = 'wide';
    if (ratio > 3.2) shape = 'strip';
    else if (ratio < 0.9) shape = 'tall';
    else if (ratio < 1.25) shape = 'square';
    canvas.dataset.canvasShape = shape;
  });
}

function runCosmicModel(canvas, config) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let tick = 0;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(320, Math.round(rect.width || canvas.width));
    const height = Math.max(220, Math.round(width / 1.625));
    const ratio = window.devicePixelRatio || 1;
    const nextWidth = Math.round(width * ratio);
    const nextHeight = Math.round(height * ratio);
    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = makeStars(width, height);
    }
    canvas.style.height = `${height}px`;
    return { width, height };
  }

  function makeStars(width, height) {
    return Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.6 + Math.random() * 1.8,
      a: 0.25 + Math.random() * 0.65
    }));
  }

  function project(x, y, z) {
    const width = canvas.clientWidth || canvas.width;
    const height = canvas.clientHeight || canvas.height;
    const depth = 420 / (420 + z);
    return {
      x: width / 2 + x * depth,
      y: height / 2 + y * depth,
      s: depth
    };
  }

  function rotate(x, y, z, ax, ay) {
    const cosy = Math.cos(ay), siny = Math.sin(ay);
    const cosx = Math.cos(ax), sinx = Math.sin(ax);
    const x1 = x * cosy - z * siny;
    const z1 = x * siny + z * cosy;
    const y1 = y * cosx - z1 * sinx;
    return { x: x1, y: y1, z: y * sinx + z1 * cosx };
  }

  function clear() {
    const width = canvas.clientWidth || canvas.width;
    const height = canvas.clientHeight || canvas.height;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#080a14');
    gradient.addColorStop(0.55, '#101830');
    gradient.addColorStop(1, '#080a14');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    stars.forEach((star) => {
      ctx.globalAlpha = star.a;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function sphere(x, y, z, r, color) {
    const p = project(x, y, z);
    const radius = Math.max(1, r * p.s);
    const g = ctx.createRadialGradient(p.x - radius * 0.35, p.y - radius * 0.35, radius * 0.2, p.x, p.y, radius);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.22, color);
    g.addColorStop(1, '#07101f');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function orbit(rx, rz, tilt, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      const point = rotate(Math.cos(a) * rx, Math.sin(a) * tilt, Math.sin(a) * rz, -0.55, tick * 0.0008);
      const p = project(point.x, point.y, point.z);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  function drawOrbitModel() {
    orbit(130, 95, 32, 'rgba(63, 243, 255, 0.46)');
    orbit(82, 60, 16, 'rgba(255, 221, 87, 0.32)');
    sphere(0, 0, 0, 22, '#ffdd57');
    const a = tick * 0.018;
    const point = rotate(Math.cos(a) * 130, Math.sin(a) * 32, Math.sin(a) * 95, -0.55, tick * 0.0008);
    sphere(point.x, point.y, point.z, 10, config.accent);
  }

  function drawAtomModel() {
    orbit(118, 80, 70, 'rgba(63, 243, 255, 0.42)');
    orbit(118, 80, -70, 'rgba(255, 79, 163, 0.38)');
    orbit(72, 128, 20, 'rgba(255, 221, 87, 0.36)');
    sphere(0, 0, 0, 22, '#ff4fa3');
    for (let i = 0; i < 3; i++) {
      const a = tick * 0.025 + i * 2.1;
      const point = rotate(Math.cos(a) * 118, Math.sin(a + i) * 52, Math.sin(a) * 80, -0.5 + i * 0.3, tick * 0.001);
      sphere(point.x, point.y, point.z, 7, '#3ff3ff');
    }
  }

  function drawWaveModel() {
    const width = canvas.clientWidth || canvas.width;
    const height = canvas.clientHeight || canvas.height;
    ctx.strokeStyle = config.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < 180; i++) {
      const x = 40 + (i / 179) * (width - 80);
      const y = height / 2 + Math.sin(i * 0.12 + tick * 0.06) * 46 * Math.cos(i * 0.018);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    orbit(135, 65, 14, 'rgba(255, 255, 255, 0.18)');
  }

  function drawGalaxyModel() {
    for (let i = 0; i < 180; i++) {
      const arm = i % 3;
      const r = 12 + i * 0.78;
      const a = tick * 0.004 + arm * 2.1 + r * 0.05;
      const point = rotate(Math.cos(a) * r, Math.sin(r * 0.04) * 16, Math.sin(a) * r * 0.62, -0.65, tick * 0.0006);
      const p = project(point.x, point.y, point.z);
      ctx.fillStyle = i % 5 === 0 ? '#ffdd57' : config.accent;
      ctx.globalAlpha = 0.32 + (i % 8) * 0.06;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6 * p.s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    sphere(0, 0, 0, 14, '#ffffff');
  }

  function drawCircuitModel() {
    const width = canvas.clientWidth || canvas.width;
    ctx.strokeStyle = config.accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(90, 170);
    ctx.lineTo(190, 170);
    ctx.moveTo(230, 125);
    ctx.lineTo(230, 215);
    ctx.moveTo(260, 125);
    ctx.lineTo(260, 215);
    ctx.moveTo(260, 170);
    ctx.lineTo(390, 170);
    ctx.stroke();
    const pulseX = 90 + ((tick * 3) % Math.max(220, width - 180));
    sphere(pulseX - width / 2, 10 * Math.sin(tick * 0.06), 0, 8, '#ffdd57');
    orbit(70, 110, 20, 'rgba(63, 243, 255, 0.25)');
  }

  function drawDiffusionModel() {
    for (let i = 0; i < 120; i++) {
      const a = i * 12.989 + tick * 0.01;
      const r = Math.sqrt(i) * 13;
      const x = Math.cos(a) * r + Math.sin(tick * 0.018 + i) * 10;
      const y = Math.sin(a * 1.7) * r * 0.55;
      const p = project(x, y, Math.sin(a) * 70);
      ctx.fillStyle = i % 2 ? config.accent : '#ffdd57';
      ctx.globalAlpha = 0.62;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2 * p.s, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function draw() {
    resizeCanvas();
    clear();
    if (config.model === 'atom' || config.model === 'photon' || config.model === 'stellar') drawAtomModel();
    else if (config.model === 'wave' || config.model === 'oscillator' || config.model === 'motion') drawWaveModel();
    else if (config.model === 'galaxy' || config.model === 'chaos' || config.model === 'expansion') drawGalaxyModel();
    else if (config.model === 'circuit') drawCircuitModel();
    else if (config.model === 'diffusion') drawDiffusionModel();
    else drawOrbitModel();
    tick += 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  draw();
}
