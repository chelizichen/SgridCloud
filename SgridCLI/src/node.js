"use strict";

var node = {};

node.buildStep = async function () {
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

node.installStep = async function () {
  return new Promise((__resolve__) => {
    const build = exec("npm install --production", {
      cwd: resolve(cwd, ".sgrid"),
    });
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

node.toTgzStep = function (serverName) {
  return new Promise((__resolve__) => {
    const build = exec(`tar -cvf ${serverName} ./* `, {
      cwd: resolve(cwd, ".sgrid"),
    });
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

node.rmdir = function () {
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
};

module.exports = node;
