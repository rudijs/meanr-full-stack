'use strict';

describe('Controller', function () {

  describe('MainCtrl', function () {

    // Load the controllers module
    beforeEach(module('meanr'));

    var scope,
      MainCtrl;

    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      MainCtrl = $controller('MainCtrl', {
        $scope: scope
      });

    }));

    it('should expose $scope.awesomeThings', function () {

      expect(scope.awesomeThings.angularjs).toBeTruthy();

      expect(scope.awesomeThings.angularjs).toEqual([
        'AngularJS',
        'HTML5 Boilerplate',
        'Zurb Foundation 5',
        'Restangular',
        'Angular-get-text i18n',
        'Karma Unit Tests',
        'Protractor End-to-End Tests',
        'Sauce Labs End-to-End Tests'
      ]);

    });

  });

});
