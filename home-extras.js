(function initHomeExtras() {
  const questions = [
    'Why can a planet be falling forever without hitting the Sun?',
    'How can a tiny dip in starlight reveal a planet we cannot see?',
    'Why do massive stars live shorter lives than smaller stars?',
    'How does mass bend light into arcs and rings?',
    'What does redshift reveal about the expansion of the universe?',
    'Why do random walks create smooth diffusion patterns?'
  ];
  const target = document.getElementById('curiosityQuestion');
  if (!target) return;
  const index = new Date().getDate() % questions.length;
  target.textContent = questions[index];
})();
