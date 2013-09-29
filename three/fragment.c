precision mediump float;

varying vec2 position;
uniform float time;

void main() {
    float intensity = abs(0.5 - mod(time, 500.0) / 500.0);
    gl_FragColor = vec4(
            intensity * (1.0 - abs(abs(position.x) + abs(position.y))),
            0.0,
            (0.5 - intensity) * 1.0,
            1.0);
}
