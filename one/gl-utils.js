var createShader = function(gl, filename, type) {
    var request = new XMLHttpRequest();
    request.open("get", filename, false);
    request.send();
    return loadShader(gl, request.responseText, type);
}

var loadShader = function(gl, shaderSource, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        lastError = gl.getShaderInfoLog(shader);
        error("*** Error compiling shader '" + shader + "':" + lastError);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

var error = function(msg) {
    if (window.console) {
        if (window.console.error) {
            window.console.error(msg);
        }
        else if (window.console.log) {
            window.console.log(msg);
        }
    } else {
        alert(msg);
    }
};

var createProgram = function(gl, shaders, opt_attribs, opt_locations) {
    var program = gl.createProgram();
    for (var ii = 0; ii < shaders.length; ++ii) {
        gl.attachShader(program, shaders[ii]);
    }
    if (opt_attribs) {
        for (var ii = 0; ii < opt_attribs.length; ++ii) {
            gl.bindAttribLocation(
            program,
            opt_locations ? opt_locations[ii] : ii,
            opt_attribs[ii]);
        }
    }
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        lastError = gl.getProgramInfoLog (program);
        error("Error in program linking:" + lastError);

        gl.deleteProgram(program);
        return null;
    }
    return program;
};
