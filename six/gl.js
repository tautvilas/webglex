var time = 0;

function start() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");

    var vertexShader = createShader(gl, "vertex.c", gl.VERTEX_SHADER);
    var fragmentShader = createShader(gl, "fragment.c", gl.FRAGMENT_SHADER);
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

    var frustumScaleUnif = gl.getUniformLocation(program, "frustumScale");
    var zNearUnif = gl.getUniformLocation(program, "zNear");
    var zFarUnif = gl.getUniformLocation(program, "zFar");

    gl.uniform1f(frustumScaleUnif, 1.0);
    gl.uniform1f(zNearUnif, 1.0);
    gl.uniform1f(zFarUnif, 3.0);

    timeLocation = gl.getUniformLocation(program, "time");
    gl.uniform1f(timeLocation, time);
    /*
    scaleLocation = gl.getUniformLocation(program, "scale");
    gl.uniform1f(scaleLocation, 2);
    */

    time += 15;

    gl.drawArrays(gl.TRIANGLES, 0, 36);
}
