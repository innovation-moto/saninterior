export default class webglPhilosophyMakeTex {
    constructor(param) {

        this.status = {
            loaded : [],
            init : false,
        }

        this.param = param;


        this.tex = [];
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
        for(let i=0; src.length>i; i++) {
            this.tex[i] = new THREE.TextureLoader().load(src[i],()=> {
                this.status.loaded[i] = true;
            });
        }


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
            texture   :{value:this.tex[0]},
            mask   :{value:this.mask},
            mask2   :{value:this.mask2},
            opacity   :{value:0.0},
            contrast   :{value:0.0},
            darkness   :{value:0.0},


            // ズラし
            dispInc   :{value:0.0},

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
            para : { type: "v3", value: {x:5.0,y:0.06,z:0.9} },
            endZ : {type: "f", value: 0.71},
        }
        this.uniforms.texR.value.x = this.tex[0].image.width;
        this.uniforms.texR.value.y = this.tex[0].image.height;

        this.uniforms.resolution.value.x = window.innerWidth;
        this.uniforms.resolution.value.y = window.innerHeight;

        this.mat = new THREE.ShaderMaterial({
            vertexShader: require('./_shader/topKv.vert'),
            fragmentShader: require('./_shader/topKv.frag'),
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
        //     this.tex[i][i].dispose();
        // }
    }


}