const path = require('path')
const fs = require('fs')
const { log } = require('../libs/utils')
const logSymbols = require('log-symbols')
const templateConfig = require('../../templateConfig.json')

const unset = (...args) => {
  let [templateName] = args
  if(templateConfig[templateName]) {
    const templatePath = path.resolve(__dirname, '../../', 'templateConfig.json')
    delete templateConfig[templateName]
    fs.writeFileSync(templatePath, JSON.stringify(templateConfig))
    log(`${logSymbols.success}Template deleted successfully`)
  }
}

module.exports = unset
