'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');

var SpringGenerator = module.exports = function SpringGenerator(args, options, config) {
    yeoman.Base.apply(this, arguments);
};

util.inherits(SpringGenerator, yeoman.Base);

SpringGenerator.prototype.prompting = function prompting() {
    var cb = this.async();

    console.log(chalk.dim("                                     ,a,\r\n                                 ,lfo\"\"v6a,\r\n                             ,lfo\"\"      \"v6a,\r\n                         ,lfo\"\"             \"v6a,\r\n                     ,lfo\"\"                    \"v6a,\r\n                 ,lfo\"\"          ,lfoa,           \"v6a,\r\n             ,lfo\"\"          ,lfo\"\" \"8v6a,           \"v6a,\r\n         ,lfo\"\"          ,lfo\"\"      #  \"v6a,           \"v6a,\r\n     ,lfo\"\"          ,lfo\"\"         ,#.    \"v6a,           \"v6a,\r\n ,gPPR8,         ,lfo\"\"          ,lfo8a|      \"v6a,           \"v6a,\r\ndP'   `Yb    ,lfo\"\"          ,lfo\"\"   \"v6a,  ,lfo\"\"          ,lfo\"8\r\n8)     (8,lfo\"\"          ,lfo\"\"          v688\"\"          ,lfo\"\"   8\r\nYb     d8P\"          ,lfo\"\"          ,lfo\"\"          ,lfo\"\"       8\r\n \"8ggg8\"         ,lfo\"\"          ,lfo\"\"          ,lfo\"\"          ,8\r\n             ,gPPR8,         ,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            dP'   `Yb    ,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            8)     (8,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            Yb     d8P\"          ,lfo\"\"          ,lfo\"\"\r\n             \"8ggg8\"         ,lfo\"\"          ,lfo\"\"   \r\n                         ,gPPR8,         ,lfo\"\"       \r\n                        dP'   `Yb    ,lfo\"\"\r\n                        8)     (8,lfo\"\"\r\n                        Yb     d8P\"\r\n                         \"8ggg8\"" +
        chalk.cyan('\n\nWelcome to the Spring Boot Webapp Generator by Lerk!')));

    console.log(chalk.green('Newest feature: ') + chalk.white('Bugfixes.'));

    var prompts = [{
        type: 'string',
        name: 'userName',
        message: '(1/9) What is your name?',
        default: 'John Doe'
    }, {
        type: 'string',
        name: 'emailAddress',
        message: '(2/9) What is your mail address?',
        default: 'john@example.com'
    }, {
        type: 'string',
        name: 'packageName',
        message: '(3/9) What is your default package name?',
        default: 'com.example.myapp'
    }, {
        type: 'string',
        name: 'baseName',
        message: '(4/9) What is the base name of the app?',
        default: 'myapp'
    }, {
        type: 'string',
        name: 'appName',
        message: '(5/9) What is the title of your app?',
        default: 'Demo App'
    }, {
        type: 'string',
        name: 'serviceDescription',
        message: '(6/9) Give a short description of your project.',
        default: 'This app does awesome things.'
    }, {
        type: 'confirm',
        name: 'useScmAndDm',
        message: '(7/9) Do you want to use SCM and Distribution Management?',
        default: false
    }, {
        type: 'confirm',
        name: 'useBootstrapAlpha',
        message: '(8/9) Do you want to use Bootstrap 4 (alpha2)?',
        default: true
    }, {
        type: 'confirm',
        name: 'useDocker',
        message: '(9/9) Do you want to use Docker?',
        default: true
    }];

    this.prompt(prompts, function(props) {
        this.emailAddress = props.emailAddress;
        this.userName = props.userName;
        this.packageName = props.packageName;
        this.baseName = props.baseName;
        this.useScmAndDm = props.useScmAndDm;
        this.serviceDescription = props.serviceDescription;
        this.useBootstrapAlpha = props.useBootstrapAlpha;
        this.appName = props.appName;
        this.useDocker = props.useDocker;


        this.log('Generating files...')
            // ----------------------------
            // Webapp
            // ----------------------------
        var packageFolder = this.packageName.replace(/\./g, '/');
        var javaDir = 'src/main/java/' + packageFolder + '/';
        var resourceDir = 'src/main/resources/';
        var basename = this.baseName + '/';
        chalk.white('basename is: ' + basename);
        chalk.white('package folder is: ' + javaDir);
        var javaDirTemplate = 'src/main/java/package/';
        var resourceDirTemplate = 'src/main/resources/';

        this.log(chalk.blue('Main files'))

        // Project
        this.fs.copyTpl(this.templatePath('pom.xml'), this.destinationPath('pom.xml'), this);

        // Java - base
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'App.java'), this.destinationPath(javaDir + 'App.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'AppAuthenticationProvider.java'), this.destinationPath(javaDir + 'AppAuthenticationProvider.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'Consts.java'), this.destinationPath(javaDir + 'Consts.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'MessageByLocaleService.java'), this.destinationPath(javaDir + 'MessageByLocaleService.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'MvcConfig.java'), this.destinationPath(javaDir + 'MvcConfig.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'SecurityConfig.java'), this.destinationPath(javaDir + 'SecurityConfig.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'PasswordStorage.java'), this.destinationPath(javaDir + 'PasswordStorage.java'), this);

        // Java - controllers
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'controllers/AppErrorController.java'), this.destinationPath(javaDir + 'controllers/AppErrorController.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'controllers/HomeController.java'), this.destinationPath(javaDir + 'controllers/HomeController.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'controllers/LoginController.java'), this.destinationPath(javaDir + 'controllers/LoginController.java'), this);

        // Java - entities
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'entities/Config.java'), this.destinationPath(javaDir + 'entities/Config.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'entities/User.java'), this.destinationPath(javaDir + 'entities/User.java'), this);

        // Java - mail
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'mail/MailMan.java'), this.destinationPath(javaDir + 'mail/MailMan.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'mail/MailProps.java'), this.destinationPath(javaDir + 'mail/MailProps.java'), this);

        // Java - repos
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'repositories/SysConfigRepository.java'), this.destinationPath(javaDir + 'repositories/SysConfigRepository.java'), this);
        this.fs.copyTpl(this.templatePath(javaDirTemplate + 'repositories/UserRepository.java'), this.destinationPath(javaDir + 'repositories/UserRepository.java'), this);

        this.log(chalk.blue('Resource files'))

        // Resources - base
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'logback.xml'), this.destinationPath(resourceDir + 'logback.xml'), this);
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'application.properties'), this.destinationPath(resourceDir + 'application.properties'), this);

        // Resources - locale
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'locale/messages_de.properties'), this.destinationPath(resourceDir + 'locale/messages_de.properties'), this);
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'locale/messages_en.properties'), this.destinationPath(resourceDir + 'locale/messages_en.properties'), this);

        // Resources - static/js
        if (this.useBootstrapAlpha) {
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/js/bootstrap.js'), this.destinationPath(resourceDir + 'static/js/bootstrap.js'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/js/bootstrap.min.js'), this.destinationPath(resourceDir + 'static/js/bootstrap.min.js'), this);
        } else {
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/js/bs3/bootstrap.js'), this.destinationPath(resourceDir + 'static/js/bootstrap.js'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/js/bs3/bootstrap.min.js'), this.destinationPath(resourceDir + 'static/js/bootstrap.min.js'), this);
        }
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/js/jquery.min.js'), this.destinationPath(resourceDir + 'static/js/jquery.min.js'), this);
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/js/tether.min.js'), this.destinationPath(resourceDir + 'static/js/tether.min.js'), this);

        // Resources - static/css
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/index.css'), this.destinationPath(resourceDir + 'static/css/index.css'), this);
        if (this.useBootstrapAlpha) {
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/bootstrap.css'), this.destinationPath(resourceDir + 'static/css/bootstrap.css'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/bootstrap.css.map'), this.destinationPath(resourceDir + 'static/css/bootstrap.css.map'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/bootstrap.min.css'), this.destinationPath(resourceDir + 'static/css/bootstrap.min.css'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/bootstrap.min.css.map'), this.destinationPath(resourceDir + 'static/css/bootstrap.min.css.map'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/glyphicons.css'), this.destinationPath(resourceDir + 'static/css/glyphicons.css'), this);
        } else {
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/bs3/bootstrap.css'), this.destinationPath(resourceDir + 'static/css/bootstrap.css'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/bs3/bootstrap.css.map'), this.destinationPath(resourceDir + 'static/css/bootstrap.css.map'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/bs3/bootstrap.min.css'), this.destinationPath(resourceDir + 'static/css/bootstrap.min.css'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/css/bs3/bootstrap.min.css.map'), this.destinationPath(resourceDir + 'static/css/bootstrap.min.css.map'), this);
        }

        //Resources - static/fonts
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.eot'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.eot'), this);
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.svg'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.svg'), this);
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.ttf'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.ttf'), this);
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.woff'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.woff'), this);
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.woff2'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.woff2'), this);

        // Resources - static/images
        this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'static/images/usr_default.jpg'), this.destinationPath(resourceDir + 'static/images/usr_default.jpg'), this);

        if (this.useBootstrapAlpha) {

            // Resources - templates
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/register.html'), this.destinationPath(resourceDir + 'templates/register.html'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/platform.html'), this.destinationPath(resourceDir + 'templates/platform.html'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/login.html'), this.destinationPath(resourceDir + 'templates/login.html'), this);

            // Resources - templates/fragments
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/fragments/navbar.html'), this.destinationPath(resourceDir + 'templates/fragments/navbar.html'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/fragments/footer.html'), this.destinationPath(resourceDir + 'templates/fragments/footer.html'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/fragments/error.html'), this.destinationPath(resourceDir + 'templates/fragments/error.html'), this);

            // Resources - templates/fragments/reception
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/fragments/reception/content_landing.html'), this.destinationPath(resourceDir + 'templates/fragments/reception/content_landing.html'), this);

            // Resources - templates/fragments/backroom
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/fragments/backroom/content_main.html'), this.destinationPath(resourceDir + 'templates/fragments/backroom/content_main.html'), this);

        } else {

            // Resources - templates
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/bs3/register.html'), this.destinationPath(resourceDir + 'templates/register.html'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/bs3/platform.html'), this.destinationPath(resourceDir + 'templates/platform.html'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/bs3/login.html'), this.destinationPath(resourceDir + 'templates/login.html'), this);

            // Resources - templates/fragments
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/navbar.html'), this.destinationPath(resourceDir + 'templates/fragments/navbar.html'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/footer.html'), this.destinationPath(resourceDir + 'templates/fragments/footer.html'), this);
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/error.html'), this.destinationPath(resourceDir + 'templates/fragments/error.html'), this);

            // Resources - templates/fragments/reception
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/reception/content_landing.html'), this.destinationPath(resourceDir + 'templates/fragments/reception/content_landing.html'), this);

            // Resources - templates/fragments/backroom
            this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/backroom/content_main.html'), this.destinationPath(resourceDir + 'templates/fragments/backroom/content_main.html'), this);

        }

        this.log(chalk.blue('Base files'))

        // Base folder stuff
        this.fs.copyTpl(this.templatePath('.npmignore'), this.destinationPath('.gitignore'), this);
        this.fs.copyTpl(this.templatePath('mongodb.conf'), this.destinationPath('mongodb.conf'), this);
        this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this);
        this.fs.copyTpl(this.templatePath('generateKeystore.sh'), this.destinationPath('generateKeystore.sh'), this);

        // Docker stuff
        if (this.useDocker) {
            this.log(chalk.blue('Docker files'))
            this.fs.copyTpl(this.templatePath('startDocker.sh'), this.destinationPath('startDocker.sh'), this);
            this.fs.copyTpl(this.templatePath('docker/docker-compose.yml'), this.destinationPath('docker-compose.yml'), this);
            this.fs.copyTpl(this.templatePath('docker/Dockerfile'), this.destinationPath('docker/Dockerfile'), this);
        }
        this.config.set('emailAddress', this.emailAddress);
        this.config.set('userName', this.userName);
        this.config.set('packageName', this.packageName);
        this.config.set('useScmAndDm', this.useScmAndDm); // I'm unsure whether it's good to keep this saved...
        this.config.set('packageFolder', packageFolder);
        this.config.set('useDocker', this.useDocker);

        cb();
    }.bind(this));
};
