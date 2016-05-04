#!/bin/bash
cp target/*.jar docker/
docker-compose build
