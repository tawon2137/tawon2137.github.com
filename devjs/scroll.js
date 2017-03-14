(function(){

// easing 함수 주소 : http://goo.gl/5HLl8
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) {
        return c/2*t*t + b
      }
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    Math.easeInCubic = function(t, b, c, d) {
      var tc = (t/=d)*t*t;
      return b+c*(tc);
    };

    Math.inOutQuintic = function(t, b, c, d) {
      var ts = (t/=d)*t,
      tc = ts*t;
      return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
    };

  // requestAnimationFrame 이 지원안되는 브라우저에서는 setTimeout 함수를 이용함.requestAnimationFrame은 실행시 60프레임을 보장함.
    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
    })();

  function scrollTo(to, callback, duration) {
  // 스크롤위치를 이동시키는 함수
  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  // 현재 scrollTop 을 반환하는 함수
  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }
  //변수 초기화
  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 1000 / 60;
    duration = (typeof(duration) === 'undefined') ? 3000 : duration; //anmation time
  //animate 진행 requireAnimation을 통한 호출로 인한 60프레임이 보장됨
  var animateScroll = function() {
    // 애니메이션 시간누적 1프레임당 10이 누적됨
    currentTime += increment;
    // easing 함수 호출
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // move 함수 호출
    move(val);
    // 현재 애니메이션 시간이 druation을 초과했는지 확인 현재시간이 < 애니메이션 시간보다 작으면 애니메이션 진행 초과시에는 콜백함수 호출
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof(callback) === 'function') {
        callback();
      }
    }
  };
  animateScroll();
  }

  window.addEventListener("DOMContentLoaded", function(e){
    var scrollDownElement = document.getElementById("scroll-down");
    scrollDownElement.addEventListener("click", function(e){
      //scroll down trigger 실행시
      scrollTo(document.getElementsByTagName("main")[0].offsetTop,undefined,1500);
   });
   
   window.addEventListener("scroll", function(e){
    //  if ( this.scrollY === 0 ){ return false; }
      var header = document.getElementsByTagName("header")[0];
      var content = header.querySelector(".slide.active > .text-container");
      var x = this.scrollY, y = content.offsetTop;
      var opacity = (y - x) / (y / 100) / 100;
      var content_css = twCom.fn.cssObject(content);
      var duration = 0;

      if ( opacity >= 1 || opacity <= 0 ){
         opacity = opacity <= 0 ? 0 : 1;
         duration = 750;
       }
      content_css.setCss("-webkit-transition-duration" , duration + "ms");
      content_css.setCss("-moz-transition-duration" , duration + "ms");
      content_css.setCss("-o-transition-duration" , duration + "ms");
      content_css.setCss("transition-duration" , duration + "ms");
      content_css.setCss("opacity", opacity);
   });
});
})();
