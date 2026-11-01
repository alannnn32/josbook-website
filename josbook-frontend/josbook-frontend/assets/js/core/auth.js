/* Penyimpanan sesi. "Ingat saya" -> localStorage, tidak dicentang -> sessionStorage. */
(function () {
  function simpanDi(s, token, user) {
    s.setItem(CONFIG.KUNCI_TOKEN, token);
    s.setItem(CONFIG.KUNCI_USER, JSON.stringify(user));
  }
  function baca(kunci) {
    return sessionStorage.getItem(kunci) || localStorage.getItem(kunci);
  }

  window.Auth = {
    simpan: function (token, user, ingat) {
      this.hapus();
      simpanDi(ingat ? localStorage : sessionStorage, token, user);
    },
    token: function () { return baca(CONFIG.KUNCI_TOKEN); },
    user: function () {
      try { return JSON.parse(baca(CONFIG.KUNCI_USER)); } catch (e) { return null; }
    },
    hapus: function () {
      [localStorage, sessionStorage].forEach(function (s) {
        s.removeItem(CONFIG.KUNCI_TOKEN);
        s.removeItem(CONFIG.KUNCI_USER);
      });
    },
    halamanAwal: function (peran) {
      return CONFIG.url(CONFIG.HALAMAN_AWAL[peran] || 'index.html');
    },
    keLogin: function () { window.location.href = CONFIG.url('index.html'); }
  };
})();
