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
                    'src/BgSlideShow.js': 'src/BgSlideShow.coffee',
                    'demo/BgSlideShow.js': 'src/BgSlideShow.coffee'
                }
            }
        },
        uglify: {
            dist: {
                src: 'src/BgSlideShow.js',
                dest: 'dist/BgSlideShow.min.js'
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
                tasks: ['default']
            }
        }
    });
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['coffeelint', 'coffee', 'uglify']);
}
