module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'stylesheet/scss',
                    src: ['main.scss'],
                    dest: 'dist/stylesheet/',
                    ext: '.css'
                }]
            },
            options: {
                compress: false,
                sourcemap: 'none'
            }
        },
        watch: {
            scss: {
                files: ['stylesheet/scss/**/*.scss'],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
};