/* Halaman login (index.html). Sudah berfungsi: butuh POST /login dan GET /saya di backend. */
(function () {
  var form = document.getElementById('form-login'), tombol = document.getElementById('masuk');
  if (Auth.token() && Auth.user()) { location.href = Auth.halamanAwal(Auth.user().peran); return; }

  var petunjuk = { admin: 'Username admin', guru: 'NIP', siswa: 'NISN' };
  var peranEl = form.elements.peran, userEl = form.elements.username, hintEl = document.getElementById('hint-user');
  function ubahHint() { hintEl.textContent = petunjuk[peranEl.value]; if (peranEl.value === 'siswa') form.elements.password.placeholder = 'Tanggal lahir ddmmyyyy'; else form.elements.password.placeholder = ''; }
  peranEl.addEventListener('change', ubahHint); ubahHint();

  form.addEventListener('submit', async function (ev) {
    ev.preventDefault(); UI.tampilkanError(form, {}); tombol.disabled = true;
    try {
      var user = await Auth.login(peranEl.value, userEl.value.trim(), form.elements.password.value, form.elements.ingat.checked);
      location.href = user.wajib_ganti ? JOSBOOK.ROOT + 'pages/shared/ganti-password.html' : Auth.halamanAwal(user.peran);
    } catch (e) {
      if (e instanceof ApiError) { UI.tampilkanError(form, e.errors); UI.toast(e.message, 'er'); } else throw e;
    } finally { tombol.disabled = false; }
  });
})();
