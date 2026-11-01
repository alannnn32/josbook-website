/* Tempat Sampah
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /sampah  (sampah.index, JSON) Isi tempat sampah.
   POST   /sampah/{tipe}/{id}/pulihkan  (sampah.pulihkan, JSON) Pulihkan data. tipe: siswa|guru|nilai|kehadiran|ekskul.
   DELETE /sampah/{tipe}/{id}  (sampah.hapus, JSON) Hapus permanen.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Tempat Sampah</b> belum dikerjakan.</div>';
});
