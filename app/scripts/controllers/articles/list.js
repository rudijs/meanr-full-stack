'use strict';

// Main page controller
angular.module('meanr')
  .controller('ArticlesListCtrl', function ($scope, Global, Restangular, Go) {

    $scope.global = Global;

    $scope.go = Go;

    Restangular.one('articles').get().then(function (articles) {
      $scope.articles = _.toArray(articles);
    });

  });
