const boxen = require('boxen');
const colors = require('colors');

const LOWEST_NODE_VERSION = '12.0.0';
const GITHUB_PATH = 'https://github.com/2531800823';
const NPM_PATH = 'https://www.npmjs.com/package/liushipeng-cli';

function NewVersionLog(currentVersion, newVersion) {
  return boxen(
    `
  可以升级啦! ${colors.red(currentVersion)} → ${colors.green(newVersion)}         
  更新地址: ${NPM_PATH}      
  执行 ${colors.bgGrey(' pnpm add liushipeng-cli -g ')}
     
  GitHub: ${colors.cyan(GITHUB_PATH)}     
`,
    { borderColor: '#5698c3' },
  );
}

module.exports = {
  LOWEST_NODE_VERSION,
  NewVersionLog,
};
