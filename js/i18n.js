
(function () {
  'use strict';

  var STORAGE_KEY = 'site-lang';
  var translations = window.TRANSLATIONS || {};
  var toggleBtn = document.getElementById('lang-toggle');
  if (!toggleBtn) return;

  // localStorage puede fallar 
  function readLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'es'; }
    catch (e) { return 'es'; }
  }
  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* sin persistencia */ }
  }

  var currentLang = readLang();

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {

      if (!el.dataset.esOriginal) el.dataset.esOriginal = el.textContent;
      var key = el.getAttribute('data-i18n');
      el.textContent = (lang === 'en' && translations[key]) ? translations[key] : el.dataset.esOriginal;
    });

    document.documentElement.lang = lang;
    toggleBtn.textContent = lang === 'en' ? 'ES' : 'EN';
    toggleBtn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    saveLang(lang);
    currentLang = lang;
  }

  toggleBtn.addEventListener('click', function () {
    applyLang(currentLang === 'es' ? 'en' : 'es');
  });

  applyLang(currentLang);
})();
