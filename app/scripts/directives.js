(function () {
  'use strict';

  // Application directives

  // Get a reference to the AngularJS application module
  var meanr = angular.module('meanr');

  // The focus directive makes a form element focused on template load.
  meanr.directive('focus', function () {
    return function (scope, element) {
      element.focus();
    };
  });

  // The late validate form directive adds and removes has-visited and has-focus classes
  // to form elements on blur and on foucs. These classes are used in the controller
  // to determine when to show validation error messages.
  meanr.directive('lateValidateForm', function () {
    return {
      restrict: 'AC',
      link: function (scope, element) {
        var $inputs = element.find('input, select, textarea');

        $inputs.on('focus', function () {

          // Add array item of this element's name plus has-focus
          scope.formElementHasStates.push(this.id + '-' + 'has-focus');
        });

        $inputs.on('blur', function () {

          // Build array element labels
          var hasVisited = this.id + '-' + 'has-visited';
          var hasFocus = this.id + '-' + 'has-focus';

          // Add once element label has-visited
          if (!_.contains(scope.formElementHasStates, hasVisited)) {
            scope.formElementHasStates.push(hasVisited);
          }

          // Remove element has-focus
          var index = scope.formElementHasStates.indexOf(hasFocus);
          scope.formElementHasStates.splice(index, 1);

        });

        //element.on('submit', function () {
        //    $inputs.addClass('has-visited');
        //});
      }
    };
  });

// Clear any server side validation error message from the form input when it gets focus
  meanr.directive('clearServerSideValidation', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {

        element.on('focus', function () {
          var elementSelector = '#' + this.id + '.error';
          $(elementSelector).remove();
        });
      }
    };
  });

// Display any serve side form validation errors
  meanr.directive('displayServerSideErrors', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {

        scope.$watch(

          // watch the scope.formValidationErrors and display them as required
          function () {
            return scope.formValidationErrors;
          },
          function (newVal) {
            angular.forEach(newVal, function (obj) {

              // Select the form element
              var elementSelector = '#' + obj.path;

              // Append the error message after the form element
              $(elementSelector).after('<small id="' + obj.path + '" class="error">* ' + obj.message + '</small>');
            });
          }
        );

        element.on('submit', function () {

          // Remove any on-screen error messages. Any validation errors will be re-added
          $('.error').remove();

          // Put focus on the form submit button.
          $('#submit').focus();
        });
      }
    };
  });

})();
