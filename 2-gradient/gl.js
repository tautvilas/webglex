var square = new Float32Array([
    -1.0, -1.0,
    1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
    1.0, -1.0,
    1.0,  1.0
]);

function start() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("experimental-webgl");

    var vertexShader = createShader(gl, "vertex.vert", gl.VERTEX_SHADER);
    var fragmentShader = createShader(gl, "fragment.frag", gl.FRAGMENT_SHADER);
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);


    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, square, gl.STATIC_DRAW);

    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

