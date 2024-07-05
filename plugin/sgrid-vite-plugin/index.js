#!/usr/bin/env node

"use strict";

var { exec } = require("child_process");
var program = require("commander");
var { mkdirSync, writeFileSync, rmdirSync } = require("fs");
var cwd = require("process").cwd();
var path = require("path");
var fse = require("fs-extra");
function resolve(...args) {
  return path.resolve(cwd, ...args);
}

var buildStep = async function () {
  return new Promise((resolve) => {
    const build = exec("npm run build", { cwd });
    build.stdout.on("data", function (chunk) {
      console.log(chunk.toString());
    });
    build.stderr.on("data", function (chunk) {
      console.error(chunk.toString());
    });
    build.on("exit", function (code) {
      resolve(code);
    });
  });
};

var installStep = async function () {
  return new Promise((__resolve__) => {
    const build = exec("npm install --production", { cwd: resolve(cwd, ".sgrid") });
    build.stdout.on("data", function (chunk) {
      console.log(chunk.toString());
    });
    build.stderr.on("data", function (chunk) {
      console.error(chunk.toString());
    });
    build.on("exit", function (code) {
      __resolve__(code);
    });
  });
};

var toTgzStep = function(serverName){
    return new Promise((__resolve__) => {
        const build = exec(`tar -cvf ${serverName} ./* `, { cwd: resolve(cwd, ".sgrid") });
        build.stdout.on("data", function (chunk) {
          console.log(chunk.toString());
        });
        build.stderr.on("data", function (chunk) {
          console.error(chunk.toString());
        });
        build.on("exit", function (code) {
          __resolve__(code);
        });
      });
}

var rmdir = function(){
    return new Promise((__resolve__) => {
        const build = exec(`rm -r .sgrid`, { cwd: resolve() });
        build.stdout.on("data", function (chunk) {
          console.log(chunk.toString());
        });
        build.stderr.on("data", function (chunk) {
          console.error(chunk.toString());
        });
        build.on("exit", function (code) {
          __resolve__(code);
        });
      });
}



program
  .version("1.0.0")
  .command("release:vite")
  .option("-s,--serverName [string]", "build tgz name!", "sgridWebServer")
  .option("-d,--dist       [string]", "dist path!", "dist")
  .option("-b,--build      [string]", "command build!", "npm run build")
  .option("-p,--path       [string]", "get path!", "web")
  .description("build a vite client server")
  .action(async function (args, opt) {
    console.log("args", args);
    var rmCode  = await rmdir()
    var code    = await buildStep(args.build);
    console.info('rmCode',rmCode);
    console.info('code',code);
    var serverName  =   args.serverName;
    var buildName   =   `${serverName}.tar.gz`;
    var buildTarget =   resolve(`.sgrid/${buildName}`);
    var dist        =   args.dist;
    var getPath     =   args.path;
    mkdirSync(      resolve(".sgrid"));
    writeFileSync(  resolve(".sgrid/app.js"),         replacePath(getPath));
    writeFileSync(  resolve(".sgrid/package.json"),   packageJson());
    fse.moveSync(   resolve(dist), resolve(".sgrid/dist"));
    var installCode =   await installStep()
    var tgzCode =       await toTgzStep(buildName)
    console.info('installCode',installCode);
    console.info('tgzCode',tgzCode);
    });

program.parse(process.argv);



var replacePath = function (getPath) {
    var tmp = `
  "use strict";
  var __importDefault = (this && this.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var main_1 = require("sgridnode/build/main");
  var express_1 = __importDefault(require("express"));
  function boost() {
      var ctx = (0, main_1.NewSgridServerCtx)();
      ctx.use('[REPLACE_PATH]', express_1.default.static("./dist"));
      (0, main_1.NewSgridServer)(ctx);
  }
  boost();
  
      `;
  
    return tmp.replace(/\[REPLACE_PATH\]/,getPath);
  };
  
  var packageJson = function () {
    return `
      {
    "name": "test",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "dev": "ts-node-dev --respawn --transpile-only app.ts",
      "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
      "prettier": "prettier --write .",
      "build": "tsc"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "sgridnode": "0.0.12",
      "axios": "^1.6.8",
      "dayjs": "^1.11.10",
      "express": "^4.18.3",
      "express-validator": "^7.0.1",
      "js-yaml": "^4.1.0",
      "lodash": "^4.17.21"
    }
  }
      `;
  };