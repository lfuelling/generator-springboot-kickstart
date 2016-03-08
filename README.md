[![Unicorn](https://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat)](https://www.youtube.com/watch?v=qRC4Vk6kisY)

# SpringBoot Kickstart

is a Yeoman generator that creates a simple SpringBoot application with basic (password based) authentication, Thymeleaf, `javax.mail` and MongoDB. Bootstrap 4 (alpha 2) is used on the frontend side. 
Since v1.0.1 you can choose between Bootstrap 4 and 3.3.6 and since 1.1.4, the HTML templates were downgraded to look "good" using Bootstrap 3 (minor bugs may appear).

It has absolutely nothing to do with [Kickstart](http://getkickstart.com/) but was inspired by [Bootstrap Kickstart](https://github.com/micromata/bootstrap-kickstart).

## Table of Contents

- [Quick install guide](#quick-install-guide)
- [Running the app](#running)

## Quick install guide

You need to have [Node.js](https://nodejs.org) installed.

	$ npm install -g yo
	$ npm install -g generator-springboot-kickstart
	$ yo springboot-kickstart

## Running

Before your first run, you need to build a new keystore containing a valid SSL certificate. Instructions for this can be found [in the oracle docs](https://docs.oracle.com/cd/E19509-01/820-3503/ggfhb/index.html) or [on palantir's site](https://www.palantir.com/2008/06/pkcs12/) (I haven't tested the oracle one but it seems valid) The Palantir how to also covers the generation of the key itself.

**Since 1.1.2** there is a `generateKeystore.sh` script in the output folder you can use to generate the keys. Please note that you need to run this in the root of the generated app. (The script i actually working since 1.1.5)

After that you need to update the SSL specific values in `./src/main/resources/application.properties` to match your setup. Alternatively you can place a `application.properties` file in the same folder as the jarfile is.

1. Start MongoDB by running `mongod --config mongod.conf` in the project root (don't forget to create `data/db` and `log` directories or MongoDB will fail to start)
2. Start the webapp using your IDE (or the CLI if you know how)

I recommend setting the following environment variables when developing:

```
deleteRoot=true
resetSettings=true
```

When using those, you'll have a clean setup after every build and a new root user is created every launch.

### Using IntelliJ IDEA

The generated app can run without problems using the following run configuration:

![runconf](runconf.png)
