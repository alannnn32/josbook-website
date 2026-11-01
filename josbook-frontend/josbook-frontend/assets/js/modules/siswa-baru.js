/* Form Pendataan Siswa Baru
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   POST   /siswa  (siswa.store, JSON) Form Pendataan: tambah siswa baru.
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Form Pendataan Siswa Baru</b> belum dikerjakan.</div>';
});
