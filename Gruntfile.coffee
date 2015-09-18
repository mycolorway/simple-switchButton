module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'
    name: "switchButton"

    sass:
      styles:
        options:
          style: 'expanded'
          sourcemap: 'none'
        files:
          'styles/switchButton.css': 'styles/switchButton.scss'

    coffee:
      src:
        options:
          bare: true
        files:
          'lib/switchButton.js': 'src/switchButton.coffee'
      spec:
        files:
          'spec/switchButton-spec.js': 'spec/switchButton-spec.coffee'

    umd:
      all:
        src: 'lib/switchButton.js'
        template: 'umd.hbs'
        amdModuleId: 'simple-switchButton'
        objectToExport: 'switchButton'
        globalAlias: 'switchButton'
        deps:
          'default': ['$', 'SimpleModule']
          amd: ['jquery', 'simple-module']
          cjs: ['jquery', 'simple-module']
          global:
            items: ['jQuery', 'SimpleModule']
            prefix: ''

    watch:
      styles:
        files: ['styles/*.scss']
        tasks: ['sass']
      spec:
        files: ['spec/**/*.coffee']
        tasks: ['coffee:spec']
      src:
        files: ['src/**/*.coffee']
        tasks: ['coffee:src', 'umd']
      jasmine:
        files: ['lib/**/*.js', 'spec/**/*.js']
        tasks: 'jasmine'

    jasmine:
      test:
        src: ['lib/**/*.js']
        options:
          outfile: 'spec/index.html'
          styles: 'styles/switchButton.css'
          specs: 'spec/switchButton-spec.js'
          vendor: [
            'vendor/bower/jquery/dist/jquery.min.js'
            'vendor/bower/simple-module/lib/module.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['sass', 'coffee', 'umd', 'jasmine', 'watch']
  grunt.registerTask 'test', ['sass', 'coffee', 'umd', 'jasmine']
