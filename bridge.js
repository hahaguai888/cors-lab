/* SimTrade助手 bridge.js v1.0 (ES5,兼容IE11/360/Win7)
 * 由书签注入到平台页面执行（与平台同源，无视跨域限制）
 * 用法：书签URL -> javascript:(function(){var s=document.createElement('script');s.src='https://hahaguai888.github.io/cors-lab/bridge.js';document.body.appendChild(s);})();
 */
(function () {
  if (window.__st_bridge) { window.__st_bridge.toggle(); return; }
  var ROLES = { 1: "出口商", 2: "进口商", 3: "工厂", 4: "出口地银行", 5: "进口地银行", 6: "指导老师", 7: "系统管理员" };
  function $(id) { return document.getElementById(id); }
  var panel = document.createElement("div");
  panel.id = "__st_panel";
  panel.style.cssText = "position:fixed;top:10px;right:10px;z-index:999999;background:#1e1e1e;color:#eee;border:2px solid #4fc1ff;border-radius:8px;padding:12px;font:13px Consolas,monospace;width:300px;";
  var roleOpts = "";
  for (var k in ROLES) { roleOpts += '<option value="' + k + '">' + k + "-" + ROLES[k] + "</option>"; }
  panel.innerHTML =
    "<b>SimTrade助手 v1.0</b> <span id='__st_stat'>[待命]</span><br>" +
    "账号 <input id='__st_acc' value='201561244' style='width:130px'><br>" +
    "角色 <select id='__st_role'>" + roleOpts + "</select><br>" +
    "<button id='__st_fill'>1.填账号+角色</button> " +
    "<button id='__st_login'>2.登录(需先输密码)</button><br>" +
    "<button id='__st_read'>3.读取页面信息</button> " +
    "<button id='__st_hide'>隐藏</button>" +
    "<div id='__st_out' style='margin-top:6px;max-height:150px;overflow:auto;color:#9cdcfe;'></div>";
  document.body.appendChild(panel);
  function stat(t) { $("__st_stat").textContent = "[" + t + "]"; }
  function out(t) { $("__st_out").textContent = t; }
  $("__st_hide").onclick = function () { panel.style.display = "none"; };
  $("__st_fill").onclick = function () {
    var usr = $("txtUsrName"), cls = $("cblUsrCls");
    if (!usr) { out("非登录页，找不到输入框"); return; }
    usr.value = $("__st_acc").value;
    cls.value = $("__st_role").value;
    var pwd = $("txtUsrPwd");
    if (pwd) pwd.focus();
    stat("已填表"); out("账号=" + usr.value + " 角色=" + ROLES[cls.value] + "，请输密码后点登录");
  };
  $("__st_login").onclick = function () {
    var f = document.forms["Form1"];
    if (!f) { out("找不到登录表单"); return; }
    stat("提交中");
    f.__EVENTTARGET.value = "btnLogin";
    f.__EVENTARGUMENT.value = "";
    f.submit();
  };
  $("__st_read").onclick = function () {
    var info = "标题=" + document.title + "\nURL=" + location.href;
    var usr = $("txtUsrName");
    info += usr ? "\n状态=登录页(未登录)" : "\n状态=已在系统内页";
    out(info); stat("已读取");
  };
  window.__st_bridge = {
    version: "1.1",
    toggle: function () {
      panel.style.display = (panel.style.display === "none") ? "block" : "none";
    }
  };
  stat("已就绪");
  // demo模式：注入后自动填账号+角色，光标停在密码框等用户输入
  try {
    var _u = document.getElementById("txtUsrName");
    var _c = document.getElementById("cblUsrCls");
    if (_u && _c) {
      _u.value = "201561244";
      _c.value = "1";
      var _p = document.getElementById("txtUsrPwd");
      if (_p) _p.focus();
      out("已自动填入账号201561244+出口商，请输入密码后点[登录]");
      stat("待输密码");
    }
  } catch (e) {}
})();
