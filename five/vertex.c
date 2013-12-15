attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 theColor;
uniform float zNear;
uniform float zFar;
uniform float frustumScale;

void main() {
    vec4 cameraPos = (a_position * 0.5 + vec4(0.6, 0.6, -2.0, 0.0));
    vec4 clipPos;

    clipPos.xy = cameraPos.xy;

    clipPos.z = cameraPos.z * (1.0 + 3.0) / (1.0 - 3.0);
    clipPos.z += 2.0 * 1.0 * 3.0 / (1.0 - 3.0);

    clipPos.w = -cameraPos.z;
    gl_Position = clipPos;

    theColor = a_color;
}

