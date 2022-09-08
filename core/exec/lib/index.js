const Package = require('@liushipeng-cli/package');
const log = require('@liushipeng-cli/log');

const SETTINGS = {
  init: '@liushipeng-cli/init',
};

function exec() {
  const targetPath = process.env.CLI_TARGET_PATH;
  const homePath = process.env.CLI_HOME_PATH;
  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';

  const pkg = new Package({
    targetPath,
    packageName,
    packageVersion,
  });
  console.log(pkg);
}

module.exports = exec;
