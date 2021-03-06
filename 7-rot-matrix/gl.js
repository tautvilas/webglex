var time = 0;

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

    var angle = (time % 2000) / 2000 * 6.28;
    matrixLocation = gl.getUniformLocation(program, "modelToCameraMatrix");
    var matrix2 = [
        1, 0, 0, 0,
        0, Math.cos(angle), -Math.sin(angle), 0,
        0, Math.sin(angle), Math.cos(angle), -2,
        0, 0, 0, 1
    ];
    var matrix3 = [
        Math.cos(angle), -Math.sin(angle), 0, 0,
        Math.sin(angle), Math.cos(angle), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    gl.uniformMatrix4fv(matrixLocation, false, mat.col2row(mat.xMat(matrix2, matrix3)));

    time += 15;

    gl.drawArrays(gl.TRIANGLES, 0, 36);
}
