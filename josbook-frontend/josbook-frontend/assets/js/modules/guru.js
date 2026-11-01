/* Data Guru
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /guru  (guru.index, JSON) Daftar guru.
   GET    /guru/{guru}  (guru.show, JSON) Satu guru (untuk form edit).
   POST   /guru  (guru.store, JSON) Tambah guru (akun login dibuat dari NIP).
   PUT    /guru/{guru}  (guru.update, JSON) Ubah guru.
   DELETE /guru/{guru}  (guru.destroy, JSON) Hapus guru.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Data Guru</b> belum dikerjakan.</div>';
});
