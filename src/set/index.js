const fs = require('fs')
const path = require('path')
const logSymbols = require('log-symbols')
const { log } = require('../libs//utils')
const templateConfig = require('../../templateConfig.json')

const set = (...args) => {
  let [templateName, templateRepo, templateVersion] = args
  if(templateConfig[templateName]) {
    log(`${logSymbols.error}Template name already exists`, 'red')
    return
  }
  const templatePath = path.resolve(__dirname, '../../', 'templateConfig.json')
  templateConfig[templateName] = {
    name: templateName,
    value: templateRepo,
    version: templateVersion
  }
  fs.writeFileSync(templatePath, JSON.stringify(templateConfig))
  log(`${logSymbols.success}Template storage set successful`, 'green')
}

module.exports = set
