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
    'meanr.service.go'
  ]);

  angular.module('meanr')
    .config(function (RestangularProvider) {

      // API version
      RestangularProvider.setBaseUrl('/api/v1');

    });

})();
