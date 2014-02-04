# Continuous Integration with Jenkins

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
