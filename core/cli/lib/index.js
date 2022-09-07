'use strict';

module.exports = core;

const semver = require('semver');
const colors = require('colors');

const pkg = require('../package.json');
const log = require('@liushipeng/log');
const constant = require('./const');

function core() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
  } catch (e) {
    log.error(e.message);
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
