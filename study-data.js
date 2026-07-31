const studyData = {
  quickLinks: [
    { title: "Glossary", href: "glossary.html", text: "Fast definitions for physics, astronomy, and simulation terms." },
    { title: "Formula Sheet", href: "formulas.html", text: "Equations, meanings, units, and where to test them." },
    { title: "Learning Paths", href: "learning-paths.html", text: "Guided routes through mechanics, cosmos, quantum, and data." },
    { title: "Simulation Collections", href: "collections.html", text: "Small themed sets of simulations for one focused investigation." },
    { title: "Night-Sky Calendar", href: "sky-calendar.html", text: "Seasonal astronomy events and what to observe." },
    { title: "Teacher Mode", href: "teacher-mode.html", text: "Printable worksheet prompts for classrooms and self-study." },
    { title: "Methodology", href: "methodology.html", text: "Assumptions and limits behind the simplified simulations." },
    { title: "Search Everything", href: "search.html", text: "Search simulations, formulas, glossary terms, and pages." },
    { title: "Concept Map", href: "concept-map.html", text: "See how glossary terms, formulas, and simulations connect." },
    { title: "Progress Tracker", href: "progress.html", text: "Optional local progress saving controlled by the learner." }
  ],
  glossary: [
    ["Redshift", "Stretching of light toward longer wavelengths, often used to measure cosmic expansion or motion away from us.", "Astronomy"],
    ["Blueshift", "Shift of light toward shorter wavelengths when a source moves toward the observer.", "Astronomy"],
    ["Eccentricity", "A number describing how stretched an orbit is; 0 is circular, values near 1 are very elongated.", "Orbits"],
    ["Half-life", "The time required for half of a radioactive sample to remain undecayed.", "Matter"],
    ["Luminosity", "Total power emitted by an object such as a star, usually compared with the Sun.", "Stars"],
    ["Doppler Shift", "Change in observed wave frequency caused by relative motion between source and observer.", "Waves"],
    ["Entropy", "A measure connected with disorder, energy spreading, and the number of possible microscopic states.", "Thermodynamics"],
    ["Angular Momentum", "A measure of rotational motion; in gravity it helps explain stable orbit sweeping.", "Mechanics"],
    ["Escape Velocity", "Minimum speed needed to leave a body's gravity without further propulsion.", "Gravity"],
    ["Transit", "A planet passing in front of its star, causing a measurable brightness dip.", "Exoplanets"],
    ["Einstein Ring", "A ring-like lensed image formed when observer, foreground mass, and background source align.", "Relativity"],
    ["Hubble Constant", "The slope linking galaxy distance to recession velocity in Hubble's law.", "Cosmology"],
    ["Diffusion", "Spreading caused by many random microscopic motions.", "Systems"],
    ["Time Constant", "The characteristic response time of systems such as RC circuits.", "Circuits"],
    ["Wave Interference", "Combination of waves that can reinforce or cancel each other.", "Waves"]
  ],
  formulas: [
    ["Newton's Gravitation", "F = Gm₁m₂ / r²", "Force between two masses.", "N"],
    ["Orbital Speed", "v = √(GM / r)", "Circular orbital speed around a central mass.", "m/s"],
    ["Kepler's Third Law", "T² = 4π²a³ / GM", "Connects orbital period with semi-major axis.", "s²"],
    ["Kinetic Energy", "K = ½mv²", "Energy of motion.", "J"],
    ["Wave Speed", "v = fλ", "Speed equals frequency times wavelength.", "m/s"],
    ["Photon Energy", "E = hf", "Energy of one photon.", "J"],
    ["Photoelectric Equation", "Kmax = hf − φ", "Maximum electron kinetic energy after emission.", "J"],
    ["Half-Life Decay", "N = N₀(1/2)^(t/T½)", "Remaining radioactive nuclei after time t.", "count"],
    ["RC Charging", "V(t) = V₀(1 − e^(−t/RC))", "Voltage rise across a charging capacitor.", "V"],
    ["Hubble's Law", "v = H₀d", "Galaxy recession velocity from distance.", "km/s"],
    ["Transit Depth", "δ ≈ (Rp/Rs)²", "Brightness dip from planet-to-star radius ratio.", "fraction"],
    ["Inverse Square Law", "F = L / 4πd²", "Observed flux from luminosity and distance.", "W/m²"]
  ],
  paths: [
    ["Beginner Mechanics", "Start with motion, oscillators, two-body orbits, and Kepler laws.", ["labs/lab1.html", "labs/lab2.html", "labs/lab3.html", "labs/lab6_kepler.html"]],
    ["Cosmos Explorer", "Move from star life to exoplanets, lensing, and cosmic expansion.", ["labs/lab17_stellar.html", "labs/lab14_exoplanet.html", "labs/lab15_lensing.html", "labs/lab16_hubble.html"]],
    ["Quantum Starter", "Explore photons, thresholds, probability, and decay.", ["labs/lab10_photoelectric.html", "labs/lab9_decay.html", "labs/lab12_diffusion.html"]],
    ["Astro Data Trail", "Infer unseen worlds and cosmic motion from graphs and light.", ["labs/lab14_exoplanet.html", "labs/lab5_iss.html", "labs/lab16_hubble.html"]],
    ["Chaos & Systems", "Compare nonlinear gravity, Lyapunov growth, and many-body structure.", ["labs/lab4.html", "labs/lab7_lyapunov.html", "labs/lab8_nbody.html"]]
  ],
  collections: [
    ["First Orbit Builder", "Build confidence with numerical motion before moving from falling objects to ellipses and escape.", "Mechanics", [
      ["Numerical Motion", "labs/lab1.html"], ["Two-Body Orbit", "labs/lab3.html"], ["Kepler Laws", "labs/lab6_kepler.html"], ["Escape Velocity", "labs/lab34_escape.html"]
    ]],
    ["Read the Universe", "Use light, spectra, and periodic signals to infer what cannot be seen directly.", "Astro data", [
      ["Telescope Resolution", "labs/lab20_telescope.html"], ["Spectroscopy", "labs/lab21_spectroscopy.html"], ["Exoplanet Transit", "labs/lab14_exoplanet.html"], ["Radial Velocity", "labs/lab22_radial_velocity.html"]
    ]],
    ["Forces & Fields", "Move from visible trajectories to the invisible fields and conservation laws shaping them.", "Physics", [
      ["Projectile Motion", "labs/lab26_projectile.html"], ["Collisions", "labs/lab27_collisions.html"], ["Electric Fields", "labs/lab28_electric_fields.html"], ["Lorentz Force", "labs/lab29_lorentz.html"]
    ]],
    ["Cosmic Extremes", "Explore evidence for dark matter, compact objects, stellar explosions, and ripples in spacetime.", "Cosmos", [
      ["Galaxy Rotation", "labs/lab23_rotation_curve.html"], ["Black Hole Lensing", "labs/lab25_blackhole.html"], ["Neutron Star Pulsar", "labs/lab37_pulsar.html"], ["Gravitational Waves", "labs/lab39_gravitational_waves.html"]
    ]],
    ["Patterns Everywhere", "Follow the same big ideas through interference, resonance, polarization, gases, and heat.", "Waves & systems", [
      ["Double Slit", "labs/lab30_double_slit.html"], ["Standing Waves", "labs/lab33_standing_waves.html"], ["Polarization", "labs/lab40_polarization.html"], ["Heat Conduction", "labs/lab41_heat.html"]
    ]]
  ],
  connections: {
    "Redshift": { href: "labs/lab21_spectroscopy.html", label: "Spectroscopy Lab" },
    "Blueshift": { href: "labs/lab21_spectroscopy.html", label: "Spectroscopy Lab" },
    "Eccentricity": { href: "labs/lab6_kepler.html", label: "Kepler Laws" },
    "Half-life": { href: "labs/lab9_decay.html", label: "Radioactive Decay" },
    "Luminosity": { href: "labs/lab17_stellar.html", label: "Stellar Life" },
    "Doppler Shift": { href: "labs/lab22_radial_velocity.html", label: "Radial Velocity" },
    "Entropy": { href: "labs/lab31_gas.html", label: "Thermodynamics Gas Box" },
    "Angular Momentum": { href: "labs/lab3.html", label: "Two-Body Orbit" },
    "Escape Velocity": { href: "labs/lab34_escape.html", label: "Escape Velocity" },
    "Transit": { href: "labs/lab14_exoplanet.html", label: "Exoplanet Transit" },
    "Einstein Ring": { href: "labs/lab15_lensing.html", label: "Gravitational Lensing" },
    "Hubble Constant": { href: "labs/lab16_hubble.html", label: "Hubble Expansion" },
    "Diffusion": { href: "labs/lab12_diffusion.html", label: "Diffusion Random Walk" },
    "Time Constant": { href: "labs/lab11_rc.html", label: "RC Circuit" },
    "Wave Interference": { href: "labs/lab30_double_slit.html", label: "Double Slit Interference" },
    "Newton's Gravitation": { href: "labs/lab3.html", label: "Two-Body Orbit" },
    "Orbital Speed": { href: "labs/lab34_escape.html", label: "Escape Velocity" },
    "Kepler's Third Law": { href: "labs/lab6_kepler.html", label: "Kepler Laws" },
    "Kinetic Energy": { href: "labs/lab26_projectile.html", label: "Projectile Motion" },
    "Wave Speed": { href: "labs/lab13_wave.html", label: "Wave Equation" },
    "Photon Energy": { href: "labs/lab10_photoelectric.html", label: "Photoelectric Effect" },
    "Photoelectric Equation": { href: "labs/lab10_photoelectric.html", label: "Photoelectric Effect" },
    "Half-Life Decay": { href: "labs/lab9_decay.html", label: "Radioactive Decay" },
    "RC Charging": { href: "labs/lab11_rc.html", label: "RC Circuit" },
    "Hubble's Law": { href: "labs/lab16_hubble.html", label: "Hubble Expansion" },
    "Transit Depth": { href: "labs/lab14_exoplanet.html", label: "Exoplanet Transit" },
    "Inverse Square Law": { href: "labs/lab20_telescope.html", label: "Telescope Resolution" }
  },
  milestones: [
    ["Start exploring", "Open one simulation", "visits", 1],
    ["Build a pattern", "Explore three simulations", "visits", 3],
    ["Test an idea", "Pass two quick quizzes", "quizzes", 2],
    ["Think like a scientist", "Save one observation", "notes", 1]
  ],
  sky: [
    ["Moon Phases", "Track the Moon every few nights and sketch how sunlight reveals different portions.", "Monthly"],
    ["Meteor Showers", "Observe recurring showers such as Perseids, Geminids, Quadrantids, and Orionids during their seasons.", "Seasonal"],
    ["Planet Oppositions", "Outer planets appear bright near opposition because Earth is between the planet and Sun.", "Yearly"],
    ["Eclipses", "Solar and lunar eclipses depend on alignment of Sun, Earth, and Moon near orbital nodes.", "Occasional"],
    ["Conjunctions", "Planets or the Moon can appear close together in the sky from our line of sight.", "Recurring"],
    ["Milky Way Season", "The bright galactic core is best viewed from dark sites during suitable seasonal windows.", "Seasonal"]
  ],
  worksheets: [
    ["Orbit Investigation", "Change starting speed in the two-body simulator. Record when the path is circular, elliptical, or escaping."],
    ["Wave Detective", "Change wavelength and speed. Predict where the next crest appears before running the animation."],
    ["Decay Probability", "Run decay with small and large samples. Compare noisy individual events with smooth trends."],
    ["Exoplanet Transit", "Measure transit depth for two planet sizes. Estimate the radius ratio from the light curve."],
    ["Hubble Plot", "Change H₀ and explain why the graph slope changes."],
    ["Stellar Fate", "Compare 1, 8, and 25 solar masses. Record color, luminosity, lifetime, and final fate."]
  ],
  methodology: [
    "Simulations are simplified educational models designed for intuition and classroom exploration.",
    "Numerical results may use scaled units, idealized geometry, or approximations instead of full professional models.",
    "Orbit tools focus on core gravity behavior and may not include all real-world perturbations.",
    "ISS and spacecraft views are educational approximations unless official mission data is explicitly loaded.",
    "Cosmology, lensing, and stellar models are concept models, not research-grade pipelines.",
    "Always compare simplified results with textbooks, official agency material, or peer-reviewed sources for advanced work.",
    "Core educational credits: created by Raghav and Codex for pure educational use.",
    "Reference names such as NASA, ESA, ISRO, mission names, and scientific terms belong to their respective owners and are used for factual learning context.",
    "Offline mode stores a local cache in the browser after first load where supported."
  ],
  concepts: [
    ["Gravity", "Newton's Gravitation", "Two-Body Orbit", "labs/lab3.html"],
    ["Gravity", "Kepler's Third Law", "Kepler Laws", "labs/lab6_kepler.html"],
    ["Angular Momentum", "Orbital Speed", "Two-Body Orbit", "labs/lab3.html"],
    ["Eccentricity", "Kepler's Third Law", "Kepler Laws", "labs/lab6_kepler.html"],
    ["Transit", "Transit Depth", "Exoplanet Transit", "labs/lab14_exoplanet.html"],
    ["Einstein Ring", "Gravitational Lensing", "Gravitational Lensing", "labs/lab15_lensing.html"],
    ["Redshift", "Hubble's Law", "Hubble Expansion", "labs/lab16_hubble.html"],
    ["Luminosity", "Inverse Square Law", "Stellar Life", "labs/lab17_stellar.html"],
    ["Photon Energy", "Photoelectric Equation", "Photoelectric Effect", "labs/lab10_photoelectric.html"],
    ["Half-life", "Half-Life Decay", "Radioactive Decay", "labs/lab9_decay.html"],
    ["Wave Interference", "Wave Speed", "Wave Equation", "labs/lab13_wave.html"],
    ["Time Constant", "RC Charging", "RC Circuit", "labs/lab11_rc.html"],

    ["Moon Phases", "Orbital Geometry", "Moon Phases & Eclipses", "labs/lab19_moon.html"],
    ["Diffraction", "θ ≈ 1.22λ/D", "Telescope Resolution", "labs/lab20_telescope.html"],
    ["Doppler Shift", "Δλ/λ = v/c", "Spectroscopy Lab", "labs/lab21_spectroscopy.html"],
    ["Center of Mass", "Momentum Conservation", "Exoplanet Radial Velocity", "labs/lab22_radial_velocity.html"],
    ["Dark Matter", "Rotation Speed", "Galaxy Rotation Curve", "labs/lab23_rotation_curve.html"],
    ["CMB", "Temperature Fluctuation", "Cosmic Microwave Background Map", "labs/lab24_cmb.html"],
    ["Photon Sphere", "Light Deflection", "Black Hole Lensing", "labs/lab25_blackhole.html"],
    ["Projectile", "y = x tanθ − gx²/(2v²cos²θ)", "Projectile Motion 2D", "labs/lab26_projectile.html"],
    ["Momentum", "p = mv", "Collisions & Momentum", "labs/lab27_collisions.html"],
    ["Electric Field", "E = F/q", "Electromagnetic Field Lines", "labs/lab28_electric_fields.html"],
    ["Lorentz Force", "F = qvB", "Magnetic Lorentz Force", "labs/lab29_lorentz.html"],
    ["Interference", "d sinθ = mλ", "Double Slit Interference", "labs/lab30_double_slit.html"],
    ["Kinetic Theory", "PV = NkT", "Thermodynamics Gas Box", "labs/lab31_gas.html"],
    ["Chaos", "Sensitive Dependence", "Pendulum Chaos", "labs/lab32_pendulum.html"],
    ["Resonance", "fn = nv/2L", "Standing Waves & Resonance", "labs/lab33_standing_waves.html"],

    ["Escape Velocity", "vesc = √(2GM/r)", "Escape Velocity", "labs/lab34_escape.html"],
    ["Lagrange Points", "Rotating Frame Balance", "Lagrange Points", "labs/lab35_lagrange.html"],
    ["Roche Limit", "Tidal Force", "Roche Limit & Tides", "labs/lab36_roche.html"],
    ["Pulsar", "Rotation Period", "Neutron Star Pulsar", "labs/lab37_pulsar.html"],
    ["Supernova", "Radioactive Tail", "Supernova Light Curve", "labs/lab38_supernova.html"],
    ["Gravitational Waves", "Chirp Signal", "Gravitational Waves", "labs/lab39_gravitational_waves.html"],
    ["Polarization", "I = I₀cos²θ", "Light Polarization", "labs/lab40_polarization.html"],
    ["Heat Diffusion", "∂T/∂t = α∇²T", "Heat Conduction", "labs/lab41_heat.html"]
  ]
};
