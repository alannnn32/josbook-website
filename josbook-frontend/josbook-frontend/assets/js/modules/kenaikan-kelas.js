/* Kenaikan Kelas
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /kenaikan-kelas  (kenaikan.index, JSON) Kelas yang boleh diproses + riwayat proses terakhir.
   POST   /kenaikan-kelas/preview  (kenaikan.preview, JSON) Pratinjau hasil kenaikan, belum mengubah data.
   POST   /kenaikan-kelas/proses  (kenaikan.proses, JSON) Proses dalam satu transaksi.
   POST   /kenaikan-kelas/batalkan  (kenaikan.batalkan, JSON) Batalkan proses terakhir (ditolak bila sudah ada data di tahun baru).
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin', 'guru'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Kenaikan Kelas</b> belum dikerjakan.</div>';
});
