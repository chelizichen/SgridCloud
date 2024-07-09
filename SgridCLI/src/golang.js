"use strict";
var syncRunCommand = require("./util").syncRunCommand;

var golang = {};

golang.buildEXE = async function (svrName, distPath) {
  await syncRunCommand(`rm -r ${svrName}.tar.gz`);
  await syncRunCommand(`rm -r sgrid_app`);
  await syncRunCommand(`GOOS=linux GOARCH=amd64  go build -o sgrid_app`);
  if (distPath != "") {
    return await syncRunCommand(
      `tar -cvf ${svrName}.tar.gz ./sgrid_app ${distPath}`,
    );
  }
  return await syncRunCommand(`tar -cvf ${svrName}.tar.gz ./sgrid_app`);
};

module.exports = golang;
