## Testing

### Overview

The MEANR Stack comes with several types of tests

### AngularJS unit tests

* Written using Jasmine syntax
* Executed by Karma Test Runner

### AngularJS End to End (browser) tests

* Written using Jasmine syntax
* Executed by [Protractor](https://github.com/angular/protractor)
* Protractor runs tests against your application running in a real browser, interacting with it as a user would.
* Local tests use [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs) and remote integrates with [SauceLabs](https://saucelabs.com/)

### Node.js Model Unit Tests

* Written using Mocha with SinonJS and Chai

### Node.js Controller Unit Tests

* Written using Mocha with SinonJS and Chai

### Node.js API HTTP server tests

* Written using `supertest`
* GET, PUT, POST, DELETE HTTP requests to the running Express API server
* These tests the API calls that the AngularJS application uses


It's important to note all the tests except the AngularJS unit tests require MongoDB and Redis to be running.

The Karma End to End tests also require the express web server to be running.

Stubs and Mocks are kept to a minimum and only uses when testing the error path.

### Server Tests

* Written using [ServerSpec](http://serverspec.org/)
* RSpec tests for your servers configured by Puppet, Chef or anything else.
* Serverspec tests your servers' actual state through SSH access

## Running the tests

Running the test suites is done using grunt and npm.

It's possible to run many test with a single grunt task but the default is for each to have it's own terminal.

### AngularJS unit tests

    grunt karma

This grunt task will start the Karma test runner and watch the files for any changes then run the test again.

Code coverage reports are generated in HTML format and you can view them with your browser at:

    test/coverage/PhantomJS\ 1.9.2\ \(Linux\)/index.html

### Node.js Model and Controller Unit Tests

    grunt test

This grunt task will do a single run of the node.js tests.

Code coverage reports are generated in HTML format with Blanket and you can view them with your browser at:

    test/coverage/coverage.html

You can run these tests along with JSHint in continuous mode where the source files are watched for changes and the test run with

    grunt watch

### Node.js API HTTP server tests

**Note:** before running these next test suites you need to create a user account with your browser so the tests can create, update and destroy articles.

Refer to the `env/development.json` file for the user account credentials that you need to use.

    npm test

### AngularJS End to End (browser) tests

Installation:

    npm install -g protractor
    webdriver-manager update

Run tests in Chrome

    webdriver-manager start
    grunt e2e

### Javascript JSHint

    grunt jshint

You can run JShint along with the node.js mocha tests in continuous mode where the source files are watched for changes and the test run with

    grunt watch

### ServerSpec

    cd chef/kitchen

Using `rake` test a **running** server - test one or all server environments.

List available rake tasks

    cd chef/kitchen
    rake -T                                                                                                                                                                                      1 ↵ ✹
    rake serverspec:dev      # Run serverspec to dev.meanr.com
    rake serverspec:meanr    # Run serverspec to meanr.com
    rake serverspec:qa       # Run serverspec to qa.meanr.com
    rake serverspec:staging  # Run serverspec to staging.meanr.com
    rake spec                # Run serverspec to all hosts

Test development server:

    rake serverspec:development

### Ruby code hinting and tests with Rubocop, ChefSpec and FoodCritic

    cd chef/kitchen
    thor devops:test
