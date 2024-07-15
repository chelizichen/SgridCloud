"use strict";

var { exec } = require("child_process");
var process = require('process')
var path = require("path");

var syncRunCommand = function (cmd, p) {
  return new Promise((resolve) => {
    var cwd = p ? path.resolve(process.cwd(), p) : process.cwd();
    var build = exec(cmd, { cwd });
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

function resolve(...args) {
  var cwd = process.cwd();
  return path.resolve(cwd, ...args);
}

function packageJson() {
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
}

function replacePath(getPath) {
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

  return tmp.replace(/\[REPLACE_PATH\]/, getPath);
}

module.exports = { syncRunCommand, resolve, packageJson, replacePath };
