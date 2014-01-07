(function () {
  'use strict';

  describe('Controller', function () {

    describe('ArticlesCreateCtrl', function () {

      // Restangular add many Restangular specific properties which we don't need to test.
      // For example A:
      // { from : 'Home', to : 'Work' }
      // can look like example B:
      // { from : 'Home', to : 'Work', route : '525a8422f6d0f87f0e407a33', getRestangularUrl : Function, addRestangularMethod : Function }
      //
      // So we'll create a custom matcher that checks the above Example B contains values from Example A
      beforeEach(function () {
        this.addMatchers({
          toContainData: function (expected) {

            // This is the complete Restangular object
            var actual = this.actual;

            // Iterate over each expected value
            _.forEach(expected, function (val) {
              if (!_.contains(actual, val)) {

                // If the value is not found
                return false;
              }
            });

            return true;

          }
        });
      });

      // Load the controllers module
      beforeEach(module('meanr'));

      var scope,
        ArticlesCreateCtrl,
        $httpBackend,
        $location;

      // fixture xhr post object
      var postArticleData = function () {
        return {
          title: 'New Title',
          content: 'New Content'
        };
      };

      // fixture expected xhr response object
      var responseArticleData = function () {
        return {
          _id: '525cf20451979dea2c000001',
          title: 'New Title',
          content: 'New Content'
        };
      };

      beforeEach(inject(function ($controller, $rootScope, $routeParams, _$httpBackend_, _$location_) {

        $httpBackend = _$httpBackend_;

        scope = $rootScope.$new();

        $location = _$location_;

        ArticlesCreateCtrl = $controller('ArticlesCreateCtrl', {
          $scope: scope
        });

      }));

      it('$scope.canSave() return true if FROM and TO have been selected from Google Places', function () {

        scope.articleForm = {};

        scope.articleForm.$dirty = false;
        scope.articleForm.$valid = false;

        // no form input changes
        expect(scope.canSave()).toBe(false);

        // form input changed
        scope.articleForm.$dirty = true;
        expect(scope.canSave()).toBe(false);

        // form input is valid
        scope.articleForm.$valid = true;
        expect(scope.canSave()).toBe(true);

      });

      it('$scope.create() should create a new valid article', function () {

        // valid form input data
        scope.title = 'New Title';
        scope.content = 'New Content';

        // run create()
        scope.create();

        // expected POST request/response
        $httpBackend.expectPOST('/api/v1/articles', postArticleData()).respond(200, responseArticleData());

        // flush the http POST
        $httpBackend.flush();

        // test location URL after successful POST
        expect($location.path()).toBe('/articles/' + responseArticleData()._id);

      });

      it('should handle server side input validation error responses', function () {

        // invalid form input data (less than 3 characters)
        scope.title = 'AB';
        scope.content = 'XY';

        // fixture expected response data
        responseArticleData = function () {
          return {
            'title': {
              'message': 'must be at least 3 characters',
              'name': 'ValidatorError',
              'path': 'title',
              'type': 'user defined',
              'value': 'abcde'
            },
            'content': {
              'message': 'must be at least 3 characters',
              'name': 'ValidatorError',
              'path': 'content',
              'type': 'user defined',
              'value': 'abcdef'
            }
          };
        };

        // test expect form errors to be empty
        expect(scope.formValidationErrors.length).toBe(0);

        // run create()
        scope.create();

        // expected POST request/response
        $httpBackend.expectPOST('/api/v1/articles').respond(401, responseArticleData());

        // flush the http POST
        $httpBackend.flush();

        // test expect form errors to have 2 error messages
        expect(scope.formValidationErrors.length).toBe(2);

        // test formErrors array value one
        expect(scope.formValidationErrors[0].path).toBe('title');
        expect(scope.formValidationErrors[0].message).toBe('must be at least 3 characters');

        // test formErrors array value two
        expect(scope.formValidationErrors[1].path).toBe('content');
        expect(scope.formValidationErrors[1].message).toBe('must be at least 3 characters');

      });

      it('should handle server side auth or security validation error responses', function () {

        // fixture expected response data
        responseArticleData = function () {
          return {
            'message': 'User is not authorized'
          };
        };

        // valid form input data
        scope.title = 'New Title';
        scope.content = 'New Content';

        // test post request is sent
        $httpBackend.expectPOST('/api/v1/articles', postArticleData()).respond(401, responseArticleData());

        // Run controller
        scope.create();

        // test expect form errors to be empty
        expect(scope.formValidationErrors.length).toBe(0);

        // flush the http POST
        $httpBackend.flush();

        // test expect form errors to have 1 error message
        expect(scope.formValidationErrors.length).toBe(1);

        // test formErrors array value one
        expect(scope.formValidationErrors[0].path).toBe('Error');
        expect(scope.formValidationErrors[0].type).toBe('User is not authorized');

      });

      it('$scope.showClientSideValidationErrors returns clientside form validation true or null', inject(function (_$compile_) {

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
        scope.$digest();

        // Test form validation
        expect(scope.showClientSideValidationErrors(scope.myForm.from, 'required')).toBeTruthy();

      }));

    });

  });

})();