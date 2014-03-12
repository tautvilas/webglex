attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 theColor;

uniform mat4 cameraToClipMatrix;
uniform mat4 modelToCameraMatrix;

void main() {
    vec4 cameraPos = modelToCameraMatrix * a_position;
    vec4 worldPos = cameraToClipMatrix * cameraPos;
    gl_Position = worldPos;

    vec4 lightPos = vec4(0, 0, 2, 0);
    vec4 lightDirection = normalize(worldPos - lightPos);
    vec4 normal = normalize(worldPos);
    theColor = a_color * pow(dot(lightDirection, normal), 3.0);
}

