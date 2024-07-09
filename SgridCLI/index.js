#!/usr/bin/env node

"use strict";

var program = require("commander");
var { mkdirSync, writeFileSync } = require("fs");
var fse = require("fs-extra");
var syncRunCommand = require("./src/util").syncRunCommand;
var resolve = require("./src/util").resolve;
var replacePath = require("./src/util").replacePath;
var packageJson = require("./src/util").packageJson;

var node = require("./src/node");
var springboot = require("./src/springboot");
var golang = require("./src/golang");

program
  .version("1.0.0")
  .command("release:vite")
  .option("-s,--serverName [string]", "build assets name!", "sgridWebServer")
  .option("-d,--dist       [string]", "dist path!", "dist")
  .option("-b,--build      [string]", "command build!", "npm run build")
  .option("-p,--path       [string]", "get path!", "web")
  .description("build a vite client server")
  .action(async function (args, opt) {
    console.log("args", args);
    var rmCode = await node.rmdir();
    var code = await node.buildStep(args.build);
    console.info("rmCode", rmCode);
    console.info("code", code);
    var serverName = args.serverName;
    var buildName = `${serverName}.tar.gz`;
    var buildTarget = resolve(`.sgrid/${buildName}`);
    var dist = args.dist;
    var getPath = args.path;
    mkdirSync(resolve(".sgrid"));
    writeFileSync(resolve(".sgrid/app.js"), replacePath(getPath));
    writeFileSync(resolve(".sgrid/package.json"), packageJson());
    fse.moveSync(resolve(dist), resolve(".sgrid/dist"));
    var installCode = await node.installStep();
    var tgzCode = await node.toTgzStep(buildName);
    console.info("installCode", installCode);
    console.info("tgzCode", tgzCode);
  });

program
  .version("1.0.0")
  .command("release:static")
  .option("-s,--serverName [string]", "build tgz name!", "sgridWebServer")
  .option("-d,--dist       [string]", "dist path!", "dist")
  .option("-p,--path       [string]", "get path!", "web")
  .description("build a vite client server")
  .action(async function (args, opt) {
    console.log("args", args);
    var rmCode = await rmdir();
    console.info("rmCode", rmCode);
    var serverName = args.serverName;
    var buildName = `${serverName}.tar.gz`;
    var buildTarget = resolve(`.sgrid/${buildName}`);
    var dist = args.dist;
    var getPath = args.path;
    mkdirSync(resolve(".sgrid"));
    writeFileSync(resolve(".sgrid/app.js"), replacePath(getPath));
    writeFileSync(resolve(".sgrid/package.json"), packageJson());
    fse.moveSync(resolve(dist), resolve(".sgrid/dist"));
    var installCode = await node.installStep();
    var tgzCode = await node.toTgzStep(buildName);
    console.info("installCode", installCode);
    console.info("tgzCode", tgzCode);
  });

program
  .version("1.0.0")
  .command("run:springboot")
  .description("run springboot")
  .action(async function () {
    await syncRunCommand("mvn spring-boot:run");
  });

// release

program
  .version("1.0.0")
  .command("release:springboot")
  .option("-s,--serverName [string]", "build assets name!", "sgridJavaServer")
  .description("release springboot")
  .action(async function (args) {
    var serverName = args.serverName;
    await springboot.removePrevPackage(serverName);
    await springboot.buildMaven();
    await springboot.buildAssets(serverName);
  });

program
  .version("1.0.0")
  .command("release:go")
  .option("-s,--serverName [string]", "build assets name!", "sgridGolangServer")
  .option("-d,--dist       [string]", "build static path!", "")
  .description("release golang")
  .action(async function (args) {
    var serverName = args.serverName;
    var dist = args.dist;
    await golang.buildEXE(serverName, dist);
  });

program.parse(process.argv);
