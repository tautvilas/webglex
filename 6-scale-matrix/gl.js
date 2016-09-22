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
        0, 0.5, 0, 0,
        0, 0, z1, -1,
        0, 0, z2, 0
    ];
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    timeLocation = gl.getUniformLocation(program, "time");
    gl.uniform1f(timeLocation, time % 2000);

    time += 15;

    gl.drawArrays(gl.TRIANGLES, 0, 36);
}
