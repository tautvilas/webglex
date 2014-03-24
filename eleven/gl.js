var time = 0;
var angleX = 0;
var angleY = 0;
var angleZ = 0;
var xtrans = 0;
var orientation = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]

function rotX(angle) {
    return [
        1, 0, 0, 0,
        0, Math.cos(angle), -Math.sin(angle), 0,
        0, Math.sin(angle), Math.cos(angle), 0,
        0, 0, 0, 1
    ]
}
function rotY(angle) {
    return [
        Math.cos(angle), 0, Math.sin(angle), 0,
        0, 1, 0, 0,
        -Math.sin(angle), 0, Math.cos(angle), 0,
        0, 0, 0, 1
    ]
}
function rotZ(angle) {
    return [
        Math.cos(angle), -Math.sin(angle), 0, 0,
        Math.sin(angle), Math.cos(angle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}

function start() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");

    var vertexShader = createShader(gl, "vertex.c", gl.VERTEX_SHADER);
    var fragmentShader = createShader(gl, "fragment.c", gl.FRAGMENT_SHADER);
    var program = createProgram(gl, [vertexShader, fragmentShader]);

    // calculate normals for triangles
    for (var i = 0; i < 12 * 12; i+=12) {
        var a =  [cube[i], cube[i+1], cube[i+2]]
        var b =  [cube[i+4], cube[i+5], cube[i+6]]
        var c =  [cube[i+8], cube[i+9], cube[i+10]]
        var cross = vec3.cross(vec3.sub(b, a), vec3.sub(c, a));
        var normal = vec3.norm(cross);
        normal.push(1);
        for (var j = 0; j < 3; j++) {
            cube.push(normal[0], normal[1], normal[2], normal[3]);
        }
    }
    //console.log(cube);
    cube = new Float32Array(cube);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, cube, gl.STATIC_DRAW);

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CW);

    gl.enable(gl.DEPTH_TEST);

    setInterval(function() {
        xtrans = document.getElementsByName("xtrans")[0].value;
        display(gl, program, buffer);
    }, 15);

    document.body.onkeydown = function(e) {
        switch(e.keyCode) {
        case 38: // up
            orientation = mat.xMat(orientation, rotX(0.1));
            break;
        case 40: // down
            orientation = mat.xMat(orientation, rotX(-0.1));
            break;
        case 37: // left
            orientation = mat.xMat(orientation, rotY(0.1));
            break;
        case 39: // right
            orientation = mat.xMat(orientation, rotY(-0.1));
            break;
        case 100: // num left
            orientation = mat.xMat(orientation, rotZ(0.1));
            break;
        case 102: // num right
            orientation = mat.xMat(orientation, rotZ(-0.1));
            break;
        }
    }
}

function display(gl, program, buffer) {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.GL_COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 4, gl.FLOAT, false, 0, 0);

    var colorLocation = gl.getAttribLocation(program, "a_color");
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 576);

    var normalLocation = gl.getAttribLocation(program, "a_normal");
    gl.enableVertexAttribArray(normalLocation);
    gl.vertexAttribPointer(normalLocation, 4, gl.FLOAT, false, 0, 1152);


    var matrixLocation = gl.getUniformLocation(program, "cameraToClipMatrix");
    var z1 = (3 + 1) / (1 - 3);
    var z2 = (2 * 3 * 1) / (1 - 3);
    var matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, z1, z2,
        0, 0, -1, 0
    ]
    gl.uniformMatrix4fv(matrixLocation, false, mat.col2row(matrix));

    matrixLocation = gl.getUniformLocation(program, "modelToCameraMatrix");
    var scale = [
        0.5, 0, 0, 0,
        0, 0.5, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
    var translation = [
        1, 0, 0, xtrans / 2,
        0, 1, 0, 0,
        0, 0, 1, -2,
        0, 0, 0, 1
    ]
    var camMat = mat.xMat(translation, orientation);
    camMat = mat.xMat(camMat, scale);
    //var camMat = mat.xMat(tmpMat, translation);
    //console.log(tmpMat);
    //console.log(camMat);
    gl.uniformMatrix4fv(matrixLocation, false, mat.col2row(camMat));

    time += 15;

    gl.drawArrays(gl.TRIANGLES, 0, 36);
}
