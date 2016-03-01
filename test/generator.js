var chai    = require("chai");
chai.use(require('chai-fs'));
var generator = require("../app/index");
var helpers = require('yeoman-test');
var path = require('path');
var chalk = require('chalk');

/*
 * NOTE: If you read this, it's likely that you know more about testing with JS than I do.
 *       I'd really appreciate a pull request with a working test.
 */

describe("SpringBoot Kickstart", function() {
    it("generator creates correct directories", function() {
      var temppath;
      helpers.run(path.join( __dirname, '../app'))
        .inTmpDir(function (dir) {
          chalk.blue('(i) - Current path is: ' + dir);
          temppath = dir;
        })
        .withPrompts({
          "packageName": "com.example.testapp",
          "baseName": "mytest",
          "useScmAndDm": true,
          "serviceDescription": "This is a test of frequency Instruments. Bass, Mids, Highs, Ambiance!"
        })
        .on('end', function () {
          expect(temppath + '/src/main/java/com/example/testapp').to.be.a.path("Java directory exists.");
        });
    });
});
