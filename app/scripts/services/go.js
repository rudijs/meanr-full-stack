// Service module to locate to a new path or reload if requested path is the same as the current path
angular.module('meanr.service.go', [])
  .factory('Go', function ($window, $location, $route, $routeParams, Global) {

    var global = Global;

    return {
      /**
       *
       * @param path Ex: /rideshares
       * @param param Ex: rideshareId
       * @param query Ex: back - this is so the app can go back in javascript history or back to default route
       *                  So that bookmarked show() document pages work back page or back to default route
       */
      to: function (path, param, query, pageNumber) {

        if (param) {
          path = path + '/' + param;
        }

        // If path is same as current view reload else load view
        // Example would be if user is on search results page then user the header quick search to search again (same view)
        if ($location.path() === path) {
          $route.reload();
        }
        else {
          if (query === 'back') {
            global.setSessionState('back', true);
          }

          if (pageNumber) {
            global.setSessionState('pageNumber', +pageNumber);
          }

          $location.path(path);

        }
      },

      back: function () {

        // If the user is already on the site just go back one page
        if (global.sessionState().back) {
          $window.history.go(-1);
        }

        // Coming from a bookmark or shared link to back to default route
        else {
          $location.path('/');
        }
      }

    };
  }
);

