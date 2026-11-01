/* Satu pintu semua panggilan ke API. Menambah token, menangani 401/403/422, mengunduh berkas. */
(function () {
  function ApiError(status, message, errors) {
    this.name = 'ApiError'; this.status = status; this.message = message; this.errors = errors || {};
  }
  ApiError.prototype = Object.create(Error.prototype);

  function buatUrl(path, query) {
    var url = JOSBOOK.API_BASE + path;
    if (query) {
      var q = new URLSearchParams();
      Object.keys(query).forEach(function (k) {
        var v = query[k];
        if (v !== undefined && v !== null && v !== '') q.append(k, v);
      });
      var s = q.toString(); if (s) url += '?' + s;
    }
    return url;
  }

  async function kirim(method, path, opsi) {
    opsi = opsi || {};
    var headers = { Accept: 'application/json' };
    var token = Auth.token(); if (token) headers.Authorization = 'Bearer ' + token;
    var body;
    if (opsi.form) body = opsi.form;                       // FormData: jangan set Content-Type
    else if (opsi.body !== undefined) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(opsi.body); }

    var res;
    try { res = await fetch(buatUrl(path, opsi.query), { method: method, headers: headers, body: body }); }
    catch (e) { throw new ApiError(0, 'Tidak bisa terhubung ke server. Pastikan API berjalan dan alamat frontend ini diizinkan CORS.'); }

    if (opsi.mentah) return res;

    if (res.status === 401) {
      // Token tidak berlaku. Pada halaman login, 401 bukan berarti sesi habis.
      if (path !== '/login') { Auth.hapus(); Auth.keLogin(); }
    }
    var data = null;
    var teks = await res.text();
    if (teks) { try { data = JSON.parse(teks); } catch (e) { data = { message: teks.slice(0, 200) }; } }
    if (!res.ok) {
      var pesan = (data && data.message) || ('Permintaan gagal (' + res.status + ').');
      if (res.status === 403 && window.UI) UI.toast(pesan, 'er');
      throw new ApiError(res.status, pesan, data && data.errors);
    }
    return data;
  }

  // Unduh berkas: token ada di header, jadi tidak bisa lewat <a href>. Ambil sebagai blob lalu simpan.
  async function unduh(path, query, namaCadangan) {
    var res = await kirim('GET', path, { query: query, mentah: true });
    if (!res.ok) {
      var d = null; try { d = await res.json(); } catch (e) {}
      throw new ApiError(res.status, (d && d.message) || 'Gagal mengunduh.', d && d.errors);
    }
    var nama = namaCadangan || 'unduhan';
    var cd = res.headers.get('Content-Disposition') || '';
    var m = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(cd); if (m) nama = decodeURIComponent(m[1]);
    var blob = await res.blob();
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nama;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
  }

  window.ApiError = ApiError;
  window.api = {
    get: function (p, query) { return kirim('GET', p, { query: query }); },
    post: function (p, body) { return kirim('POST', p, { body: body }); },
    put: function (p, body) { return kirim('PUT', p, { body: body }); },
    hapus: function (p, body) { return kirim('DELETE', p, { body: body }); },
    kirimForm: function (p, formData, method) { return kirim(method || 'POST', p, { form: formData }); },
    unduh: unduh,
  };
})();
