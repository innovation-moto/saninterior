import webglTopMakeTex from './topMakeTex';

export default class webglTop {
    constructor(param,effect) {

        this.param = param;

        this.effect = effect;

        this.makeTex = [false,false];

        // this.mouseSize = {
        //     w: 0,
        //     h: 0
        // }

        this.conf = {
            src : [
                param.root + "assets/img/top/b-kv-bg1.png",
                param.root + "assets/img/top/b-kv-bg2.png",
                param.root + "assets/img/top/b-kv-mask2.png",
                param.root + "assets/img/top/b-kv-mask1.png",
            ],
            time : 0.2,
            delay : 0.1, /* 初回表示時のdelay */
            color:[
                {//赤系
                    r:0.49,g:0.37,b:0.62
                },
                {//グレー系
                    r:0.65,g:0.69,b:0.69
                },
                {//青系
                    r:0.37,g:0.52,b:0.69
                }
            ]
        }

        this.status ={
            splashFlg : false, // 初回表示管理
            show : false,
            active : true,
            display:"",
            colorCurrent : 0,
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
        if(!this.makeTex[0]) this.makeTex[0] = new webglTopMakeTex(this.param);
        if(!this.makeTex[1]) this.makeTex[1] = new webglTopMakeTex(this.param);
        if(!this.makeTex[0].status.loaded)this.makeTex[0].load(this.conf.src[0],this.conf.src[2],this.conf.src[3]);
        if(!this.makeTex[1].status.loaded)this.makeTex[1].load(this.conf.src[1],this.conf.src[2],this.conf.src[3]);

        this.effect.svgGlitch(document.getElementById("p-kv-content-copy"),"set")
        this.effect.splitText(document.getElementsByClassName("js__split"),"set");
        this.effect.show(document.getElementsByClassName("js__sp-show"),"set");
        this.effect.show(document.getElementsByClassName("js__sc-in"),"set");
        document.getElementById("l-header-contact").classList.add('is-show');
        // setTimeout(()=>{
        // },1e2)
    }
    render(mouse,scrollInc,time){
        if(!this.makeTex[0].status.loaded) return;

        if(!this.status.splashFlg||scrollInc<=this.point&&!this.status.show){

            if(!this.status.splashFlg) {
                //表示する前にシーンに追加
                this.makeTex[0].init(this.scene,this.param.pixelRate,"main");
                this.makeTex[1].init(this.scene,this.param.pixelRate,"dots");
                // this.datGUI();
                this.effect.svgGlitch(document.getElementById("p-kv-content-copy"),"show",[false],[false]);
                setTimeout(()=>{
                    this.effect.splitText(document.querySelectorAll(".js__split >* >*"),"show");
                },2e3)
                setTimeout(()=>{
                    this.show(1);
                    setTimeout(()=>{
                        this.effect.show(document.getElementsByClassName("js__sp-show"),"show");
                    },1e3);
                },15e2);
            }else{
                setTimeout(()=>{
                    //表示する前にシーンに追加
                    this.makeTex[0].init(this.scene,this.param.pixelRate,"main");
                    this.makeTex[1].init(this.scene,this.param.pixelRate,"dots");
                    this.show(0.4);
                    this.effect.svgGlitch(document.getElementById("p-kv-content-copy"),"show",[false],[false]);
                    this.effect.show(document.getElementsByClassName("js__sc-show"),"show",1);
                    document.getElementById("l-header-contact").classList.add('is-show');
                    this.effect.splitText(document.querySelectorAll(".js__split >* >*"),"show",1);
                    if(this.status.display=="pc") this.effect.show(document.getElementsByClassName("js__sc-in"),"out");

                },5e2);
            }
            this.status.splashFlg = true;
            this.status.show = true;
        } else if(scrollInc>this.point){
            if(this.status.show){
                this.status.show = false;
                this.effect.svgGlitch(document.getElementById("p-kv-content-copy"),"setout");
                this.effect.splitText(document.querySelectorAll(".js__split >* >*"),"out");
                this.effect.show(document.getElementsByClassName("js__sc-show"),"out");
                if(this.status.display=="pc") this.effect.show(document.getElementsByClassName("js__sc-in"),"show");

                setTimeout(()=>{
                    document.getElementById("l-header-contact").classList.remove('is-show');
                },450);
                // setTimeout(()=>{
                //     this.hide();
                // },5e2);
            }
            // 背景は徐々に消す
            if(this.makeTex[0].uniforms.opacity.value!=0){
                this.makeTex[0].uniforms.distFlg.value = true;
                this.makeTex[1].uniforms.distFlg.value = true;
                let _p = Math.min(1,scrollInc/(window.innerHeight*0.8));
                // console.log(_p,scrollInc/window.innerHeight);

                this.makeTex[0].uniforms.distMax.value = this.makeTex[1].uniforms.distMax.value = 1.5*_p;
                this.makeTex[0].uniforms.opacity.value = this.makeTex[1].uniforms.opacity.value = 1-_p;
            }else{
                this.colorChange("stop");
                this.makeTex[0].remove(this.scene);
                this.makeTex[1].remove(this.scene);
            }

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

    colorChange(type){

        // console.log("colorChange")

        if(type=="play"){

            TweenMax.to(this.makeTex[0].uniforms.addColor.value,2.8,{
                r : this.conf.color[this.status.colorCurrent].r,
                b : this.conf.color[this.status.colorCurrent].b,
                g : this.conf.color[this.status.colorCurrent].g,
                ease: Power0.easeNone,
                // ease: Power2.easeInOut,
                onComplete:()=>{
                    this.status.colorCurrent = this.status.colorCurrent<2 ? this.status.colorCurrent + 1:0;
                    this.colorChange("play");
                }
                // ease: Circ.easeIn
                // delay : this.conf.delay
            });

        }else{

            TweenMax.killChildTweensOf(this.makeTex[0].uniforms.addColor.value,{r:true,b:true,g:true});

        }

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


        // オブジェクトがなければシーンに追加
        this.makeTex[0].init(this.scene,this.param.pixelRate,"main");
        this.makeTex[1].init(this.scene,this.param.pixelRate,"dots");

        TweenMax.killChildTweensOf(this.makeTex[0].uniforms,{value:true});
        TweenMax.to(this.makeTex[0].uniforms.distMax,3*time,{
            value : 0,
            // ease: Circ.easeOut,
            ease: Power0.easeNone,
            // delay : 0.2,
            onStart:()=>{
                TweenMax.to(this.makeTex[1].uniforms.dispInc,1*time, {
                    value: 0,
                    delay:1.5
                });
                TweenMax.to(this.makeTex[1].uniforms.opacity,1*time,{
                    value : 1,
                    delay:1.5,
                    onComplete:()=> {
                        this.makeTex[1].uniforms.distFlg.value = false;
                    }
                    // ease: Circ.easeIn
                    // delay : this.conf.delay
                });

            },
            onComplete:()=>{
                this.makeTex[0].uniforms.distFlg.value = false;
                this.colorChange("play");
            }
            // delay : this.conf.delay
        });
        TweenMax.to(this.makeTex[0].uniforms.opacity,1.8*time,{
            value : 0.95,
            // ease: Circ.easeIn
            // delay : this.conf.delay
        });


    }
    hide(){
        // this.status.splashFlg = false;
        TweenMax.killChildTweensOf(this.makeTex,{value:true});
        this.makeTex[0].uniforms.distFlg.value = true;
        this.makeTex[1].uniforms.distFlg.value = true;

        TweenMax.to([this.makeTex[0].uniforms.distMax,this.makeTex[1].uniforms.distMax],0.5,{
            value : 1.5,
            // ease: Circ.easeOut,
            ease: Power1.easeOut,
            // delay : this.conf.delay
        });
        TweenMax.to([this.makeTex[0].uniforms.opacity,this.makeTex[1].uniforms.opacity],0.5,{
            value : 0,
            onComplete:()=>{
                this.colorChange("stop");
                this.makeTex[0].remove(this.scene);
                this.makeTex[1].remove(this.scene);
                this.status.active = false;
            }
            // ease: Circ.easeIn
            // delay : this.conf.delay
        });

    }
    domShow(){
        this.effect.svgGlitch(document.getElementById("p-kv-content-copy"),"show");
        this.effect.splitText(document.querySelectorAll(".js__split >* >*"),"show");
        // this.effect.show(document.getElementsByClassName("js__sc-show"),"show");
        this.effect.show(document.getElementsByClassName("js__sp-show"),"show");
    }
    domHide(){
        this.effect.svgGlitch(document.getElementById("p-kv-content-copy"),"out");
        this.effect.splitText(document.querySelectorAll(".js__split >* >*"),"out");
        this.effect.show(document.getElementsByClassName("js__sc-show"),"out");
    }
    datGUI(){
        let _gui = new dat.gui.GUI();

        let _change = {
            // mouse : {
            //     range : this.makeTex[0].uniforms.range.value,
            //     strength : this.makeTex[0].uniforms.strength.value,
            // },
            color : {
                R : this.makeTex[0].uniforms.addColor.value.r,
                B : this.makeTex[0].uniforms.addColor.value.b,
                G : this.makeTex[0].uniforms.addColor.value.g,
                contrast : this.makeTex[0].uniforms.contrast.value,
                opacity : this.makeTex[0].uniforms.opacity.value,
                rateR : this.makeTex[0].uniforms.colorRate.value.r,
                rateB : this.makeTex[0].uniforms.colorRate.value.b,
                rateG : this.makeTex[0].uniforms.colorRate.value.g,
            }
        }


        // let _f1 = _gui.addFolder('mouse');
        // let _mouseRange = _f1.add(_change.mouse, 'range', 0.00, 3000.00);
        // _mouseRange.onChange((value)=> {
        //     this.makeTex[0].uniforms.range.value = value;
        // });
        // let _mouseStrength = _f1.add(_change.mouse, 'strength', 0.00, 1.00);
        // _mouseStrength.onChange((value)=> {
        //     this.makeTex[0].uniforms.strength.value = value;
        // });

        let _f1 = _gui.addFolder('color');
        let _colorR = _f1.add(_change.color, 'R', 0.00, 1.00);
        _colorR.onChange((value)=> {
            this.makeTex[0].uniforms.addColor.value.r = value;
        });
        let _colorB = _f1.add(_change.color, 'B', 0.00, 1.00);
        _colorB.onChange((value)=> {
            this.makeTex[0].uniforms.addColor.value.b = value;
        });
        let _colorG = _f1.add(_change.color, 'G', 0.00, 1.00);
        _colorG.onChange((value)=> {
            this.makeTex[0].uniforms.addColor.value.g = value;
        });

        let _rateR = _f1.add(_change.color, 'rateR', 0.00, 1.00);
        _rateR.onChange((value)=> {
            this.makeTex[0].uniforms.colorRate.value.r = value;
        });
        let _rateB = _f1.add(_change.color, 'rateB', 0.00, 1.00);
        _rateB.onChange((value)=> {
            this.makeTex[0].uniforms.colorRate.value.b = value;
        });
        let _rateG = _f1.add(_change.color, 'rateG', 0.00, 1.00);
        _rateG.onChange((value)=> {
            this.makeTex[0].uniforms.colorRate.value.g = value;
        });

        let _colorContrast = _f1.add(_change.color, 'contrast', 0.0, 1.0);
        _colorContrast.onChange((value)=> {
            this.makeTex[0].uniforms.contrast.value = value;
        });
        let _colorOpacity = _f1.add(_change.color, 'opacity', 0.0, 1.0);
        _colorOpacity.onChange((value)=> {
            this.makeTex[0].uniforms.opacity.value = value;
        });



    }

}