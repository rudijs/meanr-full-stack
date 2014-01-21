'use strict';

describe('Controller', function () {

  describe('ArticlesShowCtrl', function () {

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      this.addMatchers({
        toEqualData: function (expected) {
          return angular.equals(this.actual, expected);
        }
      });
    });

    // Load the controllers module
    beforeEach(module('meanr'));

    var scope,
      ArticlesShowCtrl,
      $httpBackend;

    // fixture response object
    var showArticleData = function () {
      return [
        {from: 'Home', to: 'Work'}
      ];
    };

    beforeEach(inject(function ($controller, $rootScope, $routeParams, _$httpBackend_) {

      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET(/api\/v1\/articles\/([0-9a-fA-F]{24})$/).respond(showArticleData());

      scope = $rootScope.$new();

      $routeParams.articleId = '525a8422f6d0f87f0e407a33';

      ArticlesShowCtrl = $controller('ArticlesShowCtrl', {
        $scope: scope
      });

    }));

    it('should fetch one article using an articleId URL parameter', function () {

      expect(scope.article).toBeUndefined();

      $httpBackend.flush();

      expect(scope.article).toEqualData(showArticleData());

    });

  });

});
