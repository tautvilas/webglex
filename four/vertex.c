precision mediump float;

attribute vec2 a_position;
varying vec2 position;
uniform float scale;
uniform float time;

void main() {
    float intensity = abs(0.5 - mod(time, 500.0) / 500.0) / 0.5;
    gl_Position = vec4(
            a_position.x * intensity,
            a_position.y * intensity, 0, 1.0 * scale);
    position = a_position;
}

