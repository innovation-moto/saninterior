import Param from '../../param';
import webglBg from './bg';
import webglCover from './cover';
import webglTop from './top';
import webglPhilosophy from './philosophy';

export default class webglManager {
    constructor() {

        this.w;
        this.h;

        this.pageID;

        this.status = {
            pause : false,
            init : false
        }

        this.conf = {
            addID  : "",
            pageID : "",
            pixelRato : window.devicePixelRatio,
            // pixelRato : 1,
        }

        this.scene;
        this.coverScene;
        this.camera;
        this.renderer;
        this.coverRenderer;

        this.time = 0;

        /* DOM */
        this.$container;
        this.$coverContainer;

        /* class */
        this.bg;
        this.cover;
        this.top = false;
        this.philosophy = false;




    }
    init(effect,pageID) {

        this.pageID = pageID;
        let _param = new Param();


        if(!this.status.init){

            this.status.init = true;

            this.scene = new THREE.Scene();
            this.coverScene = new THREE.Scene();

            this.conf.addID = "l-bg";

            this.camera = new THREE.PerspectiveCamera(50, this.w / this.h, 1, 10000);
            this.camera.updateProjectionMatrix();
            this.camera.position.z = 1000;
            var _focus = new THREE.Vector3();
            _focus.set( 0, 0, 0 );
            this.camera.lookAt( _focus );


            this.renderer = new THREE.WebGLRenderer({
                alpha              : Useragnt.pc?false:true,
                antialias          : true,
                // depth              : true,
            });
            this.renderer.setSize(this.w,this.h);
            // this.renderer.setClearColor(0xffffff,0);
            this.renderer.setClearColor(0xf4f4f4,1);
            this.renderer.setPixelRatio(this.conf.pixelRato);

            this.coverRenderer = new THREE.WebGLRenderer({
                alpha              : true,
                antialias          : false,
                // depth              : true,
            });
            this.coverRenderer.setSize(this.w,this.h);
            // this.coverRenderer.setClearColor(0xffffff,0);
            this.coverRenderer.setClearColor(0xf4f4f4,0);
            this.coverRenderer.setPixelRatio(this.conf.pixelRato);


            this.$container = document.getElementById(this.conf.addID);
            this.$container.appendChild(this.renderer.domElement);

            this.$coverContainer = document.getElementById('l-cover');
            this.$coverContainer.appendChild(this.coverRenderer.domElement);

            this.bg = new webglBg(_param);
            this.bg.init(this.scene,this.conf.pixelRato);
            this.cover = new webglCover(_param);
            this.cover.init(this.coverScene);

        }


        if(this.pageID == "top"){
            if(!this.top) this.top = new webglTop(_param,effect);
            this.top.init(this.scene);
        } else if(this.pageID == "philosophy"){
            if(!this.philosophy) this.philosophy = new webglPhilosophy(_param,effect);
            this.philosophy.init(this.scene);
        }




    }
    scroll(scrollInc,dir){
    }
    render(mouse,scrollInc,fpsRate){

        this.time++;
        if(this.time%2===0) return;

        if(this.status.pause) return;

        // console.log("render",this.cover.status.active)

        this.cover.render(mouse,fpsRate);
        this.bg.render(mouse,fpsRate);
        if(this.cover.status.active) this.coverRenderer.render(this.coverScene, this.camera);
        // console.log(this.top.status.active)
        if(this.pageID == "top"){
            this.top.render(mouse,scrollInc,this.time);
            this.bg.status.active = this.top.status.active;
            if(this.top.status.active||this.bg.status.active) this.renderer.render(this.scene, this.camera);
        }else{
            if(this.philosophy) this.philosophy.render(mouse,scrollInc,this.time);
            if(this.bg.status.active) this.renderer.render(this.scene, this.camera);

        }
    }
    resize(w,h,deviceSize,deviceOrientation){
        this.w = w;
        this.h = h;

        this.camera.aspect = this.w / this.h;
        this.camera.updateProjectionMatrix();
        this.camera.position.z = this.h / Math.tan(this.camera.fov * Math.PI / 360) / 2;
        this.renderer.setSize(this.w, this.h);
        this.coverRenderer.setSize(this.w, this.h);

        if(this.pageID == "top") this.top.resize(w,h,deviceSize,deviceOrientation);
        this.bg.resize(w,h,deviceSize,deviceOrientation);


    }
    coverShow(){
        if(this.pageID=="top"){
            this.top.hide();
            this.top.domHide();
            setTimeout(()=>{
                this.cover.show(0.35);
            },2e2)
        }else{
            this.cover.show(0.35);
        }
    }
    coverOut(){
        if(this.pageID=="top"){
            this.top.show(1);
        }
        this.cover.out(1);
    }

}