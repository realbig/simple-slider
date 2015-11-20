'use strict';
module.exports = function( grunt ) {

    // load all grunt tasks
    require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

    grunt.initConfig({

        pkg: grunt.file.readJSON( 'package.json' ),

        // Define watch tasks
        watch: {
            options: {
                livereload: true
            },
            admin: {
                files: [ 'build/js/admin/*.js' ],
                tasks: [ 'uglify:admin', 'notify:admin' ]
            },
            frontend: {
                files: [ 'build/js/frontend/*.js' ],
                tasks: [ 'uglify:frontend', 'notify:frontend' ]
            }
        },

        // Uglify and concatenate
        uglify: {
            options: {
                sourceMap: true
            },
            admin: {
                files: {
                    'js/admin/simple-slider-admin.js': [ 'build/js/admin/*.js' ]
                }
            },
            frontend: {
                files: {
                    'js/frontend/simple-slider.js': [ 'build/js/frontend/*.js' ]
                }
            }
        },

        notify: {
            admin: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JS Admin Complete'
                }
            },
            frontend: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JS Frontend Complete'
                }
            }
        }

    } );

    // Register our main task
    grunt.registerTask( 'default', ['watch'] );

};
