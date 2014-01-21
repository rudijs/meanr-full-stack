(function () {
  'use strict';

  // Users controller: sign in, sign up etc.
  angular.module('meanr')
    .controller('UsersCtrl', function ($scope, $cookies, $location) {

      $scope.csrfToken = $cookies['XSRF-TOKEN'];

      // Signin error message
      $scope.message = '';

      // AngularJS show client side validation errors as the user types.
      // We prefer to show errors only after the user leaves the input and not while focused on the input
      // This array will hold has-visited and has-focus elements which is used in $scope.showClientSideValidationErrors below.
      // Items are added and removed here by the custom lateValidateForm directive
      $scope.formElementHasStates = [];

      // If login error flagged in URL set scope value to show user
      $scope.showLoginErrorMessage = function () {
        var params = $location.search();
        if (params.msg === 'error') {
          $scope.message = 'Invalid email or password.';
        }
        else if (params.errors) {
          var errorMessage = params.errors.split(',');
          errorMessage = errorMessage.join('\n');
          $scope.message = errorMessage;
        }
      };

      // Enable sign in button if valid login form
      $scope.canSave = function () {
        return $scope.signinForm.$dirty && $scope.signinForm.$valid;
      };

      $scope.showClientSideValidationErrors = function (ngModelController, error) {

        // Build form element state string for this model controller
        var hasVisited = ngModelController.$name + '-' + 'has-visited';
        var hasFocus = ngModelController.$name + '-' + 'has-focus';

        // Check if the elemenet has been visited and does not have focus
        if (_.contains($scope.formElementHasStates, hasVisited) && !_.contains($scope.formElementHasStates, hasFocus)) {

          // Return true or false for this validation
          return ngModelController.$error[error];
        }
        else {
          return null;
        }

      };


    });

})();
