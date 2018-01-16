// 瀑布流模块
(function(){
  // 得到参数
  var waterfallItem = document.getElementsByClassName('waterfall-item');

  // 定义图片
  var images = [
    {
      src: '../images/1.jpg'
    },
    {
      src: '../images/3.jpg'
    },
    {
      src: '../images/4.jpg'
    },{
      src: '../images/5.jpg'
    },
    {
      src: '../images/6.jpg'
    },
    {
      src: '../images/7.jpg'
    },
    {
      src: '../images/8.jpg'
    },
    {
      src: '../images/9.jpg'
    },
    {
      src: '../images/10.jpg'
    },
    {
      src: '../images/11.jpg'
    },
    {
      src: '../images/12.jpg'
    },
    {
      src: '../images/13.jpg'
    },
    {
      src: '../images/14.jpg'
    },
    {
      src: '../images/15.jpg'
    },
    {
      src: '../images/16.jpg'
    },
    {
      src: '../images/17.jpg'
    },
    {
      src: '../images/18.jpg'
    },
    {
      src: '../images/19.jpg'
    }
  ];

  // 
  for (var i = 0, len = images.length; i < len; i++) {
    var dom = document.createElement('div');
    dom.className = 'image-box';
    dom.innerHTML = '<div><img src='+ images[i].src +'></div>';
    if ((i % 4) === 0) {
      waterfallItem[0].appendChild(dom);
    } else if ((i % 4) === 1) {
      waterfallItem[1].appendChild(dom);
    } else if ((i % 4) === 2) {
      waterfallItem[2].appendChild(dom);
    } else if ((i % 4) === 3) {
      waterfallItem[3].appendChild(dom);
    }
  }
})();