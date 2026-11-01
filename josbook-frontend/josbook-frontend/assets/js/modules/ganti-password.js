/* Ganti password. Berfungsi bila PUT /saya/password sudah jadi. */
Halaman.mulai({ peran: ['admin', 'guru', 'siswa'] }, async function (user) {
  var form = document.getElementById('form-password');
  if (user.wajib_ganti) document.getElementById('info').hidden = false;
  form.addEventListener('submit', async function (ev) {
    ev.preventDefault(); UI.tampilkanError(form, {});
    var d = Object.fromEntries(new FormData(form));
    try {
      await api.put('/saya/password', d);
      UI.toast('Password diganti.', 'ok');
      var u = (await api.get('/saya')).data; Auth.perbaruiUser(u);
      setTimeout(function () { location.href = Auth.halamanAwal(u.peran); }, 800);
    } catch (e) { if (e instanceof ApiError) { UI.tampilkanError(form, e.errors); UI.toast(e.message, 'er'); } else throw e; }
  });
});
