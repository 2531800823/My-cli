const { isObject } = require('@liushipeng-cli/utils');

class Package {
  constructor(options) {
    if (!options || !isObject(options)) {
      throw new Error('Package 类的构造函数不能为 null');
    }
    // package路径
    this.targetPath = options.targetPath;
    // package的存储路径  远程
    this.storePath = options.storePath;
    // name
    this.packageName = options.packageName;
    // version
    this.packageVersion = options.packageVersion;
  }

  // 判断当前 Package 是否存在
  exists() {}

  //安装Package
  install() {}

  // 更新Package
  update() {}

  // 获取入口文件的路径
  getRootFilePath() {}
}

module.exports = Package;
