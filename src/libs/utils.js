const ora = require('ora')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const downloadUtil = promisify(require('./download_util'))
const templateConfig = require('../../templateConfig.json')

/**
 * 函数执行等待
 * @param {String} message 提示信息
 * @param {Function} fn 回调函数
 */
const awaitLoadding = async (message, fn, ...args) => {
  const progress = ora(`${chalk.green(message)}`)
  progress.start()
  try {
    await fn(...args)
    progress.succeed()
    return true
  } catch (error) {
    console.log(error)
    progress.fail(chalk.red('Sorry, the load failed'))
    return false
  }
}

/**
 * 子进程显性输出到主进程
 * @param  {...any} args 命令行参数
 */
const spawnExec = async (...args) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(...args)
    proc.on('close', () => {
      resolve(true)
    })
    proc.on('error', () => {
      reject(false)
    })
  })
}

/**
 * 克隆项目模板
 * @param {*} url 项目模板地址
 * @param {*} name 项目名称
 */
const clone = async (url, name, version) => {
  return await awaitLoadding(
    `Downloading templates...`,
    downloadUtil,
    url,
    name,
    version
  )
}

/**
 * 输出日志信息
 * @param {*} content 日志内容
 * @param {*} color 颜色，chalk提供的颜色
 */
const log = (content, color) => {
  console.log(chalk[color] ? chalk[color](content) : content)
}

/**
 * 读取模板数据
 */
const readTemplate = () => {
  return Object.values(templateConfig).map((item) => {
    return item
  })
}

module.exports = {
  awaitLoadding,
  spawnExec,
  clone,
  log,
  readTemplate,
}
