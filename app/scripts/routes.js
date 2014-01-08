'use strict';

// Application routing
angular.module('meanr')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.

      when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).

      when('/404', {
        templateUrl: 'views/404.html'
      }).

      when('/signin', {
        templateUrl: 'views/users/signin.html',
        controller: 'UsersCtrl'
      }).

      when('/signup', {
        templateUrl: 'views/users/signup.html',
        controller: 'UsersCtrl'
      }).

      when('/language', {
        templateUrl: 'views/language.html'
      }).

      when('/about', {
        templateUrl: 'views/about.html'
      }).

      when('/articles', {
        templateUrl: 'views/articles/list.html',
        controller: 'ArticlesListCtrl'
      }).

      when('/articles/create', {
        templateUrl: '/articles/create',
        controller: 'ArticlesCreateCtrl'
      }).

      when('/articles/:articleId/edit', {
        templateUrl: '/articles/edit',
        controller: 'ArticlesEditCtrl'
      }).

      when('/articles/:articleId', {
        templateUrl: 'views/articles/show.html',
        controller: 'ArticlesShowCtrl'
      }).

      otherwise({
        redirectTo: '/404'
      });

  }]);
