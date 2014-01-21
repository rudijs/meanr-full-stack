'use strict';

describe('Go Service', function () {

  // Load the app
  beforeEach(module('meanr'));

  var go,
    $location,
    $route,
    $window,
    global;

  beforeEach(function () {

    inject(function (Go, _$location_, _$route_, _$window_, Global) {

      go = Go;

      $location = _$location_;

      $route = _$route_;

      $window = _$window_;

      global = Global;

    });

  });

  it('#to() should locate to a new path', function () {

    // Set route to default
    $location.path('/');

    // Run go.to() service
    go.to('/search');

    // test
    expect($location.path()).toBe('/search');

  });

  it('#to() should locate to a path with rideshareId', function () {

    // Set route to default
    $location.path('/');

    // Run go.to() service
    go.to('/rideshare', '525a8422f6d0f87f0e407a33');

    // test
    expect($location.path()).toBe('/rideshare/525a8422f6d0f87f0e407a33');

  });

  it('#to() should reload the view if the requested path is the same as current path', function () {

    // Set route to default
    $location.path('/search');

    // Run go.to() service
    go.to('/search');

    // test
    expect($location.path()).toBe('/search');

  });

  it('#to() should update the global.sessionState with back state and page number', function () {

    // Set route to default
    $location.path('/');

    // Run go.to() service
    go.to('/rideshare', '525a8422f6d0f87f0e407a33', 'back', 2);

    // test
    expect(global.sessionState().back).toBe(true);
    expect(global.sessionState().pageNumber).toBe(2);

  });

  it('#back() should go to default path if no window.history', function () {

    global.setSessionState('back', false);

    // run service
    go.back();

    // test
    expect($location.path()).toBe('/');

  });

  it('#back() should go back in page history if global.sessionState().back', function () {

    // Mock set user session has an active browser history
    global.setSessionState('back', true);

    $location.path('/');

    $window.history.go = function () {
      $location.path('/articles');
    };

    // run service
    go.back();

    // test
    expect($location.path()).toBe('/articles');

  });

});
