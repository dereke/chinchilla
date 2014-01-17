module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-pogo');

  grunt.registerTask('default', 'pogo');

  grunt.initConfig({
    pogo : {
      compile: {
        files: [{
          expand : true,
          cwd: '.',
          src: [
            '**/*.pogo',
            '!node_modules/**/*.pogo',
            '!test/**/*.pogo'
          ],
          dest: 'build/',
          ext: '.js'
        }],
      }
    },

    watch: {
      all: {
        files: ['lib/**/*.pogo'],
        tasks: 'pogo'
      }
    }
  });
};