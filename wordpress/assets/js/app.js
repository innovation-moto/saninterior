(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _param = require('./param');

var _param2 = _interopRequireDefault(_param);

var _util = require('./module/libs/util');

var _util2 = _interopRequireDefault(_util);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = new _manager2.default();

/* ---------------------------------------------------

  -- load

 --------------------------------------------------- */

window.addEventListener("load", function (e) {
    manager.init("landing");
});

var _pageID = document.getElementsByTagName('body')[0].getAttribute("id");

/* ---------------------------------------------------

  -- event

 --------------------------------------------------- */

window.addEventListener("scroll", function (e) {
    var _y = window.pageYOffset || document.documentElement.scrollTop;
    if (manager) manager.scroll.update(_y, "");
    if (manager) manager.scrolls(e);
});

window.addEventListener("mousemove", function (e) {

    var _x = e.clientX;
    var _y = e.clientY;

    // if(manager) manager.mouse.update(_x,_y);
});

var MOUSE_WHEEL_EVENT = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

document.addEventListener(MOUSE_WHEEL_EVENT, function (e) {

    if (manager) manager.wheel(e);
});

window.addEventListener("touchstart", function (e) {
    if (manager) manager.touchStart(e);
});
window.addEventListener("touchmove", function (e) {

    if (manager) manager.touchmove(e);
}, { passive: false });
window.addEventListener("touchend", function (e) {
    if (manager) manager.touchEnd(e);
});

/* ---------------------------------------------------

  -- resize

 --------------------------------------------------- */
window.addEventListener("resize", function (e) {
    if (manager) {
        if (manager.param.displayType == "sp" && manager.w == window.innerWidth) return;
        manager.resize();
    }
});

// window.addEventListener('onorientationchange', resize, false);

/* ---------------------------------------------------

  -- 非同期遷移

 --------------------------------------------------- */

// Barba.Pjax.start();
// Barba.Prefetch.init();
//
// var PageTransition = Barba.BaseTransition.extend({
//     start: function() {
//         // manager.out();
//         Promise
//             .all([this.newContainerLoading])
//             .then(this.out.bind(this))
//             .then(this.show.bind(this));
//
//         // if(manager.gnavi.status.mode=="open"){
//         //     setTimeout(()=>{
//         //         Promise
//         //             .all([this.newContainerLoading])
//         //             .then(this.out.bind(this))
//         //             .then(this.show.bind(this));
//         //     },5e2)
//         // }else{
//         // }
//         /* 画面遷移する際に発火 */
//     },
//     out: function() {
//         if(manager.status.pageID !== "top") {
//             document.getElementById("l-cover").classList.add("is-trans");
//             document.getElementById("l-menu-trigger").classList.remove("sp");
//         }else{
//             setTimeout(()=>{
//                 document.getElementById("l-menu-trigger").classList.add("sp");
//             },5e2);
//             setTimeout(()=>{
//                 document.getElementById("l-cover").classList.add("is-trans");
//             },1e3);
//         }
//         return manager.out();
//     },
//     show: function() {
//
//
//         this.newContainer.style.opacity = 0;
//
//         setTimeout(()=>{
//             document.body.id = _pageID;
//             document.body.classList = _pageID!=='top'&&_pageID!=="philosophy" ? "lowlayer":"";
//             this.oldContainer.style.display = "none";
//             manager.init("trans");
//         },15e2);
//         setTimeout(()=>{
//             this.newContainer.style.opacity = 1;
//             document.getElementById("l-cover").classList.remove("is-trans");
//             manager.show();
//
//             manager.resize();
//
//             this.done();
//
//             },2e3);
//
//         // var $el = $(this.newContainer);
//         //
//         // $(this.oldContainer).hide();
//         //
//         // $el.css({
//         //     visibility : 'visible',
//         //     opacity : 0
//         // });
//         //
//         // $el.animate({ opacity: 1 }, 400, function() {
//         //     /**
//         //      * Do not forget to call .done() as soon your transition is finished!
//         //      * .done() will automatically remove from the DOM the old Container
//         //      */
//         //
//         //     _this.done();
//         // });
//     }
// });
//
// Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
//
//     /* ページ情報取得 */
//     _pageID = currentStatus.namespace;
//
//     /* head内書き換え */
//     var head = document.head;
//     var newPageRawHead = newPageRawHTML.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
//     var newPageHead = document.createElement('head');
//     newPageHead.innerHTML = newPageRawHead;
//
//     var removeHeadTags = [
//         "meta[name='keywords']"
//         ,"meta[name='description']"
//         ,"meta[property^='og']"
//         ,"meta[name^='twitter']"
//         ,"meta[itemprop]"
//         ,"link[itemprop]"
//         ,"link[rel='prev']"
//         ,"link[rel='next']"
//         ,"link[rel='canonical']"
//     ].join(',');
//
//     var headTags = head.querySelectorAll(removeHeadTags)
//     for(var i = 0; i < headTags.length; i++ ){
//         head.removeChild(headTags[i]);
//     }
//     var newHeadTags = newPageHead.querySelectorAll(removeHeadTags)
//
//     for(var i = 0; i < newHeadTags.length; i++ ){
//         head.appendChild(newHeadTags[i]);
//     }
//
//     //アナリティクスに送信
//     //ga('send', 'pageview', window.location.pathname.replace(/^\/?/, '/') + window.location.search);
//
//     /* html書き換え */
//
// });
//
// Barba.Pjax.getTransition = function() {
//     console.log("getTransition");
//     return PageTransition;
// };
// Barba.Dispatcher.on("load", function() {
//     // console.log("test");
// });
//
// Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
// Barba.Pjax.preventCheck = function(evt, element) {
//
//     //if(!scroll.status.comp) return; //スクロール中は通さない
//     return Barba.Pjax.originalPreventCheck(evt, element)
//
//     if(element) {
//             if(element.classList.contains('no-barba')){
//                 return false;
//             }
//     //
//     //     _successURL = element.getAttribute('href');
//     //
//     //     if (_successURL && _successURL.indexOf('#') > -1) //ハッシュが含まれていてもbarbaが機能するように
//     //         return true;
//     //     else if (element.parentNode.classList.contains('js__acc-trigger-sp') && param.displayType === 'sp')
//     //         return false;
//     //     // 拡張子が該当する場合はtarget="_blank"に
//     //     else if (/\.(xlsx?|docx?|pptx?|pdf|jpe?g|png|gif|svg)/.test(element.href.toLowerCase())) {
//     //         element.setAttribute('target', '_blank');
//     //         return false;
//     //     }
//     //     else if(element.classList.contains('ab-item')){
//     //         return false;
//     //     }
//     //     else
//     //         return Barba.Pjax.originalPreventCheck(evt, element)
//     }
// };
//
// Barba.Dispatcher.on('linkClicked', (element, event) => {
//
//     //if(!scroll.status.comp) return; //スクロール中は通さない
//
//     // _successURL = element.getAttribute('href');
//
// });

},{"./manager":2,"./module/libs/util":7,"./param":20}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _param = require('./param');

var _param2 = _interopRequireDefault(_param);

var _util = require('./module/libs/util');

var _util2 = _interopRequireDefault(_util);

var _swiper = require('./module/libs/swiper');

var _swiper2 = _interopRequireDefault(_swiper);

var _effect = require('./module/effect');

var _effect2 = _interopRequireDefault(_effect);

var _manager = require('./module/table/manager');

var _manager2 = _interopRequireDefault(_manager);

var _manager3 = require('./module/modal/manager');

var _manager4 = _interopRequireDefault(_manager3);

var _manager5 = require('./module/tab/manager');

var _manager6 = _interopRequireDefault(_manager5);

var _gnavi = require('./module/global/gnavi');

var _gnavi2 = _interopRequireDefault(_gnavi);

var _top = require('./page/top');

var _top2 = _interopRequireDefault(_top);

var _mission = require('./page/mission');

var _mission2 = _interopRequireDefault(_mission);

var _craftmanship = require('./page/craftmanship');

var _craftmanship2 = _interopRequireDefault(_craftmanship);

var _solution = require('./page/solution');

var _solution2 = _interopRequireDefault(_solution);

var _about = require('./page/about');

var _about2 = _interopRequireDefault(_about);

var _scrollManager = require('./module/scroll/scrollManager');

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _backgroundManager = require('./module/backgroundManager');

var _backgroundManager2 = _interopRequireDefault(_backgroundManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = new _util2.default();

var Manager = function () {
    function Manager() {
        _classCallCheck(this, Manager);

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        /* fps計測用 */
        // this.fps = new Stats();
        // this.fps.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        // document.body.appendChild( this.fps.dom );

        /* fps低下対策 */
        this.fpsRate;

        /* class用 */
        this.param = new _param2.default();
        this.effect;
        this.gnavi;
        this.scroll;
        this.tab;
        this.swiper;

        this.page; /* ページごとに読み込むのもを入れる */
        this.lowlayer; //下層ページ共通で読み込むもの

        //設定
        this.conf = {
            lowlayerExclude: ["top"] // lowlayerを読み込まないページ
        };

        /* ステータス */
        this.status = {
            loaded: false,
            loadedAddClass: false,
            paceDone: false, // ローダーライブラリ pace用
            pageID: "",
            execution: "",
            transFlg: false, //画面遷移監視用のフラグ
            scr: {
                inc: 0
            },
            touch: {
                nowInc: 0,
                inc: 0
            }
        };

        this.$header;
        this.$footer;
        this.$kv;
        this.$footerPagetop;
        this.$pagetop;
        this.$footerThreshold;
    }

    _createClass(Manager, [{
        key: 'init',
        value: function init(execution) {
            /* 初期化 */

            this.w = window.innerWidth;
            this.h = window.innerHeight;
            this.status.pageID = document.getElementsByTagName('body')[0].getAttribute("id");
            this.status.execution = execution;
            TweenMax.set(document.getElementById("l-root"), {
                opacity: 1
            });
            //$('html,body').animate({ scrollTop: 0 }, '1');
            //TweenMax.to(window, '1', { scrollTo : { y : 0, autoKill : false }});

            if (this.status.execution == "landing") {
                // 非同期遷移で書き換えないもの。初回読み込みのみ実行
                this.loadCommon();
            } else {
                // 画面遷移時は一部更新
                this.resize();
            }

            //here
            this.loadPage();
        }
    }, {
        key: 'loadCommon',
        value: function loadCommon() {
            var _this = this;

            /* 共通で読み込むもの */

            this.effect = new _effect2.default(this.param);
            this.gnavi = new _gnavi2.default(this.param);
            this.scroll = new _scrollManager2.default(this.param);
            this.background = new _backgroundManager2.default(this.param);

            this.$header = document.getElementById('l-header');
            this.$footer = document.getElementById('l-footer');
            this.$kv = document.querySelector('.l-kv');

            this.scroll.init(this.status.pageID);
            this.background.init(this.status.pageID);
            setTimeout(function () {
                _this.resize(_this.h);
                if (_this.status.execution === "landing") _this.render();
            }, 1e2);

            this.gnavi.init();

            //footerのpagetopボタン
            // this.$pagetop = document.getElementById("l-pagetop");
            this.$footerPagetop = document.getElementById("l-footer-pagetop");
            console.log(this.$footerPagetop);
            // this.$pagetop.addEventListener('click', (event) => {
            //     event.preventDefault();
            //     event.stopPropagation();

            //     // スクロールする
            //     TweenLite.to(window, 0.5, {scrollTo:{y:0,autoKill:false}});

            // });
            this.$footerPagetop.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                // スクロールする
                TweenLite.to(window, 0.5, { scrollTo: { y: 0, autoKill: false } });
            });
        }
    }, {
        key: 'loadPage',
        value: function loadPage() {
            /* ページごとに分岐するもの */

            this.status.loaded = true;
            document.body.classList.add("is-loaded");

            //recruitのタブ挙動のため
            var urlHash = location.hash;
            if (urlHash) {
                location.hash = '';
            }

            // safariでピンチインアウトを殺す処理
            if (document.body.getAttribute("id") !== "zoom") {
                /* "passive" が使えるかどうかを検出 */
                var passiveSupported = false;
                try {
                    document.addEventListener("test", null, Object.defineProperty({}, "passive", {
                        get: function get() {
                            passiveSupported = true;
                        }
                    }));
                } catch (err) {}

                /* リスナーを登録 */
                document.addEventListener('touchstart', function listener(e) {
                    /* do something */
                    // ピンチイン殺す
                    if (e.touches.length > 1) {
                        e.preventDefault();
                    }
                }, passiveSupported ? {
                    passive: false
                } : false);
                document.addEventListener('touchmove', function listener(e) {
                    /* do something */
                    if (e.touches.length > 1) {
                        e.preventDefault();
                    }
                }, passiveSupported ? {
                    passive: false
                } : false);
            }

            switch (this.status.pageID) {
                case "top":
                    this.page = new _top2.default(this.effect, this.param, util, this.scroll);
                    this.page.init();
                    break;
                case "mission":
                    this.page = new _mission2.default(this.effect, this.param, util, this.scroll);
                    this.page.init();
                    break;
                case "solution":
                    this.page = new _solution2.default(this.effect, this.param, util, this.scroll);
                    this.page.init();
                    this.swiper = new _swiper2.default(this.effect, this.param, util, this.scroll);
                    this.swiper.init();
                    break;
                case "about":
                    this.page = new _about2.default(this.effect, this.param, util, this.scroll);
                    this.page.init();
                    break;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (!requestAnimationFrame) {
                setTimeout(function () {
                    return _this2.render;
                }, 1000 / 60);
            } else {
                requestAnimationFrame(this.render.bind(this));
            }

            this.fpsRate = util.updateTimeRatio();

            //this.fps.begin();

            this.scroll.move(this.fpsRate);

            this.status.loaded = true;
            if (this.status.loaded && !this.status.loadedAddClass) {
                this.status.loadedAddClass = true;
                document.body.classList.add("is-loaded");
            }

            //this.fps.end();
        }
    }, {
        key: 'resize',
        value: function resize() {

            this.w = window.innerWidth;
            this.h = window.innerHeight;
            this.param.displayType = window.innerWidth > this.param.breakpoint ? "pc" : "sp";
            this.scroll.resize(this.w, this.h);
            //this.page.resize();
            this.status.scr.inc = window.scrollY || window.pageYOffset;
            this.$footerThreshold = this.$footer.getBoundingClientRect().top + this.status.scr.inc;

            this.background.resize(this.w, this.h);

            switch (this.status.pageID) {
                case 'top':
                    if (this.page) this.page.resize(this.w, this.h);
                    break;
                case 'mission':
                    if (this.page) this.page.resize(this.w, this.h);
                    break;
                case 'solution':
                    this.swiper.resize();
                    break;
            }

            if (this.$kv) {
                if (this.status.scr.inc <= this.$kv.offsetHeight) {
                    this.$header.classList.add("onKv");
                    // this.$pagetop.classList.add("onKv");
                    this.$footerPagetop.classList.add("onKv");
                } else {
                    this.$header.classList.remove("onKv");
                    // this.$pagetop.classList.remove("onKv");
                    this.$footerPagetop.classList.remove("onKv");
                }
            }
        }
    }, {
        key: 'wheel',
        value: function wheel(e) {

            var _delta = e.deltaY ? -e.deltaY : e.wheelDelta ? e.wheelDelta : -e.detail;
        }
    }, {
        key: 'scrolls',
        value: function scrolls(e) {

            this.status.scr.inc = window.scrollY || window.pageYOffset;
            switch (this.status.pageID) {
                case 'top':
                    if (this.page) this.page.scroll(e, this.status.scr.inc);
                    break;
                case 'mission':
                    if (this.page) this.page.scroll(e, this.status.scr.inc);
                    break;

            }

            if (this.$kv) {
                if (this.status.scr.inc <= this.$kv.offsetHeight) {
                    this.$header.classList.add("onKv");
                    // this.$pagetop.classList.add("onKv");
                    this.$footerPagetop.classList.add("onKv");
                } else {
                    this.$header.classList.remove("onKv");
                    // this.$pagetop.classList.remove("onKv");
                    this.$footerPagetop.classList.remove("onKv");
                }
            }

            if (this.$footer) {
                if (this.status.scr.inc + this.h - this.$footerThreshold < 90) {
                    // this.$pagetop.classList.add("fixed");
                    this.$footerPagetop.classList.add("fixed");
                } else {
                    // this.$pagetop.classList.remove("fixed");
                    this.$footerPagetop.classList.remove("fixed");
                }
            }
        }
    }, {
        key: 'touchmove',
        value: function touchmove(e) {}
    }, {
        key: 'touchStart',
        value: function touchStart(e) {}
    }, {
        key: 'touchEnd',
        value: function touchEnd(e) {}
    }, {
        key: 'show',
        value: function show() {}
        // 画面遷移用に演出

    }, {
        key: 'out',
        value: function out() {}
    }]);

    return Manager;
}();

