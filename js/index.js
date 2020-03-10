window.onload=function(){
  //倒计时
  timeBack()

  searchEffect()
  bannerEffect()
}



//搜索栏根据滚动高度来变颜色样式
function searchEffect(){
  /*1.获取当前banner的高度*/
  var banner =document.querySelector(".lunimage");
  var bannerHeight=banner.offsetHeight;
  // console.log(bannerHeight)
  /*获取header搜索块*/
  var search =document.querySelector(".search")
  /*2.获取当前屏幕滚动时，banner滚动出屏幕的距离*/
  //onscroll监听滚动
  window.onscroll=function(){
    // var offsetTop=document.body.scrollTop;
    var offsetTop= document.documentElement.scrollTop
    console.log(offsetTop)
    // 透明度
    var opacity=0;
    if(offsetTop<bannerHeight){
      opacity=offsetTop/bannerHeight
      search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
    }

  }
}



//倒计时
function timeBack(){
  /*1.获取用于展示时间的span*/
  var spans=document.querySelector(".jd_sk_time").querySelectorAll("span");
  /*2.设置初始的倒计时时间,以秒做为单位*/
  var totalTime=3700 
  /*3.开启定时器*/
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
  var timerId=setInterval(function(){
    totalTime--;
    if(totalTime<0){
      clearInterval(timerId)
      return
    }
    console.log("zhongjian,放到消息队列中，最后处理，这是异步，原理：js 的事件处理机制")
    // 获取小时
    var hour=Math.floor(totalTime/3600)
    // 获取分
    var minute=Math.floor(totalTime%3600/60)
    // 获取秒
    var second =Math.floor(totalTime%60)

    //赋值
    spans[0].innerHTML=Math.floor(hour/10)
    spans[1].innerHTML=Math.floor(hour%10)
    spans[3].innerHTML=Math.floor(minute/10)
    spans[4].innerHTML=Math.floor(minute%10)
    spans[6].innerHTML=Math.floor(second/10)
    spans[7].innerHTML=Math.floor(second%10)
  },1000)
  console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
}


