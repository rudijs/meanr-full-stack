# Continuous Integration with Travis or Jenkins

## Travis

MEANR Full Stack being an open source codebase is already setup and running with [Travis](https://travis-ci.org)

The CI steps are configured in the `.travis.yml` file.

You can review the build history [here](https://travis-ci.org/rudijs/meanr-full-stack/builds)

## Jenkins

Jenkins is an open source continuous integration tool written in Java and provides continuous integration services.

You can host Jenkins yourself locally or remote or use a cloud provider.

The goals for continuous integration with Jenkins and MEANR Full Stack are:

1. Run the test suites with each commit on each branch
2. On the master branch successful builds are then containerized with Docker.
3. Docker containers of successful master branch builds are pushed to a private docker registry.
4. Production servers running Docker will pull from the private registry for release deployments.

At this time only step 1) above is supported in the MEANR Full Stack, details are as follows.


useradd -d /media/truecrypt2/projects/jenkins/ -m -c 'Jenkins CI' -s /bin/bash -U jenkins

sudo su - jenkins

$ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/media/truecrypt2/projects/jenkins//.ssh/id_rsa):
Created directory '/media/truecrypt2/projects/jenkins//.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /media/truecrypt2/projects/jenkins//.ssh/id_rsa.
Your public key has been saved in /media/truecrypt2/projects/jenkins//.ssh/id_rsa.pub.

Add the new ssh public key to github (or other git server)

Connect to github and add to ssh known hosts

$ ssh git@github.com
The authenticity of host 'github.com (192.30.252.129)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,192.30.252.129' (RSA) to the list of known hosts.
PTY allocation request failed on channel 0
Hi rudijs! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.

sudo -u jenkins java -jar /media/truecrypt2/code/jenkins.war

http://localhost:8080/

Update any existing plugins

Install these two new plugins

Git Plugin
This plugin allows use of Git as a build SCM.

Post build task
This plugin allows the user to execute a shell/batch task depending on the build log output.

New task

add git

add ant


Docker

Ant will start redis-ci and mongodb-ci containers so we need to have the images built and ready to go. Example:

    sudo docker images

    REPOSITORY                TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
    rudijs/mongodb-ci         latest              5dfc61d8ad22        47 hours ago        497.1 MB
    rudijs/redis              latest              caaac50df06a        2 weeks ago         297.2 MB

See `docker/build` directory for details on building these images

Export Java and Ant home

    export JAVA_HOME=/media/truecrypt1/opt/jdk1.6.0_25
    export PATH=/media/truecrypt2/code/apache-ant-1.9.3/bin:$PATH

Test

    java -version
    ant -version

Start Jenkins server

    JENKINS_HOME=/media/truecrypt2/projects/jenkins java -jar /media/truecrypt2/code/jenkins.war

Plugins

* Jenkins GIT plugin
* Hudson Post build task

Configure the git repo.

Configure build emails.

Configure two post build tasks to look for "BUILD FAILED" in the logs.

If failed build run:

    sudo docker stop redis-ci && sudo docker rm redis-ci
    sudo docker stop mongodb-ci && sudo docker rm mongodb-ci

Command line build

    curl 'http://localhost:8080/job/ride-share-market/build?delay=0sec'
