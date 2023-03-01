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

uniform float dispInc;
uniform float distMin;
uniform float distMax;

uniform float range;
uniform float strength;

uniform bool distFlg;


void main(void) {

    //マウス
//    vec2 m = mouse - gl_FragCoord.xy;
//    float mp = length(m);
//    float mr = min(0.3 * resolution.x, range);

//   vec2 offset = (1.0 - pow(mp / 10.0, strength)) * m;
//   vec2 sd = offset / resolution;


//   vec4 col = texture2D(texture,vTextureCoord);
   vec4 disp = texture2D(mask, vTextureCoord);
   vec2 dispVec = vec2(disp.r, disp.g);
   vec2 distortedPosition1 = vTextureCoord + dispVec * dispInc;
   vec4 tex = texture2D(texture,distortedPosition1);
   vec4 col = mix(tex, tex, disp);

//  vec2 center = vec2(0.5 , 0.5);
//  float dist = 1.0 - smoothstep(distMin, distMax, length(center - distortedPosition1));



    //滲み出る
//    if(distFlg){
//        vec2 p = (gl_FragCoord.xy * 2.0 - texR) / min(texR.x, texR.y);
//        float dist = 0.0;
//        for(float i = 0.0; i < 4.0; i++){
//            float j = i + 0.001;
//            vec2 q = p + vec2(cos(j), sin(j)) * distortedPosition2;
//            dist += 0.03 / length(q);
//        }
//        col.a *= opacity * smoothstep(0.0,distMax,dist*opacity);
//
//    }else{
//        col.a *= opacity;
//
//    }


//  col.rgb *= dist;
//  dist *= distMax;
  col.a *= opacity;
  gl_FragColor = col;


}