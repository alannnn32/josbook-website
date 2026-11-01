/* Laporan & Statistik
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /laporan  (laporan.index, JSON) Rekap per kelas: jumlah siswa, rata-rata, ketidakhadiran.
   GET    /laporan/cetak  (laporan.cetak, JSON) Data rekap untuk dicetak frontend.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Laporan & Statistik</b> belum dikerjakan.</div>';
});
