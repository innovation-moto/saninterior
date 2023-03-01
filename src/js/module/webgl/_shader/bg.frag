precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float noise;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 stR = gl_FragCoord.xy / (resolution.xy + sin(time)) * 2.0 + 0.5;
    vec2 stG = gl_FragCoord.xy / (resolution.xy + sin(time * 2.0)) * 2.0 + 0.5;
    vec2 stB = gl_FragCoord.xy / (resolution.xy + sin(time * 4.0)) * 2.0 + 0.5;
    float diffR = random(stR) * 24.0 - 12.0;
    float diffG = random(stG) * 24.0 - 12.0;
    float diffB = random(stB) * 24.0 - 12.0;
    vec4 color = vec4(244.0 + diffR*noise, 244.0 + diffG*noise, 244.0 + diffB*noise, 255.0);
    gl_FragColor = color/255.0;
//    gl_FragColor = vec4(1.0,1.0,1.0,1.0);
}