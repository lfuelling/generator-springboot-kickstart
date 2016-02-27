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

    console.log(chalk.green('\n.............DD88888888888888888,............\n' +
        '...........:888888888888888888888,...........\n' +
        '..........+88888888888888888888888+..........\n' +
        '.........,8888888888888888888888888..........\n' +
        '.........888888888888...888888888888.........\n' +
        '.......,88888887..D88...88Z..88888888,.......\n' +
        '.......8888888,...888...88D...=8888888.......\n' +
        '......D888888,..$8888...88887...8888888......\n' +
        '.....Z888888$..I88888...88888:..88888888,....\n' +
        '....D8888888...888888...88888D..,88888888....\n' +
        '....88888888,..888888..,888888...88888888....\n' +
        '....88888888,..8888888$888888D..,88888888....\n' +
        '....88888888I..Z8888888888888+..888888888....\n' +
        '.....Z8888888...O888888888888..,88888888.....\n' +
        '......88888888...,88888888D...,88888888......\n' +
        '.......88888888=.....?I+.....I88888888.......\n' +
        '.......,88888888D7.........ZD88888888,.......\n' +
        '.........888888888888888888888888888.........\n' +
        '.........,8888888888888888888888888..........\n' +
        '..........+88888888888888888888888+..........\n' +
        '...........,888888888888888888888:...........\n' +
        '.............DD888888888888888DD.............\n' +
        chalk.blue('\nWelcome to the Spring Boot Webapp Generator\n\n')));

    var prompts = [
        {
            type: 'string',
            name: 'packageName',
            message: '(1/7) What is your default package name?',
            default: 'com.example.myapp'
        },
        {
            type: 'string',
            name: 'baseName',
            message: '(2/7) What is the base name of the app?',
            default: 'myapp'
        },
        {
            type: 'string',
            name: 'serviceDescription',
            message: '(3/7) Give a short description of your project.',
            default: 'This app does awesome things'
        },
        {
            type: 'confirm',
            name: 'useScmAndDm',
            message: '(7/7) Do you want to use SCM and Distribution Management?',
            default: false
        }
    ];

    this.prompt(prompts, function (props) {
        this.packageName = props.packageName;
        this.baseName = props.baseName;
        this.useScmAndDm = props.useScmAndDm;
        this.serviceDescription = props.serviceDescription;

        cb();
    }.bind(this));
};

SpringGenerator.prototype.app = function app() {
    // ----------------------------
    // Webapp
    // ----------------------------
    var packageFolder = this.packageName.replace(/\./g, '/');
    var javaDir = 'src/main/java/' + packageFolder + '/';
    var basename = this.basename + '/';
    chalk.white('basename is: ' + basename);
    var javaDirTemplate = basename + 'src/main/java/package/';

    // Java
    this.template(javaDirTemplate + 'Application.java', javaDir + 'Application.java', this, {});
    this.template(javaDirTemplate + 'config/ApplicationSettings.java', javaDir + 'config/ApplicationSettings.java', this, {});
    this.template(javaDirTemplate + 'config/SecurityConfig.java', javaDir + 'config/SecurityConfig.java', this, {});
    this.template(javaDirTemplate + 'config/CustomPermissionEvaluator.java', javaDir + 'config/CustomPermissionEvaluator.java', this, {});
    this.template(javaDirTemplate + 'rest/controller/HomeController.java', javaDir + 'rest/controller/HomeController.java', this, {});
    this.template(javaDirTemplate + 'rest/assembler/package-info.java', javaDir + 'rest/assembler/package-info.java', this, {});
    this.template(javaDirTemplate + 'rest/global/GlobalExceptionHandler.java', javaDir + 'rest/global/GlobalExceptionHandler.java', this, {});
    this.template(javaDirTemplate + 'core/package-info.java', javaDir + 'core/package-info.java', this, {});


    // Project
    this.template(basename + 'pom.xml', basename + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // ----------------------------
    // Micro service starter MODEL
    // ----------------------------
    var modelDir = this.baseName + '-model/';
    var modelDirTemplate = 'microservice-starter-model/';
    var modelJavaDir = modelDir + 'src/main/java/' + packageFolder + '/model/';
    var modelJavaDirTemplate = modelDirTemplate + 'src/main/java/package/';

    // Java
    this.template(modelJavaDirTemplate + 'package-info.java', modelJavaDir + 'package-info.java', this, {});

    // Project
    this.template(modelDirTemplate + 'pom.xml', modelDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Java
    this.template(itTestDirTemplate + 'IntegrationTest.java', itTestDir + 'IntegrationTest.java', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Project
    this.template(itDirTemplate + 'pom.xml', itDir + 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });

    // Resource
    this.template(itResourceDirTemplate + 'mock1.json', itResourceDir + 'mock1.json', this, { 'interpolate': /<%=([\s\S]+?)%>/g });


    // ----------------------------
    // Micro service starter MAIN
    // ----------------------------
    this.template('pom.xml', 'pom.xml', this, { 'interpolate': /<%=([\s\S]+?)%>/g });
    this.template('.npmignore', '.gitignore', this, {});

    this.config.set('packageName', this.packageName);
    this.config.set('packageFolder', packageFolder);
};

SpringGenerator.prototype.projectfiles = function projectfiles() {

};
