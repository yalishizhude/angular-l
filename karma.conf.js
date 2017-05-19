// Karma configuration
'use strict';
module.exports = function (config) {

  config.set({
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '.',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      "lib/angular/angular.min.js",
      "lib/oclazyload/dist/ocLazyLoad.min.js",
      "lib/angular-ui-router/release/angular-ui-router.min.js",
      "lib/angular-mocks/angular-mocks.js",
      'dev/**/*.css',
      'dev/**/*.js',
      'src/**/*.spec.js',
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8123,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      // 'Chrome',
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      "karma-coverage"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'dev/**/*.js': ['coverage']
    },
    // proxies: {
    //   '/': 'http://localhost:8000/'
    // },
    // urlRoot: '_karma_',
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }

    // Uncomment the following lines if you are using grunt's server to run the tests
    // URL root prevent conflicts with the site root
  });
};
