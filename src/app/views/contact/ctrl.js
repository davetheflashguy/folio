(function (angular) {
  angular.module('folioApp').controller('ContactCtrl', ['$scope', function($scope){
    $scope.user = {
          name: 'John Doe',
          email: '',
          phone: '',
          address: 'Mountain View, CA',
          donation: 19.99
        };

    $scope.availableSujects = ['Saying Hello', 'Job Opportunity', 'Hate Mail'];
  }]);
})(window.angular);
