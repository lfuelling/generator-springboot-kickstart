'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var SpringGenerator = module.exports = function SpringGenerator(args, options, config) {
  yeoman.Base.apply(this, arguments);
};

util.inherits(SpringGenerator, yeoman.Base);

SpringGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(chalk.dim("                                     ,a,\r\n                                 ,lfo\"\"v6a,\r\n                             ,lfo\"\"      \"v6a,\r\n                         ,lfo\"\"             \"v6a,\r\n                     ,lfo\"\"                    \"v6a,\r\n                 ,lfo\"\"          ,lfoa,           \"v6a,\r\n             ,lfo\"\"          ,lfo\"\" \"8v6a,           \"v6a,\r\n         ,lfo\"\"          ,lfo\"\"      #  \"v6a,           \"v6a,\r\n     ,lfo\"\"          ,lfo\"\"         ,#.    \"v6a,           \"v6a,\r\n ,gPPR8,         ,lfo\"\"          ,lfo8a|      \"v6a,           \"v6a,\r\ndP'   `Yb    ,lfo\"\"          ,lfo\"\"   \"v6a,  ,lfo\"\"          ,lfo\"8\r\n8)     (8,lfo\"\"          ,lfo\"\"          v688\"\"          ,lfo\"\"   8\r\nYb     d8P\"          ,lfo\"\"          ,lfo\"\"          ,lfo\"\"       8\r\n \"8ggg8\"         ,lfo\"\"          ,lfo\"\"          ,lfo\"\"          ,8\r\n             ,gPPR8,         ,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            dP'   `Yb    ,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            8)     (8,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            Yb     d8P\"          ,lfo\"\"          ,lfo\"\"\r\n             \"8ggg8\"         ,lfo\"\"          ,lfo\"\"   \r\n                         ,gPPR8,         ,lfo\"\"       \r\n                        dP'   `Yb    ,lfo\"\"\r\n                        8)     (8,lfo\"\"\r\n                        Yb     d8P\"\r\n                         \"8ggg8\"" +
    chalk.cyan('\n\nWelcome to the Spring Boot Webapp Generator by Lerk!')));

  console.log(chalk.green('Newest feature: ') + chalk.white('Docker integration!'));

  var prompts = [
    {
      type: 'string',
      name: 'userName',
      message: '(1/8) What is your name?',
      default: 'John Doe'
    },
    {
      type: 'string',
      name: 'emailAddress',
      message: '(2/8) What is your mail address?',
      default: 'john@example.com'
    },
    {
      type: 'string',
      name: 'packageName',
      message: '(3/8) What is your default package name?',
      default: 'com.example.myapp'
    },
    {
      type: 'string',
      name: 'baseName',
      message: '(4/8) What is the base name of the app?',
      default: 'myapp'
    }, {
      type: 'string',
      name: 'appName',
      message: '(5/8) What is the title of your app?',
      default: 'Demo App'
    },
    {
      type: 'string',
      name: 'serviceDescription',
      message: '(6/8) Give a short description of your project.',
      default: 'This app does awesome things.'
    },
    {
      type: 'confirm',
      name: 'useScmAndDm',
      message: '(7/8) Do you want to use SCM and Distribution Management?',
      default: false
    },
    {
      type: 'confirm',
      name: 'useBootstrapAlpha',
      message: '(8/8) Do you want to use Bootstrap 4 (alpha2)?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.emailAddress = props.emailAddress;
    this.userName = props.userName;
    this.packageName = props.packageName;
    this.baseName = props.baseName;
    this.useScmAndDm = props.useScmAndDm;
    this.serviceDescription = props.serviceDescription;
    this.useBootstrapAlpha = props.useBootstrapAlpha;
    this.appName = props.appName;
    cb();
  }.bind(this));
};

