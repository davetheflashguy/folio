(function (angular) {
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('resume', {
      url: '/resume',
      templateUrl: '/partials/views/resume/view.html',
      controller: 'ResumeCtrl'
    })
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  angular.module('folioApp').config(config);
})(window.angular);
