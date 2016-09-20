module.exports = function(grunt) {
    return {
        dev_server: {
            command: 'webpack-dev-server --https',
            options: {
                stdout: true
            }
        },
    }
};
