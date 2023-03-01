// import effectManager from '../module/effect';

// let effect;

export default class craftmanshipManager {
    constructor(effect, param, util, scroll) {

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
            },
        }

        this.sectionOffset = [];

        // this.$loaderNow = document.getElementById('c-loader__now');
        // this.$loaderMax = document.getElementById('c-loader__max');
        // this.$loaderLineA = document.getElementById('c-loader__line-a');
        // this.$loaderLineB = document.getElementById('c-loader__line-b');

    }
    init() {
        let _this = this;

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

        this.$pagetopBtn.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            // スクロールする
            TweenLite.to(window, 0.5, {scrollTo:0});

        });

        if (this.$loader) {
            TweenMax.to(this.$loaderImage, .4, {
                delay: 1.5,
                opacity: 0,
                ease: this.param.ease,
                onComplete: function () {
                    TweenMax.to(_this.$loader, 2, {
                        left: '100%',
                        //opacity:0,
                        ease: _this.param.ease,
                        display: 'none',
                        onStart: function () {
                            _this.wind();
                        },
                        onComplete: function () {
                            //_this.loading('stop');
                            let _$slideRightChain = document.querySelectorAll('.js__tsc-kv .js__slide-right-chain');
                            if(_$slideRightChain.length) _this.effect.slideRightChain(_$slideRightChain,"show",0.1,0.5);
                    
                        }
                    });
                }
            })
        }


    }
    wind() {
        let _this = this;

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

        var ParticleController = function () {
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
        }
        var particleController = new ParticleController();
        const gui = new dat.GUI();
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



        var Particle = function (scale, color, speed) {
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

            let phiMultiple = 2 * this.scale / 60;
            let phi = frames / 60 * particleController.phiMultiple;
            //amplitude = h + this.scale * 0.2;
            ctx.moveTo(this.position.x, Math.sin(this.position.x * particleController.frequency + phi) * particleController.amplitude / 2 + particleController.amplitude / 2 + this.position.y + this.scale / 2); // 40 = offset
            let w = (400 + this.scale * 2) * particleController.widthMultiple;
            for (var x = this.position.x; x < this.position.x + w; x++) {
                let y = Math.sin(x * particleController.frequency + phi) * particleController.amplitude / 2 + particleController.amplitude / 2 + this.position.y + this.scale / 2;
                //y = Math.cos(x * particleController.frequency + phi) * amplitude / 2 + amplitude / 2;
                ctx.lineTo(x, y); // 40 = offset
            }
            for (var x2 = this.position.x + w; x2 > this.position.x; x2--) {
                let y = Math.sin(x2 * particleController.frequency + phi) * particleController.amplitude / 2 + particleController.amplitude / 2 + this.position.y - this.scale / 2;
                //y = Math.cos(x * particleController.frequency + phi) * amplitude / 2 + amplitude / 2;
                ctx.lineTo(x2, y); // 40 = offset

            }
            ctx.closePath();

            // ctx.lineWidth = this.scale;
            const g = ctx.createLinearGradient(this.position.x, 0, this.position.x + w, 0);
            g.addColorStop(0, `rgba(${0xf3},${0xf3},${0xff},0`); // opaque
            // g.addColorStop(1, `rgba(${0xf3},${0xf3},${0xff},${1 - this.scale/100}`); // transparent
            g.addColorStop(1, `rgba(${0xf3},${0xf3},${0xff},${1 * particleController.opacity}`); // transparent
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

    render(mouse, scrollInc) {}
    resize(w, h) {
        this.winW = w;
        this.winH = h;

        if (this.winW > 750) {
            //上部ヘッダーの色変更
            if (this.status.scr.inc <= this.winW) {
                this.$header.classList.add("onKv")
            } else {
                this.$header.classList.remove("onKv")
            }

            //下部インジケーターの連動
            this.$scrollIndicator.style.width = (this.status.scr.inc / (this.winW * 5.7)) * 100 + '%';
        } else {
             //上部ヘッダーの色変更
             if (this.status.scr.inc <= this.winH) {
                this.$header.classList.add("onKv")
                this.$pagetop.classList.add("onKv");
                this.$footerPagetop.classList.add("onKv");
            } else {
                this.$header.classList.remove("onKv")
                this.$pagetop.classList.remove("onKv");
                this.$footerPagetop.classList.remove("onKv");
            }
        }

    }
    scroll(e, inc) {
        this.status.scr.inc = inc;
        if (this.winW > 750) {

            //下部インジケーターの連動
            this.$scrollIndicator.style.width = (this.status.scr.inc / (this.winW * 5.7)) * 100 + '%';

            //右下SCROLLの表示
            if (this.status.scr.inc > this.winW * 0.5) {
                TweenMax.to(this.$scrollBtn, .3, {
                    opacity: 1,
                    display: 'block',
                });
            } else {
                TweenMax.to(this.$scrollBtn, .3, {
                    opacity: 0,
                    display: 'none',
                });
            }

            //右下PAGETOPの表示
            if (this.status.scr.inc > this.winW * 5.5) {
                TweenMax.to(this.$pagetopBtn, .3, {
                    opacity: 1,
                    display: 'block',
                });
            } else {
                TweenMax.to(this.$pagetopBtn, .3, {
                    opacity: 0,
                    display: 'none',
                });
            }

            //上部ヘッダーの色変更
            if (inc <= this.winW) {
                this.$header.classList.add("onKv")
            } else {
                this.$header.classList.remove("onKv")
            }
        } else {

            //上部ヘッダーの色変更
            console.log(this.status.scr.inc , this.winH)
            if (this.status.scr.inc <= this.winH) {
                this.$header.classList.add("onKv")
                this.$pagetop.classList.add("onKv");
                this.$footerPagetop.classList.add("onKv");
            } else {
                this.$header.classList.remove("onKv")
                this.$pagetop.classList.remove("onKv");
                this.$footerPagetop.classList.remove("onKv");
            }

            //footerのpagetop表示
            if(this.$footer) {
                if(this.status.scr.inc + this.h - this.$footerThreshold < 128){
                    this.$pagetop.classList.add("fixed");
                    this.$footerPagetop.classList.add("fixed");
                }else{
                    this.$pagetop.classList.remove("fixed");
                    this.$footerPagetop.classList.remove("fixed");
                }
            }
    
        }

    }
}