'use strict';

module.exports = core;

const semver = require('semver');
const colors = require('colors');
const { homedir } = require('os');
const program = require('commander');

const { pathExists } = require('./utils');
const pkg = require('../package.json');
const log = require('@liushipeng-cli/log');
const constant = require('./const');
const { getNewNpmVersion } = require('@liushipeng-cli/get-npm-info');

function core() {
  try {
    checkPkgVersion();
    checkNodeVersion();
    checkRoot();
    checkUserHome();
    // checkEnv();
    checkGlobalUpdate();
    registerCommand();
  } catch (e) {
    log.error(e.message);
  }
}

function registerCommand() {
  console.log();

  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(colors.blue('当前版本：' + pkg.version));

  program
    .command('init [projectName]')
    .description('初始化项目')
    .option('-f, --force', '是否强制初始化项目')
    .action((projectName, cmdOnj) => {
      console.log('init', projectName, cmdOnj);
    });
  // 遇到未知命令和拼写错误后，建议正确拼写
  program.showSuggestionAfterError(true);

  program.showHelpAfterError(colors.yellow('(使用 --help 查看帮助文档)'));
  program.exitOverride();
  try {
    program.parse(process.argv);
  } catch (e) {
    console.log();
    const obj = program.args;
    if (obj.length < 1) return;
    console.error(colors.red('出错了！未知的命令：', obj[0]));
    const commands = program.commands.map((cmd) => cmd.name());
    if (commands.length > 0) {
      console.log(colors.green('可用命令：', commands.join(', ')));
    }
  }
}

async function checkGlobalUpdate() {
  // 对比当前版本是否是最新
  // 获取当前版本和模块名
  const currentVersion = pkg.version;
  const npmName = pkg.name;
  // 调用 npm Api 获取版本号
  // 提取最大的版本号
  const newVersion = await getNewNpmVersion(npmName);
  if (newVersion && semver.gt(newVersion, currentVersion)) {
    // TODO 等待更新
    log.warn(` 请手动更新到最新版本 ${newVersion} ,使用 npm i @liushipeng-cli/cli`);
  }
  // 获取最新版本号，提示用户更新到最新
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
