(function () {
  'use strict';

  angular.module('meanr')
    .controller('MainCtrl', function ($scope) {

      $scope.awesomeThings = {

        'angularjs': [
          'AngularJS',
          'HTML5 Boilerplate',
          'Zurb Foundation 5',
          'Restangular',
          'Angular-get-text i18n',
          'Karma Unit Tests',
          'Protractor End-to-End Tests',
          'Sauce Labs End-to-End Tests'
        ],

        'nodejs': [
          'Express',
          'Mongoose',
          'PassportJS',
          'Grunt',
          'Bower',
          'Promises',
          'scrypt',
          'Mocha',
          'ChaiJS'
        ],

        'storage': [
          'MongoDB',
          'Redis (sessions)',
          'Loggly.com (logs)'
        ],

        'deployment': [
          'JS concat and minify',
          'CSS concat and minify',
          'Development',
          'Staging',
          'QA',
          'Production',
          'Deployment with Capistrano'
        ],

        'devops': [
          'VirtualBox',
          'Vagrant',
          'Amazon EC2',
          'Chef-Solo',
          'ServerSpec',
          'ChefSpec',
          'Datadog.com',
          'MongoDB Management Service'
        ]

      };

    });


})();
