attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 theColor;

void main() {
    vec4 camera_pos = a_position + vec4(0.5, 0.5, 0, 0);
//    camera_pos.w = -a_position.z;
    gl_Position = camera_pos;
    theColor = a_color;
}

