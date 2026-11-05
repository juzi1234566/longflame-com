/*
 * 海外站配置。改这里就行，页面不用动。
 *
 * KIT_FORM_ACTION：Kit（邮件订阅服务）表单的提交地址。
 *   在 Kit 后台建好表单后，从它的“HTML 嵌入代码”里复制 <form action="..."> 里的地址填进来。
 *   地址形如 https://app.kit.com/forms/<表单编号>/subscriptions（这个格式未核实，以 Kit 后台给的为准）。
 *   必须是 https 开头。留空（现在就是空的）时，订阅框不向任何地址发送任何数据，只在页面上提示“即将开放”。
 *   Kit 后台还要把“订阅后跳转”设成 https://longflame.com/subscribed.html，并开启双重确认（double opt-in）。
 *
 * KIT_EMAIL_FIELD：Kit 表单里邮箱字段的 name，按 Kit 嵌入代码里的写（一般是 email_address）。
 */
window.LONGFLAME_CONFIG = {
  KIT_FORM_ACTION: '',
  KIT_EMAIL_FIELD: 'email_address'
};
