// CSS отвечает за плавное раскрытие меню и прокрутку к якорям.
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

if (header && menuToggle && navigation) {
  const setMenuOpen = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    header.classList.toggle('is-menu-open', open);
  };

  header.classList.add('has-menu');
  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenuOpen(false);
    // Фокус переносится из скрывающегося меню к выбранному разделу.
    if (window.matchMedia('(max-width: 768px)').matches) {
      const section = document.querySelector(link.hash);
      if (section) {
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
        section.addEventListener('blur', () => section.removeAttribute('tabindex'), { once: true });
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenuOpen(false);
  });
  window.matchMedia('(min-width: 769px)').addEventListener('change', () => setMenuOpen(false));
}

