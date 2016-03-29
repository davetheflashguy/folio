(function (angular) {
  angular.module('folioApp').controller('ResumeCtrl', ['$scope', 'ResumeService', function($scope, ResumeService){
    console.log("Resume Ctrl");
    var promise = ResumeService.getData();
        promise.then(function(data) {
          $scope.intro = data.intro;
          $scope.summary = data.summary;
          $scope.experience = data.experience;
        });
  }]);
})(window.angular);
