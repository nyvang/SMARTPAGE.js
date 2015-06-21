module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/* Name: <%= pkg.name %> Version: <%= pkg.version %> Date: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
            'dist/<%= pkg.name %>.<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        browser: true,
        eqnull: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);
  grunt.registerTask('default', ['concat', 'uglify']);

};