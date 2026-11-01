/* Log Aktivitas
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /log  (log.index, JSON) Log aktivitas.
   GET    /log/export  (log.export, unduhan) Ekspor log (csv).
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Log Aktivitas</b> belum dikerjakan.</div>';
});
