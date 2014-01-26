(function () {
  'use strict';

  angular.module('meanr', [
      'ngCookies',
      'ngSanitize',
      'ngRoute',
      'gettext',
      'restangular',
      'meanr.services'
    ])
    .run(function (gettextCatalog) {
      gettextCatalog.currentLanguage = 'English';
    })
    .run(function ($rootScope) {
      $rootScope.$on('$viewContentLoaded', function () {
        $(document).foundation();
      });
    });

  // Create application services module and define the dependencies
  angular.module('meanr.services', [
    'meanr.service.global',
    'meanr.service.go',
    'meanr.service.paginator'
  ]);

  angular.module('meanr')
    .config(function (RestangularProvider) {

      // API version
      RestangularProvider.setBaseUrl('/api/v1');

    });

  // Any server-side 500 response errors locate to the /error view
  angular.module('meanr')
    .factory('meanrHTTPIntercetor', function ($q, $location) {
      return {
        'responseError': function (rejection) {
          if (rejection.status === 500) {
            $location.path('/error');
          }
          return $q.reject(rejection);
        }
      };
    });

  angular.module('meanr')
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('meanrHTTPIntercetor');
    }]);

})();
