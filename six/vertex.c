//precision mediump float;

attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 theColor;

uniform float time;
uniform float zNear;
uniform float zFar;
uniform float frustumScale;

void main() {
    //float scale = (mod(time, 1000.0)) / 1000.0;
    float scale = 1.0;
    float angle = 3.14 * (mod(time, 1000.0) / 1000.0);
    vec4 cameraPos = a_position;
    cameraPos.y = cameraPos.y * cos(angle) - cameraPos.z * sin(angle);
    cameraPos.z = cameraPos.y * sin(angle) + cameraPos.z * cos(angle);

    cameraPos = (cameraPos * scale + vec4(1, 1, -3.0, 0.0));

    vec4 clipPos;

    clipPos.xy = cameraPos.xy;

    clipPos.z = cameraPos.z * (zNear + zFar) / (zNear - zFar);
    clipPos.z += 2.0 * zNear * zFar / (zNear - zFar);

    clipPos.w = -cameraPos.z;
    gl_Position = clipPos;

    theColor = a_color;
}

