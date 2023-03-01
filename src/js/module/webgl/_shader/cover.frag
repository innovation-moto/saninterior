precision mediump float;
#define GLSLIFY 1
varying vec2 vTextureCoord;
uniform vec2 resolution;
uniform vec2 texR;
uniform vec2 mouse;
uniform sampler2D texture;
uniform sampler2D mask;
uniform sampler2D mask2;
uniform float opacity;
uniform float contrast;

uniform float dispInc;
uniform float distMin;
uniform float distMax;

uniform float range;
uniform float strength;

uniform bool distFlg;

uniform vec3 addColor;


void main(void) {

   vec4 disp2 = texture2D(mask2, vTextureCoord);
   vec2 dispVec2 = vec2(disp2.r, disp2.g);
   vec2 distortedPosition2 = vTextureCoord + dispVec2;
   vec4 col = texture2D(texture, vTextureCoord);


    //滲み出る
    if(distFlg){
        vec2 p = (gl_FragCoord.xy * 2.0 - texR) / min(texR.x, texR.y);
        float dist = 0.0;
        for(float i = 0.0; i < 4.0; i++){
            float j = i + 0.001;
            vec2 q = p + vec2(cos(j), sin(j)) * distortedPosition2;
            dist += 0.03 / length(q);
        }
        col.a *= opacity * smoothstep(0.0,distMax,dist*opacity);

    }else{
        col.a *= opacity;

    }


  gl_FragColor = col;


}