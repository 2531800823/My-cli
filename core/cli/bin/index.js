#!/usr/bin/env node

const importLocal = require("import-local");

if (importLocal(__filename)) {
  require("@liushipeng/log").info("cli", "正在使用 脚手架 本地版本");
} else {
  require("../lib")(process.argv.slice(2));
}
