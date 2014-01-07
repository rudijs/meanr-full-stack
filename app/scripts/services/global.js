// This service is used to expose a user object from the HTML to the AngularJS application.
// User authentication with passportjs is serverside which writes the user object to the index file.
// This service grabs that object and exposes it as an object with methods to AngularJS

// Global service
angular.module('meanr.service.global', [])
  .factory('Global', function ($window) {

    var currentUser = $window.user;

    var applicationTitle = $window.applicationTitle;

    /**
     * Store application specific session details
     * Example: back = true - meaning the user has a browser history we can #go(-1) back instead of default route
     * Example: page = 2 - when going #go(-1) back to a paginated search result set go directly to page number
     *
     * @type {sessionState|*}
     */
    var sessionState = $window.sessionState;

    return {
      currentUser: function () {
        return currentUser;
      },
      isSignedIn: function () {
        return !!currentUser;
      },
      applicationTitle: function () {
        return applicationTitle;
      },
      sessionState: function () {
        return sessionState;
      },
      setSessionState: function (key, value) {
        sessionState[key] = value;
      }
    };

  });