
const heroSlides = document.querySelectorAll('.hero-slide');

if (heroSlides.length > 1) {
  let activeSlide = 0;

  window.setInterval(() => {
    heroSlides[activeSlide].classList.remove('is-active');
    activeSlide = (activeSlide + 1) % heroSlides.length;
    heroSlides[activeSlide].classList.add('is-active');
  }, 5000);
}

const siteSearchForm = document.querySelector('#site-search');
const siteSearchInput = document.querySelector('#site-search-input');
const searchStatus = document.querySelector('#search-status');

if (siteSearchForm && siteSearchInput && searchStatus) {
  let highlightedSection = null;

  siteSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = siteSearchInput.value.trim().toLocaleLowerCase();

    if (highlightedSection) {
      highlightedSection.classList.remove('search-result-highlight');
      highlightedSection = null;
    }

    if (!query) {
      searchStatus.textContent = 'Enter a search term.';
      searchStatus.hidden = false;
      siteSearchInput.focus();
      return;
    }

    const sections = document.querySelectorAll(
      '.hero, .leaflet-wrapper > .section, .contact-footer'
    );
    const matches = Array.from(sections).filter((section) =>
      section.textContent.toLocaleLowerCase().includes(query)
    );

    if (matches.length) {
      highlightedSection = matches[0];
      highlightedSection.classList.add('search-result-highlight');
      highlightedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      searchStatus.textContent = `Found ${matches.length} matching section${matches.length === 1 ? '' : 's'}.`;
    } else {
      searchStatus.textContent = `No results for "${siteSearchInput.value.trim()}".`;
    }

    searchStatus.hidden = false;
  });

  siteSearchInput.addEventListener('input', () => {
    searchStatus.hidden = true;
  });
}
