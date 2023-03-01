import webglCoverMakeTex from './coverMakeTex';

export default class webglCover {
    constructor(param,effect) {

        this.param = param;

        this.effect = effect;

        this.makeTex;

        // this.mouseSize = {
        //     w: 0,
        //     h: 0
        // }

        this.conf = {
            src : [
                param.root + "assets/img/common/c-cover-noise.png",
                param.root + "assets/img/top/b-kv-mask2.png",
            ],
            time : 0.2,
            delay : 0.1, /* 初回表示時のdelay */
        }

        this.status ={
            active : false,
            show : false
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
        this.makeTex = new webglCoverMakeTex(this.param);
        this.makeTex.load(this.conf.src[0],this.conf.src[1]);

    }
    render(mouse,scrollInc,time){
        if(!this.makeTex.status.loaded) return;

        this.makeTex.init(this.scene,this.param.pixelRate);

        // if(!this.status.show){
        //     this.status.show = true;
        //     setTimeout(()=>{
        //         this.show(1);
        //     },2e3);
        // }


        // this.makeTex[0].uniforms.mouse.value = mouse;
        // this.makeTex[0].uniforms.mouse.value.x = mouse.x + window.innerWidth/2;
        // this.makeTex[0].uniforms.mouse.value.y = window.innerHeight - mouse.y;

        // this.makeTex[0].uniforms.mouse.value.x = mouse.x + this.mouseSize.w;
        // this.makeTex[0].uniforms.mouse.value.y = window.innerHeight - mouse.y;

        // this.makeTex[0].uniforms.time.value = time;


    }
    resize(w,h,deviceSize,deviceOrientation){

        this.point = h / 10;
        // this.makeTex[0].uniforms.resolution.value.x = w;
        // this.makeTex[0].uniforms.resolution.value.y = h;
        // this.mouseSize.w = w*0.01;
    }

    show(time){


        console.log("show",this.makeTex.uniforms.distMax)
        this.status.active = true;

        TweenMax.killChildTweensOf(this.makeTex.uniforms,{value:true});
        TweenMax.to(this.makeTex.uniforms.distMax,3*time,{
            value : 0,
            // ease: Circ.easeOut,
            ease: Power0.easeNone,
            // delay : 0.2,
            onStart:()=>{
            },
            onComplete:()=>{
                this.makeTex.uniforms.distFlg.value = false;
            }
            // delay : this.conf.delay
        });
        TweenMax.to(this.makeTex.uniforms.opacity,1.8*time,{
            value : 1,
            // ease: Circ.easeIn
            // delay : this.conf.delay
        });


    }
    out(){
        console.log("out",this.makeTex.uniforms.distMax)
        // this.status.splashFlg = false;
        TweenMax.killChildTweensOf(this.makeTex,{value:true});
        this.makeTex.uniforms.distFlg.value = true;

        TweenMax.to(this.makeTex.uniforms.distMax,1.5,{
            value : 1.5,
            // ease: Circ.easeOut,
            ease: Power0.easeNone,
            // delay : this.conf.delay
        });
        TweenMax.to(this.makeTex.uniforms.opacity,2,{
            value : 0,
            ease: Power0.easeNone,
            onComplete:()=>{
                // this.makeTex.remove(this.scene);
                this.status.active = false;
            }
            // ease: Circ.easeIn
            // delay : this.conf.delay
        });

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