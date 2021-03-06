var time = 0;
var angle1 = 0;
var angle2 = 0;
var angle3 = 0;
var xtrans = 0;

function start() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");

    var vertexShader = createShader(gl, "vertex.vert", gl.VERTEX_SHADER);
    var fragmentShader = createShader(gl, "fragment.frag", gl.FRAGMENT_SHADER);
    var program = createProgram(gl, [vertexShader, fragmentShader]);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, cube, gl.STATIC_DRAW);

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CW);

    gl.enable(gl.DEPTH_TEST);

    setInterval(function() {
        angle1 = document.getElementsByName("angle1")[0].value * Math.PI / 180;
        angle2 = document.getElementsByName("angle2")[0].value * Math.PI / 180;
        angle3 = document.getElementsByName("angle3")[0].value * Math.PI / 180;
        xtrans = document.getElementsByName("xtrans")[0].value;
        display(gl, program, buffer);
    }, 15);
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


    var matrixLocation = gl.getUniformLocation(program, "cameraToClipMatrix");
    var z1 = (3 + 1) / (1 - 3);
    var z2 = (2 * 3 * 1) / (1 - 3);
    var matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, z1, z2,
        0, 0, -1, 0
    ];
    gl.uniformMatrix4fv(matrixLocation, false, mat.col2row(matrix));

    matrixLocation = gl.getUniformLocation(program, "modelToCameraMatrix");
    // x
    var matrix1 = [
        1, 0, 0, 0,
        0, Math.cos(angle1), -Math.sin(angle1), 0,
        0, Math.sin(angle1), Math.cos(angle1), 0,
        0, 0, 0, 1
    ];
    // y
    var matrix2 = [
        Math.cos(angle2), 0, Math.sin(angle2), 0,
        0, 1, 0, 0,
        -Math.sin(angle2), 0, Math.cos(angle2), 0,
        0, 0, 0, 1
    ];
    // z
    var matrix3 = [
        Math.cos(angle3), -Math.sin(angle3), 0, 0,
        Math.sin(angle3), Math.cos(angle3), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    var translation = [
        1, 0, 0, xtrans,
        0, 1, 0, 0,
        0, 0, 1, -2,
        0, 0, 0, 1
    ];
    var tmpMat = mat.xMat(matrix1, matrix2);
    tmpMat = mat.xMat(tmpMat, matrix3);
    var camMat = mat.xMat(translation, tmpMat);
    //var camMat = mat.xMat(tmpMat, translation);
    //console.log(tmpMat);
    //console.log(camMat);
    gl.uniformMatrix4fv(matrixLocation, false, mat.col2row(camMat));

    time += 15;

    gl.drawArrays(gl.TRIANGLES, 0, 36);
}