exports.default = Manager;

},{"./module/backgroundManager":3,"./module/effect":4,"./module/global/gnavi":5,"./module/libs/swiper":6,"./module/libs/util":7,"./module/modal/manager":8,"./module/scroll/scrollManager":11,"./module/tab/manager":13,"./module/table/manager":14,"./page/about":15,"./page/craftmanship":16,"./page/mission":17,"./page/solution":18,"./page/top":19,"./param":20}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var backgroundManager = function () {
  function backgroundManager(param) {
    _classCallCheck(this, backgroundManager);

    this.param = param;

    this.$bg;
    this.$lineWrap;
    this.$line2Wrap;
    this.$circleWrap;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.docH = document.getElementById("l-scroll").offsetHeight;

    this.lineSpeed = 7;
    this.unitSize;
  }

  _createClass(backgroundManager, [{
    key: 'init',
    value: function init(pageID) {
      var _this = this;

      this.$bg = document.querySelector('.l-bg');
      this.$lineWrap = document.querySelector('.l-bg .line-wrap');
      this.$line2Wrap = document.querySelector('.l-bg .line2-wrap');
      this.$circleWrap = document.querySelector('.l-bg .circle-wrap');
      this.unitSize = this.w > 750 ? 90 : 66;

      this.lineSpeed = this.docH / 1700 * 10;
      console.log(this.lineSpeed);

      this.addLine();
      this.addLine2();
      this.addCircle();

      window.onblur = function () {
        window.blurred = true;console.log('blur', window.blurred);
      };
      window.onfocus = function () {
        window.blurred = false;
      };
    }
  }, {
    key: 'resize',
    value: function resize(w, h) {
      this.w = w;
      this.h = h;
      this.lineSpeed = this.docH / 1700 * 10;
      this.docH = document.getElementById("l-scroll").offsetHeight;
      this.unitSize = this.w > 750 ? 90 : 66;
    }
  }, {
    key: 'addLine',
    value: function addLine() {
      //右上から左下に流れる線のランダム描写
      var _this = this;

      setTimeout(function (_this) {
        if (!window.blurred) {
          var PosX = Math.floor((Math.random() * _this.docH - _this.w / 2) / _this.unitSize) * _this.unitSize;
          var line = document.createElement('div');
          line.classList.add('line');
          line.style.marginLeft = PosX + 'px';
          var lineSpan = document.createElement('span');
          lineSpan.style.animationDuration = _this.lineSpeed + 's';
          line.append(lineSpan);
          _this.$lineWrap.append(line);
          TweenMax.to(line, _this.lineSpeed, {
            opacity: 1,
            onComplete: function onComplete() {
              line.remove();
            }
          });
        }

        _this.addLine();
      }, 1500, _this);
    }
  }, {
    key: 'addLine2',
    value: function addLine2() {
      //左上から右下に流れる線のランダム描写
      var _this = this;

      setTimeout(function (_this) {
        console.log(window.blurred);
        if (!window.blurred) {
          var PosX = Math.floor(-(Math.random() * _this.docH + _this.w / 2) / _this.unitSize) * _this.unitSize;
          var line = document.createElement('div');
          line.classList.add('line');
          line.classList.add('line2');
          line.style.marginLeft = PosX + 'px';
          var lineSpan = document.createElement('span');
          lineSpan.style.animationDuration = _this.lineSpeed + 's';
          line.append(lineSpan);
          _this.$line2Wrap.append(line);

          TweenMax.to(line, _this.lineSpeed, {
            opacity: 1,
            onComplete: function onComplete() {
              line.remove();
            }
          });
        }

        _this.addLine2();
      }, 1500, _this);
    }
  }, {
    key: 'addCircle',
    value: function addCircle() {
      //薄青の円のランダム描写
      var _this = this;

      setTimeout(function (_this) {
        if (!window.blurred) {
          var PosX = Math.floor(Math.random() * _this.w) - 220;
          var PosY = Math.floor(Math.random() * _this.docH) - 220;
          var circle = document.createElement('div');
          circle.classList.add('circle');
          circle.style.marginTop = PosY + 'px';
          circle.style.marginLeft = PosX + 'px';
          _this.$circleWrap.append(circle);

          TweenMax.set(circle, {
            opacity: 0
          });
          TweenMax.to(circle, 2, {
            opacity: 1,
            onComplete: function onComplete() {
              TweenMax.to(circle, 6, {
                opacity: 0,
                delay: 6,
                onComplete: function onComplete() {
                  circle.remove();
                }
              });
            }
          });
        }

        _this.addCircle();
      }, 1000, _this);
    }
  }]);

  return backgroundManager;
}();

exports.default = backgroundManager;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./libs/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = new _util2.default();

