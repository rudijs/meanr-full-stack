# Redis Docker Notes

Log in and cd to working directory

    sudo docker login
    cd meanr-full-stack/docker/redis

Build docker redis image

    sudo docker build -t rudijs/redis .

Create the container

    sudo docker run -d -p 6379:6379 -name redis rudijs/redis

Check the status

    sudo docker ps -a
    sudo docker logs redis
