/* Konfigurasi frontend. Ubah API_BASE sesuai alamat backend. */
(function () {
  // Folder akar frontend, dihitung dari lokasi berkas ini (.../assets/js/core/config.js)
  var src = document.currentScript.src;
  var ROOT = new URL('../../../', src).href;
  window.JOSBOOK = {
    API_BASE: 'http://127.0.0.1:8000/api', // php artisan serve
    ROOT: ROOT,
    // Nama kunci penyimpanan token di browser
    KUNCI_TOKEN: 'josbook_token',
    KUNCI_USER: 'josbook_user',
  };
})();
