/* Kerangka halaman (sidebar/topbar), toast, dan helper kecil. Satu berkas, dipakai semua halaman. */
(function () {
  var L = function (p) { return JOSBOOK.ROOT + 'pages/' + p; };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // Menu per peran. kunci = nama berkas halaman tanpa .html. Menu guru menyesuaikan mapel/wali.
  var MENU_ADMIN = [
    ['dashboard', '🏠 Dashboard', 'admin/dashboard.html'], ['siswa', '🎓 Data Siswa', 'shared/siswa.html'],
    ['siswa-baru', '＋ Form Pendataan', 'shared/siswa-baru.html'], ['kenaikan-kelas', '⬆ Kenaikan Kelas', 'shared/kenaikan-kelas.html'],
    ['mutasi', '🔁 Mutasi Siswa', 'admin/mutasi.html'], ['guru', '👩‍🏫 Data Guru', 'admin/guru.html'],
    ['alumni', '🎖 Alumni & Kontrol Induk', 'admin/alumni.html'], ['pelacakan', '🧭 Pelacakan Alumni', 'admin/pelacakan.html'],
    ['import?jenis=nilai', '📊 Import Nilai', 'shared/import.html?jenis=nilai'], ['import?jenis=kehadiran', '📅 Import Kehadiran', 'shared/import.html?jenis=kehadiran'],
    ['import?jenis=ekskul', '⚽ Import Ekskul', 'shared/import.html?jenis=ekskul'], ['laporan', '📈 Laporan', 'admin/laporan.html'],
    ['log', '🧾 Log Aktivitas', 'admin/log.html'], ['master', '🗂 Master Kelas & Mapel', 'admin/master.html'],
    ['cek-data', '🔍 Cek Kualitas Data', 'admin/cek-data.html'], ['sampah', '🗑 Tempat Sampah', 'admin/sampah.html'],
    ['pengaturan', '⚙ Setting', 'admin/pengaturan.html'], ['cetak', '🖨 Cetak', 'shared/cetak.html'],
  ];
  function menuGuru(u) {
    var g = u.guru || {}, m = [['beranda', '🏠 Beranda Saya', 'guru/beranda.html'], ['siswa', '🎓 Data Siswa', 'shared/siswa.html']];
    if ((g.mapel || []).length) m.push(['input-nilai', '📝 Input Nilai Mapel', 'guru/input-nilai.html'], ['import?jenis=nilai', '📊 Import Nilai', 'shared/import.html?jenis=nilai']);
    if (g.wali) m.push(['kenaikan-kelas', '⬆ Kenaikan Kelas ' + g.wali, 'shared/kenaikan-kelas.html'], ['import?jenis=kehadiran', '📅 Import Kehadiran', 'shared/import.html?jenis=kehadiran'], ['import?jenis=ekskul', '⚽ Import Ekskul', 'shared/import.html?jenis=ekskul']);
    m.push(['cetak', '🖨 Cetak', 'shared/cetak.html']);
    return m;
  }
  var MENU_PORTAL = [['beranda', '🏠', 'Beranda', 'portal/beranda.html'], ['biodata', '👤', 'Biodata', 'portal/biodata.html'], ['nilai', '📝', 'Nilai', 'portal/nilai.html'], ['unduh', '⬇', 'Unduh', 'portal/unduh.html']];

  function aktif(kunci) {
    var nama = location.pathname.split('/').pop().replace('.html', ''), jenis = new URLSearchParams(location.search).get('jenis');
    return kunci === nama || (jenis && kunci === nama + '?jenis=' + jenis);
  }

  window.UI = {
    esc: esc,
    toast: function (pesan, jenis) {
      var w = document.getElementById('toast');
      if (!w) { w = document.createElement('div'); w.id = 'toast'; document.body.appendChild(w); }
      var t = document.createElement('div'); t.className = 'toast ' + (jenis || ''); t.textContent = pesan; w.appendChild(t);
      setTimeout(function () { t.remove(); }, 4500);
    },
    konfirmasi: function (pesan) { return Promise.resolve(window.confirm(pesan)); }, // TODO: ganti modal sendiri
    // Tampilkan error 422 di bawah tiap input ber-name yang sama dengan kunci errors
    tampilkanError: function (form, errors) {
      form.querySelectorAll('.err').forEach(function (e) { e.remove(); });
      Object.keys(errors || {}).forEach(function (k) {
        var el = form.querySelector('[name="' + k + '"]'); if (!el) return;
        var d = document.createElement('div'); d.className = 'err'; d.textContent = errors[k][0]; el.insertAdjacentElement('afterend', d);
      });
    },
    tanggal: function (iso) { if (!iso) return ''; var p = String(iso).slice(0, 10).split('-'); return p.length === 3 ? p[2] + '-' + p[1] + '-' + p[0] : iso; },
    tabel: function (kepala, baris) {
      return '<div class="tw"><table><thead><tr>' + kepala.map(function (k) { return '<th>' + esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        (baris.length ? baris.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') :
          '<tr><td colspan="' + kepala.length + '" style="color:var(--mu)">Tidak ada data.</td></tr>') + '</tbody></table></div>';
    },
    kerangka: function (user) {
      var peran = user.peran, M = peran === 'admin' ? MENU_ADMIN : menuGuru(user);
      var sb = document.getElementById('sidebar'), tb = document.getElementById('topbar');
      if (sb) sb.innerHTML = '<div class="logo"><b>BI</b> Buku Induk<br><small>SMA Negeri 1 Rejoso</small></div>' +
        M.map(function (m) { return '<a class="' + (aktif(m[0]) ? 'on' : '') + '" href="' + L(m[2]) + '">' + esc(m[1]) + '</a>'; }).join('') +
        '<div class="role"><b>' + esc(user.nama) + '</b><br>' + (peran === 'admin' ? 'Akses penuh' : esc(peranGuru(user))) + '</div>';
      if (tb) {
        tb.innerHTML = '<input id="cari" placeholder="Cari siswa / guru…" style="width:260px"><span class="sp"></span>' +
          '<a class="btn o" href="' + L('shared/ganti-password.html') + '">Ganti password</a><button class="btn x" id="keluar">Keluar</button>';
        document.getElementById('keluar').onclick = function () { Auth.logout(); };
        // TODO: sambungkan #cari ke GET /pencarian (debounce) dan tampilkan hasil
      }
    },
    kerangkaPortal: function (user) {
      var h = document.getElementById('hp-header'), n = document.getElementById('hp-nav');
      if (h) h.innerHTML = '<b>' + esc(user.nama) + '</b><div style="opacity:.8;font-size:11px">Portal siswa · hanya lihat</div>';
      if (n) n.innerHTML = MENU_PORTAL.map(function (m) { return '<a class="' + (aktif(m[0]) ? 'on' : '') + '" href="' + L(m[3]) + '">' + m[1] + '<br>' + m[2] + '</a>'; }).join('');
    },
  };
  function peranGuru(u) { var g = u.guru || {}, a = []; if ((g.mapel || []).length) a.push('Guru mapel'); if (g.wali) a.push('Wali kelas ' + g.wali); return a.join(' + ') || 'Guru'; }

  // Titik masuk setiap halaman:
  //   Halaman.mulai({ peran: ['admin'] }, async function (user) { ...isi halaman... });
  window.Halaman = {
    async mulai(opsi, isi) {
      try {
        var user = await Guard.wajib(opsi.peran);
        if (user.peran === 'siswa') UI.kerangkaPortal(user); else UI.kerangka(user);
        await isi(user);
      } catch (e) {
        if (e instanceof ApiError) { UI.toast(e.message, 'er'); var k = document.getElementById('isi'); if (k) k.innerHTML = '<div class="note">' + esc(e.message) + '</div>'; }
        else { console.error(e); UI.toast('Terjadi kesalahan di halaman ini.', 'er'); }
      }
    },
  };
})();
