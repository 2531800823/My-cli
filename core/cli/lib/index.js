'use strict';

module.exports = core;

const semver = require('semver');
const colors = require('colors');
const { homedir } = require('os');

const pkg = require('../package.json');
const log = require('@liushipeng/log');
const constant = require('./const');
const { pathExists } = require('./utils');

function core() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
    // checkEnv();
  } catch (e) {
    log.error(e.message);
  }
}

function checkEnv() {
  // 读取环境变量
  console.log(homedir());
  const dotenv = require('dotenv');
  let config = dotenv.config({});
  console.info(config);
}

async function checkUserHome() {
  // 判断根目录是否存在
  if (!(await pathExists(homedir()))) {
    throw new Error(colors.red('当前登录用户的主目录不存在!!! '));
  }
}

function checkRoot() {
  // 尝试降低具有 root 权限的进程的权限，如果失败，则阻止访问
  require('root-check')();
}

function checkNodeVersion() {
  // 获取 node 版本 和 最低 node 版本
  const currentVersion = process.version;
  const lowestVersion = constant.LOWEST_NODE_VERSION;
  // 对比 最低的node版本
  if (!semver.gte(currentVersion, lowestVersion)) {
    throw new Error(colors.red(`需要安装 v${lowestVersion} 以上的版本的 Node.js`));
  }
}

function checkPkgVersion() {
  log.info('当前版本：', pkg.version);
}
