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

  function render(active, user) {
    var host = document.getElementById('sidebar');
    if (!host) return Promise.resolve();

    return loadTemplate().then(function (template) {
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
      toggle.addEventListener('click', function () {
        menu.hidden = !menu.hidden;
        toggle.setAttribute('aria-expanded', String(!menu.hidden));
      });
      host.querySelector('#btn-keluar').addEventListener('click', function () {
        if (window.Halaman && typeof Halaman.keluar === 'function') Halaman.keluar();
        else if (window.Auth) {
          Auth.hapus();
          Auth.keLogin();
        }
      });
      host.addEventListener('click', function (event) {
        if (event.target.closest('a')) document.body.classList.remove('sb-buka');
      });

      var openButton = document.getElementById('btn-menu');
      if (openButton) {
        openButton.addEventListener('click', function () {
          document.body.classList.toggle('sb-buka');
        });
      }
      var curtain = document.getElementById('tirai');
      if (curtain) {
        curtain.addEventListener('click', function () {
          document.body.classList.remove('sb-buka');
        });
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
