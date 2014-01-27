(function () {
  'use strict';

  // Main page controller
  angular.module('meanr')
    .controller('ArticlesListCtrl', function ($scope, Global, Restangular, Go, Paginator) {

      $scope.global = Global;

      $scope.go = Go;

      // items will be an array to store fetched articles
      var items;

      // paginator will slice from items and paginate through them
      var fetchFunction = function (offset, limit, callback) {
        callback(items.slice(offset, offset + limit));
      };

      // fetch articles, add to items array, paginate items array
      var listArticles = function () {
        Restangular.one('articles').get().then(function (articles) {
          items = _.toArray(articles);
          $scope.articlesPaginator = new Paginator(fetchFunction, 3, items.length);

        });
      };

      listArticles();

    });

})();
