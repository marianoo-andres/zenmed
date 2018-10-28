module.exports = (grunt) => {

  // Use node-sass for sass compilation
  const sass = require('node-sass');

  // Tasks configuration
  grunt.initConfig({
    clean: {
      build: ['dist/']
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: '*.html',
            dest: 'dist/'
          }
        ]
      }
    },
    browserify: {
      build: {
        options: {
          transform: [['babelify', {presets: ['env']}]]
        },
        files: {
          'src/app.bundle.js': ['src/app.js']
        }
      }
    },
    uglify: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: 'app.bundle.js',
            dest: 'dist/',
            ext: '.min.js'
          }
        ]
      }
    },
    sass: {
      build: {
        options: {
          implementation: sass,
          sourceMap: true,
          outputStyle: 'compressed'
        },
        files: {
          'dist/css/style.min.css': ['src/sass/main.scss']
        }
      }
    },
    connect: {
      build: {
        options: {
          base: 'dist/',
          hostname: 'localhost',
          port: 8099,
          open: true,
          livereload: 9908
        }
      }
    },
    watch: {
      options: {
        livereload: 9908
      },
      sass: {
        files: ['src/sass/'],
        tasks: ['sass:build']
      },
      js: {
        files: ['src/app.js', 'src/js/**/*.js'],
        tasks: ['browserify:build', 'uglify:build']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy:build']
      }
    }
  });

  // Load grunt tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Main task
  grunt.registerTask('default', ['files', 'scripts', 'styles', 'launch']);

  // Modular tasks
  grunt.registerTask('files', ['clean:build', 'copy:build']);
  grunt.registerTask('scripts', ['browserify:build', 'uglify:build']);
  grunt.registerTask('styles', ['sass:build']);
  grunt.registerTask('launch', ['connect:build', 'watch']);
};