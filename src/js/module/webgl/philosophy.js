import webglPhilosophyMakeTex from './philosophyMakeTex';

export default class webglPhilosophy {
    constructor(param,effect) {

        this.param = param;

        this.effect = effect;

        this.makeTex = [];

        // this.mouseSize = {
        //     w: 0,
        //     h: 0
        // }

        this.conf = {
            src : [
                param.root + "assets/img/philosophy/b-section-bg_1.png",
                param.root + "assets/img/philosophy/b-section-bg_2.png",
                param.root + "assets/img/philosophy/b-section-bg_3.png",
                param.root + "assets/img/philosophy/b-section-bg_4.png",
                param.root + "assets/img/philosophy/b-section-bg_5.png",
            ],
            maskSrc : [
                param.root + "assets/img/top/b-kv-mask2.png",
                param.root + "assets/img/top/b-kv-mask1.png",
            ],
            time : 0.2,
            delay : 0.1, /* 初回表示時のdelay */
        }

        this.status ={
            splashFlg : false, // 初回表示管理
            show : false,
            active : true,
            display:"",
            current:0,
            motFlg : { // アニメーション中監視
                show : false,
                out  : false
            }
        }

         /* dat GUI用に用意 */
        this.datGuiStatus = {
            addTime : 0.0024
        }
        this.point = window.innerHeight / 10;

        this.scene;
    }
    init(scene) {
        this.scene = scene;

        // for(let i=0; this.conf.src.length>i; i++) {
        //     this.makeTex[i] = new webglPhilosophyMakeTex(this.param);
        //     this.makeTex[i].load(this.conf.src[i],this.conf.maskSrc[0],this.conf.maskSrc[1]);
        // }
        this.makeTex[0] = new webglPhilosophyMakeTex(this.param);
        this.makeTex[0].load(this.conf.src,this.conf.maskSrc[0],this.conf.maskSrc[1]);


        // setTimeout(()=>{
        // },1e2)

    }
    render(mouse,scrollInc,time){
        if(!this.makeTex[0].status.loaded[0]) return;


            if(!this.makeTex[0].status.init) {
                this.makeTex[0].init(this.scene);
                this.show(1);

            }



        // this.makeTex[0].uniforms.mouse.value = mouse;
        // this.makeTex[0].uniforms.mouse.value.x = mouse.x + window.innerWidth/2;
        // this.makeTex[0].uniforms.mouse.value.y = window.innerHeight - mouse.y;

        // this.makeTex[0].uniforms.mouse.value.x = mouse.x + this.mouseSize.w;
        // this.makeTex[0].uniforms.mouse.value.y = window.innerHeight - mouse.y;

        // this.makeTex[0].uniforms.time.value = time;


    }
    resize(w,h,deviceSize,deviceOrientation){

        this.point = h / 10;
        this.status.display = deviceSize;

        // this.makeTex[0].uniforms.resolution.value.x = w;
        // this.makeTex[0].uniforms.resolution.value.y = h;
        // this.mouseSize.w = w*0.01;
    }

    show(time){


        // TweenMax.to(this.makeTex[0].uniforms.dispInc,1,{
        //     value : 0,
        //     // ease: Circ.easeOut,
        //     ease: Power1.easeOut,
        //     // ease: Circ.easeIn,
        //     delay : 0.6
        //     // delay : this.conf.delay
        // });
        this.status.active = true;
        this.status.motFlg.show = true;

        TweenMax.killChildTweensOf(this.makeTex[0].uniforms,{value:true});
        TweenMax.to(this.makeTex[0].uniforms.distMax,3*time,{
            value : 0,
            // ease: Circ.easeOut,
            ease: Power0.easeNone,
            // delay : 0.2,
            onStart:()=>{
            },
            onComplete:()=>{
                this.makeTex[0].uniforms.distFlg.value = false;
                this.status.motFlg.show = false;
            }
            // delay : this.conf.delay
        });
        TweenMax.to(this.makeTex[0].uniforms.opacity,1.8*time,{
            value : 1,
            // ease: Circ.easeIn
            // delay : this.conf.delay
        });


    }
    out(dir,crossFlg){
        // this.status.splashFlg = false;

        console.log(dir,crossFlg)

        TweenMax.killChildTweensOf(this.makeTex,{value:true});
        this.makeTex[0].uniforms.distFlg.value = true;
        this.status.motFlg.out = true;

        TweenMax.to(this.makeTex[0].uniforms.distMax,1.8,{
            value : 1.5,
            // ease: Circ.easeOut,
            ease: Power0.easeNone,
            // delay : this.conf.delay
        });
        TweenMax.to(this.makeTex[0].uniforms.opacity,1.8,{
            value : 0,
            ease: Power0.easeNone,
            onComplete:()=>{
                // this.makeTex[0].remove(this.scene);
                this.status.current = dir=="next" ? this.status.current+1 : this.status.current-1;
                this.makeTex[0].uniforms.texture.value = this.makeTex[0].tex[this.status.current];
                if(crossFlg) this.show(1);
                this.status.active = false;
                this.status.motFlg.out = false;
            }
            // ease: Circ.easeIn
            // delay : this.conf.delay
        });

    }
    domHide(){
        this.effect.svgGlitch(document.getElementById("p-kv-content-copy"),"out");
        this.effect.splitText(document.querySelectorAll(".js__split >* >*"),"out");
        this.effect.show(document.getElementsByClassName("js__sc-show"),"out");
    }
    datGUI(){
        let _gui = new dat.gui.GUI();

        let _change = {
            mouse : {
                range : this.makeTex[0].uniforms.range.value,
                strength : this.makeTex[0].uniforms.strength.value,
            },
        }


        let _f1 = _gui.addFolder('mouse');
        let _mouseRange = _f1.add(_change.mouse, 'range', 0.00, 3000.00);
        _mouseRange.onChange((value)=> {
            this.makeTex[0].uniforms.range.value = value;
        });
        let _mouseStrength = _f1.add(_change.mouse, 'strength', 0.00, 1.00);
        _mouseStrength.onChange((value)=> {
            this.makeTex[0].uniforms.strength.value = value;
        });




    }

}