SpringGenerator.prototype.app = function app() {
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

  // Project
  this.template('pom.xml', 'pom.xml', this, {'interpolate': /<%=([\s\S]+?)%>/g});

  // Java - base
  this.template(javaDirTemplate + 'App.java', javaDir + 'App.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'AppAuthenticationProvider.java', javaDir + 'AppAuthenticationProvider.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'Consts.java', javaDir + 'Consts.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'MessageByLocaleService.java', javaDir + 'MessageByLocaleService.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'MvcConfig.java', javaDir + 'MvcConfig.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'SecurityConfig.java', javaDir + 'SecurityConfig.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'PasswordStorage.java', javaDir + 'PasswordStorage.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});

  // Java - controllers
  this.template(javaDirTemplate + 'controllers/AppErrorController.java', javaDir + 'controllers/AppErrorController.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'controllers/HomeController.java', javaDir + 'controllers/HomeController.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'controllers/LoginController.java', javaDir + 'controllers/LoginController.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});

  // Java - entities
  this.template(javaDirTemplate + 'entities/Config.java', javaDir + 'entities/Config.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'entities/User.java', javaDir + 'entities/User.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});

  // Java - mail
  this.template(javaDirTemplate + 'mail/MailMan.java', javaDir + 'mail/MailMan.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'mail/MailProps.java', javaDir + 'mail/MailProps.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});

  // Java - repos
  this.template(javaDirTemplate + 'repositories/SysConfigRepository.java', javaDir + 'repositories/SysConfigRepository.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(javaDirTemplate + 'repositories/UserRepository.java', javaDir + 'repositories/UserRepository.java', this, {'interpolate': /<%=([\s\S]+?)%>/g});


  // Resources - base
  this.template(resourceDirTemplate + 'logback.xml', resourceDir + 'logback.xml', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template(resourceDirTemplate + 'application.properties', resourceDir + 'application.properties', this, {});

  // Resources - locale
  this.template(resourceDirTemplate + 'locale/messages_de.properties', resourceDir + 'locale/messages_de.properties', this, {});
  this.template(resourceDirTemplate + 'locale/messages_en.properties', resourceDir + 'locale/messages_en.properties', this, {});

  // Resources - static/js
  if (this.useBootstrapAlpha) {
    this.template(resourceDirTemplate + 'static/js/bootstrap.js', resourceDir + 'static/js/bootstrap.js', this, {});
    this.template(resourceDirTemplate + 'static/js/bootstrap.min.js', resourceDir + 'static/js/bootstrap.min.js', this, {});
  } else {
    this.template(resourceDirTemplate + 'static/js/bs3/bootstrap.js', resourceDir + 'static/js/bootstrap.js', this, {});
    this.template(resourceDirTemplate + 'static/js/bs3/bootstrap.min.js', resourceDir + 'static/js/bootstrap.min.js', this, {});
  }
  this.template(resourceDirTemplate + 'static/js/jquery.min.js', resourceDir + 'static/js/jquery.min.js', this, {});
  this.template(resourceDirTemplate + 'static/js/tether.min.js', resourceDir + 'static/js/tether.min.js', this, {});

  // Resources - static/css
  this.template(resourceDirTemplate + 'static/css/index.css', resourceDir + 'static/css/index.css', this, {});
  if (this.useBootstrapAlpha) {
    this.template(resourceDirTemplate + 'static/css/bootstrap.css', resourceDir + 'static/css/bootstrap.css', this, {});
    this.template(resourceDirTemplate + 'static/css/bootstrap.css.map', resourceDir + 'static/css/bootstrap.css.map', this, {});
    this.template(resourceDirTemplate + 'static/css/bootstrap.min.css', resourceDir + 'static/css/bootstrap.min.css', this, {});
    this.template(resourceDirTemplate + 'static/css/bootstrap.min.css.map', resourceDir + 'static/css/bootstrap.min.css.map', this, {});
    this.template(resourceDirTemplate + 'static/css/glyphicons.css', resourceDir + 'static/css/glyphicons.css', this, {});
  } else {
    this.template(resourceDirTemplate + 'static/css/bs3/bootstrap.css', resourceDir + 'static/css/bootstrap.css', this, {});
    this.template(resourceDirTemplate + 'static/css/bs3/bootstrap.css.map', resourceDir + 'static/css/bootstrap.css.map', this, {});
    this.template(resourceDirTemplate + 'static/css/bs3/bootstrap.min.css', resourceDir + 'static/css/bootstrap.min.css', this, {});
    this.template(resourceDirTemplate + 'static/css/bs3/bootstrap.min.css.map', resourceDir + 'static/css/bootstrap.min.css.map', this, {});
  }

  //Resources - static/fonts
  this.template(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.eot', resourceDir + 'static/fonts/glyphicons-halflings-regular.eot', this, {});
  this.template(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.svg', resourceDir + 'static/fonts/glyphicons-halflings-regular.svg', this, {});
  this.template(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.ttf', resourceDir + 'static/fonts/glyphicons-halflings-regular.ttf', this, {});
  this.template(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.woff', resourceDir + 'static/fonts/glyphicons-halflings-regular.woff', this, {});
  this.template(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.woff2', resourceDir + 'static/fonts/glyphicons-halflings-regular.woff2', this, {});

  // Resources - static/images
  this.template(resourceDirTemplate + 'static/images/usr_default.jpg', resourceDir + 'static/images/usr_default.jpg', this, {});

  if (this.useBootstrapAlpha) {

    // Resources - templates
    this.template(resourceDirTemplate + 'templates/register.html', resourceDir + 'templates/register.html', this, {});
    this.template(resourceDirTemplate + 'templates/platform.html', resourceDir + 'templates/platform.html', this, {});
    this.template(resourceDirTemplate + 'templates/login.html', resourceDir + 'templates/login.html', this, {});

    // Resources - templates/fragments
    this.template(resourceDirTemplate + 'templates/fragments/navbar.html', resourceDir + 'templates/fragments/navbar.html', this, {});
    this.template(resourceDirTemplate + 'templates/fragments/footer.html', resourceDir + 'templates/fragments/footer.html', this, {});
    this.template(resourceDirTemplate + 'templates/fragments/error.html', resourceDir + 'templates/fragments/error.html', this, {});

    // Resources - templates/fragments/reception
    this.template(resourceDirTemplate + 'templates/fragments/reception/content_landing.html', resourceDir + 'templates/fragments/reception/content_landing.html', this, {});

    // Resources - templates/fragments/backroom
    this.template(resourceDirTemplate + 'templates/fragments/backroom/content_main.html', resourceDir + 'templates/fragments/backroom/content_main.html', this, {});

  } else {

    // Resources - templates
    this.template(resourceDirTemplate + 'templates/bs3/register.html', resourceDir + 'templates/register.html', this, {});
    this.template(resourceDirTemplate + 'templates/bs3/platform.html', resourceDir + 'templates/platform.html', this, {});
    this.template(resourceDirTemplate + 'templates/bs3/login.html', resourceDir + 'templates/login.html', this, {});

    // Resources - templates/fragments
    this.template(resourceDirTemplate + 'templates/bs3/fragments/navbar.html', resourceDir + 'templates/fragments/navbar.html', this, {});
    this.template(resourceDirTemplate + 'templates/bs3/fragments/footer.html', resourceDir + 'templates/fragments/footer.html', this, {});
    this.template(resourceDirTemplate + 'templates/bs3/fragments/error.html', resourceDir + 'templates/fragments/error.html', this, {});

    // Resources - templates/fragments/reception
    this.template(resourceDirTemplate + 'templates/bs3/fragments/reception/content_landing.html', resourceDir + 'templates/fragments/reception/content_landing.html', this, {});

    // Resources - templates/fragments/backroom
    this.template(resourceDirTemplate + 'templates/bs3/fragments/backroom/content_main.html', resourceDir + 'templates/fragments/backroom/content_main.html', this, {});

  }

  // Base folder stuff
  this.template('.npmignore', '.gitignore', this, {});
  this.template('mongodb.conf', 'mongodb.conf', this, {});
  this.template('README.md', 'README.md', this, {});
  this.template('generateKeystore.sh', 'generateKeystore.sh', this, {});

  // Docker stuff
  this.template('docker/docker-compose.yml', 'docker-compose.yml', this, {'interpolate': /<%=([\s\S]+?)%>/g});
  this.template('docker/Dockerfile', 'docker/Dockerfile', this, {'interpolate': /<%=([\s\S]+?)%>/g});

  this.config.set('emailAddress', this.emailAddress);
  this.config.set('userName', this.userName);
  this.config.set('packageName', this.packageName);
  this.config.set('useScmAndDm', this.useScmAndDm); // I'm unsure whether it's good to keep this saved...
  this.config.set('packageFolder', packageFolder);
};

SpringGenerator.prototype.projectfiles = function projectfiles() {

};
