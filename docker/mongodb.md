# MongoDB Docker Notes

Log in and cd to working directory

    sudo docker login
    cd meanr-full-stack/docker/mongodb

Build docker mongodb image

    sudo docker build -t rudijs/mongodb .

Set the data directory to be mounted into the container

    MONGO_DATA_DIR=/media/truecrypt2/projects/meanr-full-stack-data

Copy in the mongodb configuration file to the shared data directory

    cd ../../
    cp docker/conf/mongodb.conf $MONGO_DATA_DIR

Create the container

    sudo docker run -d -v $MONGO_DATA_DIR:/data -p 27017:27017 -name mongodb rudijs/mongodb

Check the status

    sudo docker ps -a
    sudo docker logs mongodb

## Admin Shell

Get the IP address of the current running mongod

    sudo docker inspect mongodb
    IP_ADDRESS=$(sudo docker inspect mongodb | python -c 'import json,sys;obj=json.load(sys.stdin);print obj[0]["NetworkSettings"]["IPAddress"]')

Create a new container, override the entrypoint and use the IP address from the above output

    sudo docker run -i -t -name mongo -entrypoint="mongo" rudijs/mongodb $IP_ADDRESS

Some utility commands

    sudo docker ps -a
    sudo docker ps -a -q | xargs sudo docker rm


## Mongo Import

Get the IP address of the current running mongod

    sudo docker inspect mongodb
    sudo docker inspect mongodb | python -c 'import json,sys;obj=json.load(sys.stdin);print obj[0]["NetworkSettings"]["IPAddress"]'

Create a new container overriding the entrypoint to drop into the command line

    sudo docker run -i -t -name mongoimport -entrypoint="/bin/bash" -v $MONGO_DATA_DIR:/data rudijs/mongodb

Inside the container use the IP from above with mongoimport

    mongoimport -h 172.17.0.2 --db meanr-dev --collection users --file /data/users.json
    mongoimport -h 172.17.0.2 --db meanr-dev --collection articles --file /data/articles.json

