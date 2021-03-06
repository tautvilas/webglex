//precision mediump float;

attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 theColor;

uniform float time;
uniform mat4 cameraToClipMatrix;

void main() {
    //float scale = (mod(time, 1000.0)) / 1000.0;
    float scale = 1.0;
    float angle = 6.28 * (time / 2000.0);
    vec4 cameraPos = a_position;
    float oldy = cameraPos.y;
    cameraPos.y = cameraPos.y * cos(angle) - cameraPos.z * sin(angle);
    cameraPos.z = oldy * sin(angle) + cameraPos.z * cos(angle);

    cameraPos = (cameraPos * scale + vec4(0.0, 0.0, -2.0, 0.0));

    gl_Position = cameraToClipMatrix * cameraPos;

    theColor = a_color;
}

