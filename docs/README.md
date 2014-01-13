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
    ├── config.js
    ├── env
    │   ├── example/
    │   ├── development.json
    │   ├── production.json
    │   ├── test.json
    │   └── travis.json
    ├── example/

Application configuration files (Express, Logging, Auth middleware, MongoDB, PassportJS, Redis)

    config
    ├── express.js
    ├── log.js
    ├── middlewares
    │   └── authorization.js
    ├── mongodb.js
    ├── passport.js
    ├── redis.js

Express Routes

    config
    └── routes
        ├── articles.js
        ├── default.js
        ├── package.json
        └── users.js

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

    app/

AngularJS application - production (concatinated and minified)

    dist/

Express API, utilities **and** auth protected AngularJS templates

    www
    ├── controllers
    │   ├── articles.js
    │   ├── default.js
    │   └── users.js
    ├── models
    │   ├── article.js
    │   └── user.js
    ├── utils
    │   └── user.js
    └── views
        ├── articles
        │   ├── create.html
        │   └── edit.html
        └── index.html


MongoDB Mongoose Models

    www
    ├── models
    │   ├── article.js
    │   └── user.js

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
