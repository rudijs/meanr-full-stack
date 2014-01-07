var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test',
  config = require('./config');

exports.config = {

  // The address of a running selenium server.
  seleniumAddress: (env.match(/test|development/)) ? config.get('seleniumAddress') : null,

  // Sauce Labs
  //sauceUser: (env !== 'test') ? config.get('sauceUser') : null,
  //sauceKey: (env !== 'test') ? config.get('sauceKey') : null,
  sauceUser: (!env.match(/test|development/)) ? config.get('sauceUser') : null,
  sauceKey: (!env.match(/test|development/)) ? config.get('sauceKey') : null,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [
//        '../test/e2e/*.spec.js'
    '../test/e2e/articles.spec.js'
//        '../test/e2e/one.spec.js'
  ],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
