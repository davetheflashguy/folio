(function (angular) {
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('folio', {
      url: '/folio',
      templateUrl: 'views/folio/view.html',
      controller: 'FolioCtrl'
    })
  }

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  angular.module('folioApp').config(config);
})(window.angular);
