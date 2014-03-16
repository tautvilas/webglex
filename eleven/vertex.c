attribute vec4 a_position;
attribute vec4 a_color;
attribute vec4 a_normal;

varying vec4 theColor;

uniform mat4 cameraToClipMatrix;
uniform mat4 modelToCameraMatrix;

void main() {
    vec4 cameraPos = modelToCameraMatrix * a_position;
    vec4 worldPos = cameraToClipMatrix * cameraPos;
    gl_Position = worldPos;

    vec4 lightPos = vec4(-2, 2, 1, 0);
    vec4 lightDirection = normalize(cameraPos - lightPos);
    vec4 normal = normalize(modelToCameraMatrix * a_normal);
    /*
    vec4 normal = normalize(worldPos);
    */
    //theColor = a_color * pow(dot(lightDirection, normal), 2.0);
    theColor = a_color;
}

