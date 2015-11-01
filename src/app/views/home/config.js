(function (angular) {
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/view.html',
      controller: 'HomeCtrl'
    })
  }
  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  angular.module('folioApp').config(config);
})(window.angular);
