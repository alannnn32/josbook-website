/* Dashboard admin (pages/admin/dashboard.html). Memakai GET /dashboard
   (endpoint dummy, lihat api.js; cocokkan dengan kontrak API saat backend siap). */
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  UI.sidebarAdmin('dashboard', user);
  var isi = document.getElementById('isi');

  function n(v) { return Number(v) || 0; }

  function kartu(label, nilai) {
    return '<article class="kartu-stat"><span>' + UI.esc(label) + '</span><strong>' + UI.esc(nilai) + '</strong></article>';
  }

  function lencana(persen) {
    var p = n(persen);
    var kelas = p >= 90 ? 'hijau' : (p >= 70 ? 'kuning' : 'merah');
    return '<span class="lencana lencana-' + kelas + '">' + p + '%</span>';
  }

  function render(d) {
    var r = d.ringkasan || {};
    document.getElementById('tahun-ajaran').textContent = 'Tahun ajaran ' + (d.tahun_ajaran || '-');

    var barisKelas = (d.kelas || []).map(function (k) {
      return '<tr><td>' + UI.esc(k.kelas) + '</td><td>' + n(k.l) + '</td><td>' + n(k.p) +
        '</td><td class="tebal">' + n(k.total) + '</td><td>' + lencana(k.kelengkapan) + '</td></tr>';
    }).join('') || '<tr><td colspan="5" class="kosong">Belum ada data kelas.</td></tr>';

    var perlu = (d.perlu_dilengkapi || []).map(function (s) {
      return '<li><div><strong>' + UI.esc(s.nama) + '</strong> <span class="redup">&middot; ' + UI.esc(s.kelas) + '</span>' +
        '<small>Kurang: ' + UI.esc(s.kurang) + '</small></div>' +
        '<a class="tombol tombol-kecil" href="' + UI.esc(CONFIG.url('pages/shared/siswa-detail.html?id=' + encodeURIComponent(s.id))) + '">Edit</a></li>';
    }).join('') || '<li class="kosong">Semua data siswa sudah lengkap.</li>';

    var a = d.angkatan || {};
    var angkatan = ['X', 'XI', 'XII'].map(function (t) {
      return '<article class="kartu-angkatan"><span>Kelas ' + t + '</span><strong>' + n(a[t]) + ' Siswa</strong>' +
        '<i class="ikon-angkatan">' + UI.ikon('log', 18) + '</i></article>';
    }).join('');

    var alumni = (d.alumni_per_tahun || []).map(function (x) {
      return '<span class="chip">' + UI.esc(x.tahun) + ': ' + n(x.jumlah) + '</span>';
    }).join('') || '<span class="redup">Belum ada alumni.</span>';

    var aktivitas = (d.aktivitas || []).map(function (x) {
      return '<li><strong>' + UI.esc(x.pengguna) + '</strong> ' + UI.esc(x.aksi) +
        ' <small>' + UI.esc(x.waktu) + '</small></li>';
    }).join('');
    aktivitas = aktivitas ? '<ul class="daftar-aktivitas">' + aktivitas + '</ul>' : '<p class="redup">Belum ada aktivitas.</p>';

    isi.innerHTML =
      '<section class="grid-stat">' +
        kartu('Siswa aktif', n(r.siswa_aktif)) + kartu('Guru', n(r.guru)) +
        kartu('Alumni', n(r.alumni)) + kartu('Data di sampah', n(r.sampah)) +
        kartu('Laki-laki', n(r.laki_laki)) + kartu('Perempuan', n(r.perempuan)) +
        kartu('Pindah / keluar ' + (d.tahun_ajaran || ''), n(r.pindah_keluar)) +
        kartu('Kelengkapan data', n(r.kelengkapan) + '%') +
      '</section>' +
      '<section class="grid-dua">' +
        '<article class="panel"><h2>Komposisi per kelas</h2>' +
          '<div class="gulir-x"><table class="tabel"><thead><tr><th>Kelas</th><th>L</th><th>P</th><th>Total</th><th>Kelengkapan</th></tr></thead><tbody>' + barisKelas + '</tbody></table></div></article>' +
        '<article class="panel"><h2>Perlu dilengkapi</h2><ul class="daftar-lengkapi">' + perlu + '</ul></article>' +
      '</section>' +
      '<section class="grid-dua">' +
        '<article class="panel"><h2>Siswa per angkatan</h2><div class="grid-angkatan">' + angkatan + '</div></article>' +
        '<article class="panel"><h2>Alumni per tahun lulus</h2><div class="baris-chip">' + alumni + '</div>' +
          '<h2 class="sub-judul">Aktivitas terbaru</h2>' + aktivitas + '</article>' +
      '</section>';
  }

  try {
    var hasil = await api.get('/dashboard');
    render(hasil.data);
  } catch (e) {
    isi.innerHTML = '<div class="galat-umum">' + UI.esc(e.message) +
      (e.status ? ' (kode ' + UI.esc(e.status) + ')' : '') + '</div>';
  }
});
