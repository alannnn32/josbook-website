/* Setting & Cadangan
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /pengaturan  (pengaturan.index, JSON) Identitas sekolah, tahun ajaran, semester berjalan, KKTP.
   PUT    /pengaturan/sekolah  (pengaturan.sekolah, JSON) Ubah identitas sekolah.
   POST   /pengaturan/tahun-ajaran  (pengaturan.tahun-ajaran, JSON) Tambah tahun ajaran (kode 2027/2028).
   PUT    /pengaturan/berjalan  (pengaturan.berjalan, JSON) Tetapkan tahun ajaran + semester berjalan.
   GET    /cadangan  (cadangan.unduh, unduhan) Unduh cadangan seluruh data (json).
   POST   /cadangan/pulihkan  (cadangan.pulihkan, JSON) Pulihkan dari berkas cadangan (multipart).
   POST   /cadangan/reset  (cadangan.reset, JSON) Reset ke data contoh (hanya lingkungan demo).
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Setting & Cadangan</b> belum dikerjakan.</div>';
});
