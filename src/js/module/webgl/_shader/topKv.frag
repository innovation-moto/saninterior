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
uniform vec3 colorRate;

void main(void) {

    //マウス
//    vec2 m = mouse - gl_FragCoord.xy;
//    float mp = length(m);
//
//   vec2 offset = (1.0 - pow(mp / 10.0, strength)) * m;
//   vec2 sd = offset / resolution;


//   vec4 col = texture2D(texture,vTextureCoord);
//   vec4 disp = texture2D(mask, vTextureCoord);
   vec4 disp2 = texture2D(mask2, vTextureCoord);
//   vec2 dispVec = vec2(disp.r, disp.g);
   vec2 dispVec2 = vec2(disp2.r, disp2.g);
//   vec2 distortedPosition1 = vTextureCoord + dispVec * dispInc;
   vec2 distortedPosition2 = vTextureCoord + dispVec2;
//   vec4 tex = texture2D(texture,distortedPosition1);
//   vec4 col = mix(tex, tex, disp);
    vec4 col = texture2D(texture, vTextureCoord);
//  vec2 center = vec2(0.5 , 0.5);
//  float dist = 1.0 - smoothstep(distMin, distMax, length(center - distortedPosition1));

//    col.rgb -= addColor*contrast;
//    col.rgb = (col.rgb - 0.5) / (1.0 - contrast) + 0.5;

      float v = col.x + col.y + col.z;
      col.x = v*colorRate.r;
      col.y = v*colorRate.b;
      col.z = v*colorRate.g;

      col.rgb = mix(col.rgb,addColor,contrast);

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


//  col.rgb *= dist;
//  dist *= distMax;
  gl_FragColor = col;


}