'use strict';

describe('Controller', function () {

  describe('ArticlesListCtrl', function () {

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
      ArticlesListCtrl,
      $httpBackend;

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {

      scope = $rootScope.$new();

      ArticlesListCtrl = $controller('ArticlesListCtrl', {
        $scope: scope
      });

      $httpBackend = _$httpBackend_;

    }));

    it('should create an array with at least one article object fetched from XHR', function () {

      // test expected GET request for JSON
      $httpBackend.expectGET('/api/v1/articles').respond([
        {from: 'A', to: 'B'}
      ]);

      $httpBackend.flush();

      // test scope value
      expect(scope.articlesPaginator.currentPageItems).toEqualData([
        {from: 'A', to: 'B'}
      ]);

    });

  });

});
