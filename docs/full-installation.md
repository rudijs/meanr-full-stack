## Requirements (with recommended versions)

* [Node.js](http://nodejs.org/) (v0.10.24)
* [Ruby](http://rvm.io/) (2.1.0p0)
* [VirtualBox](https://www.virtualbox.org/) (4.3.6)
* [Vagrant](http://www.vagrantup.com/) (1.4.0)
* [Git](http://git-scm.com/) and [Git-Flow](http://nvie.com/posts/a-successful-git-branching-model/)

## Overview

This section will take you step by step through the installation of:

1. The MEANR Stack application.
2. Install the required Ruby gems which are needed for the Virtual machine process.
3. Spin up a Ubuntu 12.04 virtual machine server.
4. Update and upgrade the server with all the latest base operating system software and security patches.
5. Install Chef on to the virtual machine - this is the Ruby dev ops software.
6. Install the virtual machine software, which includes MongoDB and Redis, with Chef cookbook recipes.

## Core Concepts

A key principle and use of MEANR stack is deploying the application through several environments.

* Local development - You alone
* Local deployment - You alone to preview what a live deployment will look like
* Staging deployment - For you, your team and clients to review new features before releasing to users
* QA deployment - Preview and testing of new features now on the master branch
* Production deployment - For end users - this is the web site itself on the internet

The deployment process relies on domain names which you configure in your **hosts** file

* Unix `/etc/hosts`
* Microsoft `%systemroot%\system32\drivers\etc\hosts`

You will need to add two entries to begin with and three more as you deploy onto remote machines

1. 127.0.0.1 meanr.local
2. 192.168.33.10 dev.meanr.com
3. xxx.xx.xxx.xx staging.meanr.com
4. xxx.xx.xxx.xx qa.meanr.com
5. xxx.xx.xxx.xx meanr.com

Where `xxx.xx.xxx.xx` will be real IPs we'll get later on in the process using Amazon EC2 virtual server instances.

Keep in mind because we are using our local host file the usage of the `meanr.com` domain name will work as we want for us only.

In your real world scenario you'd replace `meanr.com` with your real domain name.

`meanr.com` is an unavailable domain name but for our local environment that doesn't matter.

## Installation steps

Install global node dependencies `Grunt` and `Bower`

    npm install -g grunt-cli bower

Clone the git repository and cd into it

    git clone git@github.com:rudijs/meanr-full-stack.git
    cd meanr-full-stack/

Install node dependencies based on the `package.json` configuration

    npm install

Install front-end dependencies with Bower based on the `bower.json` configuration

    bower install

Copy all `example/*` configuration files into place

    grunt init

At this point the MEANR application is ready to run and if you have MongoDB and Redis installed you can proceed without the virtual machine.

Using a virtual machine is preferred as it keeps everything together nicely and is more team centric and also is used for the development deployment.

The development deployment is where you can check and confirm your production builds before pushing them onto the internet.

## Create a virtual machine running Ubuntu 12.04 for MongoDB and Redis

Change to chef/ working directory

    cd chef/

Install Ruby dev ops tools

    bundle

Spin up a Ubuntu 12.04 virtual machine based on the `Vagrantfile` configuration

(This will take a few minutes if the base OS needs to be downloaded)

    vagrant up

After the VM has started change to kitchen/ working directory

    cd kitchen

Download and install Chef community cookbooks using [Berkshelf](http://berkshelf.com/)

    berks vendor

The rest of our Dev Ops are command line operations.

Rather than type them out we'll use a utility wrapper Ruby script using [Thor](http://whatisthor.com/).

[Thor](http://whatisthor.com/) is a toolkit for building powerful command-line interfaces.

Add your ssh key to the VM (optional but recommended, this will allow password-less ssh command execution).

Enter the password `vagrant` when prompted.

    thor devops:sshcopyid

Update and upgrade the virtual machine server with apt package management.

This will take a few minutes, it's likely the Grub bootloader will also upgrade.

A Grub upgrade will require you to manually select a partition to install it on (select the 1st option).

    thor devops:upgrade

If you have the VirtualBox Guest Additions installed any linux kernel upgrade will break them.

After the virtual machine has rebooted fix this up with:

    thor devops:rebuild

After the virtual machine has rebooted, the up to date server is not ready to be bootstrapped with the DevOps software - Chef Solo.

This will download and install Chef with the Chef omnibus installer into the virtual machine:

    thor devops:bootstrap

Now that we have a running, up to date server that has the DevOps software (Chef Solo) installed we are ready to install our databases.

Before we do that update two things in the Chef Ruby code:

1. Check and update "your-email@address.com" in the `nodes/dev.meanr.com.json` file.
This will be the email address the server sends email to from it's various systems processes.

2. Copy your `~/.ssh/id_rsa.pub` PEM RSA private key into the `ssh_keys` property of the `deploy` user in `chef/kitchen/data_bags/users/deploy.json`
This is for the `deploy` user account so you will have no password DevOps access.


    thor devops:cook

This completes the virtual machine setup.

Before we fire up the MEANR web application we can test our DevOps on the serer with [ServerSpec](http://serverspec.org/)

List the available [ServerSpec](http://serverspec.org/) test suites:

    rake -T

Test our local `production like` development server:

    rake serverspec:dev

We can now start the MEANR app,

Start the application with `grunt`

    cd ../../
    grunt serve

View the application in Chrome

    http://meanr.local:3000/

We can seed the new MEANR database with a test user and some articles.

The fixture data is from the json files in `test/fixtures/db/`

We'll use a `Capistrano` task to run the database seeding with:

    cap local mongodb_seed

Note: There is also a database collection drop command

    cap local mongodb_drop

you can now log in with these user/pass credentials

Email:

    net@citizen.com

Password:

    asdf

Next steps, check out the [Testing](testing.md) documentation and run the test suites.

## Summary of installation commands

    npm install -g grunt-cli bower
    git clone git@github.com:rudijs/meanr-full-stack.git
    cd meanr-full-stack/
    git flow init
    npm install
    bower install
    grunt init
    cd chef/
    bundle
    vagrant up
    cd kitchen
    berks vendor
    thor devops:sshcopyid
    thor devops:upgrade
    thor devops:rebuild
    thor devops:bootstrap
    thor devops:cook
    cd ../../
    grunt serve
    google-chrome http://meanr.local:3000/
    cap local mongodb_seed

