## Amazon EC2

If you wish you use Amazon's EC2 servers for dev ops staging, qa and production servers these notes may help save you some time.

### Requirements

[Amazon's developer tools](http://aws.amazon.com/developertools/351)

The following will be all command line operations.

1. From you Amazon account copy your AWS Access key and Secret key and add them to your bash or zsh environemnt like so

    * `export AWS_ACCESS_KEY=ABC************XYZ`
    * `export AWS_SECRET_KEY=ABC************XYZ`

2. Add the Amazon EC2 tools api into you path

    * `export EC2_HOME=/home/user/ec2-api-tools`
    * `export PATH=$PATH:$EC2_HOME/bin`

3. Download and copy the ssh key from your Amazon account into `~/.ec2` (Note: set this file's permissions to 0600)

4. Add the ssh key to your key ring for passwordless login to the remote servers..

    * Example:
    * `ssh-add ~/.ec2/gsg-keypair.pem`

5. Add your current IP to the default authorization group

    * Get your current IP (example)
    * `curl checkip.dyndns.org`
    * View default group current settings
    * `ec2-describe-group default`
    * Add your IP to the default group for SSH server access
    * `ec2-authorize default -p 22 -s xxx.xx.xxx.xxx/32`
    * Add your IP to the default group for HTTP server access
    * `ec2-authorize default -p 80 -s xxx.xx.xxx.xxx/32`

6. Next spin up a Ubuntu Linux Micro server (cheapest server)

    * Update the `gsg-keypair` to the name of you ssh key
    * `ec2-run-instances ami-d0f89fb9 -n 1 -k gsg-keypair --availability-zone us-east-1a`
    * After a few moments you can get the assigned IP for the new instance
    * `ec2-describe-instances`
    * From the describe instances output copy the IP into your `/etc/hosts` file
    * Example:
    * `xxx.xx.xxx.xxx staging.meanr.com`

7. Next update, upgrade and configure the server with Chef recipes

    * Set the `DEVOPS_ENV` to the environment you wish to work with
    * Examples
    * `export DEVOPS_ENV=staging`
    * `export DEVOPS_ENV=qa`
    * `export DEVOPS_ENV=production`
    * Change to dev ops working directory
    * `cd meanr-full-stack/chef/kitchen/`
    * Run build commands and chef recipes using thor commands (ruby code)
    * Update and Upgrade server:
    * `thor devops:upgrade`
    * Add (bootstrap) the server with Chef
    * `thor devops:bootstrap`
    * Install all software
    * `thor devops:cook`

8. Deploy with Capistrano

    * This will deploy the application code and install the Node modules
    * `cd meanr-full-stack/`
    * `cap staging deploy`

9. View remote server
     * `http://staging.meanr.com`

10. When you're done you can termiate the remote server

    * Get the instance ID
    * `ec2-describe-instances`
    * Terminate example:
    * `ec2-terminate-instances i-ea*****c5`
