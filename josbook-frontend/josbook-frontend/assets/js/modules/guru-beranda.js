/* Beranda Guru
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /dashboard  (dashboard, JSON) Admin: statistik, komposisi kelas, kelengkapan data. Guru: peran + kelas ajar/wali.
   GET    /pencarian  (pencarian, JSON) Pencarian global siswa/guru (bar atas).
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['guru'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Beranda Guru</b> belum dikerjakan.</div>';
});
