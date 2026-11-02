/* Halaman login (index.html). Memakai POST /login (endpoint dummy, lihat api.js). */
Halaman.mulai({ publik: true }, function () {
  var user = Auth.user();
  if (Auth.token() && user) { window.location.replace(Auth.halamanAwal(user.peran)); return; }

  var form = document.getElementById('form-login');
  var inUser = document.getElementById('username');
  var inPass = document.getElementById('password');
  var inIngat = document.getElementById('ingat');
  var btn = document.getElementById('btn-masuk');
  var galat = document.getElementById('galat-umum');
  var mata = document.getElementById('btn-mata');

  var IKON_MATA = UI.ikon('eye', 20);
  var IKON_MATA_TUTUP = UI.ikon('eyeoff', 20);

  mata.addEventListener('click', function () {
    var lihat = inPass.type === 'password';
    inPass.type = lihat ? 'text' : 'password';
    mata.innerHTML = lihat ? IKON_MATA_TUTUP : IKON_MATA;
    mata.setAttribute('aria-pressed', String(lihat));
    mata.setAttribute('aria-label', lihat ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
  });

  document.querySelectorAll('[data-belum]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      UI.toast(a.getAttribute('data-belum'), 'info');
    });
  });

  if (CONFIG.DUMMY) {
    var kotak = document.getElementById('kotak-dummy');
    kotak.hidden = false;
    kotak.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-isi]');
      if (!b) return;
      var p = b.getAttribute('data-isi').split('|');
      inUser.value = p[0];
      inPass.value = p[1];
      UI.bersihkanError(form);
      galat.hidden = true;
    });
  }

  function tampilGalat(pesan) {
    galat.textContent = pesan;
    galat.hidden = false;
  }

  function sibuk(ya) {
    btn.disabled = ya;
    btn.classList.toggle('memuat', ya);
    btn.querySelector('.tombol-teks').textContent = ya ? 'Memproses...' : 'Masuk';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    UI.bersihkanError(form);
    galat.hidden = true;

    var username = inUser.value.trim();
    var password = inPass.value;
    var lokal = {};
    if (!username) lokal.username = ['NISN, NIP, atau email wajib diisi.'];
    if (!password) lokal.password = ['Kata sandi wajib diisi.'];
    if (Object.keys(lokal).length) {
      UI.tampilkanError(form, lokal);
      form.querySelector('.punya-galat input').focus();
      return;
    }

    sibuk(true);
    try {
      var hasil = await api.post('/login', { username: username, password: password },
        { tanpaRedirect401: true });
      var d = hasil.data;
      Auth.simpan(d.token, d.user, inIngat.checked);
      UI.toast('Selamat datang, ' + d.user.nama + '.', 'sukses');
      window.location.href = Auth.halamanAwal(d.user.peran);
    } catch (err) {
      sibuk(false);
      if (err.status === 422) UI.tampilkanError(form, err.errors);
      else tampilGalat(err.message);
      if (err.status === 401) inPass.select();
    }
  });
});
