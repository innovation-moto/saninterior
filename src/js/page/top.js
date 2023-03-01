export default class topManager {
  constructor(effect, param, util, scroll) {

    this.effect = effect;
    this.param = param;
    this.util = util;
    this.scr = scroll;

    this.winH;
    this.scrH = 0;
    this.$kv;
    this.$kvFlag;
    this.$kvSpecialLink;
    this.$kvScroll;
    this.$splashObj = [];
    this.$header;

    this.$headLogo;
    this.$headMenu;
    this.$sideNavi;
    this.$scrollText;

    this.status = {}

    this.sectionOffset = [];

    // KVの初回表示フラグ・期間
    this.visitedFlag = false;
    this.expireSpan = 0.5 * 60 * 1000 //期限切れまでの期間（ミリ秒）

    //loader
    this.$loader = document.getElementById('p-loader');
    this.loaderTimer;

    // this.$loaderNow = document.getElementById('c-loader__now');
    // this.$loaderMax = document.getElementById('c-loader__max');
    // this.$loaderLineA = document.getElementById('c-loader__line-a');
    // this.$loaderLineB = document.getElementById('c-loader__line-b');

  }
  init() {
    //this.loading('init');
    let _this = this;

    //初回表示判定
    if (this.getStorage('visitedFlag')) {
      this.visitedFlag = true;
    } else {
      this.setStorage('visitedFlag', true, this.expireSpan);
    }
    console.log('visited flag: ' + this.visitedFlag);

    this.$kv = document.getElementById('p-kv');
    let innerH = window.innerHeight;
    this.$kv.style.height = innerH + 'px';
    this.kv();



  }
  render(mouse, scrollInc) {}
  resize(w, h) {
    let innerH = window.innerHeight;
    this.$kv.style.height = innerH + 'px';
  }
  scroll(e, inc) {}
  setStorage(key, value, expire = this.expireSpan) { //localStorageに期限（指定はミリ秒での期間）付きで記録
    let data;
    if (expire !== undefined) {
      data = {
        expire: expire + Date.now(),
        value: value
      };
    } else {
      data = value;
    }
    localStorage.setItem(key, JSON.stringify(data));
  }
  getStorage(key) { //localStorageから取得して期限切れなら破棄
    let s = localStorage[key];
    if (s === undefined) {
      return undefined;
    }
    s = JSON.parse(s);
    if (s.expire > Date.now()) {
      return s.value;
    } else {
      localStorage.removeItem(key);
      return undefined;
    }
  }
  kv(){
    let _this = this;
    TweenMax.set(document.querySelectorAll('#l-header-title'),{
      opacity:0,
      x: 0,
      y: -50,
    });
    TweenMax.set(document.querySelectorAll('#l-header-menu-btn'),{
      opacity:0,
      x: 0,
      y: -50,
    });
    TweenMax.set(this.$kv.querySelectorAll('#p-kv__scroll'),{
      opacity:0,
      x: 0,
      y: -50,
    });
    TweenMax.set(this.$kv.querySelectorAll('#p-kv__line'),{
        opacity:0,
        scaleX: 0.1
    });
    this.effect.textAnimation(this.$kv.querySelectorAll('#p-kv__title'), 'set')
    // this.effect.textAnimation(this.$kv.querySelectorAll('.jp'), 'set')


    // TweenMax.to(this.$kv.querySelectorAll('.glitter'),1.2,{
    //   opacity:1,
    //   x: 0,
    //   y: 0,
    //   ease: this.param.ease,
    // });

    TweenMax.to(this.$kv.querySelectorAll('#p-kv__line'),1.2,{
        opacity:1,
        scaleX: 1,
        ease: this.param.ease,
        onComplete: function(){
          _this.effect.textAnimation(_this.$kv.querySelectorAll('#p-kv__title'), 'show');

          TweenMax.to(document.querySelectorAll('#l-header-title'), .6, {
            opacity:1,
            x: 0,
            y: 0,
            delay: 2.5,
            ease: _this.param.ease,
          });
          TweenMax.to(document.querySelectorAll('#l-header-menu-btn'), .6, {
            opacity:1,
            x: 0,
            y: 0,
            delay: 2.5,
            ease: _this.param.ease,
          });
          let scrollTimeline = new TimelineMax();
          scrollTimeline.set(_this.$kv.querySelectorAll('#p-kv__scroll .arrow'),{
            opacity:0,
            top: 0,
            bottom: 63,
            height: 0,
          });
          scrollTimeline.to(_this.$kv.querySelectorAll('#p-kv__scroll .arrow'),.6,{
            opacity:1,
            bottom: 0,
            height: 63,
            ease: _this.param.ease,
          });
          scrollTimeline.to(_this.$kv.querySelectorAll('#p-kv__scroll .arrow'),.6,{
            opacity:0,
            top: 63,
            bottom: 0,
            height: 0,
            delay: 0.5,
            ease: _this.param.ease,
          });
          TweenMax.to(_this.$kv.querySelectorAll('#p-kv__scroll'), .6,{
            opacity:1,
            x: 0,
            y: 0,
            delay: 3,
            ease: _this.param.ease,
          });    
          scrollTimeline.delay(3).repeat(-1).repeatDelay(0.5);
        }
    });
    // this.effect.textAnimation(this.$kv.querySelectorAll('.jp'), 'show')


  }
}