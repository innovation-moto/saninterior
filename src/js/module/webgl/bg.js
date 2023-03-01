export default class webglBg {
    constructor(param) {

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        this.param = param;

        this.uniforms;

        this.geo;
        this.mat;
        this.mesh;



        this.status ={
            active : true
        }
    }
    init(scene,pixelRate) {


        this.geo = new THREE.PlaneBufferGeometry(this.w*2,this.h*2);

        this.geo.verticesNeedUpdate=true;
        console.log(this.geo.parameters)

        this.uniforms = {
            time:{type:"f",value:1.0},
            noise:{type:"f",value:Useragnt.pc ? 1.0 : 0.0},
            resolution:{type:"v2",value:new THREE.Vector2(this.w,this.h).multiplyScalar(pixelRate)},
            mouse:{type:"v2",value:new THREE.Vector2()},
        }


        // this.uniforms.resolution.value.x = this.w;
        // this.uniforms.resolution.value.y = this.h;

        this.mat = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: require('./_shader/bg.vert'),
            fragmentShader: require('./_shader/bg.frag'),
            transparent   :true,
            blending : THREE.MultiplyBlending
        });

        this.mesh = new THREE.Mesh( this.geo, this.mat );


        scene.add( this.mesh );


    }
    render(mouse,trailPoint,fpsRate){
        this.uniforms.time.value += 0.0001;
        //console.log(this.uniforms.time.value)
    }
    resize(w,h,deviceSize,deviceOrientation){
        this.w = w;
        this.h = h;
        // console.log((this.w/this.h));
        // this.geo.parameters.width = this.w * (this.w/this.h);
        // this.geo.parameters.height = this.h * (this.h/this.w);
        // this.uniforms.resolution.value.x = this.w * (this.w/this.h);
        // this.uniforms.resolution.value.y = this.h * (this.h/this.w);

    }

}