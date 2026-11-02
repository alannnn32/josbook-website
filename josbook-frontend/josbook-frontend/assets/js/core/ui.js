/* Helper tampilan: escape HTML, toast, tanggal, error form, ikon, sidebar admin. */
(function () {
  var IKON = {
    edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
    dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
    siswa: 'M22 10 12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5',
    naik: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM16 12l-4-4-4 4M12 16V8',
    mutasi: 'M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3',
    guru: 'M2 7h20v14H2zM16 7V3H8v4',
    alumni: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89 7 23l5-3 5 3-1.21-9.12',
    pelacakan: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z',
    nilai: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 17v-3M12 17v-6M16 17v-4',
    kehadiran: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18M9 16l2 2 4-4',
    ekskul: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17M14 14.66V17M7 22c0-1.76.85-3.25 2.03-3.79M17 22c0-1.76-.85-3.25-2.03-3.79M18 2H6v7a6 6 0 0 0 12 0V2z',
    laporan: 'M3 3h18v14H3zM8 21l4-4 4 4M7 12l3-3 3 2 4-4',
    log: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
    master: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z',
    cek: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
    info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
    setting: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
    inputnilai: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4M14 2l6 6v3M14 2v6h6M13.5 20.5 20 14l2 2-6.5 6.5-3 .5z',
    kalender: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
    bintang: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    kelas: 'M3 3h18v14H3zM8 21h8M12 17v4',
    chevron: 'M6 9l6 6 6-6',
    menu: 'M3 12h18M3 6h18M3 18h18',
    user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
    eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    eyeoff: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22',
    arrow: 'M5 12h14M12 5l7 7-7 7',
    check: 'M20 6 9 17l-5-5',
    logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9'
  };

  var UI = {
    esc: function (s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },

    ikon: function (nama, ukuran) {
      return '<svg class="ikon" width="' + (ukuran || 20) + '" height="' + (ukuran || 20) +
        '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' +
        (IKON[nama] || '') + '"/></svg>';
    },

    toast: function (pesan, jenis) {
      var wadah = document.getElementById('toast-wadah');
      if (!wadah) {
        wadah = document.createElement('div');
        wadah.id = 'toast-wadah';
        wadah.setAttribute('role', 'status');
        wadah.setAttribute('aria-live', 'polite');
        document.body.appendChild(wadah);
      }
      var el = document.createElement('div');
      el.className = 'toast toast-' + (jenis || 'info');
      el.textContent = pesan;
      wadah.appendChild(el);
      setTimeout(function () { el.remove(); }, 4000);
    },

    tanggal: function (iso) {
      if (!iso) return '-';
      var b = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'];
      var p = String(iso).slice(0, 10).split('-');
      if (p.length !== 3) return '-';
      return parseInt(p[2], 10) + ' ' + b[parseInt(p[1], 10) - 1] + ' ' + p[0];
    },

    /* errors: {field:[pesan,...]} dari respons 422. Input dicari lewat atribut name. */
    bersihkanError: function (form) {
      form.querySelectorAll('.galat-field').forEach(function (e) { e.remove(); });
      form.querySelectorAll('.punya-galat').forEach(function (e) { e.classList.remove('punya-galat'); });
    },
    tampilkanError: function (form, errors) {
      UI.bersihkanError(form);
      Object.keys(errors || {}).forEach(function (nama) {
        var input = form.querySelector('[name="' + nama + '"]');
        if (!input) return;
        var kotak = input.closest('.kolom-input') || input;
        kotak.classList.add('punya-galat');
        var p = document.createElement('p');
        p.className = 'galat-field';
        p.textContent = [].concat(errors[nama])[0];
        (input.closest('.grup') || kotak.parentNode).appendChild(p);
      });
    },

    /* Pembangun sidebar bersama (admin & guru). */
    renderSidebar: function (menu, aktif, user, subteks, labelNav) {
      var nama = (user && user.nama) || 'Pengguna';
      var inisial = nama.split(/\s+/).slice(0, 2).map(function (k) { return k.charAt(0); }).join('').toUpperCase();

      var item = menu.map(function (m) {
        return '<a class="menu-item' + (m[0] === aktif ? ' aktif' : '') + '" href="' +
          UI.esc(CONFIG.url(m[3])) + '"' + (m[0] === aktif ? ' aria-current="page"' : '') + '>' +
          UI.ikon(m[2], 18) + '<span>' + UI.esc(m[1]) + '</span></a>';
      }).join('');

      document.getElementById('sidebar').innerHTML =
        '<div class="sb-merek"><img src="' + UI.esc(CONFIG.url('assets/img/logo.png')) + '" alt="" width="40" height="40">' +
        '<div><strong>JosBook</strong><small>Portal Akademik</small></div></div>' +
        '<nav class="sb-menu" aria-label="' + UI.esc(labelNav) + '">' + item + '</nav>' +
        '<div class="sb-user">' +
        '<div class="user-menu" id="user-menu" hidden>' +
        '<a href="' + UI.esc(CONFIG.url('pages/shared/ganti-password.html')) + '">' + UI.ikon('lock', 16) + 'Ganti password</a>' +
        '<button type="button" id="btn-keluar">' + UI.ikon('logout', 16) + 'Keluar</button></div>' +
        '<button type="button" class="user-kartu" id="user-tombol" aria-haspopup="true" aria-expanded="false">' +
        '<span class="avatar">' + UI.esc(inisial) + '</span>' +
        '<span class="user-teks"><strong>' + UI.esc(nama) + '</strong><small>' + UI.esc(subteks) + '</small></span>' +
        UI.ikon('chevron', 18) + '</button></div>';

      var tombol = document.getElementById('user-tombol');
      var panel = document.getElementById('user-menu');
      tombol.addEventListener('click', function () {
        var buka = panel.hidden;
        panel.hidden = !buka;
        tombol.setAttribute('aria-expanded', String(buka));
      });
      document.getElementById('btn-keluar').addEventListener('click', function () { Halaman.keluar(); });

      var sb = document.getElementById('sidebar');
      var tutup = function () { document.body.classList.remove('sb-buka'); };
      var bukaTombol = document.getElementById('btn-menu');
      if (bukaTombol) bukaTombol.addEventListener('click', function () { document.body.classList.toggle('sb-buka'); });
      var tirai = document.getElementById('tirai');
      if (tirai) tirai.addEventListener('click', tutup);
      sb.addEventListener('click', function (e) { if (e.target.closest('a')) tutup(); });
    },

    /* Sidebar admin sesuai desain Figma. */
    sidebarAdmin: function (aktif, user) {
      var menu = [
        ['dashboard', 'Dashboard', 'dashboard', 'pages/admin/dashboard.html'],
        ['siswa', 'Data Siswa', 'siswa', 'pages/shared/siswa.html'],
        ['pendataan', 'Form Pendataan', 'edit', 'pages/shared/siswa-baru.html'],
        ['kenaikan', 'Kenaikan Kelas', 'naik', 'pages/shared/kenaikan-kelas.html'],
        ['mutasi', 'Mutasi Siswa', 'mutasi', 'pages/admin/mutasi.html'],
        ['guru', 'Data Guru', 'guru', 'pages/admin/guru.html'],
        ['alumni', 'Alumni & Kontrol Induk', 'alumni', 'pages/admin/alumni.html'],
        ['pelacakan', 'Pelacakan Alumni', 'pelacakan', 'pages/admin/pelacakan.html'],
        ['imp-nilai', 'Import Nilai', 'nilai', 'pages/shared/import.html?jenis=nilai'],
        ['imp-hadir', 'Import Kehadiran', 'kehadiran', 'pages/shared/import.html?jenis=kehadiran'],
        ['imp-ekskul', 'Import Ekskul', 'ekskul', 'pages/shared/import.html?jenis=ekskul'],
        ['laporan', 'Laporan', 'laporan', 'pages/admin/laporan.html'],
        ['log', 'Log Aktivitas', 'log', 'pages/admin/log.html'],
        ['master', 'Master Kelas & Mapel', 'master', 'pages/admin/master.html'],
        ['cek', 'Cek Kualitas Data', 'cek', 'pages/admin/cek-data.html'],
        ['setting', 'Setting', 'setting', 'pages/admin/pengaturan.html']
      ];
      if (window.AdminSidebar) AdminSidebar.render(aktif, user);
      else UI.renderSidebar(menu, aktif, user, 'Akses penuh', 'Menu admin');
    },

    /* Sidebar guru sesuai desain Figma. Menu disembunyikan menurut user.guru
       (hanya untuk tampilan; keamanan sebenarnya di backend). */
    sidebarGuru: function (aktif, user) {
      var g = (user && user.guru) || {};
      var adaMapel = !!(g.mapel && g.mapel.length);
      var adaWali = !!g.wali;
      var menu = [
        ['dashboard', 'Dashboard', 'dashboard', 'pages/guru/beranda.html'],
        ['siswa', 'Data Siswa', 'siswa', 'pages/shared/siswa.html']
      ];
      if (adaMapel) {
        menu.push(['input-nilai', 'Input Nilai Mapel', 'inputnilai', 'pages/guru/input-nilai.html']);
        menu.push(['imp-nilai', 'Import Nilai', 'nilai', 'pages/shared/import.html?jenis=nilai']);
      }
      if (adaWali) {
        menu.push(['imp-hadir', 'Import Kehadiran', 'kehadiran', 'pages/shared/import.html?jenis=kehadiran']);
        menu.push(['imp-ekskul', 'Import Ekskul', 'ekskul', 'pages/shared/import.html?jenis=ekskul']);
      }
      menu.push(['log', 'Log Aktivitas', 'log', 'pages/admin/log.html']);
      menu.push(['setting', 'Setting', 'setting', 'pages/shared/ganti-password.html']);

      var peran = [];
      if (adaMapel) peran.push('Guru Mapel');
      if (adaWali) peran.push('Wali Kelas ' + g.wali);
      UI.renderSidebar(menu, aktif, user, peran.join(' & ') || 'Guru', 'Menu guru');
    }
  };

  window.UI = UI;
})();
