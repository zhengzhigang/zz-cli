const request = require("request");
const ora = require("ora");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
const AdmZip = require('adm-zip');
const fs = require('fs-extra');
const templateConfig = require("./data/template.json");

/**
 * 主进程main函数
 */
async function downloadTemplate(templateName, dirName) {
    const data = templateConfig[templateName];
  // 下载模板
  downloadFile(data.fileUrl, data.value, dirName);
}
/*
 * url 网络文件地址
 * fileName 文件名
 * callback 回调函数
 */
function downloadFile(fileUrl, fileName, dirName) {
  const spinner = ora(`正在下载项目模板，源地址：${fileUrl}`);
  request(fileUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
    var zip = new AdmZip(`./${fileName}`);
    zip.extractAllTo(dirName, true);
    fs.removeSync(`./${fileName}`);
    spinner.succeed();
    console.log(logSymbols.success, chalk.green(`模板下载完毕:)`));
    } else {
      spinner.fail();
      console.log(logSymbols.fail, chalk.red("模板下载失败:("));
    }
  }).pipe(fs.createWriteStream(`./${fileName}`));
}


module.exports = {
    downloadTemplate
}