attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 theColor;
uniform float zNear;
uniform float zFar;
uniform float frustumScale;

void main() {
    vec4 cameraPos = (a_position + vec4(0.3, 0.3, 0.0, 0.0));
    vec4 clipPos;

    /*
    clipPos.xy = cameraPos.xy * 1.0;

    clipPos.z = cameraPos.z * (1.0 + 3.0) / (1.0 - 3.0);
    clipPos.z += 2.0 * 1.0 * 3.0 / (1.0 - 3.0);

    clipPos.z = 0.0;
    clipPos.w = -cameraPos.z;
    */

    float zToDivideBy = (2.0 + -cameraPos.z) * 1.0;
    cameraPos.xy = cameraPos.xy / zToDivideBy;
    cameraPos.w = 1.0;
    gl_Position = cameraPos;

    theColor = a_color;
}

