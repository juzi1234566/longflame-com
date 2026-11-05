/*
 * 订阅框。页面上所有 form[data-subscribe] 都由这里接管。
 * 安全做法：HTML 里的表单没有 action，邮箱输入框也没有 name，所以不跑这段脚本时提交也带不走任何数据。
 * 只有 config.js 里的 KIT_FORM_ACTION 是一个 https 地址时，才给表单补上 action、method 和字段名，交给浏览器正常提交到 Kit。
 * 地址为空时，拦下提交，只在页面上提示“即将开放”。这里不用 fetch / XMLHttpRequest，也不存任何东西。
 */
(function () {
  'use strict';

  var cfg = window.LONGFLAME_CONFIG || {};
  var action = typeof cfg.KIT_FORM_ACTION === 'string' ? cfg.KIT_FORM_ACTION.trim() : '';
  var field = typeof cfg.KIT_EMAIL_FIELD === 'string' && cfg.KIT_EMAIL_FIELD ? cfg.KIT_EMAIL_FIELD : 'email_address';
  var enabled = /^https:\/\/[^\s"'<>]+$/.test(action);

  var CLOSED = 'Subscriptions open soon. Your address has not been sent anywhere.';

  var forms = document.querySelectorAll('form[data-subscribe]');
  Array.prototype.forEach.call(forms, function (form) {
    var input = form.querySelector('input[type="email"]');
    var status = form.querySelector('[data-subscribe-status]');
    if (!input) return;

    if (enabled) {
      form.setAttribute('action', action);
      form.setAttribute('method', 'post');
      input.setAttribute('name', field);
      return;
    }

    // 未配置：不设 action、不设 name，提交一律拦下
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (status) status.textContent = CLOSED;
    });
  });
})();
