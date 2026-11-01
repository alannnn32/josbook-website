/* Cek Kualitas Data
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /cek-data  (cek-data.index, JSON) Hasil cek kualitas data.
   GET    /cek-data/export  (cek-data.export, unduhan) Ekspor hasil cek (csv).
   POST   /cek-data/perbaiki  (cek-data.perbaiki, JSON) Perbaikan otomatis untuk temuan yang aman.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Cek Kualitas Data</b> belum dikerjakan.</div>';
});
