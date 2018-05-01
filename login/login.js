// 登录模块
(function(){
  // 取到需要使用的参数
  var login  = document.getElementsByClassName('login-bt')[0];      // 登录注册按钮
  var remember = document.getElementsByClassName('remember')[0]; // 记住密码
  var iconSDelect = document.getElementsByClassName('icon-select')[0]; // 是否记住密码图标
  var loginChange = document.getElementsByClassName('login-change')[0]; // 切换按钮状态
  var typeText = document.getElementsByClassName('type-text')[0]; // 说明文字
  var color = 'rgb(26, 129, 225)'; // 字体颜色
  var beforeColor = 'rgb(100,100,100)';

  // 初始化用户名和密码
  var rememberUsername = localStorage.getItem('username');
  var rememberPassword = localStorage.getItem('password');
  if (rememberUsername && rememberPassword) {
    remember.style.color = color;
    iconSDelect.style.color = color;
    document.getElementsByClassName('username')[0].value = rememberUsername;
    document.getElementsByClassName('password')[0].value = rememberPassword;
    localStorage.setItem('rememberUserInfo', true);
  } else {
    // 设置默认的记住密码状态为false
    localStorage.setItem('rememberUserInfo', false);
  }

  // 点击按钮切换用户当前的状态
  loginChange.onclick = function() {
    var show = '';
    if (loginChange.innerHTML === '注册') {
      login.innerHTML = '注册';
      loginChange.innerHTML = '登录';
      typeText.innerHTML = '已有账号？';
      show = 'none';
    } else {
      login.innerHTML = '登录';
      loginChange.innerHTML = '注册';
      typeText.innerHTML = '没有账号？';
    }
    remember.style.display = show;
    iconSDelect.style.display = show;

  };

  // 记住密码的点击
  iconSDelect.onclick = function() {
    remomberStatus()
  };
  remember.onclick = function() {
    remomberStatus()
  };

  // 记住密码的状态
  function remomberStatus() {
    // 用一个变量记录记住密码的状态
    var rememberStatus = true;
    if (iconSDelect.style.color === color) {
      remember.style.color = beforeColor;
      iconSDelect.style.color = beforeColor;
      rememberStatus = false;
    } else {
      remember.style.color = color;
      iconSDelect.style.color = color;
    }
    localStorage.setItem('rememberUserInfo', rememberStatus);
  };

  // 记住密码的方法（接收一个布尔值参数，判断是否存储用户的登录信息）  登录成功后使用这个方法
  function rememberUserInfoFn (Boole) {
    // 取到用户信息
    var userName = document.getElementsByClassName('username')[0].value; // 用户名
    var passWord = document.getElementsByClassName('password')[0].value; // 密码

    if (Boole === 'true') {
      localStorage.setItem('username',userName);
      localStorage.setItem('password',passWord);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  }

  // 点击登录注册按钮触发的事件
  login.onclick = function() {
    // 取到用户信息
    var userName = document.getElementsByClassName('username')[0].value; // 用户名
    var passWord = document.getElementsByClassName('password')[0].value; // 密码
    console.log(userName, passWord);
    // 先判断用户当前是否输入了账号或者密码
    if (!userName) {
      globalTips('用户名不能为空');
    } else if (!passWord) {
      globalTips('密码不能为空');
    } else {
      if (login.innerHTML === '登录') {
        checkUserInfo (userName, passWord, 'login');
      } else {
        checkUserInfo (userName, passWord, 'register');
      }
    }
  };

  // 得到当前时间信息
  function getDate () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth(); // 月份为0-11
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    // 返回当前的时间字符串
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }

  // 存下用户注册的信息
  function setUserInfo (userName, passWord) {
    // 存下用户信息
    var data = {
      username: userName, // 用户名
      password: passWord, // 密码
      sex: 'M', // 性别
      signature: '这个人很懒，什么都没有留下', // 签名
      createTime: getDate()// 注册时间
    };

    // 得到本地存储
    var userInfo = localStorage.getItem('userInfo');
    // 如果本地存储存在，则继续向里面添加用户数据，否则创建本地存储
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      userInfo.push(data);
      userInfo = JSON.stringify(userInfo);
    } else {
      userInfo = [];
      userInfo.push(data);
      userInfo = JSON.stringify(userInfo);
    }
    // 将用户的信息存储到本地
    localStorage.setItem('userInfo',userInfo);
  }

  // 用户信息验证
  function checkUserInfo (userName, passWord, type) {
    var check = true;
    // 得到本地存储
    var userInfo = localStorage.getItem('userInfo');
    // 登录验证
    if (type === 'login') {
      // 如果当前没有用户
      if (!userInfo) {
        globalTips('账号不存在');
        return;
      }
      // 得到数组
      userInfo = JSON.parse(userInfo);
      // 循环验证
      for (var i = 0, len = userInfo.length; i < len; i++) {
        // 先验证账号是否存在
        if (userInfo[i].username === userName) {
          // 验证密码是否正确
          if (userInfo[i].password === passWord) {
            // 登录成功，存下用户记住密码的选择，同时跳转页面，存下当前用户在本地存储的位置（登录进去通过这个位置得到登录的用户信息）
            rememberUserInfoFn(localStorage.getItem('rememberUserInfo'));
            sessionStorage.setItem('userKey', i);
            globalLoading(true);
            setTimeout(function (){
              globalLoading(false);
              window.open('../index/index.html','_self');
            }, 2000);
          } else {
            globalTips('密码错误');
            check = false;
          }
          return;
        }
      }

      // 如果到了这里，则说明账号不存在
      globalTips('账号不存在');
    }

    // 注册验证
    if (type === "register") {
      // 如果当前没有用户
      if (!userInfo) {
        globalTips('注册成功');
        // 存下用户信息
        setUserInfo(userName, passWord);
        return;
      }
      // 得到数组
      userInfo = JSON.parse(userInfo);
      // 循环验证
      for (var i = 0, len = userInfo.length; i < len; i++) {
        // 先验证账号是否存在
        if (userInfo[i].username === userName) {
          globalTips('账号已存在');
          check = false;
          return;
        }
      }

      // 如果到了这里，则表示当前存在用户列表，且注册新用户
      globalTips('注册成功');
      // 存下用户信息
      setUserInfo(userName, passWord);
    }

    if (!check) {
      return false;
    }
  }
})()