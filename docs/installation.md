## Requirements

See the `Requirements Overview` section in the main repository README for the software requirements

## Overview

This section will take you step by step through the installation of:

1. The MEANR Stack application.
2. Install the required Ruby gems which are needed for the Virtual machine process.
3. Spin up a Ubuntu 12.04 virtual machine server.
4. Update and upgrade the server with all the latest base operating system software and security patches.
5. Install Chef on to the virtual machine - this is the Ruby dev ops software.
6. Install the virtual machine software, which includes MongoDB and Redis, with Chef cookbook recipes.

## Installation preparation

A key principle and use of this MEANR stack is deploying the application through several environments.

* Local development - You alone
* Local deployment - You alone to preview what a live deployment will look like
* Staging deployment - For you, your team and clients to review new features before releasing to users
* QA deployment - Preview and testing of new features now on the master branch
* Production deployment - For end users - this is the web site itself on the internet

The deployment process relies on domain names which you configure in your **hosts** file

* Unix `/etc/hosts/`
* Microsoft `%systemroot%\system32\drivers\etc\hosts`

You will need to add two entries to begin with and three more as you deploy onto remote machines

1. 127.0.0.1 meanr.local
2. 192.168.33.10 dev.meanr.com
3. xxx.xx.xxx.xx staging.meanr.com
4. xxx.xx.xxx.xx qa.meanr.com
5. xxx.xx.xxx.xx meanr.com

Where `xxx.xx.xxx.xx` will be real IPs we'll get later on in the process using Amazon EC2 virtual server instances.

Keep in mind because we are using our local host file the usage of the `meanr.com` domain name will work as we want for us only.

In your real world senario you'd replace `meanr.com` with your real domain name.

`meanr.com` is an unavailable domain name but for our local environment that doesn't matter.

## Installation steps

Install global node dependencies `Grunt` and `Bower`

    npm install -g grunt-cli bower

Clone the git repository

    git clone git@github.com:rudijs/meanr-full-stack.git

Switch to the `develop` branch (basically we never work on master)

    cd meanr-full-stack/
    git checkout develop

Install Git Flow - this not essential or required, using Git Flow is recommended

    git flow init

Choose all the defaults when prompted above

## Application initialization

Install node modules based on the `package.json` configuration

    npm install

Copy all example configuration files into place

    grunt init

Install front-end package dependencies with Bower based on the `bower.json` configuration

    bower install

At this point the MEANR application is ready to run and if you have MongoDB and Redis installed you can proceed without the virtual machine.

Using a virtual machine is preferred as it keeps everything together nicely and is more team centric and is used for the development deployment.

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

Download and install Chef community cookbooks using [Berkshelf[(http://berkshelf.com/)

    berks
    berks install --path cookbooks

The rest of our Dev Ops are command line operations, rather than type them out we'll use a utility Ruby script using [Thor](http://whatisthor.com/).

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

After the virtual machine has rebooted, the up to date server is not ready to be bootstrapped with the dev ops software - Chef Solo.

This will download and install Chef with the Chef omnibus installer into the virtual machine:

    thor devops:bootstrap

Now that we have a running, up to date server that has the dev ops software (chef solo) installed we are ready to install our databases.

Before we do that update two things in the Chef Ruby code:

1. Check and update "your-email@address.com" in the `nodes/dev.meanr.com.json` file.
This will be the email address the server sends email to from it's various systems processes.

2. Copy your `~/.ssh/id_rsa.pub` PEM RSA private key into the `ssh_keys` property of the `deploy` user in chef/kitchen/data_bags/users/deploy.json
This is for the deploy user account so you will have passwordless Dev Ops access.

    thor devops:cook

This should now complete the virtual machine setup.

We can now start the MEANR app, change back to the base directory `meanr-full-stack/`

    cd ../../

Before starting the MEANR app you can seed the database with a test user and some articles.

Run the bundle command to install Capistrano (Ruby)

    bundle
    cap development mongodb_seed

There is also a database collection drop command

    cap development mongodb_drop

Start the application with `grunt`

    grunt

View the application in Chrome

    google-chrome http://meanr.local:3000/

If you seeded the database you can log in right away with these user/pass credentials

Email:

    net@citizen.com

Password:

    asdf

Next steps, check out the [Testing](testing.md) documentation and run the test suites.

## Summary of installation commands

    npm install -g grunt-cli bower
    git clone git@github.com:rudijs/meanr-full-stack.git
    cd meanr-full-stack/
    git checkout develop
    git flow init
    npm install
    grunt init
    bower install
    cd chef/
    bundle
    vagrant up
    cd kitchen
    berks
    berks install --path cookbooks
    thor devops:sshcopyid
    thor devops:upgrade
    thor devops:rebuild
    thor devops:bootstrap
    thor devops:cook
    cd ../../
    grunt
    google-chrome http://meanr.local:3000/
