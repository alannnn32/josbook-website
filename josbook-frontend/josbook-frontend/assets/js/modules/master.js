/* Master Kelas & Mapel
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /master/kelas  (master.kelas.index, JSON) Master kelas.
   POST   /master/kelas  (master.kelas.store, JSON) Tambah/ubah kelas (format X-n, XI-n, XII-n).
   DELETE /master/kelas/{kelas}  (master.kelas.destroy, JSON) Hapus kelas (ditolak bila masih dipakai).
   GET    /master/mapel  (master.mapel.index, JSON) Master mapel + kurikulum per tingkat.
   POST   /master/mapel  (master.mapel.store, JSON) Tambah/ubah mapel.
   DELETE /master/mapel/{mapel}  (master.mapel.destroy, JSON) Hapus mapel (ditolak bila sudah dipakai nilai).
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Master Kelas & Mapel</b> belum dikerjakan.</div>';
});
