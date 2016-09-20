module.exports = function (grunt) {

    global.repo = 'git@github.com:binary-com/japanui.git';
    global.dist = 'dist';

    require('time-grunt')(grunt);

    require('load-grunt-config')(grunt, {
        configPath: process.cwd() + '/build',
        loadGruntTasks: {
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        }
    });

};
