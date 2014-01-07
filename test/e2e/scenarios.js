describe('meanr', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  describe('User Login', function () {

    it('should login', function () {
      browser().navigateTo('/#/signin');
      input('email').enter('net@citizen.com');
      input('password').enter('asdf');
      element(':button').click();
    });

  });

  describe('Create Article', function () {

    it('should not submit an invalid form', function () {
      // Missing all values
      browser().navigateTo('/#/articles/create');
      element('#create').click();
      expect(browser().location().url()).toBe('/articles/create');

      // Missing content value
      browser().navigateTo('/#/articles/create');
      input('title').enter('e2e Test Title');
      element('#create').click();
      expect(browser().location().url()).toBe('/articles/create');

      // Missing title value
      browser().navigateTo('/#/articles/create');
      input('title').enter('');
      input('content').enter('e2e Test Content');
      element('#create').click();
      expect(browser().location().url()).toBe('/articles/create');
    });

    it('with a valid form should add a new article then locate to the new object show', function () {

      browser().navigateTo('/#/articles/create');

      input('title').enter('e2e Test Title');
      input('content').enter('e2e Test Content');

      // pause and do manual input to auto-complete google places
      element('#create').click();

      expect(browser().location().url()).toMatch('articles\/([0-9a-fA-F]{24})$');
      expect(element('table#article > tbody > tr:nth-child(1) > td:nth-child(2)').text()).toMatch('e2e Test Title');
    });

  });

  describe('Articles list view', function () {

    it('should display one or more articles', function () {

      browser().navigateTo('/#/articles');

      // First row is Table header
      //expect(element('table#articles > tbody > tr:nth-child(2) > td:first-child').text()).toBeTruthy();
      expect(element('table#articles > tbody > tr:nth-child(2) > td:first-child').text()).toMatch('e2e Test Title');
    });

  });

  describe('Article detail view', function () {

    it('should display a article', function () {
      browser().navigateTo('/#/articles');
      element('table#articles > tbody > tr:nth-child(2) > td:first-child').click();
      expect(browser().location().url()).toMatch('articles\/([0-9a-fA-F]{24})$');
    });

  });

  describe('Update Article', function () {

    it('should update a article', function () {

      browser().navigateTo('/#/articles');

      element('table#articles > tbody > tr:nth-child(2) > td:first-child').click();
      expect(browser().location().url()).toMatch('articles\/([0-9a-fA-F]{24})$');

      element('a#edit').click();
      expect(browser().location().url()).toMatch('articles\/([0-9a-fA-F]{24}\/edit)$');

      input('article.title').enter('e2e Upated Title');

      element('#update').click();

      expect(browser().location().url()).toMatch('articles\/([0-9a-fA-F]{24})$');
      expect(element('table#article > tbody > tr:nth-child(1) > td:nth-child(2)').text()).toMatch('e2e Upated Title');

    });

  });

  describe('Delete Article', function () {

    describe('should delete a article', function () {

      it('should delete a article', function () {

        browser().navigateTo('/#/articles');

        element('table#articles > tbody > tr:nth-child(2) > td:first-child').click();
        expect(browser().location().url()).toMatch('articles\/([0-9a-fA-F]{24})$');

        element('a#edit').click();
        expect(browser().location().url()).toMatch('articles\/([0-9a-fA-F]{24}\/edit)$');

        element('#delete').click();
        expect(browser().location().url()).toMatch('articles');

      });
    });

  });

});