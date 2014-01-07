# MEANR Full Stack

Javascript Responsive Web App - MongoDB, Express, AngularJS, Node.js and Redis with Foundation 5 CSS.

Ruby - DevOps using Chef with Capistrano (v3) for deployment.

Node.js testing with Mocha, SinonJS and Chai.

AngularJS testing with  Karma (Jasmine), Protractor (End-to-End), Sauce Labs (Selenium)

API testing with Supertest (API)

Dev Ops testing with ServerSpec and ChefSpec.

Code Linting with JSHint, Rubocop and Food Critic + Live Reload in development.

Production monitoring - Data Dog, MMS - MongoDB Monitoring Service, Amazon EC2 dashboard.

Version control with Git Flow.

[![Build Status](https://travis-ci.org/rudijs/meanr-full-stack.png?branch=master)](https://travis-ci.org/rudijs/meanr-full-stack)

[![Code Climate](https://codeclimate.com/github/rudijs/meanr-full-stack.png)](https://codeclimate.com/github/rudijs/meanr-full-stack)

## Purpose

To help spread the word and improve on the "MEANR Stack with Dev Ops" goodness.

To learn about and improve on the MEANR Stack.

## Stack

MEANR is a boilerplate composition of code, tools, ideas and a workflow for modern web development.

Write code locally and then programmatically build and deploy to Development, Staging, QA and finally Production ready servers.

Test code locally and also in the cloud with Continious Inegration and Sauce Labs Selenium tests.

A composition such as this project has many moving parts, this README is a high level overview with links to more installation and usage details.

The sample application is a simple article CRUD app and comes with unit and end-to-end tests for the client and server code.

![MEANR Flow](https://dl.dropboxusercontent.com/u/7108604/meanr.png "MEANR Flow")

### Requirements Overview - MEANR Full Stack is currently built with:

* [Node.js](http://nodejs.org/) (v0.10.24)
* [Ruby](http://rvm.io/) (2.1.0p0)
* [VirtualBox](https://www.virtualbox.org/) (4.3.6)
* [Vagrant](http://www.vagrantup.com/) (1.4.0)

### Development stack:

* [MongoDB](http://www.mongodb.com/)
* [Express](http://expressjs.com/)
* [AngularJS](http://angularjs.org/)
* [Node.js](http://nodejs.org/)
* [Redis](http://redis.io/)

### Production stack:

* [MongoDB](http://www.mongodb.com/)
* [Express](http://expressjs.com/)
* [AngularJS](http://angularjs.org/)
* [Node.js](http://nodejs.org/)
* [Redis](http://redis.io/)
* [Nginx](http://nginx.com/)

### DevOps and Deployment with Ruby:

* [Chef-Solo](http://docs.opscode.com/chef_solo.html)
* [Capistrano](http://www.capistranorb.com/)

### Workflow tools:

* [Git](http://git-scm.com/) + [Git Flow](http://danielkummer.github.io/git-flow-cheatsheet/)
* [Grunt](http://gruntjs.com/)
* [Bower](http://bower.io/)

## Testing Frameworks (integrated with the Grunt.js and rake)

* AngularJS unit tests with HTML code coverage reports by [Karma Test Runner](http://karma-runner.github.io/0.10/index.html)
* AngualrJS end-to-end tests with [Protractor](https://github.com/angular/protractor) for development
* AngualrJS end-to-end tests with [Sauce Labs](https://saucelabs.com/) for production
* [Mocha](http://visionmedia.github.io/mocha/) unit tests with HTML code coverage reports - uses [Sinon.JS](http://sinonjs.org/) and [Chai](http://chaijs.com/)
* API request tests using [supertest](https://github.com/visionmedia/supertest)
* [ServerSpec](http://serverspec.org/) RSpec tests for your servers
* [chefspec](https://github.com/sethvargo/chefspec) for Chef recipes (low code coverage level at this time)
* Continuous Integration with [Travis CI](https://travis-ci.org/)
* Automated code review with [Code Climate](https://codeclimate.com/)

## Logging:

* Development mode logging is to file with [Winston](https://github.com/flatiron/winston)
* Production mode uses [winston-loggly](https://github.com/indexzero/winston-loggly) to logs to [loggly.com](https://www.loggly.com/)

## Monitoring in production deployment:

* [datadog.com](http://www.datadoghq.com/)
* [MongoDB Management Service (MMS)](https://mms.mongodb.com/)

## Workflow Gist:

* Develop locally (on your workstation) using the Development stack.
* Use Chef-solo to build development, staging, QA and production servers to deploy to.
* Use Grunt prepare/build AngularJS application code for deployment (build supporting JS, CSS concatination, minification and versioning)
* Push code to a remote git repository - defaults are [Git Hub](http://github.com/) and [Bit Bucket](https://bitbucket.org/)
* Use Capistrano to deploy to a production standard server pulling from a remote git repository.
* Capistrano's default deployment configuration is for 4 machines. From localhost to a 'dev' server, to a 'staging' server, to a 'QA' server and then to a 'production' server.

## Setup, Installation and Use

* See the [docs/](https://github.com/rudijs/meanr-full-stack/tree/master/docs) folder for detailed information.

## Credits and Inspired by

* SOA architechure
* The [AngularJS](http://angularjs.org/) project and it's online tutorial
* [Egghead.io](https://egghead.io/)
* [Mean.io](http://mean.io/)
* [Yeoman.io](http://yeoman.io/)
* [ng-book](https://www.ng-book.com/)
* [Node.js the Right Way: Practical, Server-Side JavaScript That Scales](http://pragprog.com/book/jwnode/node-js-the-right-way)
* [Chef](http://www.getchef.com/solutions/devops/) and the DevOps 'infrastructre as code' movement

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
