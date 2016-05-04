#!/bin/bash
echo Copying jarfile to docker context...
sleep 1
cp target/*.jar docker/
echo building image...
sleep 2
docker-compose build
echo Build done. Starting containers...
sleep 2
# start containers
screen docker-compose up
