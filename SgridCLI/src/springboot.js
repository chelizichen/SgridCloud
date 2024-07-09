"use strict";

var fse = require("fs-extra");
var syncRunCommand = require("./util").syncRunCommand;
var springboot = {};
var path = require("path");

springboot.removePrevPackage = async function (svrName) {
  var cwd = process.cwd();
  var svrPkgPath = path.join(cwd, svrName);
  if (fse.existsSync(svrPkgPath)) {
    return await syncRunCommand(`rm -rf ${svrPkgPath}`);
  }
};

springboot.buildMaven = async function () {
  await syncRunCommand(`mvn compile`);
  await syncRunCommand(`mvn deploy`);
};

springboot.buildAssets = async function (svrName) {
  await syncRunCommand(`tar -cvf ${svrName}.tar.gz ./target`);
};

module.exports = springboot;
