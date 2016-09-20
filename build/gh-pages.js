module.exports = function (grunt) {
    return {
        all: {
            options: {
                base: global.dist,
                add: true,
                message: 'Auto-generated commit',
            },
            src: ['bundle' + (grunt.option('production') ? '' : '_beta') + '.js', 'index.html']
        }
    }
};
