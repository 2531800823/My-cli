const axios = require('axios');
const semver = require('semver');
const urlJoin = require('url-join');

function getNpmInfo(npmName, registry) {
  if (!npmName) return;
  const registryUrl = registry || getDefaultRegistry();
  const npmInfoUrl = urlJoin(registryUrl, npmName);
  console.log(npmInfoUrl);
}

function getDefaultRegistry(isOriginal = false) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org';
}

module.exports = {
  getNpmInfo,
};
