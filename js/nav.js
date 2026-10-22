
(function () {
  'use strict';

  var sidebar = document.querySelector('.sidebar');
  var tree = document.querySelector('.file-tree');
  if (!sidebar || !tree) return;

  var mobileQuery = window.matchMedia('(max-width: 760px)');


  var links = Array.prototype.slice.call(tree.querySelectorAll('a[href^="#"]'));
  var items = links.map(function (link) {
    return { link: link, section: document.getElementById(link.getAttribute('href').slice(1)) };
  }).filter(function (item) { return item.section; });

  function updateOffset() {
    var offset = mobileQuery.matches ? Math.ceil(sidebar.getBoundingClientRect().height) + 8 : 0;
    document.documentElement.style.setProperty('--sticky-offset', offset + 'px');
    return offset;
  }


  function centerTab(link) {
    if (!mobileQuery.matches) return;
    var treeRect = tree.getBoundingClientRect();
    var linkRect = link.getBoundingClientRect();
    var target = tree.scrollLeft + (linkRect.left - treeRect.left) - (tree.clientWidth - linkRect.width) / 2;
    tree.scrollTo({ left: target, behavior: 'smooth' });
  }


  var activeLink = null;
  function setActive(link) {
    if (link === activeLink) return;
    items.forEach(function (item) { item.link.classList.toggle('active', item.link === link); });
    activeLink = link;
    centerTab(link);
  }

  function onScroll() {
    var offset = updateOffset();
    var line = offset + 80; 
    var current = items[0];

    items.forEach(function (item) {
      if (item.section.getBoundingClientRect().top <= line) current = item;
    });


    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) current = items[items.length - 1];

    if (current) setActive(current.link);
  }

  var ticking = false;
  function requestTick() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  window.addEventListener('orientationchange', requestTick);
  // la altura del header cambia al cambiar de idioma o al cargar las fuentes
  window.addEventListener('load', requestTick);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(requestTick);

  updateOffset();
  if (items.length) onScroll();
})();
