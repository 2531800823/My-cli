const axios = require('axios');
const semver = require('semver');
const urlJoin = require('url-join');

function getNpmInfo(npmName, registry) {
  if (!npmName) return;
  const registryUrl = registry || getDefaultRegistry();
  const npmInfoUrl = urlJoin(registryUrl, npmName);
  return axios
    .get(npmInfoUrl)
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function getNpmVersion(npmName, registry) {
  const data = await getNpmInfo(npmName, registry);
  if (data) {
    return Object.keys(data?.versions).sort((a, b) => (semver.gt(a, b) ? -1 : 1));
  }
  return [];
}

async function getNewNpmVersion(npmName, registry) {
  const versions = await getNpmVersion(npmName, registry);
  if (versions.length > 0) {
    return versions[0];
  }
  return null;
}

function getDefaultRegistry(isOriginal = false) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npm.taobao.org';
}

module.exports = {
  getNpmInfo,
  getNpmVersion,
  getNewNpmVersion,
};
