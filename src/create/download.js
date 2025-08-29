const inquirer = require('inquirer')
const logSymbols = require('log-symbols')
let { promptTemplateConfig } = require('../libs/config')
const { clone, log } = require('../libs/utils')
const path = require('path')
const install = require('./install')
const fs = require('fs')
const consolidate = require('consolidate').ejs
const templateConfig = require('../../templateConfig.json')

/**
 * 选择模板，下载模板并初始化项目
 * @param {*} name 项目名称
 */
const download = async (name) => {
  // 构建命令行交互内容
  const config = promptTemplateConfig()
  if (!name) {
    config.push({
      type: 'input',
      name: 'project',
      message: 'Please input a project name：',
    })
  }
  let { template, project } = await inquirer.prompt(config)

  const versions = Object.values(templateConfig).find((item) => item.value === template).version.split(',')
  let version = versions[0]
  if(versions.length > 1) {
    version = (await inquirer.prompt({
      type: 'list',
      name: 'version',
      message: 'Please input a project version',
      choices: versions
    })).version
  }

  if (name) project = name

  if (!project) {
    log(`${logSymbols.warning}Template name cannot be empty`, 'yellow')
    return
  }

  // 根据名称，初始化项目
  const flag = await clone(template, project, version)
  if (!flag) {
    log(
      `${logSymbols.error}Project download failed, please contact administrator`,
      'red'
    )
    return
  }

  // 通过ejs解析package.json的模板变量
  const projectDir = path.join(process.cwd(), project)
  const pkgPath = path.resolve(projectDir, 'package.json')
  if (fs.existsSync(pkgPath)) {
    let pkg = fs.readFileSync(pkgPath, 'utf8')
    consolidate.render(pkg, { name: project }).then(async (html) => {
      fs.writeFileSync(pkgPath, html)

      // 安装项目依赖，执行命令启动
      await install(project)
    })
  } else {
    // 输出日志
    log(
      `
${logSymbols.success}Simple Template initialization completed
=========================================
cd ${project}
Start your project
=========================================
        `,
      'green'
    )
  }
}

module.exports = download
