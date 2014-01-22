# MEANR Full Stack

## Client-side

* [AngularJS](http://angularjs.org/)
* [Foundation 5](http://foundation.zurb.com/)

## Server-side

* [Express](http://expressjs.com/) JSON API
* [Passport](http://passportjs.org/) authentication middleware

## Data Storage

* [MongoDB](http://www.mongodb.org/) - data storage
* [Redis](http://redis.io/) - session storage

## Testing

* Client-side
    1. [Karma Test Runner](http://karma-runner.github.io/0.10/index.html) (Jasmine style w/ HTML code coverage reports)
    2. [Protractor](https://github.com/angular/protractor) end to end tests
* Server-side
    1. [Mocha](http://visionmedia.github.io/mocha/) (w/ HTML code coverage reports)
    2. with [Sinon.JS](http://sinonjs.org/) and [Chai](http://chaijs.com/)
    3. API tests with [supertest](https://github.com/visionmedia/supertest)
* Code Linting
    1. JSHint

## Tools

* [Grunt](http://gruntjs.com/) task runner
* [Bower](http://bower.io/) front-end package management

[![Build Status](https://travis-ci.org/rudijs/meanr-full-stack.png?branch=master)](https://travis-ci.org/rudijs/meanr-full-stack)

[![Code Climate](https://codeclimate.com/github/rudijs/meanr-full-stack.png)](https://codeclimate.com/github/rudijs/meanr-full-stack)

## Purpose

Demonstration and starting point of how to develop **and** deloy a MEANR application.

Emphasis on a professional level of development with deploymetn and broad suite of tests.

To help spread the word and improve on the "MEANR Stack with DevOps" goodness.

To learn about and improve on the MEANR Stack.

## (Optional) DevOps and Deployment with Ruby:

* [Chef-Solo](http://docs.opscode.com/chef_solo.html)
* [Capistrano](http://www.capistranorb.com/)
* [Docker](http://www.docker.io/) containers (non-production only currently)

## Quick Install

First up you should have a MongoDB and Redis servers running. The default address for these in `config/env/development.json` is set to `localhost`

Install global node dependencies `Grunt` and `Bower`

    npm install -g grunt-cli bower

Clone the git repository and cd into it

    git clone git@github.com:rudijs/meanr-full-stack.git
    cd meanr-full-stack/

Install node dependencies based on the `package.json` configuration

    npm install

Install front-end dependencies with Bower based on the `bower.json` configuration

    bower install

Copy all `example/*` configuration files into place

    grunt init

Start the server

    grunt serve

Then open a browser and go to:

    http://localhost:3000

## Running the Tests

With MongoDB, Redis and the node MEANR application running you can run most of the tests right away.

Node Tests

    grunt test

AngularJS Karma Unit Tests

    grunt karma

Javascript code linting tests

    grunt jshint

The API tests have a database dependency you'll need to meet before these tests will pass

First add a test user account to Mongodb

    mongoimport -h 127.0.0.1 --db meanr-dev --collection users --file test/fixtures/db/users.json

Run the API tests

    npm test

The Protractor End-to-End test have some dependencies you'll need to meet before these tests will pass

Installation:

    npm install -g protractor
    webdriver-manager update

Start the Selenium server

    webdriver-manager start

Open a new terminal and run tests in Chrome

    grunt e2e