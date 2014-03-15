require('../util/gl-utils.js');
var assert = require('assert');

describe('vec3', function() {
    it('should calculate length', function() {
        var length = vec3.length([6, 8, 0]);
        assert.equal(10, length);
    });

    // z away = negative
    it('should calculate cross product', function() {
        var cross = vec3.cross([0, 0, -1], [-1, 0, 0]);
        assert.deepEqual([0, 1, 0], cross);
    });

    it('should calculate normal', function() {
        var cross = vec3.norm([0, 0, -1]);
        assert.deepEqual([0, 0, -1], cross);
    });
});
