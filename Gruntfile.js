// ================================================================================================
// Mathigon Gruntfile
// (c) 2015 Mathigon
// ================================================================================================


module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/* (c) 2016 Mathigon */\n',

        clean: ['build'],

        uglify: { app: {
            options: { banner: '<%= banner %>', mangle: false },
            files: [{
                expand: true,
                src: ['**/*.js', '!scripts/*-*.js'],
                cwd: 'src',
                dest: 'build',
                ext: '.min.js'
            }]
        }},

        cssmin: { app: {
            options: { banner: '<%= banner %>' },
            files: [{
                expand: true,
                src: '**/*.css',
                cwd: 'src',
                dest: 'build',
                ext: '.min.css'
            }]
        }},

        bake: { app: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*html', '!**/templates/*'],
                dest: 'build'
            }]
        }},

        htmlmin: { app: {
            options: {
                keepClosingSlash: true,
                removeComments: true,
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                collapseBooleanAttributes: true
            },
            files: [{
                expand: true,
                cwd: 'build',
                src: ['**/*html'],
                dest: 'build'
            }]
        }},

        copy: { app: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*', '!**/*html'],
                dest: 'build'
            }]
        }},

        buildcontrol: { app: {
            options: {
                dir: 'build',
                branch: 'gh-pages',
                commit: true,
                push: true,
                force: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%',
                remote: 'git@github.com:Mathigon/world-of-mathematics.git'
            }
        }}

    });

    // Dynamically load npm tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'bake', 'htmlmin', 'copy']);
};
