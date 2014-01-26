(function () {
  'use strict';

  // Main page controller
  angular.module('meanr')
    .controller('ArticlesListCtrl', function ($scope, Global, Restangular, Go, Paginator) {

      $scope.global = Global;

      $scope.go = Go;

      var items;

      var listArticles = function () {
        Restangular.one('articles').get().then(function (articles) {
          $scope.articles = _.toArray(articles);

          items = _.toArray(articles);
          $scope.searchPaginator = new Paginator(fetchFunction, 3, items.length);

        });
      };

      var fetchFunction = function (offset, limit, callback) {
        callback(items.slice(offset, offset + limit));
      };



      listArticles();

    });

})();
