/* Alumni & Kontrol Induk
   Endpoint yang dipakai (lihat docs/05-kontrak-api.md):
   GET    /alumni  (alumni.index, JSON) Alumni & Kontrol Induk (lulus, pindah/keluar, semua).
   GET    /alumni-export  (alumni.export, unduhan) Ekspor Kontrol Induk (xlsx).
   TODO: isi halaman. Contoh pola:
     var hasil = await api.get('/...', { page: 1 });
     document.getElementById('isi').innerHTML = UI.tabel([...], hasil.data.map(...));
   Unduhan berkas: await api.unduh('/...', { ...query }, 'nama-cadangan.xlsx');
*/
Halaman.mulai({ peran: ['admin'] }, async function (user) {
  var isi = document.getElementById('isi');
  isi.innerHTML = '<div class="note">Halaman <b>Alumni & Kontrol Induk</b> belum dikerjakan.</div>';
});
