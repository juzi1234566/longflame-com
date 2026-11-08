/*
 * 海外站的少量交互（原生 JS，不联网、不存任何东西）：
 * 1. 首页品牌片头：显示 Play 按钮，点击重播一次（8 秒，不循环）。
 * 2. 传承人列表：级别页签筛选。没有 JS 时页签不显示，列表显示全部。
 */
(function () {
  'use strict';

  // 1. 片头重播
  var intro = document.querySelector('[data-intro]');
  var play = document.querySelector('[data-intro-play]');
  var sep = document.querySelector('[data-intro-sep]');
  if (intro && play) {
    play.hidden = false;
    if (sep) sep.hidden = false;
    play.addEventListener('click', function () {
      intro.classList.remove('run');
      void intro.offsetWidth; // 强制重排，让动画从头开始
      intro.classList.add('run');
    });
  }

  // 2. 级别筛选
  var tabs = document.querySelector('[data-tabs]');
  var list = document.querySelector('[data-list]');
  if (tabs && list) {
    var buttons = tabs.querySelectorAll('[data-filter]');
    var cards = list.querySelectorAll('[data-level]');
    var count = document.querySelector('[data-count]');
    var empty = document.querySelector('[data-empty]');
    var apply = function (level) {
      var shown = 0;
      Array.prototype.forEach.call(cards, function (c) {
        var on = level === 'all' || c.getAttribute('data-level') === level;
        c.hidden = !on;
        if (on) shown++;
      });
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-selected', b.getAttribute('data-filter') === level ? 'true' : 'false');
      });
      if (count) count.textContent = 'Showing ' + shown;
      if (empty) empty.hidden = shown > 0;
    };
    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); });
    });
    tabs.hidden = false;
  }
})();
