'use strict';

// The header controller used in the application main navigation.
// The Global service is injected so the header can use the global user object .
// The user object exposes methods for session state and user details like name etc.

// Header controller
angular.module('meanr')
  .controller('HeaderCtrl', function ($scope, Global, $location, $route, gettextCatalog) {

    $scope.global = Global;

    $scope.changeLanguage = function (language) {
      gettextCatalog.currentLanguage = language;

      // Some views have button text that is changed by the controller $scope.
      // These pages will need to reload the route so that button text set/updated by $scope will be updated immediately.
      // A simple regex for now but will need an array if/when more views need this.
      // The Edit view changes the button text to 'please wait' when uploading a file.
      if ($location.path().match(/edit$/)) {
        $route.reload();
      }

    };

  });
