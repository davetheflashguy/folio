(function(){
  'use-strict';
  function AppCtrl($scope) {

  }

  function config($stateProvider, $urlRouterProvider, HomeCtrl) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home', {
      url: '/home',
      views: {
        'main@' : {
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'HomeCtrl'    
        }
      }

    })
    .state('folio', {
      url: '/folio',
      templateUrl: 'partials/folio.html'
    })
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  angular
    .module('folioApp')
    .config(config)
    .controller('AppCtrl', AppCtrl);
})();
