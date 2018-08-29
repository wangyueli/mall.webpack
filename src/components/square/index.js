var app = require('appModule');
var jquery = require('jquery');

var square = app.controller('squareCtrl', function ($scope) {
    var  num=0;
    var  num1 = 0;
    var  timer=null;
    var  timer1 = null;
    var  timeout=null;
    var  scroll = document.getElementById("scroll");
    var  ul  =  scroll.children[0];
    // 设置鼠标悬浮在按钮切换事件
    jquery("#square_banner_l  li a").mouseenter(function(event){
        //设置定时器前应先判断有没有定时器，有就清除
        if(timeout){
            clearTimeout(timeout);
            timeout=null;
        }
        num=jquery(this).parent().index();
        //设置悬浮时500毫秒时切换，不足500毫秒时不会切换
        timeout=setTimeout(changgeMg,500);
        return false;
    })
    //悬浮在窗口时停止轮播
    jquery("#square_banner_l").mouseenter(function(){
        clearInterval(timer);
    })
    //鼠标移除窗口时开始轮播
    jquery("#square_banner_l").mouseleave(function(){
        //设置一个3秒的自动轮播定时器
        timer=setInterval(changeTab,3000);
    })
    //点击next切换
    jquery("#next").click(function(){
        //设置定时器前应先判断有没有定时器，有就清除
        if(timeout){
            clearTimeout(timeout);
            timeout=null;
        }
        if(num<3){
            num++;
        }else{
            num=0;
        }
        //设置点击后500毫秒去切换，如果点击间隔小于500毫秒不停点击则不会切换
        timeout=setTimeout(changgeMg,100);
        //不让a元素去默认跳转
        return false;
    })

    //点击prev切换
      jquery("#prev").click(function(){
          if(timeout){
              clearTimeout(timeout);
              timeout=null;
          }
          if(num>0){
              num--;
          }else{
              num=3;
          }
          //设置点击后500毫秒去切换，如果点击间隔小于500毫秒不停点击则不会切换
          timeout=setTimeout(changgeMg,500);
          return false;
      })
    //轮播定时器
    timer=setInterval(changeTab,3000);
    //移动盒子和给当前索引上色
    function changgeMg(){
        var movePx=num*-900+"px";
        jquery("#square_banner_l .inner").animate({"marginLeft":movePx},500);
        jquery("#square_banner_l  ul li").eq(num).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
    }
    //定时器函数
    function changeTab(){
        if (num<3){
            num++;
        }else{
            num=0;
        }
        changgeMg();
    }


    /* --------无缝滚动---------*/
    timer1 = setInterval(autoPlay,20);
    function autoPlay() {
        num1--;
        num1<=-1600 ? num1 = 0 : num1;
        ul.style.left = num1 + "px";
    }
    scroll.onmouseover = function() {  // 鼠标经过大盒子  停止定时器
        clearInterval(timer1);
    }
    scroll.onmouseout = function() {
        timer1 = setInterval(autoPlay,20);  // 开启定时器
    }
});


module.exports = square;