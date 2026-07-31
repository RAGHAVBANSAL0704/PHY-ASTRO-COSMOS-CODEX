(function initStudyTools() {
  renderNav();
  const page = document.body.dataset.studyPage;
  if (!page || typeof studyData === 'undefined') return;
  const root = document.getElementById('studyRoot');
  if (!root) return;

  const renderers = {
    hub: renderHub,
    glossary: renderGlossary,
    formulas: renderFormulas,
    paths: renderPaths,
    collections: renderCollections,
    sky: renderSky,
    teacher: renderTeacher,
    methodology: renderMethodology,
    search: renderSearch,
    concepts: renderConcepts,
    progress: renderProgress
  };
  renderers[page]?.(root);

  function renderNav() {
    const nav = document.getElementById('mainNav');
    if (!nav || typeof siteData === 'undefined') return;
    const activeKeys = {
      hub: 'study',
      glossary: 'glossary',
      formulas: 'formulas',
      collections: 'collections',
      search: 'search',
      concepts: 'concepts',
      methodology: 'methodology',
      progress: 'progress'
    };
    nav.innerHTML = renderGroupedNav(activeKeys[page] || 'study');
  }

  function renderGroupedNav(currentKey) {
    return (siteData.navGroups || [{ label: 'Menu', items: siteData.nav }])
      .map((group) => {
        const active = group.items.some((item) => item.key === currentKey) ? 'active' : '';
        return `
          <details class="nav-group ${active}">
            <summary>${group.label}</summary>
            <div class="nav-menu">
              ${group.items.map((item) => `<a class="${item.key === currentKey ? 'active' : ''}" href="${item.href}">${item.label}</a>`).join('')}
            </div>
          </details>
        `;
      })
      .join('');
  }

  function renderHub(root) {
    root.innerHTML = `
      <section class="study-grid">
        ${studyData.quickLinks.map((item) => `
          <a class="study-card" href="${item.href}">
            <span class="link-orbit"></span>
            <h2>${item.title}</h2>
            <p>${item.text}</p>
          </a>
        `).join('')}
      </section>
    `;
  }

  function renderGlossary(root) {
    root.innerHTML = `
      <div class="study-searchbar"><input id="glossaryFilter" type="search" placeholder="Search terms like redshift, entropy, orbit..." /></div>
      <section id="glossaryList" class="study-grid"></section>
    `;
    const input = document.getElementById('glossaryFilter');
    const list = document.getElementById('glossaryList');
    const paint = () => {
      const query = input.value.toLowerCase();
      list.innerHTML = studyData.glossary
        .filter(([term, definition, topic]) => `${term} ${definition} ${topic}`.toLowerCase().includes(query))
        .map(([term, definition, topic]) => `
          <article class="study-card">
            <span class="badge badge-sim">${topic}</span>
            <h2>${term}</h2>
            <p>${definition}</p>
            ${renderSimulationLink(term)}
          </article>
        `)
        .join('');
    };
    input.addEventListener('input', paint);
    paint();
  }

  function renderFormulas(root) {
    root.innerHTML = `
      <section class="teacher-toolbar formula-toolbar">
        <button class="hub-action primary" type="button" onclick="window.print()">Print formula sheet</button>
        <a class="hub-action" href="collections.html">Explore a collection</a>
      </section>
      <section class="formula-sheet">
        ${studyData.formulas.map(([name, formula, meaning, units]) => `
          <article class="formula-card">
            <p class="panel-kicker">${units}</p>
            <h2>${name}</h2>
            <div class="formula">${formula}</div>
            <p>${meaning}</p>
            ${renderSimulationLink(name)}
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderPaths(root) {
    root.innerHTML = `
      <section class="path-stack">
        ${studyData.paths.map(([title, text, links], index) => `
          <article class="path-card">
            <span class="path-number">${index + 1}</span>
            <div>
              <h2>${title}</h2>
              <p>${text}</p>
              <div class="card-links">${links.map((href, linkIndex) => `<a href="${href}">Step ${linkIndex + 1}</a>`).join('')}</div>
            </div>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderCollections(root) {
    root.innerHTML = `
      <section class="collection-intro disclaimer-panel">
        <p class="panel-kicker">Choose a question</p>
        <h2>Short themed investigations</h2>
        <p>Each collection is a self-contained set of four simulations. Work through them in order, or open the one that sparks a question.</p>
      </section>
      <section class="collection-grid">
        ${studyData.collections.map(([title, text, topic, links]) => `
          <article class="collection-card">
            <span class="badge badge-sim">${topic}</span>
            <h2>${title}</h2>
            <p>${text}</p>
            <div class="collection-links">
              ${links.map(([label, href], index) => `<a href="${href}"><span>${index + 1}</span>${label}</a>`).join('')}
            </div>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderSky(root) {
    root.innerHTML = `
      <section class="study-grid">
        ${studyData.sky.map(([title, text, rhythm]) => `
          <article class="study-card">
            <span class="badge badge-astronomy">${rhythm}</span>
            <h2>${title}</h2>
            <p>${text}</p>
          </article>
        `).join('')}
      </section>
      <section class="disclaimer-panel">
        <h2>Observation note</h2>
        <p>This is an educational seasonal guide. For exact local timings, use a current sky app, observatory calendar, or official astronomy almanac for your location.</p>
      </section>
    `;
  }

  function renderTeacher(root) {
    root.innerHTML = `
      <section class="teacher-toolbar">
        <button class="hub-action primary" type="button" onclick="window.print()">Print worksheets</button>
        <a class="hub-action" href="simulations.html">Open simulations</a>
      </section>
      <section class="worksheet-grid">
        ${studyData.worksheets.map(([title, prompt]) => `
          <article class="worksheet-card">
            <h2>${title}</h2>
            <p>${prompt}</p>
            <ul>
              <li>Prediction:</li>
              <li>Observation:</li>
              <li>Explanation:</li>
              <li>New question:</li>
            </ul>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderMethodology(root) {
    root.innerHTML = `
      <section class="method-list">
        ${studyData.methodology.map((item, index) => `
          <article class="path-card">
            <span class="path-number">${index + 1}</span>
            <p>${item}</p>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderConcepts(root) {
    root.innerHTML = `
      <section class="concept-map">
        ${studyData.concepts.map(([term, formula, simulation, href]) => `
          <article class="concept-node">
            <a href="glossary.html">${term}</a>
            <span>→</span>
            <a href="formulas.html">${formula}</a>
            <span>→</span>
            <a href="${href}">${simulation}</a>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderProgress(root) {
    const progress = window.cosmicProgress;
    const data = progress?.get?.() || { visits: {}, quizzes: {}, badges: {}, notes: {} };
    const enabled = progress?.enabled?.();
    root.innerHTML = `
      <section class="progress-page">
        <article class="study-card">
          <p class="panel-kicker">Privacy first</p>
          <h2>Save progress only if you choose</h2>
          <p>Progress is stored only in this browser. It is not uploaded anywhere.</p>
          <label class="progress-switch large"><input id="progressOptIn" type="checkbox" ${enabled ? 'checked' : ''} /> Save my progress on this device</label>
        </article>
        <article class="study-card">
          <p class="panel-kicker">Badges</p>
          <h2>Exploration badges</h2>
          <div class="progress-badges">${Object.values(data.badges).map((badge) => `<span>${badge}</span>`).join('') || '<span>No badges yet</span>'}</div>
        </article>
      </section>
      <section class="progress-page">
        <article class="study-card"><h2>Visited</h2>${renderList(data.visits)}</article>
        <article class="study-card"><h2>Quiz passes</h2>${renderList(data.quizzes)}</article>
        <article class="study-card"><h2>Saved notes</h2>${renderNotes(data.notes)}</article>
      </section>
      <section class="progress-page">
        <article class="study-card milestone-card">
          <p class="panel-kicker">At your pace</p>
          <h2>Gentle study milestones</h2>
          <p>These are private prompts, not scores. They appear only when you choose local progress saving.</p>
          ${renderMilestones(data, enabled)}
        </article>
      </section>
    `;
    document.getElementById('progressOptIn')?.addEventListener('change', (event) => {
      progress.setEnabled(event.target.checked);
      renderProgress(root);
    });
  }

  function renderList(items) {
    const values = Object.values(items || {});
    return values.length ? `<ul>${values.map((item) => `<li>${item.title}</li>`).join('')}</ul>` : '<p>No saved items yet.</p>';
  }

  function renderNotes(notes) {
    const values = Object.values(notes || {});
    return values.length ? values.map((item) => `<p><strong>${item.title}</strong><br>${item.text}</p>`).join('') : '<p>No saved notes yet.</p>';
  }

  function renderMilestones(data, enabled) {
    if (!enabled) return '<p>Turn on local progress saving above to use these optional milestones.</p>';
    return `<ul class="milestone-list">${studyData.milestones.map(([title, text, key, goal]) => {
      const count = Object.keys(data[key] || {}).length;
      const complete = count >= goal;
      return `<li class="${complete ? 'complete' : ''}"><span>${complete ? '✓' : '○'}</span><strong>${title}</strong><small>${text} · ${Math.min(count, goal)}/${goal}</small></li>`;
    }).join('')}</ul>`;
  }

  function renderSimulationLink(title) {
    const connection = studyData.connections?.[title];
    return connection ? `<a class="study-inline-link" href="${connection.href}">Try it in ${connection.label} →</a>` : '';
  }

  function renderSearch(root) {
    const entries = buildSearchEntries();
    root.innerHTML = `
      <div class="study-searchbar"><input id="globalSearch" type="search" placeholder="Search simulations, glossary, formulas, paths..." autofocus /></div>
      <section id="searchResults" class="study-grid"></section>
    `;
    const input = document.getElementById('globalSearch');
    const results = document.getElementById('searchResults');
    const paint = () => {
      const query = input.value.trim().toLowerCase();
      const filtered = entries.filter((entry) => !query || `${entry.title} ${entry.text} ${entry.type}`.toLowerCase().includes(query));
      results.innerHTML = filtered.map((entry) => `
        <a class="study-card" href="${entry.href}">
          <span class="badge badge-sim">${entry.type}</span>
          <h2>${entry.title}</h2>
          <p>${entry.text}</p>
        </a>
      `).join('');
    };
    input.addEventListener('input', paint);
    paint();
  }

  function buildSearchEntries() {
    const pages = studyData.quickLinks.map((item) => ({ type: 'Page', title: item.title, text: item.text, href: item.href }));
    const glossary = studyData.glossary.map(([title, text, topic]) => ({ type: `Glossary · ${topic}`, title, text, href: 'glossary.html' }));
    const formulas = studyData.formulas.map(([title, formula, text]) => ({ type: 'Formula', title, text: `${formula} — ${text}`, href: 'formulas.html' }));
    const paths = studyData.paths.map(([title, text]) => ({ type: 'Learning path', title, text, href: 'learning-paths.html' }));
    const collections = studyData.collections.map(([title, text, topic]) => ({ type: `Collection · ${topic}`, title, text, href: 'collections.html' }));
    const concepts = studyData.concepts.map(([title, formula, simulation]) => ({ type: 'Concept map', title, text: `${formula} connects to ${simulation}`, href: 'concept-map.html' }));
    const simulations = [
      ['1D Motion', 'Numerical motion, acceleration, and error.', 'labs/lab1.html'],
      ['Two-Body Orbit', 'Gravity, energy, and orbital paths.', 'labs/lab3.html'],
      ['Exoplanet Transit', 'Light curves and hidden planets.', 'labs/lab14_exoplanet.html'],
      ['Gravitational Lensing', 'Mass bends light into arcs and rings.', 'labs/lab15_lensing.html'],
      ['Hubble Expansion', 'Galaxy velocity and cosmic expansion.', 'labs/lab16_hubble.html'],
      ['Stellar Life', 'Mass, luminosity, lifetime, and fate.', 'labs/lab17_stellar.html'],

      ['Solar System Orrery', 'Planetary speed, orbital periods, and solar system scale.', 'labs/lab18_orrery.html'],
      ['Moon Phases & Eclipses', 'Sun-Earth-Moon geometry and eclipse alignment.', 'labs/lab19_moon.html'],
      ['Telescope Resolution', 'Aperture, wavelength, and diffraction blur.', 'labs/lab20_telescope.html'],
      ['Spectroscopy Lab', 'Spectral lines, elements, and redshift.', 'labs/lab21_spectroscopy.html'],
      ['Exoplanet Radial Velocity', 'Stellar wobble from hidden planets.', 'labs/lab22_radial_velocity.html'],
      ['Galaxy Rotation Curve', 'Visible matter and dark matter halo comparison.', 'labs/lab23_rotation_curve.html'],
      ['CMB Map', 'Early-universe temperature fluctuations.', 'labs/lab24_cmb.html'],
      ['Black Hole Lensing', 'Light bending near compact objects.', 'labs/lab25_blackhole.html'],
      ['Projectile Motion 2D', 'Launch angle, speed, gravity, and drag.', 'labs/lab26_projectile.html'],
      ['Collisions & Momentum', 'Elasticity, mass ratio, and conserved momentum.', 'labs/lab27_collisions.html'],
      ['Electromagnetic Field Lines', 'Electric field direction around charges.', 'labs/lab28_electric_fields.html'],
      ['Magnetic Lorentz Force', 'Charged particle paths in magnetic fields.', 'labs/lab29_lorentz.html'],
      ['Double Slit Interference', 'Wavelength, slit spacing, and fringe patterns.', 'labs/lab30_double_slit.html'],
      ['Thermodynamics Gas Box', 'Temperature, pressure, and kinetic theory.', 'labs/lab31_gas.html'],
      ['Pendulum Chaos', 'Double pendulum sensitivity and nonlinear motion.', 'labs/lab32_pendulum.html'],
      ['Standing Waves & Resonance', 'Nodes, antinodes, and mode shapes.', 'labs/lab33_standing_waves.html'],
      ['Escape Velocity', 'Compare launch speed with gravity’s escape threshold.', 'labs/lab34_escape.html'],
      ['Lagrange Points', 'Find orbital balance regions in two-body systems.', 'labs/lab35_lagrange.html'],
      ['Roche Limit & Tides', 'Explore tidal stretching and disruption near massive bodies.', 'labs/lab36_roche.html'],
      ['Neutron Star Pulsar', 'Watch rotating beams produce precise pulses.', 'labs/lab37_pulsar.html'],
      ['Supernova Light Curve', 'Model peak brightness and radioactive tail fading.', 'labs/lab38_supernova.html'],
      ['Gravitational Waves', 'Visualize inspiral chirps from compact binary mergers.', 'labs/lab39_gravitational_waves.html'],
      ['Light Polarization', 'Rotate filters and test Malus law.', 'labs/lab40_polarization.html'],
      ['Heat Conduction', 'Watch thermal energy diffuse from hot to cool.', 'labs/lab41_heat.html']
    ].map(([title, text, href]) => ({ type: 'Simulation', title, text, href }));
    return [...pages, ...simulations, ...glossary, ...formulas, ...paths, ...collections, ...concepts];
  }
})();
