export default class topManager {
    constructor(effect, param, util, scroll) {

        this.effect = effect;
        this.param = param;
        this.util = util;
        this.scr = scroll;

        this.winH;
        this.scrH = 0;
        this.$kv;
        this.$kvCopy;
        this.$kvTitleEn;
        this.$kvTitleJp;
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

        this.$kv = document.getElementById('p-kv');
        this.$kvCopy = document.getElementById('p-randd-kv__bg-copy');
        this.$kvTitleEn = document.getElementById('p-randd-kv__en');
        this.$kvTitleJp = document.getElementById('p-randd-kv__jp');
        this.$header = document.getElementById('l-header');
        this.$kvScroll = document.getElementById('p-randd-kv__scroll');

        if (this.$loader) {
            TweenMax.to(this.$loader, 2.5, {
                delay: 1,
                left: '100%',
                //opacity:0,
                ease: this.param.ease,
                display: 'none',
                onStart: function () {
                    _this.splash();
                },
                onComplete: function () {
                    //_this.loading('stop');
                }
            });
        }


    }
    loading(type) {
        let _this = this;
        switch (type) {
            case 'init':
                window.requestAnimFrame = (function () {
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame; //    ||
                    // function(callback){
                    //     window.setTimeout(callback, 1000 / 60);
                    // };
                })();
                var c = document.getElementById("loader-canvas");
                var ctx = c.getContext("2d");
                var cw = c.width = 400;
                var ch = c.height = 150;
                var cx = cw / 2,
                    cy = ch / 2;
                var rad = Math.PI / 180;
                var w = 500;
                var h = 50;
                var amplitude = h;
                var frequency = .01;
                var phi = 0;
                var phiMultiple = 3;
                var frames = 0;
                var stopped = true;
                //ctx.strokeStyle = "Cornsilk";
                ctx.lineWidth = 1;

                function Draw() {
                    frames++;
                    var xtemp = Math.min(frames * 3, w);
                    phi = frames / 60 * phiMultiple;

                    ctx.clearRect(0, 0, cw, ch);
                    ctx.beginPath();
                    //ctx.strokeStyle = "hsl(" + frames + ",100%,50%)";
                    //ctx.moveTo(0, 40);
                    for (var x = 0; x < xtemp; x++) {
                        let y = Math.sin(x * frequency + phi) * amplitude / 2 + amplitude / 2;
                        //y = Math.cos(x * frequency + phi) * amplitude / 2 + amplitude / 2;
                        ctx.lineTo(x, y + 40); // 40 = offset

                    }


                    ctx.stroke();
                    const g = ctx.createLinearGradient(0, 0, 400, 0);
                    g.addColorStop(0, `rgba(${0xff},${0xff},${0xff},0`); // opaque
                    g.addColorStop(1, `rgba(${0xff},${0xff},${0xff},1`); // transparent
                    ctx.strokeStyle = g;
                    _this.loaderTimer = window.requestAnimFrame(Draw);
                }
                _this.loaderTimer = window.requestAnimFrame(Draw);
                break;
            case 'stop':
                window.cancelAnimationFrame = window.cancelAnimationFrame ||
                    window.mozCancelAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    window.msCancelAnimationFrame;
                if (_this.loaderTimer) cancelAnimationFrame(_this.loaderTimer);
                break;

        }

    }
    splash() {
        let _this = this;

        TweenMax.set(this.$kvCopy, {
            opacity: 0,
            x: -100,
        });
        TweenMax.set(this.$kvTitleEn, {
            opacity: 0,
            x: -100,
        });
        TweenMax.set(this.$kvTitleJp, {
            opacity: 0,
            x: -100,
        });
        TweenMax.set(this.$kvScroll, {
            opacity: 0,
            x: '-100%',
        });
        TweenMax.set(this.$header, {
            opacity: 0,
            y: '-100%',
        });


        TweenMax.to(this.$kvCopy, 1.5, {
            delay: 2.0,
            x: 0,
            opacity: 1,
            ease: this.param.easeSlideUp,
        });
        TweenMax.to(_this.$kvTitleEn, 1.0, {
            delay: 2.5,
            x: 0,
            opacity: 1,
        });
        TweenMax.to(_this.$kvTitleJp, 1.0, {
            delay: 2.7,
            x: 0,
            opacity: 1,
        });
        TweenMax.to(_this.$kvScroll, 1.0, {
            delay: 2.9,
            opacity: 1,
            x: '0%',
        });
        TweenMax.to(_this.$header, 1.0, {
            delay: 2.9,
            y: '0%',
            opacity: 1,
        });



    }
    render(mouse, scrollInc) {}
    resize(w, h) {
        this.winH = h;
        this.$kv.style.height = h + 'px';
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
}