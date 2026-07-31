const CACHE_NAME = 'cosmic-physics-lab-v2';
const CORE_ASSETS = [
  './','./index.html','./simulations.html','./study.html','./collections.html','./glossary.html','./formulas.html','./learning-paths.html','./sky-calendar.html','./teacher-mode.html','./methodology.html','./search.html','./concept-map.html','./progress.html','./site-styles.css','./style.css','./site-data.js','./site-app.js','./study-data.js','./study-tools.js','./accessibility.js','./progress.js','./offline.js','./home-extras.js','./cosmos-hub.js','./compare.html','./compare.js','./contact.html','./contact.js','./labs/sim-shell.js','./labs/sim-resize.js','./labs/lab3.html','./labs/lab14_exoplanet.html','./labs/lab15_lensing.html','./labs/lab16_hubble.html','./labs/lab17_stellar.html','./labs/lab18_orrery.html','./labs/lab19_moon.html','./labs/lab20_telescope.html','./labs/lab21_spectroscopy.html','./labs/lab22_radial_velocity.html','./labs/lab23_rotation_curve.html','./labs/lab24_cmb.html','./labs/lab25_blackhole.html','./labs/lab26_projectile.html','./labs/lab27_collisions.html','./labs/lab28_electric_fields.html','./labs/lab29_lorentz.html','./labs/lab30_double_slit.html','./labs/lab31_gas.html','./labs/lab32_pendulum.html','./labs/lab33_standing_waves.html','./labs/extra-sim.js','./labs/lab34_escape.html','./labs/lab35_lagrange.html','./labs/lab36_roche.html','./labs/lab37_pulsar.html','./labs/lab38_supernova.html','./labs/lab39_gravitational_waves.html','./labs/lab40_polarization.html','./labs/lab41_heat.html'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match('./index.html'))));
});
