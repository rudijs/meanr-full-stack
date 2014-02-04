'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    project: {
      app: 'app',
      dist: 'dist'
    },

    watch: {
      scripts: {
        files: [
          // config
          'config/*.js',
          'config/**/*.js',
          'config/**/*.json',
          // angularjs
          'test/spec/**/*.js',
          'test/e2e/*.js',
          'app/scripts/*.js',
          'app/scripts/**/*.js',
          'app/scripts/**/**/*.js',
          'app/styles/*.css',
          'app/views/*.html',
          'app/views/**/*.html',
          // expressjs
          'www/**/*.js',
          'www/views/*.html',
          'www/views/**/*.html',
          'test/unit/**/*.js'
        ],
        //tasks: ['jshint', 'test'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },

    jshint: {
      // JSHint separated into:
      // Environmant
      // Style
      // Quality
      options: {
        'node': true,
        'browser': true,

        'indent': 2,
        'laxcomma': true,

        'strict': true,
        'eqeqeq': true,
        'immed': true,
        'latedef': true,
        'newcap': true,
        'curly': true,
        'noarg': true,
        'plusplus': true,
        'quotmark': 'single',
        'undef': true,
        'unused': true,
        'trailing': true,
        'expr': true,
        globals: {
          'process': false,
          'db': false,
          'expect': false,
          'element': false,
          'input': false,
          'next': false,
          'exports': false,
          'require': false,
          'inject': false,
          'it': false,
          'beforeEach': false,
          'afterEach': false,
          'pause': false,
          'sleep': false,
          'module': false,
          'angular': false,
          'describe': false,
          'browser': true,
          '$': true,
          '_': true,
          'by': false
        },

        ignores: [
          'app/scripts/translations.js'
        ]
      },

      all: [
        // config
        'Gruntfile.js',
        'config/*.js',
        'config/**/*.js',
        // angularjs
        'app/scripts/*.js',
        'app/scripts/**/*.js',
        'app/scripts/**/**/*.js',
        // node
        'www/**/*.js',
        // tests
        'test/api/*.js',
        'test/e2e/*.js',
        'test/spec/**/*.js',
        'test/spec/**/**/*.js',
        'test/unit/**/*.js'
      ]
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['config', 'www'],
          nodeArgs: ['--debug'],
          cwd: __dirname
        }
      }
    },

    concurrent: {
      server: {
        tasks: [
          'nodemon',
          'watch'
          //'karma:unit'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'htmlmin'
      ]
    },

    // BUILD RELEASE

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= project.dist %>/*'
            ]
          }
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      //html: '<%= project.app %>/index.html',
      html: 'www/views/index.html',
      options: {
        root: 'app',
        dest: '<%= project.dist %>'
      }
    },

    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [
          {
            expand: true,
            cwd: '<%= project.app %>',
            src: ['views/*.html', 'views/**/*.html'],
            dest: '<%= project.dist %>'
          },
          {
            expand: true,
            cwd: 'www/views',
            src: ['index.html'],
            dest: '<%= project.dist %>'
          }
        ]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/concat/scripts',
            src: '*.js',
            dest: '.tmp/concat/scripts'
          }
        ]
      }
    },

    copy: {
      configs: {
        files: [
          {
            expand: true,
            cwd: 'config/example/',
            dest: 'config/',
            src: [
              'config.js'
            ]
          },
          {
            expand: true,
            cwd: 'config/env/example/',
            dest: 'config/env/',
            src: [
              'development.json',
              'production.json',
              'test.json',
              'travis.json',
              'ci.json'
            ]
          },
          {
            expand: true,
            cwd: 'chef/kitchen/.chef/example/',
            dest: 'chef/kitchen/.chef/',
            src: [
              'knife.rb'
            ]
          },
          {
            expand: true,
            cwd: 'chef/kitchen/data_bags/users/example/',
            dest: 'chef/kitchen/data_bags/users/',
            src: [
              'deploy.json'
            ]
          },
          {
            expand: true,
            cwd: 'chef/kitchen/nodes/example/',
            dest: 'chef/kitchen/nodes/',
            src: [
              'dev.meanr.com.json',
              'staging.meanr.com.json',
              'qa.meanr.com.json',
              'meanr.com.json'
            ]
          }
        ]
      },

      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= project.app %>',
            dest: '<%= project.dist %>',
            src: [
              '*.{ico,png,txt}',
              '.htaccess',
              'bower_components/**/*',
              'images/{,*/}*.{webp}',
              'fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= project.dist %>/images',
            src: [
              'generated/*'
            ]
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= project.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      statics: {
        files: [
          {
            expand: true,
            cwd: '<%= project.app %>/styles',
            dest: '<%= project.dist %>/styles',
            src: [
              'foundation-icons.css',
              'foundation-icons.eot',
              'foundation-icons.svg',
              'foundation-icons.ttf',
              'foundation-icons.woff'
            ]
          },
          {
            expand: true,
            cwd: '<%= project.app %>/images',
            dest: '<%= project.dist %>/images',
            src: ['**']
          },
          {
            expand: true,
            cwd: '<%= project.app %>/images/rideshares',
            dest: '<%= project.dist %>/images/rideshares',
            src: ['.gitignore']
          }
        ]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= project.dist %>/scripts/{,*/}*.js'
          ]
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= project.dist %>/{,*/}*.html'],
      css: ['<%= project.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= project.dist %>']
      }
    },

    // I18N
    nggettext_extract: {
      pot: {
        files: {
          'po/template.pot': [
            'app/scripts/controllers/*.js',
            'app/scripts/controllers/**/*.js',

            'app/views/*.html',
            'app/views/**/*.html',

            'www/views/articles/*.html'
          ]
        }
      }
    },

    nggettext_compile: {
      all: {
        files: {
          'app/scripts/translations.js': ['po/*.po']
        }
      }
    },

    // TESTING

    karma: {
      unit: {
        configFile: 'config/karma.conf.js'
      },
      continuous: {
        configFile: 'config/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    mochaTest: {
      test: {
        options: {
          colors: false,
          reporter: 'spec',
          require: 'config/coverage/blanket'
        },
        src: [
          'test/unit/**/*.spec.js'
        ]
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          captureFile: 'test/coverage/coverage.html'
        },
        src: [
          'www/controllers/*.js',
          'www/models/*.js',
          'www/utils/*.js'
        ]
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      travis: {
        NODE_ENV: 'travis'
      },
      ci: {
        NODE_ENV: 'ci'
      },
      development: {
        NODE_ENV: 'development'
      },
      staging: {
        NODE_ENV: 'staging'
      },
      qa: {
        NODE_ENV: 'qa'
      },
      production: {
        NODE_ENV: 'production'
      }
    },

    protractor: {
      options: {
        configFile: 'node_modules/protractor/referenceConf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      your_target: {
        options: {
          configFile: 'config/e2e.conf.js', // Target-specific config file
          args: {} // Target-specific arguments
        }
      }
    },

    availabletasks: {
      tasks: {}
    }

  });

  // Continuous CI node.js tests use dot reporter
  if (process.env.NODE_ENV === 'travis') {
    grunt.config('mochaTest.test.options.reporter', 'dot');
  }

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    //'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'copy:statics',
    //'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('init', ['copy:configs']);

  grunt.registerTask('default', 'availabletasks');

  grunt.registerTask('serve', ['concurrent:server']);

  grunt.registerTask('test', ['env:test', 'mochaTest']);
  grunt.registerTask('test-travis', ['env:travis', 'mochaTest']);
  grunt.registerTask('test-ci', ['env:ci', 'mochaTest']);

  grunt.registerTask('e2e', ['protractor']);
  grunt.registerTask('e2e-development', ['env:development', 'protractor']);
  grunt.registerTask('e2e-staging', ['env:staging', 'protractor']);
  grunt.registerTask('e2e-qa', ['env:qa', 'protractor']);
  grunt.registerTask('e2e-production', ['env:production', 'protractor']);

};
