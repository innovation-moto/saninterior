varying vec2 vTextureCoord;

void main(){

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vTextureCoord = uv;
}
