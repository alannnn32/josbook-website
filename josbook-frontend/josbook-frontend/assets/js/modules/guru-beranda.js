/* Beranda guru (pages/guru/beranda.html).
   Nama, mapel, kelas ajar, dan wali kelas diambil dari user.guru (hasil login).
   Tahun ajaran dan jumlah siswa kelas wali: GET /guru/beranda (endpoint dummy, lihat api.js). */
Halaman.mulai({ peran: ['guru'] }, async function (user) {
  UI.sidebarGuru('dashboard', user);

  var g = user.guru || {};
  var mapel = g.mapel || [];
  var kelasAjar = g.kelas_ajar || [];
  var wali = g.wali || '';
  var isi = document.getElementById('isi');

  var peran = [];
  if (mapel.length) peran.push('Guru Mapel');
  if (wali) peran.push('Wali Kelas');
  document.getElementById('sub-peran').textContent = peran.join(' & ') || 'Guru';

  function hariIni() {
    return new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function render(d) {
    var chipTA = 'Tahun ajaran ' + (d.tahun_ajaran || '-') + (d.semester ? ' ' + d.semester : '') +
      (d.kurikulum ? ' \u2022 Kurikulum ' + d.kurikulum : '');

    var lencana = '';
    if (mapel.length) lencana += '<span class="chip-banner">' + UI.ikon('kelas', 15) + 'Guru ' + UI.esc(mapel.join(', ')) + '</span>';
    if (wali) lencana += '<span class="chip-banner">' + UI.ikon('bintang', 15) + 'Wali Kelas ' + UI.esc(wali) + '</span>';

    var kartu = '';
    if (mapel.length) {
      kartu += '<article class="panel">' +
        '<h2 class="judul-ikon">' + UI.ikon('inputnilai', 18) + 'Guru Mapel</h2>' +
        '<dl class="baris-info"><div><dt>Mapel</dt><dd>' + UI.esc(mapel.join(', ')) + '</dd></div>' +
        '<div><dt>Kelas diajar</dt><dd>' + (kelasAjar.length ? UI.esc(kelasAjar.join(', ')) : '-') + '</dd></div></dl>' +
        '<a class="tombol tombol-kecil tombol-aksi" href="' + UI.esc(CONFIG.url('pages/guru/input-nilai.html')) + '">Input nilai mapel</a>' +
        '</article>';
    }
    if (wali) {
      kartu += '<article class="panel">' +
        '<h2 class="judul-ikon">' + UI.ikon('bintang', 18) + 'Wali Kelas ' + UI.esc(wali) + '</h2>' +
        '<dl class="baris-info"><div><dt>Siswa aktif</dt><dd>' + (Number(d.siswa_aktif_wali) || 0) + '</dd></div></dl>' +
        '<a class="tombol tombol-kecil tombol-aksi" href="' + UI.esc(CONFIG.url('pages/shared/kenaikan-kelas.html')) + '">Kenaikan kelas</a>' +
        '</article>';
    }
    if (!kartu) {
      kartu = '<article class="panel"><p class="kosong">Akun ini belum memiliki mapel atau kelas wali. Hubungi administrator sekolah.</p></article>';
    }

    isi.innerHTML =
      '<section class="banner">' +
        '<div class="banner-kiri">' +
          '<span class="chip-banner chip-ta"><i class="titik"></i>' + UI.esc(chipTA) + '</span>' +
          '<h2>Selamat Datang, ' + UI.esc(user.nama) + '</h2>' +
          '<p>Portal Akademik Guru \u2022 SMAN 1 Rejoso. Kelola nilai, kehadiran, dan validasi buku induk.</p>' +
          '<div class="baris-chip-banner">' + lencana + '</div>' +
        '</div>' +
        '<div class="kartu-tanggal"><span class="ikon-tanggal">' + UI.ikon('kalender', 20) + '</span>' +
          '<div><small>Hari Ini</small><strong>' + UI.esc(hariIni()) + '</strong></div></div>' +
      '</section>' +
      '<section class="grid-dua">' + kartu + '</section>';
  }

  try {
    var hasil = await api.get('/guru/beranda');
    render(hasil.data || {});
  } catch (e) {
    isi.innerHTML = '<div class="galat-umum">' + UI.esc(e.message) +
      (e.status ? ' (kode ' + UI.esc(e.status) + ')' : '') + '</div>';
  }
});
