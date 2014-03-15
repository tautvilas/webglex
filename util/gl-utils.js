var mat = {
    col2row: function(matrix) {
        var result = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                result[j * 4 + i] = matrix[i * 4 + j];
            }
        }
        return result;
    },

    xMat: function(m1, m2) {
        var result = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var ind = i * 4 + j;
                result[ind] = 0;
                for (var z = 0; z < 4; z++) {
                    result[ind] += m1[i * 4 + z] * m2[z * 4 + j];
                }
            }
        }
        return result;
    }
};

vec3 = {};
vec3.dot = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
vec3.cross = function(a, b) {
    return
    [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ]
};
vec3.length: function(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
vec3.norm: function(a) {
    var len = vec3.length(a);
    return [(a[0] / a),
            (a[1] / a),
            (a[2] / a)];
}

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
