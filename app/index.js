'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  prompting() {
    console.log(chalk.dim("                                     ,a,\r\n                                 ,lfo\"\"v6a,\r\n                             ,lfo\"\"      \"v6a,\r\n                         ,lfo\"\"             \"v6a,\r\n                     ,lfo\"\"                    \"v6a,\r\n                 ,lfo\"\"          ,lfoa,           \"v6a,\r\n             ,lfo\"\"          ,lfo\"\" \"8v6a,           \"v6a,\r\n         ,lfo\"\"          ,lfo\"\"      #  \"v6a,           \"v6a,\r\n     ,lfo\"\"          ,lfo\"\"         ,#.    \"v6a,           \"v6a,\r\n ,gPPR8,         ,lfo\"\"          ,lfo8a|      \"v6a,           \"v6a,\r\ndP'   `Yb    ,lfo\"\"          ,lfo\"\"   \"v6a,  ,lfo\"\"          ,lfo\"8\r\n8)     (8,lfo\"\"          ,lfo\"\"          v688\"\"          ,lfo\"\"   8\r\nYb     d8P\"          ,lfo\"\"          ,lfo\"\"          ,lfo\"\"       8\r\n \"8ggg8\"         ,lfo\"\"          ,lfo\"\"          ,lfo\"\"          ,8\r\n             ,gPPR8,         ,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            dP'   `Yb    ,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            8)     (8,lfo\"\"          ,lfo\"\"          ,lfo\"\"\r\n            Yb     d8P\"          ,lfo\"\"          ,lfo\"\"\r\n             \"8ggg8\"         ,lfo\"\"          ,lfo\"\"   \r\n                         ,gPPR8,         ,lfo\"\"       \r\n                        dP'   `Yb    ,lfo\"\"\r\n                        8)     (8,lfo\"\"\r\n                        Yb     d8P\"\r\n                         \"8ggg8\"" +
      chalk.cyan('\n\nWelcome to the Spring Boot Webapp Generator by Lerk!')));

    console.log(chalk.green('Newest feature: ') + chalk.white('Bootstrap 4 is now favored over v3. Both have been updated.'));

    const prompts = [
      {
        type: 'string',
        name: 'userName',
        message: '(1/9) What is your name?',
        default: 'John Doe'
      },
      {
        type: 'string',
        name: 'emailAddress',
        message: '(2/9) What is your mail address?',
        default: 'john@example.com'
      },
      {
        type: 'string',
        name: 'packageName',
        message: '(3/9) What is your default package name?',
        default: 'com.example.myapp'
      },
      {
        type: 'string',
        name: 'baseName',
        message: '(4/9) What is the base name of the app?',
        default: 'myapp'
      }, {
        type: 'string',
        name: 'appName',
        message: '(5/9) What is the title of your app?',
        default: 'Demo App'
      },
      {
        type: 'string',
        name: 'serviceDescription',
        message: '(6/9) Give a short description of your project.',
        default: 'This app does awesome things.'
      },
      {
        type: 'confirm',
        name: 'useScmAndDm',
        message: '(7/9) Do you want to use SCM and Distribution Management?',
        default: false
      },
      {
        type: 'confirm',
        name: 'useBootstrapLegacy',
        message: '(8/9) Do you want to use Bootstrap 3?',
        default: false
      },
      {
        type: 'confirm',
        name: 'useDocker',
        message: '(9/9) Do you want to use Docker?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.emailAddress = props.emailAddress;
      this.userName = props.userName;
      this.packageName = props.packageName;
      this.baseName = props.baseName;
      this.useScmAndDm = props.useScmAndDm;
      this.serviceDescription = props.serviceDescription;
      this.useBootstrapLegacy = props.useBootstrapLegacy;
      this.appName = props.appName;
      this.useDocker = props.useDocker;
    });
  }

  writing() {

    // ----------------------------
    // Webapp
    // ----------------------------
    const packageFolder = this.packageName.replace(/\./g, '/');
    const javaDir = 'src/main/java/' + packageFolder + '/';
    const resourceDir = 'src/main/resources/';
    const basename = this.baseName + '/';
    chalk.white('basename is: ' + basename);
    chalk.white('package folder is: ' + javaDir);
    const javaDirTemplate = 'src/main/java/package/';
    const resourceDirTemplate = 'src/main/resources/';

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


    // Resources - base
    this.fs.copyTpl(this.templatePath(resourceDirTemplate + 'logback.xml'), this.destinationPath(resourceDir + 'logback.xml'), this);
    this.fs.copy(this.templatePath(resourceDirTemplate + 'application.properties'), this.destinationPath(resourceDir + 'application.properties'));

    // Resources - locale
    this.fs.copy(this.templatePath(resourceDirTemplate + 'locale/messages_de.properties'), this.destinationPath(resourceDir + 'locale/messages_de.properties'));
    this.fs.copy(this.templatePath(resourceDirTemplate + 'locale/messages_en.properties'), this.destinationPath(resourceDir + 'locale/messages_en.properties'));

    // Resources - static/js
    if (this.useBootstrapLegacy) {
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/bs3/bootstrap.js'), this.destinationPath(resourceDir + 'static/js/bootstrap.js'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/bs3/bootstrap.min.js'), this.destinationPath(resourceDir + 'static/js/bootstrap.min.js'));
    } else {
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/bootstrap.js'), this.destinationPath(resourceDir + 'static/js/bootstrap.js'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/bootstrap.js.map'), this.destinationPath(resourceDir + 'static/js/bootstrap.js.map'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/bootstrap.min.js'), this.destinationPath(resourceDir + 'static/js/bootstrap.min.js'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/bootstrap.min.js.map'), this.destinationPath(resourceDir + 'static/js/bootstrap.min.js.map'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/popper.min.js'), this.destinationPath(resourceDir + 'static/js/popper.min.js'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/popper.min.js.map'), this.destinationPath(resourceDir + 'static/js/popper.min.js.map'));
    }
    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/js/jquery.min.js'), this.destinationPath(resourceDir + 'static/js/jquery.min.js'));

    // Resources - static/css
    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/index.css'), this.destinationPath(resourceDir + 'static/css/index.css'));

    if (this.useBootstrapLegacy) {
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/bs3/bootstrap.css'), this.destinationPath(resourceDir + 'static/css/bootstrap.css'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/bs3/bootstrap.css.map'), this.destinationPath(resourceDir + 'static/css/bootstrap.css.map'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/bs3/bootstrap.min.css'), this.destinationPath(resourceDir + 'static/css/bootstrap.min.css'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/bs3/bootstrap.min.css.map'), this.destinationPath(resourceDir + 'static/css/bootstrap.min.css.map'));
    } else {
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/bootstrap.css'), this.destinationPath(resourceDir + 'static/css/bootstrap.css'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/bootstrap.css.map'), this.destinationPath(resourceDir + 'static/css/bootstrap.css.map'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/bootstrap.min.css'), this.destinationPath(resourceDir + 'static/css/bootstrap.min.css'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/bootstrap.min.css.map'), this.destinationPath(resourceDir + 'static/css/bootstrap.min.css.map'));
    }

    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/css/glyphicons.css'), this.destinationPath(resourceDir + 'static/css/glyphicons.css'));

    //Resources - static/fonts
    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.eot'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.eot'));
    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.svg'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.svg'));
    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.ttf'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.ttf'));
    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.woff'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.woff'));
    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/fonts/glyphicons-halflings-regular.woff2'), this.destinationPath(resourceDir + 'static/fonts/glyphicons-halflings-regular.woff2'));

    // Resources - static/images
    this.fs.copy(this.templatePath(resourceDirTemplate + 'static/images/usr_default.jpg'), this.destinationPath(resourceDir + 'static/images/usr_default.jpg'));

    if (this.useBootstrapLegacy) {
      // Resources - templates
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/bs3/register.html'), this.destinationPath(resourceDir + 'templates/register.html'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/bs3/platform.html'), this.destinationPath(resourceDir + 'templates/platform.html'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/bs3/login.html'), this.destinationPath(resourceDir + 'templates/login.html'));

      // Resources - templates/fragments
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/navbar.html'), this.destinationPath(resourceDir + 'templates/fragments/navbar.html'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/footer.html'), this.destinationPath(resourceDir + 'templates/fragments/footer.html'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/error.html'), this.destinationPath(resourceDir + 'templates/fragments/error.html'));

      // Resources - templates/fragments/reception
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/reception/content_landing.html'), this.destinationPath(resourceDir + 'templates/fragments/reception/content_landing.html'));

      // Resources - templates/fragments/backroom
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/bs3/fragments/backroom/content_main.html'), this.destinationPath(resourceDir + 'templates/fragments/backroom/content_main.html'));
    } else {
      // Resources - templates
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/register.html'), this.destinationPath(resourceDir + 'templates/register.html'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/platform.html'), this.destinationPath(resourceDir + 'templates/platform.html'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/login.html'), this.destinationPath(resourceDir + 'templates/login.html'));

      // Resources - templates/fragments
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/fragments/navbar.html'), this.destinationPath(resourceDir + 'templates/fragments/navbar.html'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/fragments/footer.html'), this.destinationPath(resourceDir + 'templates/fragments/footer.html'));
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/fragments/error.html'), this.destinationPath(resourceDir + 'templates/fragments/error.html'));

      // Resources - templates/fragments/reception
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/fragments/reception/content_landing.html'), this.destinationPath(resourceDir + 'templates/fragments/reception/content_landing.html'));

      // Resources - templates/fragments/backroom
      this.fs.copy(this.templatePath(resourceDirTemplate + 'templates/fragments/backroom/content_main.html'), this.destinationPath(resourceDir + 'templates/fragments/backroom/content_main.html'));
    }

    // Base folder stuff
    this.fs.copy(this.templatePath('.npmignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('mongodb.conf'), this.destinationPath('mongodb.conf'));
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('generateKeystore.sh'), this.destinationPath('generateKeystore.sh'));

    // Docker stuff
    if (this.useDocker) {
      this.fs.copy(this.templatePath('startDocker.sh'), this.destinationPath('startDocker.sh'));
      this.fs.copyTpl(this.templatePath('docker/docker-compose.yml'), this.destinationPath('docker-compose.yml'), this);
      this.fs.copyTpl(this.templatePath('docker/Dockerfile'), this.destinationPath('docker/Dockerfile'), this);
    }
    this.config.set('emailAddress', this.emailAddress);
    this.config.set('userName', this.userName);
    this.config.set('packageName', this.packageName);
    this.config.set('useScmAndDm', this.useScmAndDm);
    this.config.set('useDocker', this.useDocker);
  }

  install() {
    if (this.useScmAndDm) {
      console.log(chalk.dim('Running \'git init\'...'));
      this.spawnCommand('git', ['init']);
    }
  }
};
