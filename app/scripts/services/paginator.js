(function () {
  'use strict';

  angular.module('meanr.service.paginator', [])
    .factory('Paginator', function () {

      // Despite being a factory, the user of the service gets a new
      // Paginator every time he calls the service. This is because
      // we return a function that provides an object when executed

      return function (fetchFunction, pageSize, totalItems) {

        var paginator = {

          currentPageItems: [],

          currentPage: 1,

          currentOffset: 0,

          hasNextVar: false,

          _load: function () {
            var self = this;
            fetchFunction(this.currentOffset, pageSize + 1, function (items) {
              self.currentPageItems = items.slice(0, pageSize);
              self.hasNextVar = items.length === pageSize + 1;
            });
          },

          next: function () {
            if (this.hasNextVar) {
              this.currentOffset += pageSize;
              this.currentPage += 1;
              this._load();
            }
          },

          hasNext: function () {
            return this.hasNextVar;
          },

          previous: function () {
            if (this.hasPrevious()) {
              this.currentOffset -= pageSize;
              this.currentPage -= 1;
              this._load();
            }
          },

          hasPrevious: function () {
            return this.currentOffset !== 0;
          },

          getCurrentPage: function () {
            return this.currentPage;
          },

          getTotalPages: function () {
            return Math.ceil(totalItems / pageSize);
          }

        };

        // Load the first page
        paginator._load();

        return paginator;

      };

    });

})();
