/****************** 页面公有的方法 ***********************/

// 弹窗提示
function globalTips(text) {
  // 创建一个元素
  var dom = document.createElement("span");
  dom.className = 'global-tips';
  dom.innerHTML = text;
  // 创建一个遮罩层
  var mask = document.createElement('div');
  mask.className = 'global-mask';
  // 插入到页面中
  document.body.appendChild(dom);
  document.body.appendChild(mask);

  // 计时器（两秒后清除dom）
  setTimeout(function() {
    document.body.removeChild(dom);
    document.body.removeChild(mask);
  }, 1000);
}

// 加载动画 接收一个布尔值，用来判断创建动画还是删除动画
function globalLoading (Boole) {
  if (Boole) {
    // 创建一个元素
    var dom = document.createElement('div');
    dom.className = 'global-loading';
    dom.innerHTML = '<div></div>';
    // 创建一个遮罩层
    var mask = document.createElement('div');
    mask.className = 'global-mask';
    // 插入到页面中
    document.body.appendChild(mask);
    document.body.appendChild(dom);
  } else {
    // 从页面中删除
    var mask = document.getElementsByClassName('global-mask')[0];
    var dom = document.getElementsByClassName('global-loading')[0];
    document.body.removeChild(mask);
    document.body.removeChild(dom);
  }
}

// 侧边栏导航
(function(){
  // 得到参数
  var iconSwich = document.getElementsByClassName('icon-swich')[0];
   var iconIndexLogo = document.getElementsByClassName('icon-index-logo')[0];
  var sidebar = document.getElementsByClassName('sidebar')[0];
  var content = document.getElementsByClassName('content')[0];
  var nav = document.getElementsByClassName('nav')[0];
  var userKey = sessionStorage.getItem('userKey');
  var loginNot = document.getElementsByClassName('login-not')[0];
  var loginSuccess = document.getElementsByClassName('login-success')[0]; 
  var loginSuccessUsername = document.getElementsByClassName('login-success-username')[0];

  //容错处理 （当前页面没有导航栏则不往下进行）
  if (!sidebar) {
    return;
  }
  // 设置初始值
  sidebar.style.width = '210px';
  content.style.marginLeft = '210px';
  content.style.width = 'calc( 100% - 210px)';
  iconIndexLogo.style.fontSize = '80px';

  // 侧边栏的点击事件 触发简单的动画效果
  iconSwich.onclick = function() {
    var show = '';
    if (sidebar.style.width === '210px') {
      sidebar.style.width = '50px';
      content.style.marginLeft = '50px';
      content.style.width = 'calc( 100% - 50px)';
      iconIndexLogo.style.fontSize = '20px';
      iconSwich.style.transform = 'rotate(90deg)';
      show = 'none';
      loginNot.style.display = show;
      loginSuccess.style.display = show;
    } else {
      sidebar.style.width = '210px';
      content.style.marginLeft = '210px';
      content.style.width = 'calc( 100% - 210px)';
      iconIndexLogo.style.fontSize = '80px';
      iconSwich.style.transform = 'rotate(0deg)';
      setTimeout(function() {
        showUserAbout();
      }, 100);
    }
    setTimeout(function() {
      nav.style.display = show;
      iconIndexLogo.style.display = show;
    }, 100);
  }

  // 显示关于用户的信息
  showUserAbout();
  function showUserAbout() {
    // 如果能得到用户的标识，则表示用户登录成功，这个时候可以对用户信息做处理
    if (userKey) {
      var userInfo = localStorage.getItem('userInfo');
      userInfoList = JSON.parse(userInfo);
      console.log(userInfoList[userKey]);
      loginSuccess.style.display = 'block';
      loginSuccessUsername.innerHTML = userInfoList[userKey].username;
    } else {
      loginNot.style.display = 'block';
    }
  }
})();

// 退出登录的方法
(function(){
  // 得到参数
  var loginOut = document.getElementsByClassName('login-out')[0];

  // 容错处理
  if (!loginOut) {
    return;
  }
  // 点击退出登录按钮，清楚用户标识
  loginOut.onclick = function() {
    window.open('../login/login.html','_self');
    sessionStorage.removeItem('userKey')
  }
})();
