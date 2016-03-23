(function (angular) {
  angular.module('folioApp').controller('ContactCtrl', ['$scope', function($scope){
    $scope.user = {
          name: '',
          subject: '',
          email: '',
          phone: ''
        };

    $scope.availableSubjects = ['Saying Hello', 'Job Opportunity', 'Hate Mail'];
  }]);
})(window.angular);
