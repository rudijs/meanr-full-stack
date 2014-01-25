# MEANR Full Stack

MEANR is a boilerplate that provides a starting point for MongoDB, Node.js, Express, AngularJS and Redis based applications.

Optionally you can use a DevOps and deployment strategy using Ruby with Chef-Solo and Capistrano.

Both the MEANR web application and the DevOps/Deployment come with a broad range of test suites.

The sample application is a simple Articles create, read, update and destroy (CRUD) web site.

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

Emphasis on a professional level of development with deployment and broad suite of tests.

To help spread the word and improve on the "MEANR Stack with DevOps" goodness.

To learn about and improve on the MEANR Stack.

## (Optional) DevOps and Deployment with Ruby:

* [Chef-Solo](http://docs.opscode.com/chef_solo.html)
* [Capistrano](http://www.capistranorb.com/)
* [Docker](http://www.docker.io/) containers (non-production only currently)

## Quick Install

A youtube screencast of the following quick install steps is available at [http://youtu.be/WzvgWYE9XnY](http://youtu.be/WzvgWYE9XnY)

* Requirements
    1. [Node.js](http://nodejs.org/)
    2. [MongoDB](http://www.mongodb.com/)
    3. [Redis](http://redis.io/)

You should have a MongoDB and Redis servers running. The default address for these in `config/env/development.json` is set to `localhost`

Install global node dependencies `Grunt` and `Bower`

    npm install -g grunt-cli bower

Clone the git repository and cd into it

    git clone git@github.com:rudijs/meanr-full-stack.git
    cd meanr-full-stack/

Optional but good practice to install git flow

    git flow init

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

## Full Install

The full install includes using a Virtual Box (Vagrant) Virtual Machine with a server provisioning and deployment process.

This part uses Ruby software - [Chef-Solo](http://docs.opscode.com/chef_solo.html) for DevOps and [Capistrano](http://www.capistranorb.com/) for deployment.

See the [docs/](https://github.com/rudijs/meanr-full-stack/tree/master/docs) folder for detailed information.

Here is two images which outline the full install process:

## Workflow
![MEANR Flow](https://dl.dropboxusercontent.com/u/7108604/meanr-full-stack-workflow_inkscape.png "MEANR Flow")

## MEANR Stack Types
![MEANR Stack Types](https://dl.dropboxusercontent.com/u/7108604/meanr-full-stack-types_inkscape.png "MEANR Stack Types")

## Credits and Inspired by

* SOA architechure
* The [AngularJS](http://angularjs.org/) project and it's online tutorial
* [Egghead.io](https://egghead.io/)
* [Mean.io](http://mean.io/)
* [Yeoman.io](http://yeoman.io/)
* [ng-book](https://www.ng-book.com/)
* [Node.js the Right Way: Practical, Server-Side JavaScript That Scales](http://pragprog.com/book/jwnode/node-js-the-right-way)
* [Chef](http://www.getchef.com/solutions/devops/) and the DevOps 'infrastructre as code' movement
* [Docker](http://www.docker.io/)

## License - [The MIT License (MIT)](http://opensource.org/licenses/MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
