const siteData = {
  verifiedOn: "2026-07-27",
  nav: [
    { key: "home", label: "Launch Deck", href: "index.html" },
    { key: "physics", label: "Physics", href: "physics.html" },
    { key: "astronomy", label: "Astronomy", href: "astronomy.html" },
    { key: "simulations", label: "Simulations", href: "simulations.html" },
    { key: "study", label: "Study Hub", href: "study.html" },
    { key: "cosmos", label: "Cosmos Explorer", href: "cosmos-explorer.html" },
    { key: "sources", label: "Sources", href: "sources.html" },
    { key: "contact", label: "Contact", href: "contact.html" }
  ],
  navGroups: [
    {
      label: "Learn",
      items: [
        { key: "home", label: "Launch Deck", href: "index.html" },
        { key: "physics", label: "Physics", href: "physics.html" },
        { key: "astronomy", label: "Astronomy", href: "astronomy.html" },
        { key: "study", label: "Study Hub", href: "study.html" }
      ]
    },
    {
      label: "Explore",
      items: [
        { key: "simulations", label: "Simulations", href: "simulations.html" },
        { key: "collections", label: "Collections", href: "collections.html" },
        { key: "search", label: "Search Everything", href: "search.html" },
        { key: "compare", label: "Compare Mode", href: "compare.html" },
        { key: "cosmos", label: "Cosmos Explorer", href: "cosmos-explorer.html" }
      ]
    },
    {
      label: "Reference",
      items: [
        { key: "glossary", label: "Glossary", href: "glossary.html" },
        { key: "formulas", label: "Formula Sheet", href: "formulas.html" },
        { key: "concepts", label: "Concept Map", href: "concept-map.html" },
        { key: "methodology", label: "Methodology", href: "methodology.html" }
      ]
    },
    {
      label: "About",
      items: [
        { key: "sources", label: "Sources", href: "sources.html" },
        { key: "progress", label: "Progress", href: "progress.html" },
        { key: "contact", label: "Contact", href: "contact.html" }
      ]
    }
  ],
  pages: {
    home: {
      title: "Cosmic Physics Lab",
      intro:
        "A dynamic learning website for curious minds who want to explore motion, light, gravity, atoms, planets, stars, and the wild scale of the universe.",
      note:
        "Everything here is now focused on physics and astronomy. Use the filters to jump between concepts, missions, and hands-on simulations.",
      mainHeading: "Explore the universe by question",
      sourceHeading: "Fast launch links",
      explorer: true,
      links: [
        {
          title: "Physics Field Notes",
          href: "physics.html",
          text: "Forces, waves, energy, electricity, quantum ideas, and real experiment thinking."
        },
        {
          title: "Astronomy Field Notes",
          href: "astronomy.html",
          text: "Planets, stars, galaxies, black holes, telescopes, and space missions."
        },
        {
          title: "Interactive Simulations",
          href: "simulations.html",
          text: "Orbit tools, waves, decay, diffusion, circuits, and numerical physics simulations."
        },
        {
          title: "Experiment Trails",
          href: "simulations.html",
          text: "Direct routes into orbits, waves, quantum matter, chaos, diffusion, and circuits."
        }
      ],
      items: [
        {
          status: "physics",
          topic: "Motion",
          title: "Why do planets keep falling but never crash into the Sun?",
          host: "Gravity and orbital motion",
          dates: "Core idea: acceleration can change direction without changing speed",
          action: "Try the orbit labs",
          eligibility: "Best for learners starting mechanics",
          summary:
            "Orbiting is controlled falling. A planet moves forward while gravity bends that path inward, creating an ellipse instead of a straight line.",
          note: "Connect this with velocity vectors, centripetal acceleration, and conservation of energy.",
          links: [
            { label: "Two-body orbit simulation", url: "labs/lab3.html" },
            { label: "Kepler laws simulation", url: "labs/lab6_kepler.html" }
          ]
        },
        {
          status: "astronomy",
          topic: "Stars",
          title: "How does starlight reveal what stars are made of?",
          host: "Spectroscopy",
          dates: "Core idea: atoms absorb and emit exact colors",
          action: "Decode light",
          eligibility: "Best for astronomy observers",
          summary:
            "Every element leaves a pattern in light. Astronomers read those patterns to measure temperature, composition, motion, and magnetic activity.",
          note: "Hydrogen, helium, sodium, and calcium lines are some of the classic fingerprints.",
          links: [{ label: "NASA spectroscopy", url: "https://science.nasa.gov/ems/09_visiblelight/" }]
        },
        {
          status: "physics",
          topic: "Waves",
          title: "What makes sound, light, and water waves feel connected?",
          host: "Wave behavior",
          dates: "Core idea: oscillations carry energy through space",
          action: "Tune frequency and amplitude",
          eligibility: "Best for experiment builders",
          summary:
            "Waves can reflect, interfere, diffract, and resonate. Those shared behaviors link music, optics, earthquakes, antennas, and quantum matter.",
          note: "Watch for wavelength, frequency, speed, and boundary conditions.",
          links: [{ label: "Wave equation simulation", url: "labs/lab13_wave.html" }]
        },
        {
          status: "astronomy",
          topic: "Deep Space",
          title: "Why are black holes invisible but still detectable?",
          host: "Relativity and high-energy astronomy",
          dates: "Core idea: gravity shapes light, matter, and time",
          action: "Trace the evidence",
          eligibility: "Best for cosmic mystery fans",
          summary:
            "Black holes reveal themselves through fast-orbiting stars, hot accretion disks, gravitational waves, and the bending of nearby light.",
          note: "The event horizon is not a surface. It is a boundary in spacetime.",
          links: [{ label: "NASA black holes", url: "https://science.nasa.gov/universe/black-holes/" }]
        },
        {
          status: "sim",
          topic: "Numerical Labs",
          title: "How can a computer turn physics laws into motion?",
          host: "Computational physics",
          dates: "Core idea: small time steps build full system behavior",
          action: "Start with numerical methods",
          eligibility: "Best for learners who want to simulate real systems",
          summary:
            "Numerical methods turn equations into experiments. They power orbit paths, waves, decay models, diffusion trails, and circuit response curves.",
          note: "Euler and Runge-Kutta methods are the first bridge between equations and animated physics.",
          links: [
            { label: "Numerical methods", url: "labs/lab1.html" },
            { label: "Simulation launchpad", url: "simulations.html" }
          ]
        },
        {
          status: "sim",
          topic: "Electricity",
          title: "Why do circuits charge in smooth curves instead of jumps?",
          host: "RC circuit response",
          dates: "Core idea: exponential change appears across physics",
          action: "Open circuit simulation",
          eligibility: "Best for electronics, signals, and systems thinking",
          summary:
            "A capacitor does not fill instantly. Its voltage changes through a time constant, creating the same kind of exponential pattern seen in decay and cooling.",
          note: "The RC simulation connects electricity to broader ideas about relaxation, storage, and time.",
          links: [{ label: "RC circuit simulation", url: "labs/lab11_rc.html" }]
        }
      ],
      sources: [
        {
          title: "Orbit Trail",
          text: "Jump straight into gravity, Kepler's laws, and many-body motion.",
          links: [{ label: "Open orbit simulations", url: "simulations.html" }]
        },
        {
          title: "NASA Science",
          text: "Mission-backed astronomy explanations and images.",
          links: [{ label: "Open NASA Science", url: "https://science.nasa.gov/" }]
        },
        {
          title: "PhET Simulations",
          text: "Interactive physics simulations for classrooms and self-study.",
          links: [{ label: "Open PhET", url: "https://phet.colorado.edu/" }]
        }
      ]
    },
    physics: {
      title: "Physics Field Notes",
      intro:
        "A fast, energetic map of the laws underneath motion, electricity, waves, heat, quantum behavior, and the structure of matter.",
      note:
        "No unrelated opportunities or event listings remain here. This page is built only around physics concepts and experiments.",
      mainHeading: "Core physics zones",
      sourceHeading: "Physics learning hubs",
      items: [
        {
          status: "physics",
          topic: "Mechanics",
          title: "Motion, force, and momentum",
          host: "Classical mechanics",
          dates: "Key tools: vectors, acceleration, energy, momentum",
          action: "Launch motion simulations",
          eligibility: "Start here if you want the physics of everyday movement and orbital motion",
          summary:
            "Mechanics explains falling objects, collisions, projectiles, circular motion, and the motion of planets and spacecraft.",
          note: "The strongest bridge to astronomy is gravity: the same law explains a falling ball and an orbiting moon.",
          links: [
            { label: "Numerical methods simulation", url: "labs/lab1.html" },
            { label: "Two-body simulation", url: "labs/lab3.html" }
          ]
        },
        {
          status: "physics",
          topic: "Waves",
          title: "Waves, sound, and light",
          host: "Oscillations and wave physics",
          dates: "Key tools: frequency, wavelength, interference, resonance",
          action: "Open wave simulation",
          eligibility: "Useful for optics, acoustics, radio astronomy, and quantum mechanics",
          summary:
            "Wave physics explains how energy moves through strings, air, water, spacetime, and electromagnetic fields.",
          note: "Interference is the heart of diffraction patterns, telescope resolution, and quantum probability.",
          links: [{ label: "Wave equation simulation", url: "labs/lab13_wave.html" }]
        },
        {
          status: "physics",
          topic: "Quantum",
          title: "Photons, electrons, and probability",
          host: "Quantum physics",
          dates: "Key tools: quantization, wavefunctions, uncertainty",
          action: "Open photoelectric simulation",
          eligibility: "Best after waves and energy",
          summary:
            "Quantum physics explains why atoms glow in exact colors, why matter has structure, and why light can act like particles.",
          note: "The photoelectric effect is a clean doorway into photons and energy quanta.",
          links: [{ label: "Photoelectric effect simulation", url: "labs/lab10_photoelectric.html" }]
        },
        {
          status: "physics",
          topic: "Systems",
          title: "Chaos, diffusion, and decay",
          host: "Complex systems",
          dates: "Key tools: probability, numerical models, sensitivity",
          action: "Compare simulations",
          eligibility: "Great for computational science projects",
          summary:
            "Not every system is predictable in a simple way. Chaos, random walks, and radioactive decay show how patterns emerge from rules.",
          note: "Small initial changes can grow fast in chaotic systems, especially gravitational ones.",
          links: [
            { label: "Lyapunov simulation", url: "labs/lab7_lyapunov.html" },
            { label: "Diffusion simulation", url: "labs/lab12_diffusion.html" },
            { label: "Decay simulation", url: "labs/lab9_decay.html" }
          ]
        }
      ],
      sources: [
        {
          title: "PhET Physics",
          text: "Interactive simulations for mechanics, waves, electricity, and quantum ideas.",
          links: [{ label: "Open PhET", url: "https://phet.colorado.edu/en/simulations/filter?subjects=physics" }]
        },
        {
          title: "HyperPhysics",
          text: "Compact concept maps for many physics topics.",
          links: [{ label: "Open HyperPhysics", url: "http://hyperphysics.phy-astr.gsu.edu/" }]
        },
        {
          title: "OpenStax Physics",
          text: "Free textbook-style physics learning.",
          links: [{ label: "Open OpenStax", url: "https://openstax.org/subjects/science" }]
        }
      ]
    },
    astronomy: {
      title: "Astronomy Field Notes",
      intro:
        "A curious route through the sky: planets, moons, stars, nebulae, galaxies, telescopes, spacecraft, and the physics behind what we observe.",
      note:
        "Astronomy here is treated as physics at cosmic scale: light, gravity, nuclear fusion, motion, chemistry, and time.",
      mainHeading: "Cosmic questions",
      sourceHeading: "Astronomy source hubs",
      items: [
        {
          status: "astronomy",
          topic: "Solar System",
          title: "Why do worlds look so different?",
          host: "Planetary science",
          dates: "Key tools: gravity, geology, sunlight, atmosphere",
          action: "Compare worlds",
          eligibility: "Best for planet and mission fans",
          summary:
            "Mercury is scorched, Venus is wrapped in dense air, Earth is wet, Mars is cold, and the giant planets are storms made enormous.",
          note: "A planet's history depends on mass, distance from the Sun, chemistry, impacts, and internal heat.",
          links: [{ label: "NASA solar system", url: "https://science.nasa.gov/solar-system/" }]
        },
        {
          status: "astronomy",
          topic: "Stars",
          title: "How are stars born, powered, and ended?",
          host: "Stellar evolution",
          dates: "Key tools: fusion, pressure, gravity, radiation",
          action: "Follow a star life cycle",
          eligibility: "Best for learners who like big transformations",
          summary:
            "Stars form in cold gas clouds, shine by nuclear fusion, and end as white dwarfs, neutron stars, or black holes depending on their mass.",
          note: "The battle between gravity and pressure shapes almost every chapter of a star's life.",
          links: [{ label: "NASA stars", url: "https://science.nasa.gov/universe/stars/" }]
        },
        {
          status: "astronomy",
          topic: "Galaxies",
          title: "What holds a galaxy together?",
          host: "Galactic astronomy",
          dates: "Key tools: rotation curves, dark matter, gravity",
          action: "Think at galaxy scale",
          eligibility: "Best for deep-space learners",
          summary:
            "Galaxies are huge systems of stars, gas, dust, dark matter, and black holes. Their motion shows there is more gravity than visible matter can explain.",
          note: "Dark matter is inferred from gravitational behavior, not direct light.",
          links: [{ label: "NASA galaxies", url: "https://science.nasa.gov/universe/galaxies/" }]
        },
        {
          status: "astronomy",
          topic: "Observation",
          title: "How do telescopes turn faint light into discovery?",
          host: "Observational astronomy",
          dates: "Key tools: aperture, resolution, detectors, spectra",
          action: "Read the sky",
          eligibility: "Best for telescope builders and sky watchers",
          summary:
            "Telescopes collect light, sharpen detail, and separate colors. Modern observatories combine mirrors, sensors, computers, and patient timing.",
          note: "A larger aperture gathers more light and can resolve finer details.",
          links: [{ label: "NASA electromagnetic spectrum", url: "https://science.nasa.gov/ems/" }]
        }
      ],
      sources: [
        {
          title: "NASA Science",
          text: "Mission pages and accessible astronomy explainers.",
          links: [{ label: "Open NASA Science", url: "https://science.nasa.gov/" }]
        },
        {
          title: "ESA Science",
          text: "European mission science and space observatory updates.",
          links: [{ label: "Open ESA Science", url: "https://www.esa.int/Science_Exploration/Space_Science" }]
        },
        {
          title: "ISRO",
          text: "Indian space mission updates and science programs.",
          links: [{ label: "Open ISRO", url: "https://www.isro.gov.in/" }]
        }
      ]
    },
    simulations: {
      title: "Interactive Simulations",
      intro:
        "Hands-on physics and astronomy simulations that let learners adjust inputs, watch systems evolve, and build intuition through motion.",
      note:
        "The useful simulation material is now organized directly here by subject, so visitors can jump straight into the experiment they want.",
      mainHeading: "Simulation launchpad",
      sourceHeading: "What to try first",
      items: [
        {
          status: "sim",
          topic: "Orbits",
          title: "Gravity and orbital motion",
          host: "Computational astronomy",
          dates: "Simulations: two-body, three-body, ISS, Kepler, N-body",
          action: "Launch orbit cluster",
          eligibility: "Best for astronomy and mechanics learners",
          summary:
            "Explore stable orbits, chaotic gravitational systems, satellite paths, Kepler's laws, and many-body interactions.",
          note: "Change initial conditions and watch how gravity writes the path.",
          links: [
            { label: "Two-body", url: "labs/lab3.html" },
            { label: "Three-body", url: "labs/lab4.html" },
            { label: "ISS orbit", url: "labs/lab5_iss.html" },
            { label: "Kepler", url: "labs/lab6_kepler.html" },
            { label: "N-body", url: "labs/lab8_nbody.html" },
            { label: "Gravitational lensing", url: "labs/lab15_lensing.html" }
          ]
        },
        {
          status: "sim",
          topic: "Numerical Methods",
          title: "Numerical integration basics",
          host: "Core computational physics",
          dates: "Simulation: integration, stepping methods, error behavior",
          action: "Launch numerical starter",
          eligibility: "Best first step before complex simulations",
          summary:
            "Numerical integration turns a physics equation into a sequence of calculated states, making motion, decay, and fields visible step by step.",
          note: "Start here if you want to understand how the simulations are built.",
          links: [{ label: "Numerical methods", url: "labs/lab1.html" }]
        },
        {
          status: "sim",
          topic: "Waves",
          title: "Oscillations and wave motion",
          host: "Computational physics",
          dates: "Simulations: harmonic oscillator and wave equation",
          action: "Launch wave cluster",
          eligibility: "Best for learners studying sound, light, and fields",
          summary:
            "Use oscillators and waves to see periodic motion, energy exchange, propagation, and boundary effects.",
          note: "This connects directly to optics, acoustics, and quantum wave behavior.",
          links: [
            { label: "Oscillator", url: "labs/lab2.html" },
            { label: "Wave equation", url: "labs/lab13_wave.html" }
          ]
        },
        {
          status: "sim",
          topic: "Matter",
          title: "Atoms, decay, and random motion",
          host: "Modern and statistical physics",
          dates: "Simulations: decay, photoelectric effect, diffusion",
          action: "Launch matter cluster",
          eligibility: "Best for quantum and statistical physics learners",
          summary:
            "Model radioactive decay, photon energy thresholds, and random walks that build macroscopic diffusion.",
          note: "These labs show how probability becomes a measurable physical pattern.",
          links: [
            { label: "Decay", url: "labs/lab9_decay.html" },
            { label: "Photoelectric", url: "labs/lab10_photoelectric.html" },
            { label: "Diffusion", url: "labs/lab12_diffusion.html" },
            { label: "Stellar life", url: "labs/lab17_stellar.html" }
          ]
        },
        {
          status: "sim",
          topic: "Cosmos",
          title: "Light as evidence across the universe",
          host: "Astronomy measurement",
          dates: "Simulations: exoplanet transits, gravitational lensing, Hubble expansion",
          action: "Launch cosmos measurement cluster",
          eligibility: "Best for astronomy learners who want to infer unseen objects from data",
          summary:
            "Use light curves, lensed arcs, and galaxy recession plots to understand how astronomers measure planets, mass, and cosmic expansion.",
          note: "These simulations show how hidden cosmic properties become measurable through light.",
          links: [
            { label: "Exoplanet transit", url: "labs/lab14_exoplanet.html" },
            { label: "Gravitational lensing", url: "labs/lab15_lensing.html" },
            { label: "Hubble expansion", url: "labs/lab16_hubble.html" }
          ]
        },
        {
          status: "sim",
          topic: "Circuits",
          title: "Electric response and exponential change",
          host: "Electricity and systems",
          dates: "Simulation: RC circuit",
          action: "Launch circuit simulation",
          eligibility: "Best for electronics and signal learners",
          summary:
            "The RC circuit shows charging, discharging, time constants, and exponential behavior in a simple physical system.",
          note: "The same exponential language appears in cooling, decay, and many relaxation processes.",
          links: [{ label: "RC circuit", url: "labs/lab11_rc.html" }]
        }
      ],
      sources: [
        {
          title: "Cosmos Explorer mode",
          text: "The attached explorer page is preserved as a full-screen space science dashboard.",
          links: [{ label: "Open cosmos explorer", url: "cosmos-explorer.html" }]
        },
        {
          title: "Compare mode",
          text: "Run two simulations side by side to compare gravity, waves, matter, and circuits.",
          links: [{ label: "Open compare mode", url: "compare.html" }]
        },
        {
          title: "Numerical starter",
          text: "Best first route for understanding how computational experiments work.",
          links: [{ label: "Open numerical methods", url: "labs/lab1.html" }]
        },
        {
          title: "Start with orbits",
          text: "Best first route for astronomy energy and visual motion.",
          links: [{ label: "Open Kepler simulation", url: "labs/lab6_kepler.html" }]
        },
        {
          title: "Start with waves",
          text: "Best first route for physics patterns and experimentation.",
          links: [{ label: "Open wave simulation", url: "labs/lab13_wave.html" }]
        }
      ]
    },
    sources: {
      title: "Physics and Astronomy Sources",
      intro:
        "A clean directory of credible science learning hubs, space agencies, and simulation resources that fit this website's subject.",
      note:
        "All older unrelated source categories have been removed. This page now supports only physics, astronomy, space science, and simulation learning.",
      mainHeading: "Source directory",
      groups: [
        {
          title: "Space science agencies",
          text: "Mission-backed sources for astronomy, planets, stars, and space exploration.",
          sources: [
            {
              title: "NASA Science",
              text: "Astronomy, planetary science, missions, and electromagnetic spectrum explainers.",
              links: [{ label: "Open", url: "https://science.nasa.gov/" }]
            },
            {
              title: "ESA Science and Exploration",
              text: "European space science missions and astronomy updates.",
              links: [{ label: "Open", url: "https://www.esa.int/Science_Exploration" }]
            },
            {
              title: "ISRO",
              text: "Indian space missions, science updates, launches, and education notices.",
              links: [{ label: "Open", url: "https://www.isro.gov.in/" }]
            }
          ]
        },
        {
          title: "Physics learning",
          text: "Concept-first resources for mechanics, waves, quantum physics, electricity, and systems.",
          sources: [
            {
              title: "PhET Interactive Simulations",
              text: "Visual physics simulations for learning by changing variables.",
              links: [{ label: "Open", url: "https://phet.colorado.edu/" }]
            },
            {
              title: "OpenStax Science",
              text: "Free textbook-style science materials including physics and astronomy.",
              links: [{ label: "Open", url: "https://openstax.org/subjects/science" }]
            },
            {
              title: "HyperPhysics",
              text: "Compact linked physics concept maps.",
              links: [{ label: "Open", url: "http://hyperphysics.phy-astr.gsu.edu/" }]
            }
          ]
        },
        {
          title: "Local simulations",
          text: "Direct routes into the website's own physics and astronomy experiments.",
          sources: [
            {
              title: "Numerical and Wave Experiments",
              text: "Numerical integration, harmonic oscillators, and wave motion.",
              links: [
                { label: "Numerical", url: "labs/lab1.html" },
                { label: "Oscillator", url: "labs/lab2.html" },
                { label: "Wave", url: "labs/lab13_wave.html" }
              ]
            },
            {
              title: "Orbit Cluster",
              text: "Two-body, three-body, ISS, Kepler, and N-body simulations.",
              links: [{ label: "Open", url: "simulations.html" }]
            },
            {
              title: "Matter and Systems",
              text: "Photoelectric effect, decay, diffusion, chaos, and RC circuits.",
              links: [
                { label: "Matter", url: "labs/lab10_photoelectric.html" },
                { label: "Systems", url: "labs/lab12_diffusion.html" }
              ]
            },
            {
              title: "Cosmos Measurement",
              text: "Exoplanet transits, gravitational lensing, Hubble expansion, and stellar life cycles.",
              links: [
                { label: "Exoplanets", url: "labs/lab14_exoplanet.html" },
                { label: "Lensing", url: "labs/lab15_lensing.html" },
                { label: "Expansion", url: "labs/lab16_hubble.html" },
                { label: "Stars", url: "labs/lab17_stellar.html" }
              ]
            }
          ]
        }
      ]
    }
  }
};
