(function initCompareMode() {
  const nav = document.getElementById('mainNav');
  if (nav && typeof siteData !== 'undefined') {
    nav.innerHTML = (siteData.navGroups || [{ label: 'Menu', items: siteData.nav }])
      .map((group) => `
        <details class="nav-group ${group.items.some((item) => item.key === 'compare' || item.key === 'simulations') ? 'active' : ''}">
          <summary>${group.label}</summary>
          <div class="nav-menu">
            ${group.items.map((item) => `<a href="${item.href}" class="${item.key === 'compare' ? 'active' : ''}">${item.label}</a>`).join('')}
          </div>
        </details>
      `)
      .join('');
  }

  const options = [
    ['1D Motion', 'labs/lab1.html?a=1.2&dt=0.04'],
    ['Harmonic Oscillator', 'labs/lab2.html?x0=1&v0=0&k=1'],
    ['Two-Body Orbit', 'labs/lab3.html?r0=2&v0=0.72&integrator=verlet'],
    ['Three-Body Chaos', 'labs/lab4.html?preset=figure8'],
    ['ISS Ground Track', 'labs/lab5_iss.html?run=1'],
    ['Kepler Laws', 'labs/lab6_kepler.html?ecc=0.45'],
    ['Lyapunov Chaos', 'labs/lab7_lyapunov.html?run=1'],
    ['N-Body Galaxy', 'labs/lab8_nbody.html?N=180&run=1'],
    ['Radioactive Decay', 'labs/lab9_decay.html?N0=900&lambda=0.08'],
    ['Photoelectric Effect', 'labs/lab10_photoelectric.html?frequency=7&intensity=70'],
    ['RC Circuit', 'labs/lab11_rc.html?R=1200&C=0.001'],
    ['Diffusion Random Walk', 'labs/lab12_diffusion.html?particles=420&run=1'],
    ['Wave Equation', 'labs/lab13_wave.html?mode=pluck&run=1'],
    ['Exoplanet Transit', 'labs/lab14_exoplanet.html?radiusRatio=0.11&inclination=88.5'],
    ['Gravitational Lensing', 'labs/lab15_lensing.html?mass=100&offset=18'],
    ['Hubble Expansion', 'labs/lab16_hubble.html?H0=70&run=1'],
    ['Stellar Life', 'labs/lab17_stellar.html?mass=8'],

    ['Solar System Orrery', 'labs/lab18_orrery.html?speed=1.2&scale=1'],
    ['Moon Phases & Eclipses', 'labs/lab19_moon.html?phase=35&tilt=5.1'],
    ['Telescope Resolution', 'labs/lab20_telescope.html?aperture=130&wavelength=540'],
    ['Spectroscopy Lab', 'labs/lab21_spectroscopy.html?redshift=0.04&temperature=6200'],
    ['Exoplanet Radial Velocity', 'labs/lab22_radial_velocity.html?mass=2.4&period=110'],
    ['Galaxy Rotation Curve', 'labs/lab23_rotation_curve.html?halo=0.55&disk=1'],
    ['CMB Map', 'labs/lab24_cmb.html?contrast=1.2&smooth=4'],
    ['Black Hole Lensing', 'labs/lab25_blackhole.html?mass=1.2&impact=96'],
    ['Projectile Motion 2D', 'labs/lab26_projectile.html?angle=42&speed=58&drag=0.01'],
    ['Collisions & Momentum', 'labs/lab27_collisions.html?elasticity=0.85&massRatio=1.5'],
    ['Electromagnetic Field Lines', 'labs/lab28_electric_fields.html?separation=150&strength=1'],
    ['Magnetic Lorentz Force', 'labs/lab29_lorentz.html?field=1&velocity=1.6'],
    ['Double Slit Interference', 'labs/lab30_double_slit.html?wavelength=520&spacing=1.4'],
    ['Thermodynamics Gas Box', 'labs/lab31_gas.html?temperature=1.6&particles=90'],
    ['Pendulum Chaos', 'labs/lab32_pendulum.html?energy=1.4&coupling=0.65'],
    ['Standing Waves & Resonance', 'labs/lab33_standing_waves.html?mode=3&amplitude=42'],
    ['Escape Velocity', 'labs/lab34_escape.html?mass=1&radius=1&launch=1.5'],
    ['Lagrange Points', 'labs/lab35_lagrange.html?massRatio=0.22&separation=240'],
    ['Roche Limit & Tides', 'labs/lab36_roche.html?distance=150&density=1'],
    ['Neutron Star Pulsar', 'labs/lab37_pulsar.html?spin=1.4&beam=24'],
    ['Supernova Light Curve', 'labs/lab38_supernova.html?energy=1.1&nickel=0.55'],
    ['Gravitational Waves', 'labs/lab39_gravitational_waves.html?mass=1.4&distance=1.8'],
    ['Light Polarization', 'labs/lab40_polarization.html?angle=35&intensity=1'],
    ['Heat Conduction', 'labs/lab41_heat.html?diffusivity=1&gradient=1.2']
  ];

  const params = new URLSearchParams(window.location.search);
  const leftSelect = document.getElementById('leftSim');
  const rightSelect = document.getElementById('rightSim');
  const leftFrame = document.getElementById('leftFrame');
  const rightFrame = document.getElementById('rightFrame');
  if (!leftSelect || !rightSelect || !leftFrame || !rightFrame) return;

  [leftSelect, rightSelect].forEach((select) => {
    select.innerHTML = options.map(([label, href]) => `<option value="${href}">${label}</option>`).join('');
  });

  leftSelect.value = sanitizeChoice(params.get('left')) || options[2][1];
  rightSelect.value = sanitizeChoice(params.get('right')) || options[12][1];

  function sanitizeChoice(value) {
    if (!value) return '';
    return options.some(([, href]) => href === value) ? value : '';
  }

  function syncFrames() {
    leftFrame.src = leftSelect.value;
    rightFrame.src = rightSelect.value;
    const next = new URL(window.location.href);
    next.searchParams.set('left', leftSelect.value);
    next.searchParams.set('right', rightSelect.value);
    history.replaceState(null, '', next);
  }

  leftSelect.addEventListener('change', syncFrames);
  rightSelect.addEventListener('change', syncFrames);
  syncFrames();
})();
