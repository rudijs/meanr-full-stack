(function () {
  'use strict';

  describe('Global Service', function () {

    // Load the controllers module
    beforeEach(module('meanr'));

    var globalService,
      $window;

    beforeEach(function () {

      inject(function (_$window_, Global) {

        // inject window object that this service will grab
        $window = _$window_;
        $window.user = {name: 'Joe Blow'};
        $window.applicationTitle = 'MEANR Stack - Development';
        $window.sessionState = {};

        // inject service for testing.
        globalService = Global;
      });
    });

    //check to see if it has the expected function
    it('should have an currentUser function', function () {
      expect(angular.isFunction(globalService.currentUser)).toBe(true);
    });

    it('should return the current user name', function () {
      expect(globalService.currentUser().name).toBe('Joe Blow');
    });

    it('should return is signed in true', function () {
      expect(globalService.isSignedIn()).toBeTruthy();
    });

    it('should return the application title', function () {
      expect(globalService.applicationTitle()).toMatch(/MEANR\ Stack/);
    });

  });
})();