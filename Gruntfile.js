//noinspection JSLint
module.exports = function (grunt) {
    //noinspection JSUnresolvedFunction
    grunt.initConfig({
        coffeelint: {
            app: ['src/*.coffee']
        },
        coffee: {
            compileWithMaps: {
                options: {
                    sourceMap: true
                },
                files: {
                    'src/BgSlideShow.js': 'src/BgSlideShow.coffee'
                }
            }
        },
        uglify: {
            dist: {
                src: 'src/BgSlideShow.js',
                dest: 'dist/BgSlideShow.min.js'
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, flatten: true, src: ['src/BgSlideShow.js'], dest: 'demo/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['src/BgSlideShow.js.map'], dest: 'demo/', filter: 'isFile'}
                ]
            }
        },
        'gh-pages': {
            options: {
                base: 'demo'
            },
            src: ['**']
        },
        watch: {
            src: {
                files: ['src/*.coffee'],
                tasks: ['_watch']
            }
        }
    });
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['coffeelint', 'coffee', 'copy', 'uglify']);
    grunt.registerTask('_watch', ['coffeelint', 'coffee']);
}
