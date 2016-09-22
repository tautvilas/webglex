var square = new Float32Array([
    -1.0, -1.0,
    1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
    1.0, -1.0,
    1.0,  1.0
]);

var time = 0;

function start() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");

    var vertexShader = createShader(gl, "vertex.vert", gl.VERTEX_SHADER);
    var fragmentShader = createShader(gl, "fragment.frag", gl.FRAGMENT_SHADER);
    var program = createProgram(gl, [vertexShader, fragmentShader]);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, square, gl.STATIC_DRAW);

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
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    timeLocation = gl.getUniformLocation(program, "time");
    gl.uniform1f(timeLocation, time % 1000);
    scaleLocation = gl.getUniformLocation(program, "scale");
    gl.uniform1f(scaleLocation, 2);

    time += 15;

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
