'use strict';

describe('Controller', function () {

  describe('UsersCtrl', function () {

    // Load the controllers module
    beforeEach(module('meanr'));

    // Initialize the controller and a mock scope
    var UsersCtrl,
      scope,
      $location;

    beforeEach(inject(function ($controller, _$rootScope_, _$location_) {

      scope = _$rootScope_.$new();

      $location = _$location_;

      UsersCtrl = $controller('UsersCtrl', {
        $scope: scope
      });

    }));

    it('$scope.canSave() returns true for a valid form and false for not valid', function () {

      scope.signinForm = {};
      scope.signinForm.$dirty = false;
      scope.signinForm.$valid = false;
      expect(scope.canSave()).toBe(false);

      scope.signinForm.$dirty = true;
      scope.signinForm.$valid = false;
      expect(scope.canSave()).toBe(false);

      scope.signinForm.$dirty = true;
      scope.signinForm.$valid = true;
      expect(scope.canSave()).toBe(true);

    });

    it('$scope.showLoginErrorMessage() sets scope error message if URL msg parameter', function () {

      // Set user sign in URL error response
      $location.path('signin?msg=error');

      // $location.search() does not pick up URL params in Karma.
      // Don't know why but after tinkering without joy will just mock search() here
      $location.search = function () {
        return { 'msg': 'error'};
      };

      // run controller
      scope.showLoginErrorMessage();

      // test URL
      expect($location.path()).toBe('/signin?msg=error');

      // test scope message
      expect(scope.message).toBe('Invalid email or password.');

    });

    it('$scope.showLoginErrorMessage() sets scope error message if URL errors parameter', function () {

      // Set user sign in URL error response
      $location.path('signup?errors=Please%20fix%20these%20errors:,*%20Name%20cannot%20be%20blank,*%20Email%20cannot%20be%20blank');

      // $location.search() does not pick up URL params in Karma.
      // Don't know why but after tinkering without joy will just mock search() here
      $location.search = function () {
        return { 'errors': 'Please%20fix%20these%20errors:,*%20Name%20cannot%20be%20blank,*%20Email%20cannot%20be%20blank'};
      };

      // run controller
      scope.showLoginErrorMessage();

      // test URL
      expect($location.path()).toBe('/signup?errors=Please%20fix%20these%20errors:,*%20Name%20cannot%20be%20blank,*%20Email%20cannot%20be%20blank');

      // test scope message
      expect(scope.message).toBe('Please%20fix%20these%20errors:\n*%20Name%20cannot%20be%20blank\n*%20Email%20cannot%20be%20blank');

    });

    it('$scope.showClientSideValidationErrors() returns clientside form validation true or null', inject(function (_$compile_) {

      // Compile HTML form
      var $compile = _$compile_;
      var doc;

      // Form element has state
      scope.formElementHasStates = [];

      // Standard form
      var form = '<form name="myForm">' +
        '<input type="text" name="from" ng-model="from" ng-required="true"' +
        '</form>';

      // Compile into AngularJS
      doc = $compile(form)(scope);

      // Test Form
      expect(doc.data('$formController')).toBeTruthy();
      expect(scope.myForm).toBeDefined();

      // Test null response
      expect(scope.showClientSideValidationErrors(scope.myForm.from, 'required')).toBeNull();

      // Simulate user on-blur from form user input field
      scope.formElementHasStates = ['from-has-visited'];

      // Trigger an AngualarJS digest loop
      scope.$apply();

      // Test form validation
      expect(scope.showClientSideValidationErrors(scope.myForm.from, 'required')).toBeTruthy();

    }));

  });
});
