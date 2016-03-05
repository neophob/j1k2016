module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
          build: {
              src: '<%= pkg.main %>',
              dest: '<%= pkg.name %>.min.js'
          }
      },
      jscrush: {
          build: {
              src: '<%= pkg.name %>.min.js',
              dest: '<%= pkg.name %>.crushed.js'
          }
      },
      'http-server': {
          'serve': {
              root: '.',
              port: 8000,
              host: '127.0.0.1',
              cache: 0,
              showDir : true,
              autoIndex: true,
              defaultExt: "html",
              runInBackground: false
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-jscrush');
  
  grunt.registerTask('default', ['uglify', 'jscrush']);
  grunt.registerTask('serve', ['http-server']);

};
