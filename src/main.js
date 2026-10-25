const languageLink = document.querySelector('[data-language-link]');
languageLink?.addEventListener('click', () => {
  languageLink.hash = window.location.hash;
});
