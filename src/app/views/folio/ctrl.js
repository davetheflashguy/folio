(function (angular) {
  angular.module('folioApp').controller('FolioCtrl', ['$scope', 'FolioService', function($scope, FolioService){
    var promise = FolioService.getData();
        promise.then(function(data) {
          $scope.data = data;
          console.log("Folio Data: ", $scope.data);
        });
  }]);
})(window.angular);
