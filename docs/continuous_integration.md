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

# TODO
