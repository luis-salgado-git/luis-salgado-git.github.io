/* ==========================================================
   i18n.js · Cambio de idioma ES / EN
   Requiere que la página cargue ANTES un archivo de
   js/translations/*.js que defina window.TRANSLATIONS.
   Los elementos traducibles llevan data-i18n="clave".
   El texto en español es el que está escrito en el HTML.
   ========================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'site-lang';
  var translations = window.TRANSLATIONS || {};
  var toggleBtn = document.getElementById('lang-toggle');
  if (!toggleBtn) return;

  // localStorage puede fallar (modo privado de Safari, cookies bloqueadas…)
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
      // guardamos el texto original (español) la primera vez
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
