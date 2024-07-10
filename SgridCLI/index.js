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

// springboot 执行命令
// sgrid run:springboot
program
  .version("1.0.0")
  .command("run:springboot")
  .description("run springboot")
  .action(async function () {
    await syncRunCommand("mvn spring-boot:run");
  });

// vite 打包命令
// 1. 删除 .sgrid 目录
// 2. 执行构建命令
// 3. 创建 .sgrid 目录
// 4. 将预先定义好的 app.js 注入
// 5. 将预先定义好的 package.json 注入
// 6. 执行 install 命令
// 7. 执行 tar 命令
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

// 静态资源打包命令
program
  .version("1.0.0")
  .command("release:static")
  .option("-s,--serverName [string]", "build tgz name!", "sgridWebServer")
  .option("-d,--dist       [string]", "dist path!", "dist")
  .option("-p,--path       [string]", "get path!", "web")
  .description("build a vite client server")
  .action(async function (args, opt) {
    console.log("args", args);
    var rmCode = await node.rmdir();
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

// node 打包命令
// sgrid release:node -s SgridNodeDemoServer -d dist -p static
program
  .version("1.0.0")
  .command("release:node")
  .option("-s,--serverName [string]", "build assets name!", "sgridNodeServer")
  .option("-b,--build      [string]", "command build!", "npm run build")
  .option("-d,--dist       [string]", "dist path!", "dist")
  .option("-p,--public     [public]", "public path!", "public")
  .description("release springboot")
  .action(async function (args) {
    var serverName = args.serverName;
    var build = args.build;
    var dist = args.dist;
    var public = args.public;
    syncRunCommand(build);
    syncRunCommand(`copy -r ${public} ./${dist}/${public}`);
    syncRunCommand(`copy package.json ./${dist}/package.json`);
    syncRunCommand(`copy package-lock.json ./${dist}/package-lock.json`);
    syncRunCommand(`npm i`, dist);
    syncRunCommand(`tar -cvzf ${serverName}.tar.gz ./*`, dist);
    syncRunCommand(`mv ${serverName}.tar.gz ../`, dist);
  });

// springboot 打包命令
// sgrid release:springboot -s SgridJavaDemoServer
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
