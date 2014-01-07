(function () {
  'use strict';

  describe('Controller', function () {

    describe('ArticlesEditCtrl', function () {

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
        ArticlesEditCtrl,
        $httpBackend,
        $location;

      // fixture xhr response object
      var showArticleData = function () {
        return {
          _id: '525a8422f6d0f87f0e407a33',
          title: 'New Title',
          content: 'New Content'
        };
      };

      beforeEach(inject(function ($controller, $rootScope, $routeParams, _$httpBackend_, _$location_) {

        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET(/api\/v1\/articles\/([0-9a-fA-F]{24})$/).respond(showArticleData());

        scope = $rootScope.$new();

        $location = _$location_;

        $routeParams.articleId = '525a8422f6d0f87f0e407a33';

        ArticlesEditCtrl = $controller('ArticlesEditCtrl', {
          $scope: scope
        });

      }));

      it('should fetch one article using an articleId URL parameter', function () {

        expect(scope.article).toBeUndefined();

        $httpBackend.flush();

        expect(scope.article).toContainData(showArticleData());

      });

      it('should keep a copy of the original article details', function () {

        $httpBackend.flush();

        expect(scope.articleOrig).toEqual({ title: 'New Title', content: 'New Content' });
      });

      it('$scope.canUpdate() returns true if updated form or false if not', function () {

        $httpBackend.flush();

        // no form input changes
        expect(scope.canUpdate()).toBe(false);

        // valid form update
        scope.article.title = 'Updated Title';
        expect(scope.canUpdate()).toBe(true);

      });

      it('$scope.update() should update a if form is changed', function () {

        // Run the initial GET request that loads up the article edit object data
        $httpBackend.flush();

        // valid form update
        scope.article.title = 'Updated Title';
        // run update()
        scope.update();

        // we expect update() to make a PUT request
        $httpBackend.expectPUT(/articles\/([0-9a-fA-F]{24})$/).respond(200);

        // flush() to trigger the http PUT request
        $httpBackend.flush();

        // test URL location to new object after successful put()
        expect($location.path()).toBe('/articles/' + showArticleData()._id);

      });

      it('$scope.update() should display server side form validation errors and not change URL', function () {

        // Set what the edit URL should be
        var editPath = '/articles/' + showArticleData()._id + '/edit';
        $location.path(editPath);

        // Run the initial GET request that loads up the article edit object data
        $httpBackend.flush();

        // test before PUT there are no serverside validation errors
        expect(scope.formValidationErrors.length).toBe(0);

        // Update form with non-acceptable input (less than 3 characters)
        scope.article.title = 'Updated Title';
        scope.article.content = 'Updated Content';

        // fixture expected PUT response data
        var responseArticleData = function () {
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

        // run update()
        scope.update();

        // we expect update() to make a PUT request
        $httpBackend.expectPUT(/articles\/([0-9a-fA-F]{24})$/).respond(400, responseArticleData());

        // flush() to trigger the http PUT request
        $httpBackend.flush();

        // test before PUT there are no serverside validation errors
        expect(scope.formValidationErrors.length).toBe(2);

        // test URL location has not changed
        expect($location.path()).toBe(editPath);

      });

      it('$scope.update() handles Not authorized requests', function () {

        // Set what the edit URL should be
        var editPath = '/articles/' + showArticleData()._id + '/edit';
        $location.path(editPath);

        // Run the initial GET request that loads up the article edit object data
        $httpBackend.flush();

        // test before PUT there are no serverside validation errors
        expect(scope.formValidationErrors.length).toBe(0);

        // valid form input update
        scope.article.title = 'Updated Title';

        // run update()
        scope.update();

        // test PUT happens correctly
        $httpBackend.expectPUT(/articles\/([0-9a-fA-F]{24})$/).respond(401, {'message': 'Not authorized'});

        // flush() to trigger the http PUT request
        $httpBackend.flush();

        // test before PUT there are no serverside validation errors
        expect(scope.formValidationErrors.length).toBe(1);

        // test URL location has not changed
        expect($location.path()).toBe(editPath);

        // test ui error message
        expect(scope.formValidationErrors[0].type).toEqual('Not authorized');

      });

      it('$scope.remove() should remove an article then locate to the list view', function () {

        // Run the initial GET request that loads up the article edit object data
        $httpBackend.flush();

        // Run remove() article from the edit scope
        scope.remove(scope.article);

        // Expect a DELETE request
        $httpBackend.expectDELETE(/articles\/([0-9a-fA-F]{24})$/).respond(204);

        // Flush the DELETE request
        $httpBackend.flush();

        // test location after successful DELETE request
        expect($location.path()).toEqual('/articles');

      });


    });

  });

})();