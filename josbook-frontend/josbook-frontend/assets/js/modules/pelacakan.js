/* Pelacakan Alumni
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /pelacakan  (pelacakan.index, JSON) Daftar alumni + riwayat pelacakan + ringkasan.
   POST   /pelacakan/{siswa}  (pelacakan.store, JSON) Tambah catatan kegiatan setelah lulus.
   DELETE /pelacakan/{pelacakan}  (pelacakan.destroy, JSON) Hapus catatan pelacakan.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Pelacakan Alumni</b> belum dikerjakan.</div>';
});
