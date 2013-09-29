precision mediump float;

varying vec2 position;

void main() {
    gl_FragColor = vec4(1.0 - abs(position.x), abs(position.y), abs(position.x), 1.0);
}
