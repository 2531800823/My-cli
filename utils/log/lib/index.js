const log = require("npmlog");

log.level = process?.env?.LOG_LEVEL || "info";

log.heading = "liushipeng";
log.headingStyle = { fg: "black", bg: "blue" };

log.addLevel("success", 2000, { bg: "green" });

module.exports = log;
