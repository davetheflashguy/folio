var app = angular.module('folioApp', ['ui.router',
                                      'ngMaterial'])

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'partials/home.html'
  })
  .state('folio', {
    url: '/folio',
    templateUrl: 'partials/folio.html'
  })
}]);

app.controller('AppCtrl', ['$scope', function($scope){

}]);
