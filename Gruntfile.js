module.exports = function(grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    root: {
      app: 'app/assets',
      build: 'public/assets',
    },

    clean: {
      files: '<%= root.build %>'
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= root.app %>',
          dest: '<%= root.build %>',
          src: [
            '*.{ico,png,txt}'
          ]
        }]
      },
      scripts: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= root.app %>/scripts',
          dest: '<%= root.build %>/scripts',
          src: [
            '{,*/}*.*'
          ]
        }]
      }
    },

    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },

    stylus: {
      options: {
        paths: ['./bower_components'],
        use: [
          require('fluidity'),
          function() {
            return require('autoprefixer-stylus')({browsers: 'last 2 versions'});
          }
        ],
        'include css': true,
      },
      compile: {
        files: {
          '<%= root.build %>/styles/main.css': '<%= root.app %>/styles/main.styl'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= root.app %>/scripts/{,*/}{,*/}*.js',
        // '<%= root.test %>/specs/{,*/}{,*/}*.js',
        // '<%= root.test %>/runner.js'
      ]
    },

    // requirejs: {
    //   compile: {
    //     options: {
    //       almond: true,
    //       wrap: true,
    //       useStrict: true,
    //       removeCombined: true,
    //       baseUrl: './',
    //       mainConfigFile: '<%= root.app %>/scripts/main.js',
    //       replaceRequireScript: [{
    //         files: ['<%= root.dist %>/index.html'],
    //         module: 'main'
    //       }],
    //       modules: [{name: 'main'}],
    //       appDir: '<%= root.app %>/scripts/',
    //       dir: '<%= root.dist %>/scripts/',
    //     }
    //   }
    // },

    // imagemin: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= root.app %>/images/',
    //       src: ['**/*.{png,jpg,gif}'],
    //       dest: '<%= root.dist %>/images/'
    //     }]
    //   }
    // },

    // svgmin: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= root.app %>/images/',
    //       src: ['**/*.svg'],
    //       dest: '<%= root.dist %>/images/'
    //     }]
    //   }
    // },

    watch: {
      styles: {
        files: [
          '<%= root.app %>/styles/{,*/}{,*/}*.styl'
        ],
        tasks: ['stylus']
      },
      scripts: {
        options: {
          livereload: true
        },
        files: '<%= jshint.all %>',
        tasks: ['jshint', 'copy:scripts']
      }
    },

    concurrent: {
      server: [
        'copy:scripts',
        'stylus'
      ]
    }

  });

  grunt.registerTask('server', [
    'clean',
    'bower',
    'concurrent:server',
    'watch'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'mocha'
  ]);

  grunt.registerTask('default', [
    'server'
  ]);

};
