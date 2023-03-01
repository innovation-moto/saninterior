import effectManager from '../effect';

export default class tabManager{
    constructor(){

        /* 必要なDOM */
        this.trigger = document.querySelectorAll('.js__tab');
        this.triggerLinkBtn = document.querySelectorAll('.l-footer-entry-link a')[1];
        console.log(this.triggerLinkBtn);
        this.content = document.querySelectorAll('.js__tab__content');

        this.param = 
        this.target = 0;

        TweenMax.set(this.content[0],{
            display:'block',
            opacity:1
        });

        this.effect = new effectManager(this.param);

    }
    init() {

        let _this = this;
        let _length = this.trigger.length;
        for(var i = 0 ; i < _length ; i++){
            (function(arg) {
                if('#'+_this.content[i].id == location.hash){
                    _this.target = arg;
                    _this.active();
                    TweenMax.set(_this.content[_this.target],{
                        display:'block',
                        opacity:1
                    });
                }
                _this.trigger[i].addEventListener('click', function() {
                    _this.target = arg;
                    _this.change();
                    _this.active();
                    // this.effect.slideUp(this.$targetSlide, "show");
                }, false);
            })(i);
        }

        window.addEventListener("hashchange", function() {
            console.log('yeah')
            let _length = _this.trigger.length;
            for(var i = 0 ; i < _length ; i++){
                (function(arg) {
                    if('#'+_this.content[i].id == location.hash){
                        _this.target = arg;
                        _this.change();
                        _this.active();
                    }
                })(i);
            }
        }, false);

        this.triggerLinkBtn.addEventListener("click", () => {
            console.log("haitta");
            let _length = _this.trigger.length;
            for(var i = 0 ; i < _length ; i++){
                (function(arg) {
                    if('#'+_this.content[i].id == location.hash){
                        _this.target = arg;
                        _this.change();
                        _this.active();
                        TweenMax.to(window, 1, {
                            scrollTo : {
                                y : 0,
                                autoKill : false
                            },
                            ease : Power2.easeOut
                        });
                    }
                })(i);
            }
        });


    }

    change() {

        let _this = this;

        TweenMax.to(this.content, 0.3 ,{
            alpha: 0,
            ease : Power2.easeOut,
            onComplete:function(){
                TweenMax.set(_this.content, {
                    display: 'none',
                });
                TweenMax.set(_this.content[_this.target], {
                    display: 'block',
                    onComplete:function(){
                        TweenMax.to(_this.content, 0.3 , {
                            alpha: 1,
                            ease : Power2.easeIn,
                            onComplete: function(){
                               window.dispatchEvent(new Event('resize')); //スムーススクロールのl-rootの高さ再取得のためリサイズイベントを走らせる
                            },
                        });
                    }
                });
            }
        });

    }

    active() {
        TweenMax.set(this.trigger,{className:"-=is-active"});
        TweenMax.set(this.trigger[this.target],{className:"+=is-active"});
    }

}
