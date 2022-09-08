const fs = require('fs');

// 判断路径和文件是否存在
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

// 是否是对象
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

module.exports = {
  pathExists,
  isObject,
};
