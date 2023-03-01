import Param from './param';
import Util from './module/libs/util';

import Manager from './manager';

const manager = new Manager();

/* ---------------------------------------------------

  -- load

 --------------------------------------------------- */

window.addEventListener("load", function (e) {
    manager.init("landing");
});

let _pageID = document.getElementsByTagName('body')[0].getAttribute("id");

/* ---------------------------------------------------

  -- event

 --------------------------------------------------- */

window.addEventListener("scroll", function (e) {
    let _y = window.pageYOffset || document.documentElement.scrollTop;
    if(manager) manager.scroll.update(_y,"");
    if(manager) manager.scrolls(e);
});

window.addEventListener("mousemove",function (e) {

    let _x = e.clientX;
    let _y = e.clientY;

    // if(manager) manager.mouse.update(_x,_y);

});

let MOUSE_WHEEL_EVENT = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';

document.addEventListener(MOUSE_WHEEL_EVENT,function(e){

    if(manager) manager.wheel(e);

});

window.addEventListener("touchstart",function (e) {
    if(manager) manager.touchStart(e);
});
window.addEventListener("touchmove",function (e) {

    if(manager) manager.touchmove(e);

}, { passive: false });
window.addEventListener("touchend",function (e) {
    if(manager) manager.touchEnd(e);
});

/* ---------------------------------------------------

  -- resize

 --------------------------------------------------- */
window.addEventListener("resize",function (e) {
    if(manager){
        if(manager.param.displayType=="sp"&&manager.w == window.innerWidth) return;
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
