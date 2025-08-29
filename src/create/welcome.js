const figlet = require('figlet')
const { log } = require('../libs/utils')

/**
 * 构建命令行欢迎语
 * @param {*} text 文本
 */
const welcome = (text) => {
  const data = figlet.textSync(text ? text : 'TOPNET CLI')
  log(data, 'green')
}

module.exports = welcome
