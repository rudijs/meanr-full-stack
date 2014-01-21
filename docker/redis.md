## Redis container

Log in and cd to working directory

    sudo docker login
    cd docker/build/redis

Build docker redis image

    sudo docker build -t rudijs/redis .

Review the new image

    sudo docker images

Run the redis container

    sudo docker run -d -p 6379:6379 -name redis rudijs/redis

Check the status

    sudo docker ps -a
    sudo docker logs redis
