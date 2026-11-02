(function () {
  var templatePromise;
  var componentUrl = CONFIG.url('pages/components/sidebar.html');
  var styleUrl = CONFIG.url('assets/css/sidebar.css');

  function loadStyles() {
    var existing = document.querySelector('link[data-admin-sidebar-style]');
    if (existing) {
      if (existing.sheet) return Promise.resolve();
      return new Promise(function (resolve, reject) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', function () {
          reject(new Error('Gagal memuat gaya sidebar.'));
        }, { once: true });
      });
    }

    return new Promise(function (resolve, reject) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = styleUrl;
      link.dataset.adminSidebarStyle = 'true';
      link.addEventListener('load', resolve, { once: true });
      link.addEventListener('error', function () {
        reject(new Error('Gagal memuat gaya sidebar.'));
      }, { once: true });
      document.head.appendChild(link);
    });
  }

  function loadTemplate() {
    if (!templatePromise) {
      templatePromise = Promise.all([
        loadStyles(),
        fetch(componentUrl).then(function (response) {
          if (!response.ok) throw new Error('Sidebar gagal dimuat (' + response.status + ').');
          return response.text();
        })
      ]).then(function (results) {
        var template = document.createElement('template');
        template.innerHTML = results[1];
        var sidebar = template.content.querySelector('aside');
        if (!sidebar) throw new Error('Elemen <aside> tidak ditemukan pada komponen sidebar.');
        return sidebar;
      });
    }
    return templatePromise;
  }

  function prepareMobileNavigation(host) {
    var app = host.closest('.admin-app');
    if (!app) return;

    var content = Array.prototype.find.call(app.children, function (child) {
      return child !== host && !child.classList.contains('tirai') &&
        !child.classList.contains('admin-sidebar-curtain');
    });
    if (content && !document.getElementById('btn-menu')) {
      var bar = document.createElement('header');
      bar.className = 'admin-mobile-bar';
      bar.innerHTML = '<button type="button" class="tombol-ikon" id="btn-menu" aria-label="Buka menu">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 12h18M3 6h18M3 18h18"/></svg>' +
        '</button><strong>JosBook</strong>';
      content.insertBefore(bar, content.firstChild);
    }

    if (!app.querySelector('.tirai, .admin-sidebar-curtain')) {
      var curtain = document.createElement('div');
      curtain.className = 'admin-sidebar-curtain';
      app.insertBefore(curtain, host.nextSibling);
    }
  }

  function render(active, user) {
    var host = document.getElementById('sidebar');
    if (!host) return Promise.resolve();

    return loadTemplate().then(function (template) {
      prepareMobileNavigation(host);
      host.classList.add('josbook-sidebar');
      host.setAttribute('aria-label', 'Navigasi utama');
      host.innerHTML = template.innerHTML;

      var currentUrl = new URL(window.location.href);
      var links = host.querySelectorAll('[data-menu]');
      links.forEach(function (link) {
        var href = link.getAttribute('href');
        var target = new URL(href, componentUrl);
        link.href = target.href;
        var isActive = active
          ? link.dataset.menu === active
          : target.pathname === currentUrl.pathname && target.search === currentUrl.search;
        link.classList.toggle('aktif', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });

      var nama = (user && (user.nama || user.name)) || 'Admin Sekolah';
      var initials = nama.split(/\s+/).slice(0, 2).map(function (bagian) {
        return bagian.charAt(0);
      }).join('').toUpperCase();
      host.querySelector('[data-sidebar-name]').textContent = nama;
      host.querySelector('[data-sidebar-initials]').textContent = initials;
      host.querySelector('[data-sidebar-role]').textContent =
        user && user.peran && user.peran !== 'admin' ? user.peran : 'Akses penuh';

      var toggle = host.querySelector('#user-tombol');
      var menu = host.querySelector('#user-menu');
      toggle.onclick = function () {
        menu.hidden = !menu.hidden;
        toggle.setAttribute('aria-expanded', String(!menu.hidden));
      };
      host.querySelector('#btn-keluar').onclick = function () {
        if (window.Halaman && typeof Halaman.keluar === 'function') Halaman.keluar();
        else if (window.Auth) {
          Auth.hapus();
          Auth.keLogin();
        }
      };
      host.onclick = function (event) {
        if (event.target.closest('a')) {
          document.body.classList.remove('sb-buka', 'admin-sidebar-open');
        }
      };

      var openButton = document.getElementById('btn-menu');
      if (openButton) {
        openButton.onclick = function () {
          document.body.classList.toggle('sb-buka');
          document.body.classList.toggle('admin-sidebar-open');
        };
      }
      var curtain = document.querySelector('.tirai, .admin-sidebar-curtain');
      if (curtain) {
        curtain.onclick = function () {
          document.body.classList.remove('sb-buka', 'admin-sidebar-open');
        };
      }
    }).catch(function (error) {
      console.error('Tidak dapat menampilkan sidebar admin:', error);
      if (window.UI) UI.toast('Sidebar admin gagal dimuat. Muat ulang halaman untuk mencoba kembali.', 'error');
    });
  }

  window.AdminSidebar = { render: render };

  function initialize() {
    if (!document.getElementById('sidebar')) return;
    render(null, window.Auth && typeof Auth.user === 'function' ? Auth.user() : null);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
