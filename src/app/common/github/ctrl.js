(function (angular) {
  angular.module('folioApp').controller('GithubCtrl', [function(){
    var github = new Github({
      username: "davetheflashguy@gmail.com",
      password: "kljkljklj!",
      auth: "basic"
    });
    var options = {username: "davetheflashguy",password: "Angela0174!"};
    var user = github.getUser();
    var issues = github.getIssues("davetheflashguy", "reponame");
    console.log(issues);

    var search = github.getSearch("tetris+language:assembly&sort=stars&order=desc");
      search.repositories(options, function (err, repositories) {
        console.log(repositories);
      });

  }]);
})(window.angular);
