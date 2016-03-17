(function (angular) {
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('contact', {
      url: '/contact',
      templateUrl: '/partials/views/contact/view.html',
      controller: 'ContactCtrl'
    })
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  angular.module('folioApp').config(config);
})(window.angular);
