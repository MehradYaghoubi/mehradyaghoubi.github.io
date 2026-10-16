const languageLink = document.querySelector('[data-language-link]');
languageLink?.addEventListener('click', () => {
  languageLink.hash = window.location.hash;
});

const printButton = document.querySelector('.print-button');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}
