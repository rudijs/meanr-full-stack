(function () {
  'use strict';

  angular.element(document).ready(function () {

    // Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') {
      window.location.hash = '#';
    }

    // Init the app
    angular.bootstrap(document, ['meanr']);

    // Add ng-app class name for e2e tests
    // The scenario runner needs to be able to find the root element, put ng-app on it,
    document.getElementById('meanrAppBody').className = 'ng-app';

  });

})();
