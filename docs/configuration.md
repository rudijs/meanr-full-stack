## Configuration

Sensitive configuration files by default are not stored inside the git repository.

Sensitive configuration files are copied from an `example/` directory and are `.gitignore`'d from the git repository.

The deployment process will copy these configuration files directly from your workstation to the remote server.

This will keep sensitive configuration details like user/pass and API keys out of the git repository.

There are configuration files for:

1. Node.js
2. AngularJS
3. Capistrano (for Deployment)
4. Chef-Solo (for Dev Ops)

## Environments

The MEANR stack application **runs** in three environment modes:

1. development
2. production
3. test

The MEANR stack is **deployed** into four environments and each deployment environment uses either the git `master` branch or `develop` branch

1. development (git `develop` branch)
2. staging (git `develop` branch)
3. qa (git `master` branch)
4. production (git `master` branch)

These four deployment environments are used:

1. development - used by the developer (you) on their workstation
2. staging - deployed to a remote server to team review of features running on the `develop` branch
3. qa - deployed to a remote server to team review of features running on the `master` branch
3. production - deployed to a remote server for all end users. This is the web site for all to use.

### Node.js

All configuration is specified in the `config` and `env` folders,

These five sensitive configuration files are copied from the `example/` directory:

1. config/config.js
2. config/env/development.json
3. config/env/production.json
4. config/env/test.json
5. config/env/travis.json

General node application configs:

* config/express.js
* config/log.js
* config/mongodb.js
* config/passport.js
* config/redis.js

### Express routes

* config/routes/articles.js
* config/routes/default.js
* config/routes/package.json
* config/routes/users.js

### AngularJS

* app/scripts/app.js
* app/scripts/init.js
* app/scripts/routes.js
* config/karma.conf.js
* config/karma.e2e.conf.js

### Capistrano

* config/deploy.rb
* config/deploy/development.rb
* config/deploy/production.rb
* config/deploy/qa.rb
* config/deploy/staging.rb

### Chef-Solo

These six sensitive configuration files are copied from the `example/` directory:

1. chef/kitchen/.chef/knife.rb
2. chef/kitchen/nodes/dev.meanr.com.json
3. chef/kitchen/nodes/meanr.com.json
4. chef/kitchen/nodes/qa.meanr.com.json
5. chef/kitchen/nodes/staging.meanr.com.json
6. chef/kitchen/data_bags/users/deploy.json