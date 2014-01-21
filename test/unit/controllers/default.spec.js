'use strict';

var config = require('../../../config/config'),
  logger = require(config.get('root') + '/config/log'),
  should = require('chai').should(),
  sinon = require('sinon'),
  expectjs = require('chai').expect,
  envUtil = require(config.get('root') + 'www/utils/env'),
  controller = require(config.get('root') + '/www/controllers/default');

logger.info('Test Suite Start: defaultController - ' + new Date().toString());

describe('<Unit Test>', function () {

  describe('Default Controller', function () {

    it('#render() returns a non-logged in page', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.host = 'meanr.local';

      // mock expressjs/connect response object
      var res = {};
      res.render = function (template, templateVars) {

        // tests
        template.should.equal('index.html');

        should.exist(templateVars);
        templateVars.hostname.should.equal('meanr.local');
        templateVars.title.should.equal('MEANR');
        templateVars.user.should.equal('null');

        done();
      };

      // run controller
      controller.render(req, res);

    });

    it('#render() returns a logged in page', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.host = 'meanr.local';
      req.user = {
        email: 'example@email.com',
        currentProvider: 'local',
        _id: 'abc123',
        providers: {
          local: {
            name: 'Net Citizen',
            username: 'netcitizen'
          }
        }
      };

      // mock expressjs/connect response object
      var res = {};
      res.render = function (template, templateVars) {

        // tests
        template.should.equal('index.html');

        should.exist(templateVars);
        templateVars.hostname.should.equal('meanr.local');
        templateVars.title.should.equal('MEANR');
        templateVars.user.should.equal('{"email":"example@email.com","_id":"abc123","name":"Net Citizen"}');

        done();
      };

      // run controller
      controller.render(req, res);

    });

    it('#render() in production uses dist/index.html', function (done) {

      // mock expressjs/connect request object
      var req = {};
      req.host = 'meanr.local';

      // mock expressjs/connect response object
      var res = {};
      res.render = function (template) {

        // tests
        expectjs(template).to.match(/dist\/index.html$/);

        envUtil.getEnv.restore();

        done();
      };

      sinon.stub(envUtil, 'getEnv', function () {
        return 'production';
      });

      // run controller
      controller.render(req, res);

    });

  });

});

logger.info('Test Suite End: defaultController - ' + new Date().toString());