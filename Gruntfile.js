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
            admin_js: {
                files: [ 'build/js/admin/*.js' ],
                tasks: [ 'uglify:admin_js', 'notify:admin_js' ]
            },
            frontend_js: {
                files: [ 'build/js/frontend/*.js' ],
                tasks: [ 'uglify:frontend_js', 'notify:frontend_js' ]
            },
            frontend_sass: {
                files: [ 'build/sass/frontend/*.scss' ],
                tasks: [ 'sass:frontend_sass', 'autoprefixer:frontend_sass', 'notify:frontend_sass' ]
            }
        },

        // SASS
        sass: {
            options: {
                sourceMap: true
            },
            frontend_sass: {
                files: {
                    'css/simple-slider.css': 'build/sass/frontend/simple-slider.scss'
                }
            }
        },

        // Auto prefix our CSS with vendor prefixes
        autoprefixer: {
            options: {
                map: true
            },
            frontend_sass: {
                src: 'css/simple-slider.css'
            }
        },

        // Uglify and concatenate
        uglify: {
            options: {
                sourceMap: true
            },
            admin_js: {
                files: {
                    'js/admin/simple-slider-admin.js': [ 'build/js/admin/*.js' ]
                }
            },
            frontend_js: {
                files: {
                    'js/frontend/simple-slider.js': [ 'build/js/frontend/*.js' ]
                }
            }
        },

        notify: {
            admin_js: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JS Admin Complete'
                }
            },
            frontend_js: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'JS Frontend Complete'
                }
            },
            frontend_sass: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'SASS Frontend Complete'
                }
            }
        }

    } );

    // Register our main task
    grunt.registerTask( 'default', ['watch'] );

};
