## Getting Started

* [Configuration](configuration.md)
* [Installation](installation.md)
* [Testing](testing.md)
* [Workflow](workflow.md)
* [Authentication](authentication.md)
* [i18n](i18n.md)
* [Database](database.md)
* [Amazon EC2](amazon_ec2.md)

### File Layout

Environment configuration files - the task `grunt init` copies files from the respective `example/` directory into place:

    config
    ├── env
    │   ├── example
    │   │   ├── development.json
    │   │   ├── production.json
    │   │   ├── test.json
    │   │   └── travis.json
    │   ├── development.json
    │   ├── production.json
    │   ├── test.json
    │   └── travis.json
    ├── example
    │   └── config.js
    ├── config.js

Application configuration files (Express, Logging, MongoDB, PassportJS, Redis)

    config
    ├── express.js
    ├── log.js
    ├── mongodb.js
    ├── passport.js
    ├── redis.js

Capistrano deployment

    config
    ├── deploy
    │   ├── development.rb
    │   ├── production.rb
    │   ├── qa.rb
    │   └── staging.rb
    ├── deploy.rb

Testing

    config
    ├── karma.conf.js
    ├── e2e.conf.js


AngularJS application - development

    app
    ├── bower_components
    ├── favicon.ico
    ├── images
    ├── scripts
    ├── styles
    └── views

AngularJS auth protected views

    www
    └── views
        ├── articles
        │   ├── create.html
        │   └── edit.html

AngularJS application - production (concatinated and minified)

    dist
    ├── bower_components
    ├── favicon.ico
    ├── images
    ├── index.html
    ├── scripts
    ├── styles
    └── views

Express controllers, auth middleware, routes, utility functions, index view and 500 page.

    www
    ├── controllers
    │   ├── articles.js
    │   ├── default.js
    │   └── users.js
    ├── middlewares
    │   └── authorization.js
    ├── routes
    │   ├── articles.js
    │   ├── default.js
    │   └── users.js
    ├── utils
    │   ├── env.js
    │   ├── requireWalk.js
    │   └── user.js
    └── views
        ├── 500.html
        └── index.html

MongoDB Mongoose Models

    www
    ├── models
    │   ├── article.js
    │   └── user.js

MongoDB Indexes

    www
    ├── indexes
    │   └── users.js

MongoDB Seed Data

    test
    ├── fixtures
    │   └── db
    │       ├── articles.json
    │       └── users.json

Chef Dev Ops and Vagrant Virtualbox Virtual Machine

    chef
    ├── Gemfile
    ├── Gemfile.lock
    ├── kitchen
    │   ├── Berksfile
    │   ├── Berksfile.lock
    │   ├── cookbooks
    │   ├── data_bags
    │   ├── devops.thor
    │   ├── environments
    │   ├── nodes
    │   │   ├── example/
    │   │   ├── dev.meanr.com.json
    │   │   ├── meanr.com.json
    │   │   ├── qa.meanr.com.json
    │   │   └── staging.meanr.com.json
    │   ├── Rakefile
    │   ├── roles
    │   │   ├── base.json
    │   │   ├── meanr.json
    │   │   ├── meanr_develop_branch.json
    │   │   └── meanr_master_branch.json
    │   ├── site-cookbooks
    │   └── spec
    └── Vagrantfile
