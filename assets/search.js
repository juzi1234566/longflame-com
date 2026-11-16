/*
 * 站内搜索：纯前端，只在 search-index.js（生成脚本写出的本地索引）里查，不发任何请求。
 * 地址栏 ?q= 带进来的词会先查一次；输入时实时更新结果。
 */
(function () {
  'use strict';

  var index = window.LONGFLAME_INDEX || [];
  var input = document.getElementById('q');
  var out = document.querySelector('[data-results]');
  var status = document.querySelector('[data-search-status]');
  if (!input || !out || !status) return;

  var GROUPS = ['Episodes', 'Inheritors'];

  function norm(s) {
    return String(s || '').toLowerCase().replace(/[“”"'’()·,.]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function render(q) {
    out.textContent = '';
    var terms = norm(q).split(' ').filter(Boolean);
    if (!terms.length) { status.textContent = ''; return; }
    var hits = index.filter(function (item) {
      var hay = norm(item.text + ' ' + item.title + ' ' + item.sub + ' ' + item.no);
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });
    if (!hits.length) {
      status.textContent = 'No results. Try a craft, a place or a number such as 001.';
      return;
    }
    status.textContent = '';
    GROUPS.forEach(function (g) {
      var group = hits.filter(function (h) { return h.t === g; });
      if (!group.length) return;
      var h2 = el('h2', '', g);
      h2.appendChild(el('small', '', group.length === 1 ? '1 result' : group.length + ' results'));
      out.appendChild(h2);
      group.forEach(function (h) {
        var a = el('a', 'rrow');
        a.href = h.url;
        a.appendChild(el('span', 'num', h.no));
        a.appendChild(el('span', 't', h.title));
        a.appendChild(el('span', 'm', h.sub));
        out.appendChild(a);
      });
    });
  }

  var m = /[?&]q=([^&]*)/.exec(window.location.search);
  if (m) {
    try { input.value = decodeURIComponent(m[1].replace(/\+/g, ' ')); } catch (e) { /* 坏参数忽略 */ }
  }
  input.addEventListener('input', function () { render(input.value); });
  if (input.form) input.form.addEventListener('submit', function (e) { e.preventDefault(); render(input.value); });
  render(input.value);
})();
