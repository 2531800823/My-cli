const fs = require('fs');

function pathExists(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

module.exports = {
  pathExists,
};
