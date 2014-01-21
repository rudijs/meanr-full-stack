(function () {
  'use strict';

  // Main page controller
  angular.module('meanr')
    .controller('ArticlesShowCtrl', function ($scope, Global, $routeParams, Go, Restangular) {

      $scope.global = Global;

      $scope.go = Go;

      Restangular.one('articles').one($routeParams.articleId).get().then(function (article) {
        $scope.article = article;
      });

    });

})();
