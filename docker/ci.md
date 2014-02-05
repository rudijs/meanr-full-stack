sudo docker run -d -p 6380:6379 -name redis-ci rudijs/redis
sudo docker run -d -p 27018:27017 -name mongodb-ci rudijs/mongodb-ci
# sudo docker run -i -t -p 27018:27017 -name mongodb-ci rudijs/mongodb-ci

NODE_ENV=test-ci node test/util/seed.js

sudo docker stop redis-ci mongodb-ci

sudo docker rm redis-ci mongodb-ci
