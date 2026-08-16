(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('.theme-toggle');

  if (!toggle) return;

  function syncLabel() {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    toggle.setAttribute('title', 'Switch to ' + next + ' theme');
  }

  toggle.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    syncLabel();
  });

  syncLabel();
}());

