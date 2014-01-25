## Workflow

### Local

Once all the requirements and dependencies have been met this is the gist of **local** workflow

1. Always work in the **develop** branch or a **feature** or **hotfix** branch (see Git Flow)
    * `cd meanr-full-stack/`
    * `git checkout develop`

2. Start the virtual machine running MongoDB and Redis (see the installation section for more details):
    * `cd meanr-full-stack/chef`
    * `vagrant up`

3. Start the meanr node application with the default Grunt task:
    * `cd meanr-full-stack/`
    * `grunt serve`

4. View the application using Chrome with the `LiveReload` Chrome extension
    * `http://meanr.local:3000`

5. Within the Chrome browser install and then click the `LiveReload` extension icon to connect to the local livereload server

6. Now as you now edit the Javascript files for each saved change JShint and unit tests run then the page auto reloads.

### Development

Next lets say you've made some changes and all the tests are passing, now you want to view what these changes look like on a production ready server.

We'll deploy to the development server. This server is also running locally as the virtual machine.

Note the virtual development server is built the same as in production but is using the git `develop` branch

1. Commit the changes to git (example)
    * `cd meanr-full-stack/`
    * `git add . && git commit -m 'Updates' && git push`

2. Deploy with capistrano
    * `cap development deploy`

3. View the application using Chrome
    * `http://dev.meanr.com`

### Staging

Next lets say you're happy and ready to share this with the team, we'll deploy to a staging server.

Note the remote staging server is also still on the git `develop` branch

1. Deploy with capistrano
    * `cd meanr-full-stack/`
    * `cap staging deploy`

2. View the application using Chrome
    * `http://staging.meanr.com`

### QA (Quality Assurance)

Next after peer review and collaboration you're now ready to release this update into production.

We'll make a git `master` branch release and deploy to into a `qa` (Quality Assurance) server - which is the final step before being release to end users.

Following the [Git Flow model](http://danielkummer.github.io/git-flow-cheatsheet/):

1. Update the `package.json` file version number.
    * `cd meanr-full-stack/`
    * Example from 0.0.1 to 0.0.2
    * `"version": "0.0.2`
    * `git add . && git commit -m 'Updates' && git push`
    * `git flow release start 0.0.2`
    * `git flow release finish 0.0.2`
    * `git push`

2. Deploy with capistrano
    * `cap qa deploy`

### Production

Next if all is good on the qa server we can deploy to production for all to use

1. Deploy with capistrano
    * `cd meanr-full-stack/`
    * `cap qa deploy`
