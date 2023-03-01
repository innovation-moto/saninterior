
export default class swiper {
    constructor(param){
        this.param = param;

        this.swiper;
        this.$target;
        this.w = window.innerWidth;
        this.h = window.innerHeight;
    }

    init(){
        let _this = this;
        console.log('swiper')
        this.swiper = new Swiper ('.swiper-container', {

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
                prevEl: '.swiper-button-prev',
            },

            // Responsive breakpoints
            breakpoints: {
                750: { // 750以下の時
                    slidesPerView: 'auto', // 表示スライド数
                    spaceBetween: 30, // スライド間の距離60px
                    slidesPerGroup: 1, // 1つずつスライド
                    centeredSlides: true, // アクティブなスライドを中央に表示
                }
            },

        });
        this.$target = document.querySelector('.solution-bg');

        this.swiper.on('slideNextTransitionStart', function(){
            let pos0 = _this.$target.querySelector('.pos0');
            let pos1 = _this.$target.querySelector('.pos1');
            let pos2 = _this.$target.querySelector('.pos2');
            let pos3 = _this.$target.querySelector('.pos3');

            this.w = window.innerWidth;
            this.h = window.innerHeight;

            if(this.w <= 750){
                TweenMax.to(pos0, .6, {bezier:{curviness:1.5, values:[{x:0, y:-50*0.87},{x:-50*0.94, y:-44*0.87},{x:-87*0.94, y: -25*0.87}, {x:-100*0.94, y:0}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos0.classList.remove('pos0');pos0.classList.add('pos3'); }, onComplete: function(){pos0.style.transform = ''; }});
                TweenMax.to(pos1, .6, {bezier:{curviness:1.5, values:[{x:100*0.94, y:0},{x:87*0.94, y:-25*0.87},{x:50*0.94, y: -44*0.87}, {x:0, y:-50*0.87}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos1.classList.remove('pos1');pos1.classList.add('pos0'); }, onComplete: function(){pos1.style.transform = ''; }});
                TweenMax.to(pos2, .6, {bezier:{curviness:1.5, values:[{x:0, y:50*0.87},{x:50*0.94, y:44*0.87},{x:87*0.94, y: 25*0.87}, {x:100*0.94, y:0}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos2.classList.remove('pos2');pos2.classList.add('pos1'); }, onComplete: function(){pos2.style.transform = ''; }});
                TweenMax.to(pos3, .6, {bezier:{curviness:1.5, values:[{x:-100*0.94, y:0},{x:-87*0.94, y:25*0.87},{x:-50*0.94, y: 44*0.87}, {x:0, y:50*0.87}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos3.classList.remove('pos3');pos3.classList.add('pos2'); }, onComplete: function(){pos3.style.transform = ''; }});
            }else{
                TweenMax.to(pos0, .6, {bezier:{curviness:1.5, values:[{x:-200*0.94, y:0},{x:-173*0.94, y:50*0.87},{x:-100*0.94, y: 87*0.87}, {x:0, y:100*0.87}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos0.classList.remove('pos0');pos0.classList.add('pos3'); }, onComplete: function(){pos0.style.transform = ''; }});
                TweenMax.to(pos1, .6, {bezier:{curviness:1.5, values:[{x:0, y:-100*0.87},{x:-100*0.94, y:-87*0.87},{x:-173*0.94, y: -50*0.87}, {x:-200*0.94, y:0}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos1.classList.remove('pos1');pos1.classList.add('pos0'); }, onComplete: function(){pos1.style.transform = ''; }});
                TweenMax.to(pos2, .6, {bezier:{curviness:1.5, values:[{x:200*0.94, y:0},{x:173*0.94, y:-50*0.87},{x:100*0.94, y: -87*0.87}, {x:0, y:-100*0.87}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos2.classList.remove('pos2');pos2.classList.add('pos1'); }, onComplete: function(){pos2.style.transform = ''; }});
                TweenMax.to(pos3, .6, {bezier:{curviness:1.5, values:[{x:0, y:100*0.87},{x:100*0.94, y:87*0.87},{x:173*0.94, y: 50*0.87}, {x:200*0.94, y:0}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos3.classList.remove('pos3');pos3.classList.add('pos2'); }, onComplete: function(){pos3.style.transform = ''; }});
            }

        });
        this.swiper.on('slidePrevTransitionStart', function(){
            let pos0 = _this.$target.querySelector('.pos0');
            let pos1 = _this.$target.querySelector('.pos1');
            let pos2 = _this.$target.querySelector('.pos2');
            let pos3 = _this.$target.querySelector('.pos3');

            this.w = window.innerWidth;
            this.h = window.innerHeight;

            if(this.w <= 750){
                TweenMax.to(pos0, .6, {bezier:{curviness:1.5, values:[{x:0, y:-50*0.87},{x:50*0.94, y:-44*0.87},{x:87*0.94, y: -25*0.87}, {x:100*0.94, y:0}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){pos0.classList.remove('pos0');pos0.classList.add('pos1'); }, onComplete: function(){pos0.style.transform = ''; }});
                TweenMax.to(pos1, .6, {bezier:{curviness:1.5, values:[{x:100*0.94, y:0},{x:87*0.94, y:25*0.87},{x:50*0.94, y: 44*0.87}, {x:0, y:50*0.87}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos1.classList.remove('pos1');pos1.classList.add('pos2'); }, onComplete: function(){pos1.style.transform = ''; }});
                TweenMax.to(pos2, .6, {bezier:{curviness:1.5, values:[{x:0, y:50*0.87},{x:-50*0.94, y:44*0.87},{x:-87*0.94, y: 25*0.87}, {x:-100*0.94, y:0}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos2.classList.remove('pos2');pos2.classList.add('pos3'); }, onComplete: function(){pos2.style.transform = ''; }});
                TweenMax.to(pos3, .6, {bezier:{curviness:1.5, values:[{x:-100*0.94, y:0},{x:-87*0.94, y:-25*0.87},{x:-50*0.94, y: -44*0.87}, {x:0, y:-50*0.87}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos3.classList.remove('pos3');pos3.classList.add('pos0'); }, onComplete: function(){pos3.style.transform = ''; }});
            }else{
                TweenMax.to(pos0, .6, {bezier:{curviness:1.5, values:[{x:-200*0.94, y:0},{x:-173*0.94, y:-50*0.87},{x:-100*0.94, y: -87*0.87}, {x:0, y:-100*0.87}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){pos0.classList.remove('pos0');pos0.classList.add('pos1');}, onComplete: function(){pos0.style.transform = ''; }});
                TweenMax.to(pos1, .6, {bezier:{curviness:1.5, values:[{x:0, y:-100*0.87},{x:100*0.94, y:-87*0.87},{x:173*0.94, y: -50*0.87}, {x:200*0.94, y:0}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos1.classList.remove('pos1');pos1.classList.add('pos2');}, onComplete: function(){pos1.style.transform = ''; }});
                TweenMax.to(pos2, .6, {bezier:{curviness:1.5, values:[{x:200*0.94, y:0},{x:173*0.94, y:50*0.87},{x:100*0.94, y: 87*0.87}, {x:0, y:100*0.87}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos2.classList.remove('pos2');pos2.classList.add('pos3');}, onComplete: function(){pos2.style.transform = ''; }});
                TweenMax.to(pos3, .6, {bezier:{curviness:1.5, values:[{x:0, y:100*0.87},{x:-100*0.94, y:87*0.87},{x:-173*0.94, y: 50*0.87}, {x:-200*0.94, y:0}]}/*bezier end*/, ease:_this.param.ease, onStart: function(){ pos3.classList.remove('pos3');pos3.classList.add('pos0');}, onComplete: function(){pos3.style.transform = ''; }});
            }

        });

        this.swiper.on('slideChangeTransitionEnd', function(){
            console.log('slideChangeTransitionEnd')
            let pos0 = _this.$target.querySelector('.pos0');
            let pos1 = _this.$target.querySelector('.pos1');
            let pos2 = _this.$target.querySelector('.pos2');
            let pos3 = _this.$target.querySelector('.pos3');

            pos0.onclick = "";
            pos2.onclick = "";

            pos1.onclick = function(){
                console.log('pos1 clicked')
                _this.swiper.slidePrev();
            }
            pos3.onclick = function(){
                _this.swiper.slideNext();
            }
        })
    }

    resize(){
        this.swiper.pagination.render();
        this.swiper.pagination.update();
    }

}