/* Mutasi Siswa
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /mutasi  (mutasi.index, JSON) Riwayat mutasi + siswa aktif yang bisa dimutasi.
   POST   /mutasi  (mutasi.store, JSON) Catat pindah keluar / keluar.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Mutasi Siswa</b> belum dikerjakan.</div>';
});