var effectManager = function () {
    function effectManager(param) {
        _classCallCheck(this, effectManager);

        this.param = param;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }
    /* ----------------------------------
    
     --  ちょっと奥からopacityで出すやつ
    
    ---------------------------------- */


    _createClass(effectManager, [{
        key: 'showSimple',
        value: function showSimple($target, type) {

            switch (type) {
                case "set":
                    //初期設定

                    var i = 0;
                    while (i < $target.length) {
                        TweenMax.set($target[i].querySelectorAll('.js__simple-object'), {
                            opacity: 0,
                            z: -50,
                            pointerEvents: 'none'
                        });
                        i = i + 1 | 0;
                    }

                    break;

                case "show":
                    //表示動作

                    i = 0;
                    while (i < $target.length) {
                        TweenMax.staggerTo($target[i].querySelectorAll('.js__simple-object'), 1.2, {
                            opacity: 1,
                            z: 0,
                            pointerEvents: 'auto',
                            ease: this.param.ease
                        }, 0.1);
                        i = i + 1 | 0;
                    }
                    break;

                case "hide":
                    //非表示動作

                    i = 0;
                    while (i < $target.length) {
                        TweenMax.staggerTo($target[i].querySelectorAll('.js__simple-object'), .9, {
                            opacity: 0,
                            z: -50,
                            ease: this.param.ease
                        }, 0.1);
                        i = i + 1 | 0;
                    }

                    break;
            }
        }
        /* ----------------------------------
        
         --  タイトルの1文字ずつ表示
        
        ---------------------------------- */

    }, {
        key: 'textAnimation',
        value: function textAnimation($target, type) {
            var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
            var callback = arguments[3];


            switch (type) {
                case "set":
                    //初期設定

                    var chars = void 0;

                    var i = 0;

                    while (i < $target.length) {

                        var $t = void 0;

                        // icon
                        // $t = $target[i].querySelector('.js__tsc-icon');
                        // if($t){
                        //     TweenMax.set($t.children[0], {opacity:0, x: -80, y: 80 ,'height':'300%'});
                        //     TweenMax.set($t.children[1], {opacity:0, x: 80, y: -80 ,'height':'300%'});
                        // }

                        // text
                        $t = $target[i].querySelector('.js__split');
                        console.log('$t', $t);

                        if ($t) {
                            var text = new SplitText($t, { type: "words,chars" });
                            chars = text.chars;

                            $t.children[0].classList.add('first');
                            $t.children[0].style.opacity = 1;

                            var _j = 0;

                            var $c = $t.querySelectorAll('.js__clone.first>*>*');

                            _j = 0;
                            while (_j < $c.length) {
                                if (_j % 2 == 0) {
                                    TweenMax.set($c[_j], {
                                        x: -20,
                                        y: 20,
                                        opacity: 0
                                    });
                                } else {
                                    TweenMax.set($c[_j], {
                                        x: 20,
                                        y: -20,
                                        opacity: 0
                                    });
                                }
                                // $c[j].classList.add('gradient-number_'+Math.ceil(j/$c.length*10));
                                _j = _j + 1 | 0;
                            }

                            if (this.param.browserType !== 'ie' && this.param.userAgent !== 'sp') {

                                $c = $t.querySelectorAll('.js__clone.last>*>*');

                                _j = 0;
                                while (_j < $c.length) {
                                    if (_j % 2 == 0) {
                                        TweenMax.set($c[_j], {
                                            x: -20,
                                            y: 20,
                                            opacity: 0
                                        });
                                    } else {
                                        TweenMax.set($c[_j], {
                                            x: 20,
                                            y: -20,
                                            opacity: 0
                                        });
                                    }
                                    // $c[j].classList.add('gradient-number_'+Math.ceil(j/$c.length*10));
                                    _j = _j + 1 | 0;
                                }
                            }
                        }

                        // sub
                        $t = $target[i].querySelector('.js__split2');

                        if ($t) {
                            var _text = new SplitText($t, { type: "words,chars" });
                            chars = _text.chars;

                            $t.children[0].classList.add('first');
                            $t.children[0].style.opacity = 1;

                            var _j2 = 0;

                            var _$c = $t.querySelectorAll('.js__clone.first>*>*');

                            _j2 = 0;
                            while (_j2 < _$c.length) {
                                if (_j2 % 2 == 0) {
                                    TweenMax.set(_$c[_j2], {
                                        x: -20,
                                        y: 20,
                                        opacity: 0
                                    });
                                } else {
                                    TweenMax.set(_$c[_j2], {
                                        x: 20,
                                        y: -20,
                                        opacity: 0
                                    });
                                }
                                // $c[j].classList.add('gradient-number_'+Math.ceil(j/$c.length*10));
                                _j2 = _j2 + 1 | 0;
                            }

                            if (this.param.browserType !== 'ie' && this.param.userAgent !== 'sp') {

                                _$c = $t.querySelectorAll('.js__clone.last>*>*');

                                _j2 = 0;
                                while (_j2 < _$c.length) {
                                    if (_j2 % 2 == 0) {
                                        TweenMax.set(_$c[_j2], {
                                            x: -20,
                                            y: 20,
                                            opacity: 0
                                        });
                                    } else {
                                        TweenMax.set(_$c[_j2], {
                                            x: 20,
                                            y: -20,
                                            opacity: 0
                                        });
                                    }
                                    // $c[j].classList.add('gradient-number_'+Math.ceil(j/$c.length*10));
                                    _j2 = _j2 + 1 | 0;
                                }
                            }
                        }

                        i = i + 1 | 0;
                    }

                    break;
                case "show":
                    //表示動作

                    var j = 0;

                    while (j < $target.length) {

                        var _$t = void 0;

                        // icon
                        _$t = $target[j].querySelector('.js__tsc-icon');
                        if (_$t) {
                            TweenMax.staggerTo([_$t.children[0], _$t.children[1]], 1.2, {
                                delay: delay,
                                x: 0,
                                y: 0,
                                opacity: 1,
                                'height': '100%',
                                ease: this.param.ease
                            }, 0.1);
                        }

                        // text
                        _$t = $target[j].querySelectorAll('.js__clone.first>*>*');
                        TweenMax.staggerTo(_$t, 1.1, {
                            delay: delay,
                            x: 0,
                            y: 0,
                            opacity: .4,
                            ease: this.param.ease
                        }, 0.05);
                        TweenMax.staggerTo(_$t, .6, {
                            delay: delay + 0.8,
                            opacity: 1,
                            ease: Sine.easeOut,
                            onComplete: callback
                        }, 0.05);

                        i = 0;
                        while (i < _$t.length) {
                            TweenMax.set(_$t[i], { delay: 0.05 * i, className: '+=is-done' });
                            i = i + 1 | 0;
                        }

                        if (this.param.browserType !== 'ie' && this.param.userAgent !== 'sp') {
                            _$t = $target[j].querySelectorAll('.js__clone.last>*>*');
                            TweenMax.staggerTo(_$t, 1.1, {
                                delay: delay,
                                x: 0,
                                y: 0,
                                opacity: .4,
                                ease: this.param.ease
                            }, 0.05);
                            TweenMax.staggerTo(_$t, 1.1, {
                                delay: delay + 0.7,
                                x: -12,
                                y: 12,
                                opacity: 0,
                                ease: Sine.easeOut
                            }, 0.05);

                            i = 0;
                            while (i < _$t.length) {
                                TweenMax.set(_$t[i], { delay: 0.05 * i, className: '+=is-done' });
                                i = i + 1 | 0;
                            }
                        }

                        // sub
                        _$t = $target[j].querySelector('.js__tsc-title-sub');
                        if (_$t) {
                            TweenMax.to(_$t, .6, {
                                delay: delay + 0.7,
                                x: 0,
                                y: 0,
                                opacity: 1,
                                ease: this.param.ease
                            });
                        }

                        j = j + 1 | 0;
                    }

                    break;
                case "hide":
                    //非表示動作

                    break;
            }
        }
        /* ----------------------------------
        
         --  センテンス内の要素を出すやつ
        
        ---------------------------------- */

    }, {
        key: 'slanting',
        value: function slanting($target, type) {
            var _this = this;

            switch (type) {

                case "set":
                    //初期設定

                    TweenMax.set($target.querySelectorAll('.js__slanting-object')[0], {
                        x: 200, y: -200, opacity: 0
                    });
                    TweenMax.set($target.querySelectorAll('.js__slanting-object')[1], {
                        x: -200, y: 200, opacity: 0
                    });
                    TweenMax.set($target.querySelector('.js__slanting-main'), {
                        opacity: 0
                    });

                    break;

                case "show":
                    //表示動作

                    var i = 0;

                    var _loop = function _loop() {
                        var _index = i;
                        var _delay = 0.8;
                        if ($target[i].getAttribute('data-delay')) {
                            _delay = $target[i].getAttribute('data-delay');
                        }
                        TweenMax.to($target[i].querySelectorAll('.js__slanting-object'), 0.9, {
                            delay: _delay,
                            x: 0,
                            y: 0,
                            opacity: 1,
                            ease: _this.param.ease,
                            onComplete: function onComplete() {
                                TweenMax.to($target[_index].querySelector('.js__slanting-main'), 1.2, {
                                    opacity: 1,
                                    ease: 'Power1.easeOut'
                                });
                                TweenMax.to($target[_index].querySelectorAll('.js__slanting-object')[0], 0.6, {
                                    x: 20, y: -20, opacity: 0,
                                    ease: Sine.easeOut
                                });
                                TweenMax.to($target[_index].querySelectorAll('.js__slanting-object')[1], 0.6, {
                                    x: -20, y: 20, opacity: 0,
                                    ease: Sine.easeOut
                                });
                            }
                        });
                        i = i + 1 | 0;
                    };

                    while (i < $target.length) {
                        _loop();
                    }

                    break;
                case "hide":
                    //非表示動作

                    break;
            }
        }

        /* ----------------------------------
        
         --  センテンス内の四角い半透明のボックスを出すやつ（あまり意味がなかったらやめてもいいかも）
        
        ---------------------------------- */

    }, {
        key: 'square',
        value: function square($target, type) {

            switch (type) {
                case "set":
                    //初期設定

                    TweenMax.set($target, { x: $target.dataset.x, y: $target.dataset.y, opacity: 0 });

                    break;
                case "show":
                    //表示動作

                    TweenMax.to($target, 0.9, {
                        delay: 0.6,
                        x: 0,
                        y: 0,
                        opacity: 1,
                        ease: this.param.ease
                    });

                    break;
                case "hide":
                    //非表示動作

                    break;
            }
        }

        /* ----------------------------------
        
         --  下からフェードイン
        
        ---------------------------------- */

    }, {
        key: 'slideUp',
        value: function slideUp($target, type) {

            switch (type) {
                case "set":
                    //初期設定

                    TweenMax.set($target, {
                        opacity: 0,
                        y: 50
                    });

                    break;

                case "show":
                    //表示動作

                    TweenMax.to($target, .8, {
                        opacity: 1,
                        y: 0,
                        ease: this.param.easeSlideUp
                    });

                    break;

                case "hide":
                    //非表示動作

                    break;
            }
        }

        /* ----------------------------------
        
         --  右から連鎖的にフェードイン
        
        ---------------------------------- */

    }, {
        key: 'slideRightChain',
        value: function slideRightChain($target, type) {
            var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
            var stagger = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.2;
            var time = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.1;


            switch (type) {
                case "set":
                    //初期設定

                    TweenMax.set($target, {
                        opacity: 0,
                        x: -100
                    });

                    break;

                case "show":
                    //表示動作

                    TweenMax.staggerTo($target, time, {
                        delay: delay,
                        opacity: 1,
                        x: 0,
                        ease: this.param.easeSlideUp
                    }, stagger);

                    break;

                case "hide":
                    //非表示動作

                    break;
            }
        }

        /* ----------------------------------
        
         --  ヘッドラインのタイトル出現
        
        ---------------------------------- */

    }, {
        key: 'headlineTitle',
        value: function headlineTitle($target, type) {

            switch (type) {
                case "set":
                    //初期設定

                    TweenMax.set($target.querySelectorAll('.glitter'), {
                        opacity: 0,
                        x: 50,
                        y: -50
                    });
                    TweenMax.set($target.querySelectorAll('.line'), {
                        opacity: 0,
                        scaleX: 0.1
                    });
                    console.log($target.querySelectorAll('.en'));
                    this.textAnimation($target.querySelectorAll('.en'), 'set');
                    this.textAnimation($target.querySelectorAll('.jp'), 'set');

                    break;

                case "show":
                    //表示動作
                    TweenMax.to($target.querySelectorAll('.glitter'), 1.2, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        ease: this.param.ease
                    });
                    TweenMax.to($target.querySelectorAll('.line'), 1.2, {
                        opacity: 1,
                        scaleX: 1,
                        ease: this.param.ease
                    });
                    this.textAnimation($target.querySelectorAll('.en'), 'show');
                    this.textAnimation($target.querySelectorAll('.jp'), 'show');

                    break;

                case "hide":
                    //非表示動作

                    break;
            }
        }

        /* ----------------------------------
          --  TOPだけで使うやつ
         ---------------------------------- */

    }, {
        key: 'showTurn',
        value: function showTurn($target, type) {

            switch (type) {
                case "set":
                    //初期設定

                    var i = 0;
                    while (i < $target.length) {
                        TweenMax.set($target[i].querySelectorAll('.js__turn-object'), {
                            opacity: 0,
                            z: -50
                        });
                        i = i + 1 | 0;
                    }

                    break;

                case "show":
                    //表示動作

                    i = 0;
                    while (i < $target.length) {
                        TweenMax.staggerTo($target[i].querySelectorAll('.js__turn-object'), .9, {
                            opacity: 1,
                            z: 0,
                            ease: this.param.ease
                        }, 1.7);
                        TweenMax.staggerTo($target[i].querySelectorAll('.js__turn-object'), .9, {
                            delay: 1.7,
                            opacity: 0,
                            z: -50,
                            ease: this.param.ease
                        }, 1.7);
                        i = i + 1 | 0;
                    }
                    break;

                case "hide":
                    //非表示動作

                    break;
            }
        }

        /* ----------------------------------
         --  TOP、solutionの回転出現パターン
         ---------------------------------- */

    }, {
        key: 'topSolution',
        value: function topSolution($target, type) {

            switch (type) {
                case "set":
                    //初期設定

                    TweenMax.set($target.querySelectorAll('.solution-obj01__inner'), {
                        x: -200, y: 0
                    });
                    TweenMax.set($target, {
                        opacity: 0
                    });
                    break;

                case "show":
                    //表示動作
                    TweenMax.to($target, .6, {
                        opacity: 1,
                        ease: this.param.ease,
                        delay: .6
                    });
                    // $target.classList.remove('pos1');
                    // $target.classList.add('pos2');

                    this.w = window.innerWidth;
                    this.h = window.innerHeight;

                    if (this.w <= 750) {
                        TweenMax.to($target.querySelectorAll('.solution-obj01__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: -100, y: 0 }, { x: -87, y: -25 }, { x: -50, y: -44 }, { x: 0, y: -50 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj02__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 0, y: -50 }, { x: 50, y: -44 }, { x: 87, y: -25 }, { x: 100, y: 0 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj03__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 100, y: 0 }, { x: 87, y: 25 }, { x: 50, y: 44 }, { x: 0, y: 50 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj04__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 0, y: 50 }, { x: -50, y: 44 }, { x: -87, y: 25 }, { x: -100, y: 0 }] /*bezier end*/ }, ease: this.param.ease });
                    } else {
                        TweenMax.to($target.querySelectorAll('.solution-obj01__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: -200, y: 0 }, { x: -173, y: -50 }, { x: -100, y: -87 }, { x: 0, y: -100 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj02__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 0, y: -100 }, { x: 100, y: -87 }, { x: 173, y: -50 }, { x: 200, y: 0 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj03__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 200, y: 0 }, { x: 173, y: 50 }, { x: 100, y: 87 }, { x: 0, y: 100 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj04__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 0, y: 100 }, { x: -100, y: 87 }, { x: -173, y: 50 }, { x: -200, y: 0 }] /*bezier end*/ }, ease: this.param.ease });
                    }

                    break;

                case "hide":
                    //非表示動作

                    break;
            }
        }

        /* ----------------------------------
         --  solutionページでの回転出現パターン
         ---------------------------------- */

    }, {
        key: 'solutionSolution',
        value: function solutionSolution($target, type) {

            switch (type) {
                case "set":
                    //初期設定

                    TweenMax.set($target, {
                        opacity: 0
                    });
                    break;

                case "show":
                    //表示動作
                    TweenMax.to($target, .6, {
                        opacity: 1,
                        ease: this.param.ease,
                        delay: .6
                    });
                    // $target.classList.remove('pos1');
                    // $target.classList.add('pos2');

                    this.w = window.innerWidth;
                    this.h = window.innerHeight;

                    if (this.w <= 750) {
                        TweenMax.to($target.querySelectorAll('.solution-obj01__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 100 * 0.94, y: 0 }, { x: 87 * 0.94, y: 25 * 0.87 }, { x: 50 * 0.94, y: 44 * 0.87 }, { x: 0, y: 50 * 0.87 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj02__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 0, y: 50 * 0.87 }, { x: -50 * 0.94, y: 44 * 0.87 }, { x: -87 * 0.94, y: 25 * 0.87 }, { x: -100 * 0.94, y: 0 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj03__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: -100 * 0.94, y: 0 }, { x: -87 * 0.94, y: -25 * 0.87 }, { x: -50 * 0.94, y: -44 * 0.87 }, { x: 0, y: -50 * 0.87 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj04__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 0, y: -50 * 0.87 }, { x: 50 * 0.94, y: -44 * 0.87 }, { x: 87 * 0.94, y: -25 * 0.87 }, { x: 100 * 0.94, y: 0 }] /*bezier end*/ }, ease: this.param.ease });
                    } else {
                        TweenMax.to($target.querySelectorAll('.solution-obj04__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: -200 * 0.94, y: 0 }, { x: -173 * 0.94, y: -50 * 0.87 }, { x: -100 * 0.94, y: -87 * 0.87 }, { x: 0, y: -100 * 0.87 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj01__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 0, y: -100 * 0.87 }, { x: 100 * 0.94, y: -87 * 0.87 }, { x: 173 * 0.94, y: -50 * 0.87 }, { x: 200 * 0.94, y: 0 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj02__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 200 * 0.94, y: 0 }, { x: 173 * 0.94, y: 50 * 0.87 }, { x: 100 * 0.94, y: 87 * 0.87 }, { x: 0, y: 100 * 0.87 }] /*bezier end*/ }, ease: this.param.ease });
                        TweenMax.to($target.querySelectorAll('.solution-obj03__inner'), 2, { bezier: { curviness: 1.5, values: [{ x: 0, y: 100 * 0.87 }, { x: -100 * 0.94, y: 87 * 0.87 }, { x: -173 * 0.94, y: 50 * 0.87 }, { x: -200 * 0.94, y: 0 }] /*bezier end*/ }, ease: this.param.ease });
                    }

                    break;

                case "hide":
                    //非表示動作

                    break;
            }
        }
    }]);

    return effectManager;
}();

exports.default = effectManager;

},{"./libs/util":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gnavi = function () {
    function gnavi(param) {
        _classCallCheck(this, gnavi);

        // this.effect = effect;
        this.param = param;

        this.$header;
        this.$body;
        this.$container;
        this.$navi;
        this.$trigger;
        this.$link;
        this.$hasChild;
        //this.$naviInner;
        //this.$naviInnerOther;

        this.$searchTrigger;
        this.$searchContent;

        this.$hover;
        this.$hoverBg;

        this.webgl;

        this.status = {
            mode: "close",
            motFlg: false, // 動作中か監視
            searchmode: "close",
            searchmotFlg: false,
            displayType: ""
        };
    }

    _createClass(gnavi, [{
        key: "init",
        value: function init(webgl) {
            var _this = this;

            this.webgl = webgl;

            this.$body = document.getElementById("l-wrapper");

            this.$header = document.getElementById("l-header");
            // this.$container = document.getElementById("l-header-content");
            this.$navi = document.getElementById("l-header-menu__inner");
            this.$naviInner = document.getElementById("l-header-nav");
            //this.$naviInner = document.querySelectorAll("#l-header-nav .item");
            this.$naviBg = document.getElementById("l-header-menu__bg");
            // this.$naviOverlay = document.getElementById("l-header-menu__overlay");
            this.$trigger = document.getElementById("l-header-menu-btn");
            // this.$hover = document.getElementsByClassName("js__gnavi-hover");
            this.$close = document.getElementById("l-header-nav-close");
            this.$link = this.$navi.getElementsByTagName("a");
            this.$hasChild = document.querySelectorAll("#l-header-nav li.hasChild");

            this.$searchTrigger = document.getElementById("l-header-navi__search");
            this.$searchContent = document.getElementById("l-header-navi__search-content");

            //this.effect.show(this.$container.getElementsByClassName("js__op-show"),"set");

            //this.$hoverBg = document.getElementsByClassName("bgfont");

            // for( let i in this.$hoverBg ){
            //     if(this.$hoverBg[i].nodeType!=1) continue; // dom要素以外は処理止める
            //     this.effect.svgGlitch(this.$hoverBg[i],"set");
            // }


            // PC 背景のsvgを表示するアニメーション
            // for(let i in this.$hover){
            //     if(this.$hover[i].nodeType!=1) continue; // dom要素以外は処理止める


            //     this.$hover[i].addEventListener("mouseenter",(e)=>{

            //         let _id = "l-header-content-bg_" + e.target.getAttribute("data-target");

            //         this.effect.svgGlitchSimple(document.getElementById(_id),"show");

            //         TweenMax.to(this.$hover[i].getElementsByClassName("line"),0.4,{
            //             width:'100%',
            //             ease: Power2.easeOut
            //         })

            //     })
            //     this.$hover[i].addEventListener("mouseleave",(e)=>{

            //         let _id = "l-header-content-bg_" + e.target.getAttribute("data-target");

            //         this.effect.svgGlitchSimple(document.getElementById(_id),"out");

            //         TweenMax.to(this.$hover[i].getElementsByClassName("line"),0.4,{
            //             x : '100%',
            //             ease: Power2.easeOut,
            //             onComplete: () => {
            //                 TweenMax.set(this.$hover[i].getElementsByClassName("line"),{x : '0%', width : '0%'});
            //             }
            //         })

            //     })


            // }


            // メニューをオープン
            // this.$trigger.addEventListener("click",()=>{
            //
            //     if(this.status.motFlg) return;
            //     this.status.motFlg = true;
            //
            //     if(this.status.mode == "close"){
            //         this.open(webgl);
            //     }else{
            //         this.close(webgl);
            //     }
            //
            // })

            //gnaviの開閉
            this.$trigger.addEventListener("click", function () {
                if (_this.$trigger.classList.contains("is-close")) {
                    _this.$header.classList.remove("active");
                    _this.$trigger.classList.remove("is-close");
                    TweenMax.to(_this.$navi, .6, {
                        yPercent: -100, opacity: 0, display: 'none',
                        ease: _this.param.ease
                    });
                    //this.$body.classList.remove('is-locked');
                } else {
                    TweenMax.set(_this.$navi, {
                        opacity: 1, display: 'block'
                    });
                    TweenMax.set(_this.$naviInner, {
                        yPercent: -100, opacity: 0, display: 'none'
                    });
                    TweenMax.set(_this.$naviBg, {
                        opacity: 0
                    });
                    // TweenMax.set(this.$naviOverlay,{
                    //     xPercent:100,opacity:0
                    // });
                    TweenMax.to(_this.$naviBg, .3, {
                        opacity: 1,
                        ease: _this.param.ease
                    });
                    TweenMax.to(_this.$naviInner, .6, {
                        yPercent: 0, opacity: 1, display: 'block',
                        ease: _this.param.ease,
                        delay: 0.3
                    });
                    // TweenMax.staggerTo(this.$naviInner,.6,{
                    //     delay: .3,
                    //     xPercent:0,opacity:1,
                    //     ease: this.param.ease
                    // },.02);
                    _this.$trigger.classList.add("is-close");
                    _this.$header.classList.add("active");
                    //this.$body.classList.add('is-locked');
                }
            });

            //閉じるボタンクリック時
            this.$close.addEventListener("click", function () {
                _this.$header.classList.remove("active");
                _this.$trigger.classList.remove("is-close");
                TweenMax.to(_this.$navi, .6, {
                    opacity: 0, display: 'none'
                });
            });

            //黒背景クリック時
            this.$naviBg.addEventListener("click", function () {
                _this.$header.classList.remove("active");
                _this.$trigger.classList.remove("is-close");
                TweenMax.to(_this.$navi, .6, {
                    opacity: 0, display: 'none'
                });
            });

            // リンクをクリックした際
            for (var i in this.$link) {
                if (this.$link[i].nodeType != 1) continue; // dom要素以外は処理止める
                this.$link[i].addEventListener("click", function () {
                    _this.$trigger.classList.remove("is-close");
                    _this.$header.classList.remove("active");
                    TweenMax.to(_this.$navi, .6, {
                        opacity: 0, display: 'none'
                    });
                });
            }
        }
    }, {
        key: "open",
        value: function open(webgl) {
            var _this2 = this;

            this.status.mode = "open";

            webgl.cover.show(0.35);
            this.effect.show(this.$trigger.getElementsByClassName("js__sp-show"), "out");
            // TweenMax.set(this.$navi, {
            //     display:'block',
            // });
            setTimeout(function () {
                // webgl.top.hide();
                _this2.$header.classList.add("is-full");
                _this2.effect.show(_this2.$container.getElementsByClassName("js__op-show"), "show");
                _this2.$trigger.classList.add("is-close");
                _this2.$trigger.getElementsByClassName("text")[0].textContent = "CLOSE";
                _this2.effect.show(_this2.$trigger.getElementsByClassName("js__sp-show"), "show");
                setTimeout(function () {
                    return _this2.status.motFlg = false;
                }, 5e2);
            }, 8e2);
        }
    }, {
        key: "close",
        value: function close(webgl) {
            var _this3 = this;

            this.status.mode = "close";

            this.effect.show(this.$container.getElementsByClassName("js__op-show"), "out2");
            this.effect.show(this.$trigger.getElementsByClassName("js__sp-show"), "out2");
            setTimeout(function () {
                webgl.cover.out(1);
                _this3.$trigger.classList.remove("is-close");
                _this3.$trigger.getElementsByClassName("text")[0].textContent = "MENU";
                _this3.effect.show(_this3.$trigger.getElementsByClassName("js__sp-show"), "show");
                // webgl.top.status.active = true;
                setTimeout(function () {
                    // webgl.top.show(0.3);
                    // TweenMax.set(this.$navi, {
                    //     display:'none',
                    // });
                    _this3.$header.classList.remove("is-full");
                    _this3.status.motFlg = false;
                }, 5e2);
            }, 5e2);
        }
    }, {
        key: "searchOpen",
        value: function searchOpen() {
            var _this4 = this;

            this.status.searchmode = "open";
            this.$searchTrigger.classList.add('is-open');
            TweenMax.fromTo(this.$searchContent, 0.6, {
                opacity: 0,
                display: 'none'
            }, {
                opacity: 1,
                display: 'block',
                ease: "Power2.easeOut",
                onComplete: function onComplete() {
                    _this4.status.searchmotFlg = false;
                }
            });
        }
    }, {
        key: "searchClose",
        value: function searchClose() {
            var _this5 = this;

            this.status.searchmode = "close";
            this.$searchTrigger.classList.remove('is-open');
            TweenMax.to(this.$searchContent, 0.4, {
                opacity: 0,
                display: 'none',
                ease: "Power2.easeOut",
                onComplete: function onComplete() {
                    _this5.status.searchmotFlg = false;
                }
            });
        }
    }, {
        key: "resize",
        value: function resize(displayType, pageID, scInc) {

            if (displayType != this.status.displayType) {
                this.status.displayType = displayType;
                if (this.status.mode == "open" || this.status.displayType == "sp") {
                    this.close(this.webgl);
                } else if (this.status.displayType == "pc" && pageID !== "top" || this.status.displayType == "pc" && pageID == "top" && scInc > window.innerHeight / 10) {
                    this.effect.show(this.$container.getElementsByClassName("js__op-show"), "show");
                }
            }
        }
    }, {
        key: "render",
        value: function render(_y) {

            if (_y > window.innerHeight) {
                this.$header.classList.remove('is-white');
            } else {
                this.$header.classList.add('is-white');
            }
        }
    }]);

    return gnavi;
}();

exports.default = gnavi;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var swiper = function () {
    function swiper(param) {
        _classCallCheck(this, swiper);

        this.param = param;

        this.swiper;
        this.$target;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }

    _createClass(swiper, [{
        key: 'init',
        value: function init() {
            var _this = this;
            console.log('swiper');
            this.swiper = new Swiper('.swiper-container', {

                slidesPerView: 'auto', // 表示スライド数
                spaceBetween: 60, // スライド間の距離60px
                slidesPerGroup: 1, // 1つずつスライド
                direction: 'horizontal', // スライド方向
                loop: true, // ループ有効
                watchOverflow: true, // スライドの数が少ない時無効
                loopedSlides: 6, // ループ時複製するスライドの数

                // Navigation arrows
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },

                // Responsive breakpoints
                breakpoints: {
                    750: { // 750以下の時
                        slidesPerView: 'auto', // 表示スライド数
                        spaceBetween: 30, // スライド間の距離60px
                        slidesPerGroup: 1, // 1つずつスライド
                        centeredSlides: true // アクティブなスライドを中央に表示
                    }
                }

            });
            this.$target = document.querySelector('.solution-bg');

            this.swiper.on('slideNextTransitionStart', function () {
                var pos0 = _this.$target.querySelector('.pos0');
                var pos1 = _this.$target.querySelector('.pos1');
                var pos2 = _this.$target.querySelector('.pos2');
                var pos3 = _this.$target.querySelector('.pos3');

                this.w = window.innerWidth;
                this.h = window.innerHeight;

                if (this.w <= 750) {
                    TweenMax.to(pos0, .6, { bezier: { curviness: 1.5, values: [{ x: 0, y: -50 * 0.87 }, { x: -50 * 0.94, y: -44 * 0.87 }, { x: -87 * 0.94, y: -25 * 0.87 }, { x: -100 * 0.94, y: 0 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos0.classList.remove('pos0');pos0.classList.add('pos3');
                        }, onComplete: function onComplete() {
                            pos0.style.transform = '';
                        } });
                    TweenMax.to(pos1, .6, { bezier: { curviness: 1.5, values: [{ x: 100 * 0.94, y: 0 }, { x: 87 * 0.94, y: -25 * 0.87 }, { x: 50 * 0.94, y: -44 * 0.87 }, { x: 0, y: -50 * 0.87 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos1.classList.remove('pos1');pos1.classList.add('pos0');
                        }, onComplete: function onComplete() {
                            pos1.style.transform = '';
                        } });
                    TweenMax.to(pos2, .6, { bezier: { curviness: 1.5, values: [{ x: 0, y: 50 * 0.87 }, { x: 50 * 0.94, y: 44 * 0.87 }, { x: 87 * 0.94, y: 25 * 0.87 }, { x: 100 * 0.94, y: 0 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos2.classList.remove('pos2');pos2.classList.add('pos1');
                        }, onComplete: function onComplete() {
                            pos2.style.transform = '';
                        } });
                    TweenMax.to(pos3, .6, { bezier: { curviness: 1.5, values: [{ x: -100 * 0.94, y: 0 }, { x: -87 * 0.94, y: 25 * 0.87 }, { x: -50 * 0.94, y: 44 * 0.87 }, { x: 0, y: 50 * 0.87 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos3.classList.remove('pos3');pos3.classList.add('pos2');
                        }, onComplete: function onComplete() {
                            pos3.style.transform = '';
                        } });
                } else {
                    TweenMax.to(pos0, .6, { bezier: { curviness: 1.5, values: [{ x: -200 * 0.94, y: 0 }, { x: -173 * 0.94, y: 50 * 0.87 }, { x: -100 * 0.94, y: 87 * 0.87 }, { x: 0, y: 100 * 0.87 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos0.classList.remove('pos0');pos0.classList.add('pos3');
                        }, onComplete: function onComplete() {
                            pos0.style.transform = '';
                        } });
                    TweenMax.to(pos1, .6, { bezier: { curviness: 1.5, values: [{ x: 0, y: -100 * 0.87 }, { x: -100 * 0.94, y: -87 * 0.87 }, { x: -173 * 0.94, y: -50 * 0.87 }, { x: -200 * 0.94, y: 0 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos1.classList.remove('pos1');pos1.classList.add('pos0');
                        }, onComplete: function onComplete() {
                            pos1.style.transform = '';
                        } });
                    TweenMax.to(pos2, .6, { bezier: { curviness: 1.5, values: [{ x: 200 * 0.94, y: 0 }, { x: 173 * 0.94, y: -50 * 0.87 }, { x: 100 * 0.94, y: -87 * 0.87 }, { x: 0, y: -100 * 0.87 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos2.classList.remove('pos2');pos2.classList.add('pos1');
                        }, onComplete: function onComplete() {
                            pos2.style.transform = '';
                        } });
                    TweenMax.to(pos3, .6, { bezier: { curviness: 1.5, values: [{ x: 0, y: 100 * 0.87 }, { x: 100 * 0.94, y: 87 * 0.87 }, { x: 173 * 0.94, y: 50 * 0.87 }, { x: 200 * 0.94, y: 0 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos3.classList.remove('pos3');pos3.classList.add('pos2');
                        }, onComplete: function onComplete() {
                            pos3.style.transform = '';
                        } });
                }
            });
            this.swiper.on('slidePrevTransitionStart', function () {
                var pos0 = _this.$target.querySelector('.pos0');
                var pos1 = _this.$target.querySelector('.pos1');
                var pos2 = _this.$target.querySelector('.pos2');
                var pos3 = _this.$target.querySelector('.pos3');

                this.w = window.innerWidth;
                this.h = window.innerHeight;

                if (this.w <= 750) {
                    TweenMax.to(pos0, .6, { bezier: { curviness: 1.5, values: [{ x: 0, y: -50 * 0.87 }, { x: 50 * 0.94, y: -44 * 0.87 }, { x: 87 * 0.94, y: -25 * 0.87 }, { x: 100 * 0.94, y: 0 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos0.classList.remove('pos0');pos0.classList.add('pos1');
                        }, onComplete: function onComplete() {
                            pos0.style.transform = '';
                        } });
                    TweenMax.to(pos1, .6, { bezier: { curviness: 1.5, values: [{ x: 100 * 0.94, y: 0 }, { x: 87 * 0.94, y: 25 * 0.87 }, { x: 50 * 0.94, y: 44 * 0.87 }, { x: 0, y: 50 * 0.87 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos1.classList.remove('pos1');pos1.classList.add('pos2');
                        }, onComplete: function onComplete() {
                            pos1.style.transform = '';
                        } });
                    TweenMax.to(pos2, .6, { bezier: { curviness: 1.5, values: [{ x: 0, y: 50 * 0.87 }, { x: -50 * 0.94, y: 44 * 0.87 }, { x: -87 * 0.94, y: 25 * 0.87 }, { x: -100 * 0.94, y: 0 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos2.classList.remove('pos2');pos2.classList.add('pos3');
                        }, onComplete: function onComplete() {
                            pos2.style.transform = '';
                        } });
                    TweenMax.to(pos3, .6, { bezier: { curviness: 1.5, values: [{ x: -100 * 0.94, y: 0 }, { x: -87 * 0.94, y: -25 * 0.87 }, { x: -50 * 0.94, y: -44 * 0.87 }, { x: 0, y: -50 * 0.87 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos3.classList.remove('pos3');pos3.classList.add('pos0');
                        }, onComplete: function onComplete() {
                            pos3.style.transform = '';
                        } });
                } else {
                    TweenMax.to(pos0, .6, { bezier: { curviness: 1.5, values: [{ x: -200 * 0.94, y: 0 }, { x: -173 * 0.94, y: -50 * 0.87 }, { x: -100 * 0.94, y: -87 * 0.87 }, { x: 0, y: -100 * 0.87 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos0.classList.remove('pos0');pos0.classList.add('pos1');
                        }, onComplete: function onComplete() {
                            pos0.style.transform = '';
                        } });
                    TweenMax.to(pos1, .6, { bezier: { curviness: 1.5, values: [{ x: 0, y: -100 * 0.87 }, { x: 100 * 0.94, y: -87 * 0.87 }, { x: 173 * 0.94, y: -50 * 0.87 }, { x: 200 * 0.94, y: 0 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos1.classList.remove('pos1');pos1.classList.add('pos2');
                        }, onComplete: function onComplete() {
                            pos1.style.transform = '';
                        } });
                    TweenMax.to(pos2, .6, { bezier: { curviness: 1.5, values: [{ x: 200 * 0.94, y: 0 }, { x: 173 * 0.94, y: 50 * 0.87 }, { x: 100 * 0.94, y: 87 * 0.87 }, { x: 0, y: 100 * 0.87 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos2.classList.remove('pos2');pos2.classList.add('pos3');
                        }, onComplete: function onComplete() {
                            pos2.style.transform = '';
                        } });
                    TweenMax.to(pos3, .6, { bezier: { curviness: 1.5, values: [{ x: 0, y: 100 * 0.87 }, { x: -100 * 0.94, y: 87 * 0.87 }, { x: -173 * 0.94, y: 50 * 0.87 }, { x: -200 * 0.94, y: 0 }] /*bezier end*/ }, ease: _this.param.ease, onStart: function onStart() {
                            pos3.classList.remove('pos3');pos3.classList.add('pos0');
                        }, onComplete: function onComplete() {
                            pos3.style.transform = '';
                        } });
                }
            });

            this.swiper.on('slideChangeTransitionEnd', function () {
                console.log('slideChangeTransitionEnd');
                var pos0 = _this.$target.querySelector('.pos0');
                var pos1 = _this.$target.querySelector('.pos1');
                var pos2 = _this.$target.querySelector('.pos2');
                var pos3 = _this.$target.querySelector('.pos3');

                pos0.onclick = "";
                pos2.onclick = "";

                pos1.onclick = function () {
                    console.log('pos1 clicked');
                    _this.swiper.slidePrev();
                };
                pos3.onclick = function () {
                    _this.swiper.slideNext();
                };
            });
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.swiper.pagination.render();
            this.swiper.pagination.update();
        }
    }]);

    return swiper;
}();

exports.default = swiper;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);

        /* updateTimeRatio 用 */
        this.time;
        this.FPS_60_SEC = 1000 / 60;
    }

    _createClass(Util, [{
        key: "radian",
        value: function radian(degree) {
            return degree * Math.PI / 180;
        }

        // 角度に変換
        // -----------------------------------

    }, {
        key: "degree",
        value: function degree(radian) {
            return radian * 180 / Math.PI;
        }
    }, {
        key: "random",
        value: function random(min, max) {
            return Math.random() * (max - min) + min;
        }
    }, {
        key: "range",
        value: function range(val) {
            return this.random(-val, val);
        }

        // 値のマッピング
        // -----------------------------------
        // @num     : マッピングする値
        // @toMin   : 変換後の最小値
        // @toMax   : 変換後の最大値
        // @fromMin : 変換前の最小値
        // @fromMax : 変換前の最大値
        // -----------------------------------

    }, {
        key: "map",
        value: function map(num, toMin, toMax, fromMin, fromMax) {
            if (num <= fromMin) return toMin;
            if (num >= fromMax) return toMax;

            var p = (toMax - toMin) / (fromMax - fromMin);
            return (num - fromMin) * p + toMin;
        }

        // ランダムな数(int)
        // -----------------------------------
        // @min : 最小値(int)
        // @max : 最大値(int)
        // return : min(含む)からmax(含む)までのランダムな数(int)
        // -----------------------------------

    }, {
        key: "randomInt",
        value: function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // 1/@rangeの確率でtrueを取得
        // -----------------------------------
        // @range : 2以上の分母(int)
        // return : true or false(boolean)
        // -----------------------------------

    }, {
        key: "hit",
        value: function hit(range) {
            if (range < 2 || !range) {
                range = 2;
            }
            return this.randomInt(0, range - 1) == 0;
        }

        // fpsのタイムレートを算出

    }, {
        key: "updateTimeRatio",
        value: function updateTimeRatio() {
            var _lastTime = this.time;
            var _timeRatio = 1;
            if (_lastTime > 0) {
                var _dTime = new Date().getTime() - _lastTime;
                _timeRatio = _dTime / this.FPS_60_SEC;
            }
            this.time = new Date().getTime();

            return _timeRatio;
        }
    }]);

    return Util;
}();

exports.default = Util;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ua = navigator.userAgent.toLowerCase();

var modalManager = function () {
    function modalManager(table, param) {
        _classCallCheck(this, modalManager);

        this.$trigger01;
        this.$trigger02;
        this.$targetWrap;
        this.$target01;
        this.$target02;
        this.$back01;
        this.$back02;
        this.$bg;
        this.$header;

        this.status = {
            mode: "close",
            Inc: 0
        };

        this.table = table;
        this.param = param;
    }

    _createClass(modalManager, [{
        key: "init",
        value: function init() {
            var _this = this;

            this.$trigger01 = document.querySelectorAll(".modal-link");
            this.$trigger02 = document.querySelectorAll(".modal-link02");
            this.$targetWrap = document.querySelectorAll(".p-compare__modal");
            this.$target01 = document.getElementsByClassName(".modal");
            this.$target02 = document.getElementById("modal02");
            this.$back01 = document.getElementById("back01");
            this.$back02 = document.getElementById("back02");
            this.$bg = document.getElementById("modal-bg");
            this.$header = document.getElementById("l-header");

            for (var i in this.$trigger01) {
                if (this.$trigger01[i].nodeType != 1) continue; // dom要素以外は処理止める
                this.$trigger01[i].addEventListener("click", function () {
                    if (_this.status.mode === "close") {
                        _this.open01();
                        _this.status.mode = "open";
                        _this.$back01.addEventListener("click", function () {
                            _this.close();
                            _this.status.mode = "close";
                        });
                        _this.$bg.addEventListener("click", function () {
                            _this.close();
                            _this.status.mode = "close";
                        });
                    } else {
                        _this.close();
                        _this.status.mode = "close";
                    }
                    return false;
                });
            }

            for (var _i in this.$trigger02) {
                if (this.$trigger02[_i].nodeType != 1) continue; // dom要素以外は処理止める
                this.$trigger02[_i].addEventListener("click", function () {
                    if (_this.status.mode == "close") {
                        _this.open02();
                        _this.status.mode = "open";
                        _this.$back02.addEventListener("click", function () {
                            _this.close();
                            _this.status.mode = "close";
                        });
                        _this.$bg.addEventListener("click", function () {
                            _this.close();
                            _this.status.mode = "close";
                        });
                    } else {
                        _this.close();
                        _this.status.mode = "close";
                    }
                    return false;
                });
            }
        }
    }, {
        key: "resize",
        value: function resize() {}
    }, {
        key: "open01",
        value: function open01() {
            this.noScroll();
            if (ua.indexOf('iphone') > -1) {
                this.$target01.style.height = '70vh';
            }
            TweenMax.set(this.$targetWrap[0], {
                visibility: 'visible'
            });
            TweenMax.set(this.$target01, {
                opacity: 1
            });
            TweenMax.to([this.$back01, this.$bg], .5, {
                display: 'block',
                opacity: 1,
                ease: Power2.easeOut
            });
            this.$header.style.zIndex = '0';
        }
    }, {
        key: "open02",
        value: function open02() {
            this.noScroll();
            if (ua.indexOf('iphone') > -1) {
                this.$target02.style.height = '70vh';
            }
            TweenMax.set(this.$targetWrap[1], {
                visibility: 'visible'
            });
            TweenMax.set(this.$target02, {
                opacity: 1
            });
            TweenMax.to([this.$back02, this.$bg], .5, {
                display: 'block',
                opacity: 1,
                ease: Power2.easeOut
            });
            this.$header.style.zIndex = '0';
        }
    }, {
        key: "close",
        value: function close() {
            var _this2 = this;

            this.possiblescroll();
            TweenMax.to([this.$target01, this.$target02], .5, {
                opacity: 0,
                ease: Power2.easeOut
            });
            TweenMax.to([this.$back01, this.$back02, this.$bg], .5, {
                display: 'none',
                opacity: 0,
                ease: Power2.easeOut,
                onComplete: function onComplete() {
                    TweenMax.set([_this2.$targetWrap[0], _this2.$targetWrap[1]], {
                        visibility: 'hidden'
                    });
                }
            });
            this.$header.style.zIndex = '999';
        }
    }, {
        key: "noScroll",
        value: function noScroll() {

            if (this.param.displayType !== 'sp') return;

            this.status.Inc = 0;
            this.status.Inc = window.pageYOffset || document.documentElement.scrollTop;
            document.getElementById('top').classList.add('hidden');
            document.getElementById('l-scroll-body').style.transform = 'translateY(-' + this.status.Inc + 'px)';
        }
    }, {
        key: "possiblescroll",
        value: function possiblescroll() {

            if (this.param.displayType !== 'sp') return;

            document.getElementById('l-scroll-body').style.transform = '';
            document.getElementById('top').classList.remove('hidden');
            window.scrollTo(0, this.status.Inc);
            this.table.resize();
        }
    }, {
        key: "resize",
        value: function resize(_w, _h) {

            if (_w > 750) {
                TweenMax.set(this.$target01, {
                    css: {
                        left: (_w - this.$target01.clientWidth) / 2,
                        top: (_h - this.$target01.clientHeight) / 2
                    }
                });
                TweenMax.set(this.$target02, {
                    css: {
                        left: (_w - this.$target02.clientWidth) / 2,
                        top: (_h - this.$target02.clientHeight) / 2
                    }
                });
            } else {
                this.$target01.style.top = '';
                this.$target01.style.left = '';
                this.$target02.style.top = '';
                this.$target02.style.left = '';
            }
        }
    }]);

    return modalManager;
}();

exports.default = modalManager;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _param = require("../../param");

var _param2 = _interopRequireDefault(_param);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var param = new _param2.default();

/* ---------------------------------------

    -- 要素の表示、非表示を管理

--------------------------------------- */

var Contents = function () {
    function Contents() {
        _classCallCheck(this, Contents);

        this.$scrollDown = $("#c-scrolldown");
        this.$pageTop = $("#c-pagetop");

        this.$headNavi = $("#l-header-navi>ul");
        this.$headBtn = $("#l-header-btn");

        this.$footer = $("#l-footer");
        this.offset = {
            pagetop: {
                start: 0,
                end: 0
            },
            scrollDown: this.$footer.offset().top
        };

        this.status = {
            pagetop: false,
            scrollDown: true
        };

        this.h = 0;

        TweenMax.set(this.$pageTop, {
            x: 100
        });
    }

    _createClass(Contents, [{
        key: "update",
        value: function update(inc) {

            /* ---------------------------------------------
              -- [ ページトップの表示 ]
             --------------------------------------------- */
            if (this.offset.pagetop.start < inc && this.offset.pagetop.end > inc) {

                if (!this.status.pagetop) {
                    this.status.pagetop = true;
                    TweenMax.to(this.$pageTop, 0.48, {
                        x: 0
                    });
                }
            } else {
                if (this.status.pagetop) {
                    this.status.pagetop = false;
                    TweenMax.to(this.$pageTop, 0.48, {
                        x: 100
                    });
                }
            }
            /* ---------------------------------------------
              -- [ スクロールダウンの表示 ]
             --------------------------------------------- */

            if (this.offset.scrollDown < inc && param.displayType == "pc" || 10 < inc && param.displayType == "sp") {

                if (this.status.scrollDown) {
                    this.status.scrollDown = false;
                    TweenMax.to(this.$scrollDown, 0.48, {
                        x: param.displayType == "pc" ? -100 : -window.innerWidth
                    });
                }
            } else {
                if (!this.status.scrollDown) {
                    this.status.scrollDown = true;
                    TweenMax.to(this.$scrollDown, 0.48, {
                        x: 0
                    });
                }
            }

            // /* ---------------------------------------------
            //
            //  -- [ グローバルナビのボタンの表示 ]
            //
            // --------------------------------------------- */
            //
            // if( this.h < inc){
            //     if(param.displayType!=="pc") return;
            //     TweenMax.to(this.$headNavi,0.48,{
            //         y:-100
            //     });
            //     TweenMax.to(this.$headBtn,0.48,{
            //         y:0
            //     });
            // }else{
            //     if(param.displayType!=="pc") return;
            //     TweenMax.to(this.$headNavi,0.48,{
            //         y:0
            //     });
            //     TweenMax.to(this.$headBtn,0.48,{
            //         y:-100
            //     });
            // }
        }
    }, {
        key: "resize",
        value: function resize(winH) {
            this.h = winH;

            param.displayType = window.innerWidth > param.breakpoint ? "pc" : "sp";

            this.offset.scrollDown = this.$footer.offset().top - this.h;
            this.offset.pagetop = {
                start: this.h,
                end: this.offset.scrollDown
            };
            // this.offset.campaign = this.$campaignContainer[0] ? this.$campaignContainer.offset().top : '';
            // this.offset.gif0 = this.$gifContainer0[0] ? this.$gifContainer0.offset().top : '';
            // this.offset.gif1 = this.$gifContainer1[0] ? this.$gifContainer1.offset().top : '';
            // this.offset.gif1Height  = this.$gifContainer1[0] ? this.$gifContainer1.innerHeight(): '';
            //
            // for(let i=0; i<this.status.cssAniLEN; i++){
            //     this.offset.cssAni[i] = this.$cssAni.eq(i).offset().top;
            // }

        }
    }]);

    return Contents;
}();

exports.default = Contents;

},{"../../param":20}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* ---------------------------------------

    -- スクロール連動はここ

--------------------------------------- */
var Pararax = function () {
    function Pararax() {
        _classCallCheck(this, Pararax);

        this.$prarax = document.querySelectorAll('.js__psc');
        this.start = false; /* trueで処理が開始される */
        this.paraPoint = [];
        this.paraNum = this.$prarax.length;

        this.prevDir = ""; /* scrollManagerから引き継いだ方向を保存する */

        /*  ステータスをセット */
        this.status = [];

        for (var i = 0; this.paraNum > i; i++) {
            var $p = this.$prarax[i];

            this.status[i] = {
                rate: $p.dataset.rate,
                type: ""
            };

            if ($p.classList.contains("js__dir-y")) {
                this.status[i].type = "dir-y";
            } else if ($p.classList.contains("js__dir-y-minus")) {
                this.status[i].type = "dir-y-minus";
            } else if ($p.classList.contains("js__dir-x")) {
                this.status[i].type = "dir-x";
            } else if ($p.classList.contains("js__scale")) {
                this.status[i].type = "scale";
            } else if ($p.classList.contains("js__type-town")) {
                this.status[i].type = "type-town";
            } else if ($p.classList.contains("js__type-bike")) {
                this.status[i].type = "type-bike";
            } else if ($p.classList.contains("js__type-cloud")) {
                this.status[i].type = "type-cloud";
            } else {
                this.status[i].type = "dir-default";
            }
        }
    }

    _createClass(Pararax, [{
        key: "init",
        value: function init() {
            // console.log(this.$prarax)
            this.start = this.$prarax[0] ? true : false;
        }
    }, {
        key: "check",
        value: function check(inc, dir) {
            if (!this.start) return;
            // console.log('check', this.status);

            var _zInc = Math.sin(inc / 300) / 6;

            for (var i = 0; this.paraNum > i; i++) {
                if (this.paraPoint[i] === undefined) return;
                if (this.paraPoint[i].start < inc && this.paraPoint[i].end > inc) {
                    var $p = this.$prarax[i];

                    var pInc = (inc - this.paraPoint[i].base) * this.status[i].rate;
                    // console.log(inc, this.paraPoint[i].base);

                    switch (this.status[i].type) {
                        case "dir-y":
                            TweenMax.set(this.$prarax[i], {
                                "y": -pInc
                            });
                            break;
                        case "dir-y-minus":
                            TweenMax.set(this.$prarax[i], {
                                "y": pInc
                            });
                            break;
                        case "dir-x":
                            TweenMax.set(this.$prarax[i], {
                                "x": -pInc
                            });
                            break;
                        case "scale":
                            TweenMax.set(this.$prarax[i], {
                                "scale": 1 - pInc / 1000
                            });
                            break;
                        case "type-town":
                            // let _inc = pInc*Math.sin(pInc/20);
                            TweenMax.set(this.$prarax[i], {
                                "y": pInc
                                // "x":_inc
                            });
                            break;
                        case "type-bike":
                            // let _inc = pInc*Math.sin(pInc/20);
                            if (this.prevDir === "" || this.prevDir !== dir) {
                                this.$prarax.classList.remove("is-" + this.prevDir);
                                this.$prarax.classList.add("is-" + dir);
                            }
                            this.prevDir = dir;
                            TweenMax.set(this.$prarax[i], {
                                "y": pInc
                                // "x":_inc
                            });
                            break;
                        case "type-cloud":
                            TweenMax.set(this.$prarax[i], {
                                "y": -pInc * 2,
                                "z": _zInc
                                // "x":_inc
                            });
                            break;
                        default:
                            TweenMax.set(this.$prarax[i], {
                                "x": -pInc / 2
                            });
                            break;
                    }
                }
            }
        }
    }, {
        key: "resize",
        value: function resize(winH) {
            this.paraPoint = [];
            for (var i = 0; i < this.paraNum; i++) {

                var $p = this.$prarax[i];
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var offsetTop = $p.getBoundingClientRect().top + scrollTop;

                if (document.getElementsByTagName('body')[0].getAttribute("id") == "craftmanship") {
                    var offsetLeft = $p.getBoundingClientRect().left + scrollTop;
                    this.paraPoint[i] = {
                        base: offsetLeft,
                        start: offsetLeft - window.innerWidth * 1.5,
                        end: offsetLeft + window.innerWidth * 1.5
                        // console.log(this.paraPoint);
                    };
                } else {
                    this.paraPoint[i] = {
                        base: offsetTop,
                        start: offsetTop - winH * 1.5,
                        end: offsetTop + winH * 1.5
                    };
                }
            }
        }
    }]);

    return Pararax;
}();

exports.default = Pararax;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pararax = require('./pararax');

var _pararax2 = _interopRequireDefault(_pararax);

var _scrollanimation = require('./scrollanimation');

var _scrollanimation2 = _interopRequireDefault(_scrollanimation);

var _contents = require('./contents');

var _contents2 = _interopRequireDefault(_contents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pararax = void 0;
var scrollAnimation = void 0;
var contents = void 0;

var smoothScrollManager = function () {
    function smoothScrollManager(param) {
        _classCallCheck(this, smoothScrollManager);

        pararax = new _pararax2.default();
        //this.animation = Useragnt.ie ? false : new ScrollAnimation(param);
        this.animation = new _scrollanimation2.default(param);
        // contents = new Contents();

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.fpsRate;
        this.pageID;

        this.$bodyTag;
        this.$root;
        this.$container;
        this.$body;

        this.inc = 0;
        this.nowInc = 0;
        this.prevInc = 0;
        this.dir = "next";

        this.paraPoint = [];

        this.type = "normal";

        this.inertia = param.browserType === 'ie' || Useragnt.safari || Useragnt.mobile || Useragnt.tablet ? false : true; /* 慣性スクロールを有効にするか */

        /* 状態監視用のフラグ */
        this.status = {
            comp: false, /* 慣性スクロールが完了したか */
            deviceSize: ""
        };
    }

    _createClass(smoothScrollManager, [{
        key: 'init',
        value: function init(pageID) {

            this.pageID = pageID;
            this.$bodyTag = document.getElementsByTagName('body');
            this.$root = document.getElementById("l-root");
            this.$container = document.getElementById("l-scroll");
            this.$body = document.getElementById("l-scroll-body");

            this.inc = 0;
            this.nowInc = 0;
            this.prevInc = 0;
            this.dir = "next";

            pararax.init();
            if (!this.inertia) this.$bodyTag[0].classList.add('is-inertia-none');
            // setTimeout(()=>{
            //     this.to(1);
            // }, 1e3);
            // this.to(1);

            if (this.animation) this.animation.init(pageID);

            // document.getElementById('l-pagetop').addEventListener("click", () => {
            //     this.smooth(this.$target);
            // });


            // $("#l-pagetop,#l-footer-pagetop").on("click",function(){
            //     $('html,body').animate({ scrollTop: 0 }, '1');
            // });
        }
    }, {
        key: 'to',
        value: function to(inc) {
            var _this = this;

            console.log("test");
            TweenLite.to(window, 0.001, { scrollTo: inc, onComplete: function onComplete() {
                    _this.status.off = false;
                } });
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.to(0);
            this.update(0, "prev");
            this.nowInc = 0;
            this.trans();
        }
    }, {
        key: 'update',
        value: function update(inc, dir) {
            /* スクロール方向を決めうちしないならdirは空で渡してください */
            this.inc = inc;
            this.dir = dir === "" ? this.inc > this.prevInc ? "next" : "prev" : dir;
            // this.prevInc = this.inc;
            this.mode = "scroll";
            this.status.comp = false;
        }
    }, {
        key: 'move',
        value: function move(fpsRate) {

            // if(this.status.comp||inc==undefined) return;
            if (this.inc == undefined || this.status.comp) return;

            if (Math.abs(this.inc - this.nowInc) > 50) {
                //スクロール位置の差が50px以上の時に分岐
                // 1/60秒ごとに30%ずつ実際のスクロール位置に近づいていく y=0.7^t
                var add = 0.1;
                this.nowInc += add * (this.inc - this.nowInc) * fpsRate;
            } else {
                // 1/60秒ごとに10%ずつ実際のスクロール位置に近づいていく y=0.9^t
                var _add = 0.1;
                this.nowInc += _add * (this.inc - this.nowInc) * fpsRate;
            }

            this.trans();
        }
    }, {
        key: 'trans',
        value: function trans() {

            if (this.inertia) {
                this.$body.style.transform = 'translateY(-' + this.nowInc + 'px)';
            }
            /* スクロール連動で動作 */
            pararax.check(this.nowInc, this.dir);
            if (this.animation) this.animation.check(this.nowInc);
            if (this.prevInc > this.nowInc - 0.1 && this.dir == "next" || this.prevInc < this.nowInc + 0.1 && this.dir == "prev") {
                this.onComplete();
            }
            this.prevInc = this.nowInc;
        }
    }, {
        key: 'resize',
        value: function resize(w, h) {
            this.w = w;
            this.h = h;

            if (this.w > 750) {
                if (this.pageID == "craftmanship") {
                    TweenMax.set(this.$root, { "height": this.$body.clientWidth + window.innerHeight - window.innerWidth });
                } else {
                    TweenMax.set(this.$root, { "height": this.$body.clientHeight });
                }
            } else {
                TweenMax.set(this.$root, { "height": "auto" });
            }

            pararax.resize(this.h);
            if (this.animation) this.animation.resize(this.h);
            // contents.resize(this.h);
        }

        /* -------------------------------------------
           -- Callback
         ------------------------------------------- */

    }, {
        key: 'onComplete',
        value: function onComplete() {
            /* スクロール動作が終わったら */
            this.status.comp = true;
            // this.nowInc = this.inc;
            // this.move(this.fpsRate)
        }

        /* -------------------------------------------
           -- ステータスいじいじするやつ
         ------------------------------------------- */

    }, {
        key: 'datGUI',
        value: function datGUI() {}
    }]);

    return smoothScrollManager;
}();

exports.default = smoothScrollManager;

},{"./contents":9,"./pararax":10,"./scrollanimation":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _effect = require("../effect");

var _effect2 = _interopRequireDefault(_effect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var effect = void 0;

/* ---------------------------------------

    -- スクロール位置で発火するやつはここ

--------------------------------------- */

var ScrollAnimationCraftmanship = function () {
    function ScrollAnimationCraftmanship(param) {
        _classCallCheck(this, ScrollAnimationCraftmanship);

        effect = new _effect2.default(param);

        this.$container;
        this.$target;
        this.scPoint = [];
        this.scNum;
        this.scFlag = [];
        this.pageID;
        this.$lowlayerKv;

        this.status = {
            init: false,
            comp: false /* 全部処理が終わったか */
        };

        this.conf = {
            page: ["top", "stance"] /* 対象のページを記入 */
        };

        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }

    _createClass(ScrollAnimationCraftmanship, [{
        key: "init",
        value: function init(pageID) {
            var _this = this;
            this.pageID = pageID;
            this.status.init = true;
            this.scPoint = [];
            this.scNumStart = 0;
            this.$container = document.getElementById(pageID);
            this.$target = this.$container.querySelectorAll('.js__tsc');
            this.scNum = this.$target.length;
            this.$lowlayerKv = document.getElementById('l-lowlayer-kv');

            effect.textAnimation(this.$container.querySelectorAll('.js__tsc-title'), "set");

            var _$square = this.$container.querySelectorAll('.js__square-object');
            for (var n in _$square) {
                if (_$square[n].nodeType != 1) continue; // dom要素以外は処理止める
                effect.square(_$square[n], "set");
            }

            var _$slideUp = this.$container.querySelectorAll('.js__slideup');
            for (var _n in _$slideUp) {
                if (_$slideUp[_n].nodeType != 1) continue; // dom要素以外は処理止める
                effect.slideUp(_$slideUp[_n], "set");
            }

            var _$slideRightChain = this.$container.querySelectorAll('.js__slide-right-chain');
            for (var _n2 in _$slideRightChain) {
                if (_$slideRightChain[_n2].nodeType != 1) continue; // dom要素以外は処理止める
                effect.slideRightChain(_$slideRightChain[_n2], "set");
            }

            var _$slideRightChainText = this.$container.querySelectorAll('.js__slide-right-chain-text');
            for (var _n3 in _$slideRightChainText) {
                if (_$slideRightChainText[_n3].nodeType != 1) continue; // dom要素以外は処理止める
                effect.slideRightChain(_$slideRightChainText[_n3], "set");
            }

            var _$slideRightChainSlow = this.$container.querySelectorAll('.js__slide-right-chain-slow');
            for (var _n4 in _$slideRightChainSlow) {
                if (_$slideRightChainSlow[_n4].nodeType != 1) continue; // dom要素以外は処理止める
                effect.slideRightChain(_$slideRightChainSlow[_n4], "set");
            }

            var _$headlineTitle = this.$container.querySelectorAll('.js__headline-title');
            for (var _n5 in _$headlineTitle) {
                if (_$headlineTitle[_n5].nodeType != 1) continue; // dom要素以外は処理止める
                effect.headlineTitle(_$headlineTitle[_n5], "set");
            }

            var _$topSolution = this.$container.querySelectorAll('.js__top-solution');
            for (var _n6 in _$topSolution) {
                if (_$topSolution[_n6].nodeType != 1) continue; // dom要素以外は処理止める
                effect.topSolution(_$topSolution[_n6], "set");
            }

            var _$solutionSolution = this.$container.querySelectorAll('.js__solution-solution');
            for (var _n7 in _$solutionSolution) {
                if (_$solutionSolution[_n7].nodeType != 1) continue; // dom要素以外は処理止める
                effect.solutionSolution(_$solutionSolution[_n7], "set");
            }

            var _$lineIcon = this.$container.querySelectorAll('.js__line-icon');
            for (var _n8 in _$lineIcon) {
                if (_$lineIcon[_n8].nodeType != 1) continue; // dom要素以外は処理止める
                effect.lineIcon(_$lineIcon[_n8], "set");
            }

            var _$slanting = this.$container.querySelectorAll('.js__slanting');
            for (var _n9 in _$slanting) {
                if (_$slanting[_n9].nodeType != 1) continue; // dom要素以外は処理止める
                effect.slanting(_$slanting[_n9], "set");
            }

            effect.showSimple(this.$container.querySelectorAll('.js__tsc-show'), "set");
            this.resize(this.h, 1);

            if (this.$target) {
                var _minusPoint = void 0;
                // if(this.pageID == 'mission'){
                //     _minusPoint = this.h * 0.5 - 200;
                // }else{
                _minusPoint = this.h * 0.7;
                // }
                this.scPoint = [];
                for (var i = this.scNumStart; i < this.scNum; i++) {

                    var $scp = this.$target[i],
                        rect = void 0,
                        scrH = void 0;
                    if (window.innerWidth > 750 && this.pageID == 'craftmanship') {
                        rect = $scp.getBoundingClientRect().left;
                        scrH = window.pageXOffset;
                    } else {
                        rect = $scp.getBoundingClientRect().top;
                        scrH = window.pageYOffset;
                    }

                    //console.log(rect.top , scrInit , _minusPoint)

                    // this.scPoint[i] : targetごとのアニメーション発火点（スクロール位置）
                    // rect.top : targetのページ最上部からの距離
                    // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
                    // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
                    this.scPoint[i] = rect + scrH - _minusPoint;
                }
            }

            if (this.$lowlayerKv) {
                this.status.init = false;
                var _$split = this.$lowlayerKv.querySelector('.js__tsc-title');
                if (_$split) effect.textAnimation(_$split, "show", null, function () {
                    setTimeout(function () {
                        _this.status.init = true;
                        _this.check(0);
                    }, 800);
                });
            }
        }
    }, {
        key: "check",
        value: function check(inc) {

            if (!this.status.init) return;

            if (this.$target[0]) {
                for (var i = 0; this.scNum > i; i++) {

                    if (this.scPoint[i] < inc && !this.scFlag[i]) {

                        var $scp = this.$target[i];
                        if (!$scp.classList.contains("is-show")) {
                            $scp.classList.add("is-show");
                            this.scFlag[i] = true;

                            this.show($scp);

                            if (i == this.$target.length - 1) this.status.comp = true;
                        }
                    }
                }
            }
        }
    }, {
        key: "show",
        value: function show($scp) {

            var _$split = $scp.querySelectorAll('.js__tsc-title');
            if (_$split) effect.textAnimation(_$split, "show");

            var _$square = $scp.querySelectorAll('.js__square-object');
            if (_$square) effect.square(_$square, "show");

            var _$slideUp = $scp.querySelectorAll('.js__slideup');
            if (_$slideUp.length) effect.slideUp(_$slideUp, "show");

            var _$slideRightChain = $scp.querySelectorAll('.js__slide-right-chain');
            if (_$slideRightChain.length) effect.slideRightChain(_$slideRightChain, "show");

            var _$slideRightChainText = $scp.querySelectorAll('.js__slide-right-chain-text');
            if (_$slideRightChainText.length) effect.slideRightChain(_$slideRightChainText, "show");

            var _$slideRightChainSlow = $scp.querySelectorAll('.js__slide-right-chain-slow');
            if (_$slideRightChainSlow.length) effect.slideRightChain(_$slideRightChainSlow, "show", 0.3, 0.2, 3.3);

            var _$headlineTitle = $scp.querySelector('.js__headline-title');
            if (_$headlineTitle) effect.headlineTitle(_$headlineTitle, "show");

            var _$topSolution = $scp.querySelector('.js__top-solution');
            if (_$topSolution) effect.topSolution(_$topSolution, "show");

            var _$solutionSolution = $scp.querySelector('.js__solution-solution');
            if (_$solutionSolution) effect.solutionSolution(_$solutionSolution, "show");

            var _$lineIcon = $scp.querySelector('.js__line-icon');
            if (_$lineIcon) effect.lineIcon(_$lineIcon, "show");

            var _$slanting = $scp.querySelectorAll('.js__slanting');
            if (_$slanting) effect.slanting(_$slanting, "show");
        }
    }, {
        key: "resize",
        value: function resize(winH) {
            var scrInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            if (!this.status.init) return;

            if (this.$target) {
                var _minusPoint = void 0;
                // if(this.pageID == 'mission'){
                //     _minusPoint = winH * 0.5 - 200;
                // }else{
                _minusPoint = winH * 0.7;
                // }
                this.scPoint = [];
                for (var i = this.scNumStart; i < this.scNum; i++) {

                    var $scp = this.$target[i],
                        rect = void 0,
                        scrH = void 0;
                    if (window.innerWidth > 750 && this.pageID == 'craftmanship') {
                        rect = $scp.getBoundingClientRect().left;
                        scrH = window.pageXOffset;
                    } else {
                        rect = $scp.getBoundingClientRect().top;
                        scrH = window.pageYOffset;
                    }

                    //console.log(rect.top , scrInit , _minusPoint)

                    // this.scPoint[i] : targetごとのアニメーション発火点（スクロール位置）
                    // rect.top : targetのページ最上部からの距離
                    // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
                    // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
                    this.scPoint[i] = rect + scrH - _minusPoint;
                }
            }
        }
    }]);

    return ScrollAnimationCraftmanship;
}();

exports.default = ScrollAnimationCraftmanship;

},{"../effect":4}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _effect = require('../effect');

var _effect2 = _interopRequireDefault(_effect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tabManager = function () {
    function tabManager() {
        _classCallCheck(this, tabManager);

        /* 必要なDOM */
        this.trigger = document.querySelectorAll('.js__tab');
        this.triggerLinkBtn = document.querySelectorAll('.l-footer-entry-link a')[1];
        console.log(this.triggerLinkBtn);
        this.content = document.querySelectorAll('.js__tab__content');

        this.param = this.target = 0;

        TweenMax.set(this.content[0], {
            display: 'block',
            opacity: 1
        });

        this.effect = new _effect2.default(this.param);
    }

    _createClass(tabManager, [{
        key: 'init',
        value: function init() {

            var _this = this;
            var _length = this.trigger.length;
            for (var i = 0; i < _length; i++) {
                (function (arg) {
                    if ('#' + _this.content[i].id == location.hash) {
                        _this.target = arg;
                        _this.active();
                        TweenMax.set(_this.content[_this.target], {
                            display: 'block',
                            opacity: 1
                        });
                    }
                    _this.trigger[i].addEventListener('click', function () {
                        _this.target = arg;
                        _this.change();
                        _this.active();
                        // this.effect.slideUp(this.$targetSlide, "show");
                    }, false);
                })(i);
            }

            window.addEventListener("hashchange", function () {
                console.log('yeah');
                var _length = _this.trigger.length;
                for (var i = 0; i < _length; i++) {
                    (function (arg) {
                        if ('#' + _this.content[i].id == location.hash) {
                            _this.target = arg;
                            _this.change();
                            _this.active();
                        }
                    })(i);
                }
            }, false);

            this.triggerLinkBtn.addEventListener("click", function () {
                console.log("haitta");
                var _length = _this.trigger.length;
                for (var i = 0; i < _length; i++) {
                    (function (arg) {
                        if ('#' + _this.content[i].id == location.hash) {
                            _this.target = arg;
                            _this.change();
                            _this.active();
                            TweenMax.to(window, 1, {
                                scrollTo: {
                                    y: 0,
                                    autoKill: false
                                },
                                ease: Power2.easeOut
                            });
                        }
                    })(i);
                }
            });
        }
    }, {
        key: 'change',
        value: function change() {

            var _this = this;

            TweenMax.to(this.content, 0.3, {
                alpha: 0,
                ease: Power2.easeOut,
                onComplete: function onComplete() {
                    TweenMax.set(_this.content, {
                        display: 'none'
                    });
                    TweenMax.set(_this.content[_this.target], {
                        display: 'block',
                        onComplete: function onComplete() {
                            TweenMax.to(_this.content, 0.3, {
                                alpha: 1,
                                ease: Power2.easeIn,
                                onComplete: function onComplete() {
                                    window.dispatchEvent(new Event('resize')); //スムーススクロールのl-rootの高さ再取得のためリサイズイベントを走らせる
                                }
                            });
                        }
                    });
                }
            });
        }
    }, {
        key: 'active',
        value: function active() {
            TweenMax.set(this.trigger, { className: "-=is-active" });
            TweenMax.set(this.trigger[this.target], { className: "+=is-active" });
        }
    }]);

    return tabManager;
}();

exports.default = tabManager;

},{"../effect":4}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tableManager = function () {
    function tableManager(param) {
        _classCallCheck(this, tableManager);

        this.$tableWrap;
        this.$tableFixed;
        this.$tableHead;
        this.tableHeadScr;
        this.$tableContent;
        this.tableContentScr;

        this.status = {};

        this.param = param;
    }

    _createClass(tableManager, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var scrOption = {
                minScrollbarLength: 50, //min height
                maxScrollbarLength: 50, //max height
                suppressScrollY: true,
                swipeEasing: true,
                wheelSpeed: 1
            };

            this.$tableWrap = document.querySelector('.p-compare__section__table__contents');
            this.$tableFixed = document.getElementById('table-wrap__series-fixed');
            this.$tableHead = document.querySelector('#table-wrap__series .series');
            if (this.param.userAgent === 'sp' || this.param.userAgent === 'tablet') {
                this.tableHeadScr = new PerfectScrollbar(this.$tableHead, scrOption);
            }
            this.$tableContent = document.querySelector('.table-wrap .contents');
            this.tableContentScr = new PerfectScrollbar(this.$tableContent, scrOption);

            this.status = {
                tablePosi: {
                    x: 0,
                    y: 0,
                    end: 0
                }

                // 片方スクロールした時にもう片方もスクロールさせる
            };this.$tableHead.addEventListener('scroll', function (e) {
                //this.$tableContent.scrollLeft = this.$tableHead.scrollLeft;
                TweenLite.set(_this.$tableContent, { scrollTo: { x: _this.$tableHead.scrollLeft, autoKill: true } });
            });
            this.$tableContent.addEventListener('scroll', function (e) {
                //this.$tableHead.scrollLeft = this.$tableContent.scrollLeft;
                TweenLite.set(_this.$tableHead, { scrollTo: { x: _this.$tableContent.scrollLeft, autoKill: true } });
            });

            TweenMax.set(document.querySelectorAll('.is-current'), {
                x: 0,
                display: 'block'
            });

            this.resize();
        }
    }, {
        key: 'scroll',
        value: function scroll(_y) {

            if (_y > this.status.tablePosi.y) {
                if (_y > this.status.tablePosi.end) {
                    this.$tableFixed.classList.remove('is-fixed');
                } else {
                    this.$tableFixed.classList.add('is-fixed');
                }
            } else {
                this.$tableFixed.classList.remove('is-fixed');
            }
        }
    }, {
        key: 'resize',
        value: function resize() {

            //tableの位置取得
            var _tablePosi = this.$tableWrap.getBoundingClientRect();
            // x軸
            this.status.tablePosi.x = _tablePosi.left;
            TweenMax.set(this.$tableFixed, {
                css: {
                    left: this.status.tablePosi.x
                }
            });
            // y軸
            var _y = window.pageYOffset || document.documentElement.scrollTop;
            this.status.tablePosi.y = _y + _tablePosi.top;

            // y軸終わり
            this.status.tablePosi.end = this.status.tablePosi.y + this.$tableContent.clientHeight + 50;

            //タイトル部分のリサイズ
            document.getElementById('table-wrap__series').style.height = this.$tableFixed.clientHeight + "px";
            var findTr = document.querySelectorAll('#table-name tr');
            var findTr02 = document.querySelectorAll('#table-contents tr');

            for (var i = 0; i < findTr.length; i++) {
                if (findTr[i].clientHeight <= findTr02[i].clientHeight) {
                    findTr[i].style.height = findTr02[i].clientHeight + "px";
                } else {
                    findTr02[i].style.height = findTr[i].clientHeight + "px";
                }
            }
        }
    }]);

    return tableManager;
}();

exports.default = tableManager;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var solutionManager = function () {
    function solutionManager(effect, param) {
        _classCallCheck(this, solutionManager);

        this.effect = effect;
        this.param = param;
        // this.$;
        this.$map;
        this.zoom;
        this.iconSize = {};
    }

    _createClass(solutionManager, [{
        key: "init",
        value: function init() {
            var _this = this;

            if (window.innerWidth < 750) {
                this.zoom = 16;
                this.iconSize.x = 31.5;
                this.iconSize.y = 49;
                this.iconSize.anchorX = 15.75;
                this.iconSize.anchorY = 42;
            } else {
                this.zoom = 17;
                this.iconSize.x = 42;
                this.iconSize.y = 66;
                this.iconSize.anchorX = 21;
                this.iconSize.anchorY = 60;
            }
            this.$map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
                center: { // 地図の中心を指定
                    lat: 35.326299, // 緯度
                    lng: 139.360875 // 経度
                },
                zoom: _this.zoom, // 地図のズームを指定
                disableDefaultUI: true,
                styles: [{
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "hue": "#0080ff"
                    }, {
                        "saturation": "-100"
                    }]
                }, {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "hue": "#0080ff"
                    }, {
                        "saturation": "24"
                    }, {
                        "lightness": "4"
                    }]
                }, {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "hue": "#0066ff"
                    }]
                }, {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "hue": "#0080ff"
                    }, {
                        "saturation": "32"
                    }, {
                        "lightness": "28"
                    }]
                }, {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "off"
                    }, {
                        "saturation": "0"
                    }]
                }, {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "hue": "#0066ff"
                    }, {
                        "saturation": "32"
                    }, {
                        "lightness": "-8"
                    }]
                }, {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "hue": "#0066ff"
                    }, {
                        "lightness": "-8"
                    }, {
                        "saturation": "8"
                    }]
                }]
            });

            var myLatlng = new google.maps.LatLng(35.326299, 139.360875);
            console.log(_this.iconSize);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: this.$map,
                title: "日本エアフィルター",
                icon: {
                    url: "../assets/img/about/b-access_pointaicon.png",
                    size: new google.maps.Size(63, 98),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(_this.iconSize.anchorX, _this.iconSize.anchorY),
                    scaledSize: new google.maps.Size(_this.iconSize.x, _this.iconSize.y)
                }
            });
        }
    }, {
        key: "render",
        value: function render(mouse, scrollInc) {}
    }, {
        key: "resize",
        value: function resize(w, h) {}
    }]);

    return solutionManager;
}();

exports.default = solutionManager;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import effectManager from '../module/effect';

// let effect;

var craftmanshipManager = function () {
    function craftmanshipManager(effect, param, util, scroll) {
        _classCallCheck(this, craftmanshipManager);

        // effect = new effectManager(param);

        this.effect = effect;
        this.param = param;
        this.util = util;
        this.scr = scroll;

        this.winW;
        this.winH;
        this.scrH = 0;
        this.$body;
        this.$content;

        this.$header;
        this.$loader;
        this.$loaderImage;
        this.$footerPagetop;
        this.$pagetop;

        this.$scrollIndicator;
        this.$scrollBtn;
        this.$pagetopBtn;

        this.$headLogo;
        this.$headMenu;
        this.$sideNavi;
        this.$scrollText;

        this.status = {
            scr: {
                inc: 0
            }
        };

        this.sectionOffset = [];

        // this.$loaderNow = document.getElementById('c-loader__now');
        // this.$loaderMax = document.getElementById('c-loader__max');
        // this.$loaderLineA = document.getElementById('c-loader__line-a');
        // this.$loaderLineB = document.getElementById('c-loader__line-b');
    }

    _createClass(craftmanshipManager, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.$body = document.getElementById('l-body');
            this.$content = document.getElementById('p-craftmanship-content__inner');
            this.$header = document.getElementById('l-header');
            this.$scrollIndicator = document.getElementById('p-craftmanship__scroll-indicator__active');
            this.$scrollBtn = document.getElementById('p-craftmanship__scroll');
            this.$pagetopBtn = document.getElementById('p-craftmanship__pagetop');
            this.$loader = document.getElementById('p-loader');
            this.$loaderImage = document.getElementById('p-loader-image');
            this.$pagetop = document.getElementById("l-pagetop");
            this.$footerPagetop = document.getElementById("l-footer-pagetop");

            this.resize(window.innerWidth, window.innerHeight);

            this.$pagetopBtn.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();

                // スクロールする
                TweenLite.to(window, 0.5, { scrollTo: 0 });
            });

            if (this.$loader) {
                TweenMax.to(this.$loaderImage, .4, {
                    delay: 1.5,
                    opacity: 0,
                    ease: this.param.ease,
                    onComplete: function onComplete() {
                        TweenMax.to(_this.$loader, 2, {
                            left: '100%',
                            //opacity:0,
                            ease: _this.param.ease,
                            display: 'none',
                            onStart: function onStart() {
                                _this.wind();
                            },
                            onComplete: function onComplete() {
                                //_this.loading('stop');
                                var _$slideRightChain = document.querySelectorAll('.js__tsc-kv .js__slide-right-chain');
                                if (_$slideRightChain.length) _this.effect.slideRightChain(_$slideRightChain, "show", 0.1, 0.5);
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: 'wind',
        value: function wind() {
            var _this = this;

            window.requestAnimFrame = function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame; //    ||
                // function(callback){
                //     window.setTimeout(callback, 1000 / 60);
                // };
            }();

            var ParticleController = function ParticleController() {
                this.density = 17;
                this.densityPc = 17;
                this.densitySp = 8;
                this.phiMultiple = 0.57;
                this.amplitude = 88;
                this.widthMultiple = 0.6;
                this.speedMultiple = 2.8;
                this.frequency = .0029;
                this.lineMaxHeight = 8;
                this.lineMinHeight = 1;
                this.scaleSpeedMultiple = 1;
                this.speedMax = 15;
                this.speedMin = 2;
                this.opacity = .2;
            };
            var particleController = new ParticleController();
            var gui = new dat.GUI();
            gui.add(particleController, 'densityPc', 1, 100).step(1);
            gui.add(particleController, 'densitySp', 1, 100).step(1);
            gui.add(particleController, 'phiMultiple', 0.1, 5);
            gui.add(particleController, 'amplitude', 1, 100);
            gui.add(particleController, 'widthMultiple', 0.1, 3);
            gui.add(particleController, 'speedMultiple', 0, 3);
            gui.add(particleController, 'frequency', 0.001, 0.1);
            gui.add(particleController, 'lineMaxHeight', 1, 120).step(1);
            gui.add(particleController, 'lineMinHeight', 1, 20).step(1);
            gui.add(particleController, 'scaleSpeedMultiple', 0.1, 10);
            gui.add(particleController, 'speedMax', 1, 80).step(1);
            gui.add(particleController, 'speedMin', 1, 20).step(1);
            gui.add(particleController, 'opacity', 0, 1);
            console.log(gui);

            var canvas = document.querySelector('#canvas-container');
            var ctx = canvas.getContext('2d');

            var cw = canvas.width = 400;
            var ch = canvas.height = 250;
            var cx = cw / 2,
                cy = ch / 2;
            var rad = Math.PI / 180;
            var w = 400;
            var h = 50;
            var amplitude = h;
            //var frequency = .01;
            var phi = 0;
            // var phiMultiple = 3;
            var frames = 0;
            var stopped = true;
            //ctx.strokeStyle = "Cornsilk";


            var Particle = function Particle(scale, color, speed) {
                this.scale = scale; //大きさ
                // this.speed = 5 + particleController.scaleSpeedMultiple * particleController.lineMaxHeight / scale; //速度
                this.speed = speed;
                this.position = { // 位置
                    x: 100,
                    y: 100
                };
            };

            Particle.prototype.draw = function () {
                ctx.beginPath();

                var phiMultiple = 2 * this.scale / 60;
                var phi = frames / 60 * particleController.phiMultiple;
                //amplitude = h + this.scale * 0.2;
                ctx.moveTo(this.position.x, Math.sin(this.position.x * particleController.frequency + phi) * particleController.amplitude / 2 + particleController.amplitude / 2 + this.position.y + this.scale / 2); // 40 = offset
                var w = (400 + this.scale * 2) * particleController.widthMultiple;
                for (var x = this.position.x; x < this.position.x + w; x++) {
                    var y = Math.sin(x * particleController.frequency + phi) * particleController.amplitude / 2 + particleController.amplitude / 2 + this.position.y + this.scale / 2;
                    //y = Math.cos(x * particleController.frequency + phi) * amplitude / 2 + amplitude / 2;
                    ctx.lineTo(x, y); // 40 = offset
                }
                for (var x2 = this.position.x + w; x2 > this.position.x; x2--) {
                    var _y = Math.sin(x2 * particleController.frequency + phi) * particleController.amplitude / 2 + particleController.amplitude / 2 + this.position.y - this.scale / 2;
                    //y = Math.cos(x * particleController.frequency + phi) * amplitude / 2 + amplitude / 2;
                    ctx.lineTo(x2, _y); // 40 = offset
                }
                ctx.closePath();

                // ctx.lineWidth = this.scale;
                var g = ctx.createLinearGradient(this.position.x, 0, this.position.x + w, 0);
                g.addColorStop(0, 'rgba(' + 0xf3 + ',' + 0xf3 + ',' + 0xff + ',0'); // opaque
                // g.addColorStop(1, `rgba(${0xf3},${0xf3},${0xff},${1 - this.scale/100}`); // transparent
                g.addColorStop(1, 'rgba(' + 0xf3 + ',' + 0xf3 + ',' + 0xff + ',' + 1 * particleController.opacity); // transparent
                ctx.fillStyle = g;
                ctx.fill();
                // ctx.lineWidth = 1;
                // ctx.stroke();
            };

            // var density = 6;  //パーティクルの密度
            var particles = []; //パーティクルをまとめる配列


            function canvas_resize() {
                var windowInnerWidth = window.innerWidth;
                var windowInnerHeight = window.innerHeight;

                canvas.setAttribute('width', windowInnerWidth);
                canvas.setAttribute('height', windowInnerHeight);

                if (windowInnerWidth <= 750) {
                    particleController.density = particleController.densitySp;
                } else {
                    particleController.density = particleController.densityPc;
                }

                particles = [];
                // for (var i=0; i<particleController.density; i++) {
                for (var i = 0; i < 100; i++) {
                    // var scale = ~~(Math.pow(Math.random()*(8-2)+2, 2));
                    var scale = ~~(Math.random() * (particleController.lineMaxHeight - particleController.lineMinHeight) + particleController.lineMinHeight);
                    var speed = ~~(Math.random() * (particleController.speedMax - particleController.speedMin) + particleController.speedMin);
                    particles[i] = new Particle(scale, scale / 2, speed);
                    particles[i].position.x = -800 - Math.random() * canvas.width;
                    particles[i].position.y = Math.random() * canvas.height;
                    particles[i].draw();
                }
            }

            window.addEventListener('resize', canvas_resize, false);

            canvas_resize();

            loop();

            function loop() {
                frames++;
                requestAnimFrame(loop);
                // 描画をクリアー
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                var windowInnerWidth = window.innerWidth;
                if (windowInnerWidth <= 750) {
                    particleController.density = particleController.densitySp;
                } else {
                    particleController.density = particleController.densityPc;
                }

                for (var i = 0; i < particleController.density; i++) {
                    if (particles[i]) {
                        particles[i].position.x += particles[i].speed * particleController.speedMultiple;
                        particles[i].draw();
                        if (particles[i].position.x > canvas.width) {
                            var scale = ~~(Math.random() * (particleController.lineMaxHeight - particleController.lineMinHeight) + particleController.lineMinHeight);
                            var speed = ~~(Math.random() * (particleController.speedMax - particleController.speedMin) + particleController.speedMin);
                            particles[i] = new Particle(scale, scale / 2, speed);
                            particles[i].position.x = -800;
                            particles[i].position.y = Math.random() * canvas.height;
                        }
                    }
                }
            }
        }
    }, {
        key: 'render',
        value: function render(mouse, scrollInc) {}
    }, {
        key: 'resize',
        value: function resize(w, h) {
            this.winW = w;
            this.winH = h;

            if (this.winW > 750) {
                //上部ヘッダーの色変更
                if (this.status.scr.inc <= this.winW) {
                    this.$header.classList.add("onKv");
                } else {
                    this.$header.classList.remove("onKv");
                }

                //下部インジケーターの連動
                this.$scrollIndicator.style.width = this.status.scr.inc / (this.winW * 5.7) * 100 + '%';
            } else {
                //上部ヘッダーの色変更
                if (this.status.scr.inc <= this.winH) {
                    this.$header.classList.add("onKv");
                    this.$pagetop.classList.add("onKv");
                    this.$footerPagetop.classList.add("onKv");
                } else {
                    this.$header.classList.remove("onKv");
                    this.$pagetop.classList.remove("onKv");
                    this.$footerPagetop.classList.remove("onKv");
                }
            }
        }
    }, {
        key: 'scroll',
        value: function scroll(e, inc) {
            this.status.scr.inc = inc;
            if (this.winW > 750) {

                //下部インジケーターの連動
                this.$scrollIndicator.style.width = this.status.scr.inc / (this.winW * 5.7) * 100 + '%';

                //右下SCROLLの表示
                if (this.status.scr.inc > this.winW * 0.5) {
                    TweenMax.to(this.$scrollBtn, .3, {
                        opacity: 1,
                        display: 'block'
                    });
                } else {
                    TweenMax.to(this.$scrollBtn, .3, {
                        opacity: 0,
                        display: 'none'
                    });
                }

                //右下PAGETOPの表示
                if (this.status.scr.inc > this.winW * 5.5) {
                    TweenMax.to(this.$pagetopBtn, .3, {
                        opacity: 1,
                        display: 'block'
                    });
                } else {
                    TweenMax.to(this.$pagetopBtn, .3, {
                        opacity: 0,
                        display: 'none'
                    });
                }

                //上部ヘッダーの色変更
                if (inc <= this.winW) {
                    this.$header.classList.add("onKv");
                } else {
                    this.$header.classList.remove("onKv");
                }
            } else {

                //上部ヘッダーの色変更
                console.log(this.status.scr.inc, this.winH);
                if (this.status.scr.inc <= this.winH) {
                    this.$header.classList.add("onKv");
                    this.$pagetop.classList.add("onKv");
                    this.$footerPagetop.classList.add("onKv");
                } else {
                    this.$header.classList.remove("onKv");
                    this.$pagetop.classList.remove("onKv");
                    this.$footerPagetop.classList.remove("onKv");
                }

                //footerのpagetop表示
                if (this.$footer) {
                    if (this.status.scr.inc + this.h - this.$footerThreshold < 128) {
                        this.$pagetop.classList.add("fixed");
                        this.$footerPagetop.classList.add("fixed");
                    } else {
                        this.$pagetop.classList.remove("fixed");
                        this.$footerPagetop.classList.remove("fixed");
                    }
                }
            }
        }
    }]);

    return craftmanshipManager;
}();

exports.default = craftmanshipManager;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var solutionManager = function () {
  function solutionManager(effect, param) {
    _classCallCheck(this, solutionManager);

    this.effect = effect;
    this.param = param;
    // this.$;
    this.$target;
    this.$endTarget;
    this.$object;

    this.$container;
    this.scPoint;
    this.scPointEnd;
    this.scNumStart;
    this.scNum;
    this.scNumEndStart;
    this.scNumEnd;

    this.w = window.innerWidth;
    this.h = window.innerHeight;
  }

  _createClass(solutionManager, [{
    key: 'init',
    value: function init() {
      this.$container = document.getElementById('mission');
      this.$target = this.$container.querySelectorAll('.js__obj');
      this.$endTarget = this.$container.querySelectorAll('.js__obj-close');
      this.scNumStart = 0;
      this.scNum = this.$target.length;
      this.scNumEndStart = 0;
      this.scNumEnd = this.$endTarget.length;
      this.$object = document.getElementById('p-mission-section__image');

      if (this.$target) {
        var _minusPoint = void 0;
        _minusPoint = this.h * 0.5 - 200;
        this.scPoint = [];
        for (var i = this.scNumStart; i < this.scNum; i++) {

          var $scp = this.$target[i],
              rect = void 0,
              scrH = void 0;
          rect = $scp.getBoundingClientRect().top;
          scrH = window.pageYOffset;

          // this.scPoint[i] : targetごとのアニメーション発火点（スクロール位置）
          // rect.top : targetのページ最上部からの距離
          // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
          // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
          this.scPoint[i] = rect + scrH - _minusPoint;
        }
      }
      if (this.$endTarget) {
        var _minusPoint2 = void 0;
        _minusPoint2 = this.h * 0.5;
        this.scPointEnd = [];
        for (var i = this.scNumEndStart; i < this.scNumEnd; i++) {

          var _$scp = this.$endTarget[i],
              _rect = void 0,
              _scrH = void 0;
          _rect = _$scp.getBoundingClientRect().top;
          _scrH = window.pageYOffset;

          // this.scPointEnd[i] : targetごとのアニメーション発火点（スクロール位置）
          // rect.top : targetのページ最上部からの距離
          // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
          // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
          this.scPointEnd[i] = _rect + _scrH - _minusPoint2;
        }
      }
    }
  }, {
    key: 'render',
    value: function render(mouse, scrollInc) {}
  }, {
    key: 'resize',
    value: function resize(w, h) {
      this.w = w;
      this.h = h;

      if (this.$target) {
        var _minusPoint = void 0;
        _minusPoint = this.h * 0.5 - 200;
        this.scPoint = [];
        for (var i = this.scNumStart; i < this.scNum; i++) {

          var $scp = this.$target[i],
              rect = void 0,
              scrH = void 0;
          rect = $scp.getBoundingClientRect().top;
          scrH = window.pageYOffset;

          // this.scPoint[i] : targetごとのアニメーション発火点（スクロール位置）
          // rect.top : targetのページ最上部からの距離
          // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
          // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
          this.scPoint[i] = rect + scrH - _minusPoint;
        }
      }
      if (this.$endTarget) {
        var _minusPoint3 = void 0;
        _minusPoint3 = this.h * 0.5;
        this.scPointEnd = [];
        for (var i = this.scNumEndStart; i < this.scNumEnd; i++) {

          var _$scp2 = this.$endTarget[i],
              _rect2 = void 0,
              _scrH2 = void 0;
          _rect2 = _$scp2.getBoundingClientRect().top;
          _scrH2 = window.pageYOffset;

          // this.scPointEnd[i] : targetごとのアニメーション発火点（スクロール位置）
          // rect.top : targetのページ最上部からの距離
          // scrH : 現在のスクロール位置、init時は前後して最上部にスクロールするため固定値を代入
          // _minusPoint : ウインドウ上部から発火位置をどれだけずらすか
          this.scPointEnd[i] = _rect2 + _scrH2 - _minusPoint3;
        }
      }
    }
  }, {
    key: 'scroll',
    value: function scroll(e, inc) {
      console.log(inc, this.scPoint, this.scPointEnd, inc < this.scPoint[0]);
      if (inc < this.scPoint[0] || inc > this.scPointEnd[0]) {
        this.$object.classList.remove('active');
      } else {
        this.$object.classList.add('active');
      }
      if (inc > this.scPoint[2]) {
        this.$object.classList.remove('obj01');
        this.$object.classList.remove('obj02');
        this.$object.classList.add('obj03');
      } else if (inc > this.scPoint[1]) {
        this.$object.classList.remove('obj01');
        this.$object.classList.add('obj02');
        this.$object.classList.remove('obj03');
      } else if (inc > this.scPoint[0]) {
        this.$object.classList.add('obj01');
        this.$object.classList.remove('obj02');
        this.$object.classList.remove('obj03');
      }
    }
  }]);

  return solutionManager;
}();

exports.default = solutionManager;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var solutionManager = function () {
    function solutionManager(effect, param) {
        _classCallCheck(this, solutionManager);

        this.effect = effect;
        this.param = param;
        // this.$;
        this.$target;
        this.href = [];
        this.url;
        this.$contents;
        this.id = [];
        this.position;
        this.$header;
        this.headerHeight;
        this.scrollY;
    }

    _createClass(solutionManager, [{
        key: "init",
        value: function init() {}
    }, {
        key: "render",
        value: function render(mouse, scrollInc) {}
    }, {
        key: "resize",
        value: function resize(w, h) {}
    }, {
        key: "scroll",
        value: function scroll(e, inc) {}
    }, {
        key: "onNext",
        value: function onNext() {
            alert();
        }
    }, {
        key: "onPrev",
        value: function onPrev() {}
    }]);

    return solutionManager;
}();

exports.default = solutionManager;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var topManager = function () {
  function topManager(effect, param, util, scroll) {
    _classCallCheck(this, topManager);

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

    this.status = {};

    this.sectionOffset = [];

    // KVの初回表示フラグ・期間
    this.visitedFlag = false;
    this.expireSpan = 0.5 * 60 * 1000; //期限切れまでの期間（ミリ秒）

    //loader
    this.$loader = document.getElementById('p-loader');
    this.loaderTimer;

    // this.$loaderNow = document.getElementById('c-loader__now');
    // this.$loaderMax = document.getElementById('c-loader__max');
    // this.$loaderLineA = document.getElementById('c-loader__line-a');
    // this.$loaderLineB = document.getElementById('c-loader__line-b');
  }

  _createClass(topManager, [{
    key: 'init',
    value: function init() {
      //this.loading('init');
      var _this = this;

      //初回表示判定
      if (this.getStorage('visitedFlag')) {
        this.visitedFlag = true;
      } else {
        this.setStorage('visitedFlag', true, this.expireSpan);
      }
      console.log('visited flag: ' + this.visitedFlag);

      this.$kv = document.getElementById('p-kv');
      var innerH = window.innerHeight;
      this.$kv.style.height = innerH + 'px';
      this.kv();
    }
  }, {
    key: 'render',
    value: function render(mouse, scrollInc) {}
  }, {
    key: 'resize',
    value: function resize(w, h) {
      var innerH = window.innerHeight;
      this.$kv.style.height = innerH + 'px';
    }
  }, {
    key: 'scroll',
    value: function scroll(e, inc) {}
  }, {
    key: 'setStorage',
    value: function setStorage(key, value) {
      var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.expireSpan;
      //localStorageに期限（指定はミリ秒での期間）付きで記録
      var data = void 0;
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
  }, {
    key: 'getStorage',
    value: function getStorage(key) {
      //localStorageから取得して期限切れなら破棄
      var s = localStorage[key];
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
  }, {
    key: 'kv',
    value: function kv() {
      var _this = this;
      TweenMax.set(document.querySelectorAll('#l-header-title'), {
        opacity: 0,
        x: 0,
        y: -50
      });
      TweenMax.set(document.querySelectorAll('#l-header-menu-btn'), {
        opacity: 0,
        x: 0,
        y: -50
      });
      TweenMax.set(this.$kv.querySelectorAll('#p-kv__scroll'), {
        opacity: 0,
        x: 0,
        y: -50
      });
      TweenMax.set(this.$kv.querySelectorAll('#p-kv__line'), {
        opacity: 0,
        scaleX: 0.1
      });
      this.effect.textAnimation(this.$kv.querySelectorAll('#p-kv__title'), 'set');
      // this.effect.textAnimation(this.$kv.querySelectorAll('.jp'), 'set')


      // TweenMax.to(this.$kv.querySelectorAll('.glitter'),1.2,{
      //   opacity:1,
      //   x: 0,
      //   y: 0,
      //   ease: this.param.ease,
      // });

      TweenMax.to(this.$kv.querySelectorAll('#p-kv__line'), 1.2, {
        opacity: 1,
        scaleX: 1,
        ease: this.param.ease,
        onComplete: function onComplete() {
          _this.effect.textAnimation(_this.$kv.querySelectorAll('#p-kv__title'), 'show');

          TweenMax.to(document.querySelectorAll('#l-header-title'), .6, {
            opacity: 1,
            x: 0,
            y: 0,
            delay: 2.5,
            ease: _this.param.ease
          });
          TweenMax.to(document.querySelectorAll('#l-header-menu-btn'), .6, {
            opacity: 1,
            x: 0,
            y: 0,
            delay: 2.5,
            ease: _this.param.ease
          });
          var scrollTimeline = new TimelineMax();
          scrollTimeline.set(_this.$kv.querySelectorAll('#p-kv__scroll .arrow'), {
            opacity: 0,
            top: 0,
            bottom: 63,
            height: 0
          });
          scrollTimeline.to(_this.$kv.querySelectorAll('#p-kv__scroll .arrow'), .6, {
            opacity: 1,
            bottom: 0,
            height: 63,
            ease: _this.param.ease
          });
          scrollTimeline.to(_this.$kv.querySelectorAll('#p-kv__scroll .arrow'), .6, {
            opacity: 0,
            top: 63,
            bottom: 0,
            height: 0,
            delay: 0.5,
            ease: _this.param.ease
          });
          TweenMax.to(_this.$kv.querySelectorAll('#p-kv__scroll'), .6, {
            opacity: 1,
            x: 0,
            y: 0,
            delay: 3,
            ease: _this.param.ease
          });
          scrollTimeline.delay(3).repeat(-1).repeatDelay(0.5);
        }
      });
      // this.effect.textAnimation(this.$kv.querySelectorAll('.jp'), 'show')

    }
  }]);

  return topManager;
}();

exports.default = topManager;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Param = function Param() {
    _classCallCheck(this, Param);

    this.root = "/";
    // this.root = "/recruit/";

    this.breakpoint = 750;
    if (Useragnt.mobile) {
        this.userAgent = "sp";
    } else if (Useragnt.tablet) {
        this.userAgent = "tablet";
    } else {
        this.userAgent = "pc";
    }
    this.displayType = window.innerWidth > this.breakpoint ? "pc" : "sp";
    if (document.querySelector("html").classList.contains('ie') || document.querySelector("html").classList.contains('edge')) {
        this.browserType = 'ie';
    } else if (document.querySelector("html").classList.contains('safari') && document.querySelector("html").classList.contains('pc')) {
        this.browserType = 'safari';
    } else {
        this.browserType = 'other';
    }

    this.ease = CustomEase.create("custom", "M0,0,C0.158,0,0.308,0.047,0.344,0.332,0.412,0.88,0.554,0.946,1,1");

    this.easeSlideUp = Expo.easeOut;

    this.webgl = {
        top: {
            mainvisual: {
                sence: [{
                    illust: "./assets/video/top/movie01-illust.mp4",
                    bg: "./assets/video/top/movie01-bg.mp4",
                    body: "./assets/video/top/body-bg01_w.mp4"
                }]
            }
        }
    };
    this.status = {};
    this.instagram = {
        src: "https://www.eventstudio.jp/getInstagram.php"
    };
};

exports.default = Param;

},{}]},{},[1])

//# sourceMappingURL=app.js.map
