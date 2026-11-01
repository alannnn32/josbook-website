/* Token + data pengguna di browser. sessionStorage (hilang saat tab ditutup) atau localStorage ("ingat saya"). */
(function () {
  var T = JOSBOOK.KUNCI_TOKEN, U = JOSBOOK.KUNCI_USER;
  function simpanan() { return localStorage.getItem(T) ? localStorage : sessionStorage; }
  function aman(fn, alt) { try { return fn(); } catch (e) { return alt; } }

  var HOME = { admin: 'pages/admin/dashboard.html', guru: 'pages/guru/beranda.html', siswa: 'pages/portal/beranda.html' };

  window.Auth = {
    token: function () { return aman(function () { return localStorage.getItem(T) || sessionStorage.getItem(T); }, null); },
    user: function () { return aman(function () { return JSON.parse(localStorage.getItem(U) || sessionStorage.getItem(U) || 'null'); }, null); },
    simpan: function (token, user, ingat) {
      this.hapus();
      var s = ingat ? localStorage : sessionStorage;
      aman(function () { s.setItem(T, token); s.setItem(U, JSON.stringify(user)); });
    },
    perbaruiUser: function (user) { aman(function () { simpanan().setItem(U, JSON.stringify(user)); }); },
    hapus: function () { aman(function () { [localStorage, sessionStorage].forEach(function (s) { s.removeItem(T); s.removeItem(U); }); }); },
    halamanAwal: function (peran) { return JOSBOOK.ROOT + (HOME[peran] || 'index.html'); },
    keLogin: function () { location.href = JOSBOOK.ROOT + 'index.html'; },
    async login(peran, username, password, ingat) {
      var res = await api.post('/login', { peran: peran, username: username, password: password });
      this.simpan(res.data.token, res.data.user, ingat);
      return res.data.user;
    },
    async logout() {
      try { await api.post('/logout'); } catch (e) { /* token sudah tidak berlaku: abaikan */ }
      this.hapus(); this.keLogin();
    },
  };
})();
