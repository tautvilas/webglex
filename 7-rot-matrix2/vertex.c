attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 theColor;

uniform mat4 cameraToClipMatrix;
uniform mat4 modelToCameraMatrix;

void main() {
    vec4 cameraPos = modelToCameraMatrix * a_position;
    gl_Position = cameraToClipMatrix * cameraPos;

    theColor = a_color;
}