//轮播图
function bannerEffect(){

    /*1.设置修改轮播图的页面结构
    * a.在开始位置添加原始的最后一张图片
    * b.在结束位置添加原始的第一张图片*/
   var banner =document.querySelector(".lunimage")
   var imgBox = document.querySelector("ul:first-of-type")
  //  var imgBox=banner.querySelector(".image");
  var first =document.querySelector("li:first-of-type")
  var last =document.querySelector("li:last-of-type")
      /*1.5.在首尾插入两张图片   cloneNode:复制一个dom元素*/
  imgBox.appendChild(first.cloneNode(true))
      /*insertBefore(需要插入的dom元素，位置)*/
  imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild)
  console.log(banner)

      /*2.设置对应的样式*/
    /*2.1获取所有li元素*/
    var lis=imgBox.querySelectorAll("li")
    // console.log(lis.length)
    // lis的数量
    var count=lis.length
    //获取banner的宽度
    var bannerWidth=banner.offsetWidth;
    // console.log(bannerWidth)
     /*2.4 设置图片盒子的宽度*/
     imgBox.style.width=count*bannerWidth+"px"
         /*2.5 设置每一个li(图片)元素的宽度*/
  for(var i=0;i<lis.count;i++){
    lis[i].style.width=bannerWidth+"px"
  }
  // 轮播要用到的索引值，值图片的下标值，从0开始，因为前面还有一张图片，这里默认为1
  var index=1
  //设置偏移
  imgBox.style.left=-bannerWidth+"px";

    /*4.当屏幕变化的时候，重新计算宽度*/
    window.onresize=function(){
      /*4.1.获取banner的宽度,覆盖全局的宽度值*/
      bannerWidth=banner.offsetWidth;
      /*4.2 设置图片盒子的宽度*/
      imgBox.style.width=count*bannerWidth+"px";
      /*4.3设置每一个li(图片)元素的宽度*/
      for(var i=0;i<lis.length;i++){
          lis[i].style.width=bannerWidth+"px";
      }
      /*4.4重新设置定位值*/
      imgBox.style.left=-index*bannerWidth+"px";
  }

      /*实现点标记*/
      var setIndicator=function(index){
        var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
        /*先清除其它li元素的active样式*/
        for(var i=0;i<indicators.length;i++){
          //清除样式
            indicators[i].classList.remove("active");
        }
        /*为当前li元素添加active样式*/
        indicators[index-1].classList.add("active");
    }
	
  //自动轮播
  var timerId;
  /*5.实现自动轮播*/
  var startTime=function(){
      timerId=setInterval(function(){
          /*5.1 变换索引*/
          index++;
              /*5.2.添加过渡效果*/
              imgBox.style.transition="left 0.5s ease-in-out";
          /*5.3 设置偏移*/
          imgBox.style.left=(-index*bannerWidth)+"px";
          /*5.4 判断是否到最后一张，如果是则*/
          setTimeout(function(){
              if(index==count-1){
                  console.log(index);
                  index=1;
                  /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
                  /*关闭过渡效果*/
                  imgBox.style.transition="none";
                  /*偏移到指定的位置*/
                  imgBox.style.left=(-index*bannerWidth)+"px";
              }
          },500);
      },2000);
  }
  startTime();


    /*6.实现手动轮播*/
    var startX,moveX,distanceX;
    /*为图片添加触摸事件--触摸开始*/
    var isEnd=true;
    imgBox.addEventListener("touchstart",function(e){
        /*清除定时器*/
        clearInterval(timerId);
        /*获取当前手指的起始位置*/
        startX= e.targetTouches[0].clientX;
    });

  // imgBox.addEventListener("touchmove",function(e){
  //   moveX=e.changedTouches[0].clientX
  //   /*计算坐标的差异*/
  //   // console.log(moveX)
  //   distanceX=moveX-startX;
  //   console.log(distanceX)
  //   /*为了保证效果正常，将之前可能添加的过渡样式清除*/
  //   // imgBox.style.transition="none";
  //   imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
  // })

  
    /*为图片添加触摸事件--滑动过程*/
    imgBox.addEventListener("touchmove",function(e){
      if(isEnd==true){
      /*记录手指在滑动过程中的位置*/
      moveX= e.targetTouches[0].clientX;
      /*计算坐标的差异*/
      distanceX=moveX-startX;
      /*为了保证效果正常，将之前可能添加的过渡样式清除*/
      imgBox.style.transition="none";
      /*实现元素的偏移  left参照最原始的坐标
      * 重大细节：本次的滑动操作应该基于之前轮播图已经偏移的距离*/
      imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
      }

  });
  /*添加触摸结束事件*/



    /*touchend:松开手指触发*/
    imgBox.addEventListener("touchend",function(e){
      isEnd=false;
      if(Math.abs(distanceX)>100){
        // 判断方向
         if(distanceX>0){  //上一张
           index--;
         }
         else{
           index++;
         }
         //翻页
         imgBox.style.transition="left 0.5s ease-in-out";
         imgBox.style.left=-index*bannerWidth+"px"
      }
      else if(Math.abs(distanceX)>0){
        imgBox.style.transition="left 0.5s ease-in-out";
        imgBox.style.left=-index*bannerWidth+"px"
      }
        /*将上一次move所产生的数据重置为0*/
        startX=0;
        moveX=0;
        distanceX=0;
    })
  

      /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
      imgBox.addEventListener("webkitTransitionEnd",function(){
        // index=0 第一张，过度到最后一张count-2
        //index=count-1,最后一张，过度到index=o
        if(index==0){
          index=count-2;
          /*清除过渡*/
          imgBox.style.transition="none";
          /*设置偏移*/
          imgBox.style.left=-index*bannerWidth+"px";
        }
        else if(index==count-1){
          index=1
          /*清除过渡*/
          imgBox.style.transition="none";
          /*设置偏移*/
          imgBox.style.left=-index*bannerWidth+"px";
        }
          /*设置标记*/
          setIndicator(index);
          setTimeout(function(){
              isEnd=true;
              /*清除之前添加的定时器*/
              clearInterval(timerId);
              //重新开启定时器
              startTime();},100);
      })
  }
  
