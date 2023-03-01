export default class webglTopMakeTex {
    constructor(param) {

        this.status = {
            loaded : false,
            init : false,
        }

        this.param = param;

        this.tex;
        this.mask;
        this.mask2;
        this.uniforms = {};
        this.geo;
        this.mat;
        this.mesh;


    }
    load(src,maskSrc,maskSrc2){//テクスチャ読み込む
        this.mask = new THREE.TextureLoader().load(maskSrc);
        this.mask2 = new THREE.TextureLoader().load(maskSrc2);
        this.tex = new THREE.TextureLoader().load(src,()=> {

            this.status.loaded = true;
        });
    }
    init(scene,pixelRate,type) {//シーンに追加

        if(this.status.init) return;
        this.status.init = true;

        // let _geo = new THREE.PlaneGeometry(2048, 2048, 32, 32);
        this.geo = new THREE.PlaneBufferGeometry(2048, 2048);
        // let this.geo = new THREE.PlaneGeometry(1980, 1980, 32, 32);
        this.geo.verticesNeedUpdate=true;
        this.tex.needsUpdate = true;
        this.uniforms = {
            texture   :{value:this.tex},
            mask   :{value:this.mask},
            mask2   :{value:this.mask2},
            opacity   :{value:type=="dots"?0.0:0.0},
            contrast   :{value:0.25},
            darkness   :{value:0.0},


            // ズラし
            dispInc   :{value:type=="dots"?0.02:0.0},


            //中央から広げるやつ
            distMin : {type: "f", value: 0.0},
            distMax : {type: "f", value: 1.5},
            distFlg : {value:true},

            time : {type: "f", value: 0},
            resolution : { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight)
                    .multiplyScalar(pixelRate) },
            texR : { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight)
                    .multiplyScalar(pixelRate) },
            mouse : { type: "v2", value: new THREE.Vector2() },
            range  :{value:500.0},
            strength  :{value:0.02},

            center : { type: "v2", value: {x:0.08,y:0.5} },
            // para : { type: "v3", value: {x:10.0,y:0.08,z:0.4} },
            // addColor : { type: "v3", value: {r:0.49,g:0.37,b:0.62} }, // 赤系
            // addColor : { type: "v3", value: {r:0.65,g:0.69,b:0.69} }, // グレー系
            addColor : { type: "v3", value: {r:0.37,g:0.52,b:0.69} }, // 青系
            colorRate : { type: "v3", value: {r:0.4,g:0.4,b:0.4} },
        }
        //addColor


        this.uniforms.texR.value.x = this.tex.image.width;
        this.uniforms.texR.value.y = this.tex.image.height;

        this.uniforms.resolution.value.x = window.innerWidth;
        this.uniforms.resolution.value.y = window.innerHeight;

        this.mat = new THREE.ShaderMaterial({
            vertexShader: require('./_shader/topKv.vert'),
            fragmentShader: type=="dots"?require('./_shader/topKvDots.frag'):require('./_shader/topKv.frag'),
            transparent   :true,
            // blending: THREE.NoBlending,
            uniforms:this.uniforms
        });

        this.mesh = new THREE.Mesh( this.geo,this.mat );
        // this.mesh.position.x = -100;
        scene.add(this.mesh);


    }
    remove(scene){ // シーンから削除
        if(!this.status.init) return;
        this.status.init = false;
        scene.remove( this.mesh );
        this.geo.dispose();
        this.mat.dispose();
        // for(let i=1; i<this.status.texNum; i++) {
        //     this.tex[i].dispose();
        // }
    }


}