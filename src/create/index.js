const clear = require('clear')
const welcome = require('./welcome')
const download = require('./download')

const create = async (name) => {
  // 1、清除屏幕
  clear()

  // 2、打印脚手架名称
  welcome()

  // 3、选择模板，输入项目名称，根据模板初始化项目
  await download(name)
}

module.exports = create
