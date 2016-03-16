# Use the tomcat8 / jre8 image
FROM java:8

# Metadata
MAINTAINER <%= userName %> <<%= emailAddress %>>

# Update package sources
RUN apt-get update
RUN apt-get -y upgrade

# install and configure rng-tools (speeds up startup time on vHosts like DigitalOcean)
RUN apt-get install -y rng-tools
RUN rngd -r /dev/urandom

# "install" <%= baseName %>
RUN mkdir /<%= baseName %>
RUN mkdir /<%= baseName %>/log
ADD ../target/<%= baseName %>-0.0.1-SNAPSHOT.jar /<%= baseName %>/<%= baseName %>.jar
ADD ../src/main/resources/application.properties /<%= baseName %>/application.properties
ADD ../development.pkcs12 /<%= baseName %>/keystore.p12

# configure ports
EXPOSE 8080

# Uncomment the following line to enable "dev mode"
#ENV deleteRoot=true resetSettings=true

# run java
WORKDIR /<%= baseName %>/
CMD java -jar <%= baseName %>.jar --spring.config.location=application.properties
