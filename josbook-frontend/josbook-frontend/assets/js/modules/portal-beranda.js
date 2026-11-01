/* Beranda Siswa
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /portal  (portal.beranda, JSON) Beranda siswa.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['siswa'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Beranda Siswa</b> belum dikerjakan.</div>';
});
