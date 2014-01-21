'use strict';

describe('Controller', function () {

  describe('HeaderCtrl', function () {

    // Load the controllers module
    beforeEach(module('meanr'));

    var scope,
      HeaderCtrl,
      $location,
      gettextCatalog;

    beforeEach(inject(function ($controller, $rootScope, _$location_, _gettextCatalog_) {
      scope = $rootScope.$new();

      HeaderCtrl = $controller('HeaderCtrl', {
        $scope: scope
      });

      $location = _$location_;

      gettextCatalog = _gettextCatalog_;


    }));

    it('should expose some global scope', function () {

      expect(scope.global).toBeTruthy();

    });

    it('$scope.changeLanguage() should update the currentLanguage', function () {

      // test default
      expect(gettextCatalog.currentLanguage).toBe('English');

      // run action
      scope.changeLanguage('Spanish');

      // test
      expect(gettextCatalog.currentLanguage).toBe('Spanish');

    });

  });

});
