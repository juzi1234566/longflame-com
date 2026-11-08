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
  if (!input || !out) return;

  var GROUPS = ['Inheritors', 'Stories', 'Works'];

  function norm(s) {
    return String(s || '').toLowerCase().replace(/[\[\]“”"'’()·,.]/g, ' ').replace(/\s+/g, ' ').trim();
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
    if (!terms.length) {
      status.textContent = '';
      return;
    }
    var hits = index.filter(function (item) {
      var hay = norm(item.text + ' ' + item.title + ' ' + item.sub + ' ' + item.no);
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    });
    status.textContent = hits.length === 1 ? '1 result' : hits.length + ' results';
    if (!hits.length) {
      status.textContent = 'No results. Try a craft, a place or a number such as 001.';
      return;
    }
    GROUPS.forEach(function (g) {
      var group = hits.filter(function (h) { return h.t === g; });
      if (!group.length) return;
      var sec = el('section', 'results-group');
      var head = el('div', 'sec-head');
      var title = el('div', 'sec-title');
      title.appendChild(el('h2', 'h2', g));
      title.appendChild(el('span', 'label label--3', String(group.length)));
      head.appendChild(title);
      sec.appendChild(head);
      group.forEach(function (h) {
        var a = el('a', 'hit');
        a.href = h.url;
        a.appendChild(el('span', 'hit-no', h.no));
        a.appendChild(el('span', 'hit-title', h.title));
        a.appendChild(el('span', 'hit-sub', h.sub));
        sec.appendChild(a);
      });
      out.appendChild(sec);
    });
  }

  var params = new URLSearchParams(window.location.search);
  var initial = params.get('q') || '';
  input.value = initial;
  render(initial);
  input.addEventListener('input', function () { render(input.value); });
})();
