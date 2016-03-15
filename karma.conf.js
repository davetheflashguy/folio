module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'src/lib/angular/angular.js',
      'src/lib/angular-mocks/angular-mocks.js',
      'src/lib/angular-animate/angular-animate.min.js',
      'src/lib/angular-aria/angular-aria.min.js',
      'src/lib/angular-material/angular-material.min.js',
      'src/lib/angular-ui-router/release/angular-ui-router.min.js',
      'src/app/**/*.js',
      'build/public/partials/partials.min.js'
    ]
  });
};
