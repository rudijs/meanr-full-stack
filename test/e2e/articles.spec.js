var env = process.env.NODE_ENV = process.env.NODE_ENV || 'test',
  config = require('../../config/config');

describe('meanr', function () {

  var baseURL = config.get('e2e').url[env];
  var meanrPage;

  beforeEach(function () {
    meanrPage = new MeanrPage(baseURL);
  });

  it('should load the main page', function () {

    meanrPage.get('/');

    var title = element(by.id('title'));

    expect(title.getText()).toEqual('MEANR Stack');
  });

  describe('User Login', function () {

    it('should login', function () {

      meanrPage.get('/#/signin');

      meanrPage.setEmail('net@citizen.com');
      meanrPage.setPassword('asdf');

      meanrPage.clickSignIn();

    });

  });

  describe('Create Article', function () {

    it('should not submit an invalid form', function () {

      meanrPage.get('/#/articles/create');
      // Missing all input values
      meanrPage.clickSubmit();
      expect(meanrPage.getCurrentURL()).toMatch('articles\/create$');

      meanrPage.get('/#/articles/create');
      // Missing content value
      meanrPage.setTitle('e2e Test Title');
      meanrPage.clickSubmit();
      expect(meanrPage.getCurrentURL()).toMatch('articles\/create$');

      meanrPage.get('/#/articles/create');
      // Missing title value
      meanrPage.setContent('e2e Test Content');
      meanrPage.clickSubmit();
      expect(meanrPage.getCurrentURL()).toMatch('articles\/create$');

    });

    it('with a valid form should add a new article then locate to the new object show', function () {

      meanrPage.get('/#/articles/create');

      meanrPage.setTitle('e2e Test Title');
      meanrPage.setContent('e2e Test Content');

      meanrPage.clickSubmit();

      expect(meanrPage.getCurrentURL()).toMatch('articles\/([0-9a-fA-F]{24})$');
      expect(meanrPage.showArticleTitleText()).toMatch('e2e Test Title');

    });

  });

  describe('List Articles', function () {

    it('should display one or more articles', function () {

      meanrPage.get('/#/articles');

      expect(meanrPage.listFirstArticleText()).toMatch('e2e Test Title');
    });

  });

  describe('Show Article', function () {

    it('should display a article', function () {

      meanrPage.get('/#/articles');

      meanrPage.clickListArticle();

      expect(meanrPage.getCurrentURL()).toMatch('articles\/([0-9a-fA-F]{24})$');

    });

  });

  describe('Update Article', function () {

    it('should update a article', function () {

      meanrPage.get('/#/articles');

      meanrPage.clickListArticle();
      expect(meanrPage.getCurrentURL()).toMatch('articles\/([0-9a-fA-F]{24})$');

      meanrPage.clickEdit();
      expect(meanrPage.getCurrentURL()).toMatch('articles\/([0-9a-fA-F]{24}\/edit)$');

      meanrPage.updatetTitle(' Updated');

      meanrPage.clickUpdate();

      expect(meanrPage.getCurrentURL()).toMatch('articles\/([0-9a-fA-F]{24})$');
      expect(meanrPage.showArticleTitleText()).toMatch('e2e Test Title Updated');

    });

  });

  describe('Delete Article', function () {

    it('should delete a article', function () {

      meanrPage.get('/#/articles');

      meanrPage.clickListArticle();
      expect(meanrPage.getCurrentURL()).toMatch('articles\/([0-9a-fA-F]{24})$');

      meanrPage.clickEdit();
      expect(meanrPage.getCurrentURL()).toMatch('articles\/([0-9a-fA-F]{24}\/edit)$');

      meanrPage.clickDelete();

      expect(meanrPage.getCurrentURL()).toMatch('articles$');
    });

  });

  var MeanrPage = function (baseURL) {

    this.baseURL = baseURL;

    // Signin form
    this.email = element(by.model('email'));
    this.password = element(by.model('password'));
    this.signin = element(by.id('signin'));

    // Article forms
    this.title = element(by.model('title'));
    this.editTitle = element(by.model('article.title'));
    this.content = element(by.model('content'));
    this.submit = element(by.id('create'));
    this.editButton = element(by.id('edit'));
    this.updateButton = element(by.id('update'));
    this.deleteButton = element(by.id('delete'));

    // Article views
    this.showArticleTitle = element(by.css('table#article > tbody > tr:nth-child(1) > td:nth-child(2)'));
    this.listFirstArticle = element(by.css('table#articles > tbody > tr:nth-child(2) > td:first-child'));

    this.get = function (path) {
      browser.get(this.baseURL + path);
    };

    this.setEmail = function (email) {
      this.email.sendKeys(email);
    };

    this.clickSignIn = function () {
      this.signin.click();
    };

    this.setPassword = function (password) {
      this.password.sendKeys(password);
    };

    this.setTitle = function (title) {
      this.title.sendKeys(title);
    };

    this.updatetTitle = function (title) {
      this.editTitle.sendKeys(title);
    };

    this.setContent = function (content) {
      this.content.sendKeys(content);
    };

    this.clickSubmit = function () {
      this.submit.click();
    };

    this.getCurrentURL = function () {
      return browser.getCurrentUrl();
    };

    this.showArticleTitleText = function () {
      return this.showArticleTitle.getText();
    };

    this.listFirstArticleText = function () {
      return this.listFirstArticle.getText();
    };

    this.clickListArticle = function () {
      this.listFirstArticle.click();
    };

    this.clickEdit = function () {
      this.editButton.click();
    };

    this.clickUpdate = function () {
      this.updateButton.click();
    };

    this.clickDelete = function () {
      this.deleteButton.click();
    };

  };
});
