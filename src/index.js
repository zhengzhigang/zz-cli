const program = require('commander')
const create = require('./create')
const ls = require('./ls')
const copy = require('./copy')
const welcome = require('./create/welcome')
const set = require('./set')
const unset = require('./unset')
const deploy = require('./deploy')
const download = require('./download')

// 版本命令
const { version } = require('../package.json')
program.version(version, '-v --version', 'display topnet version')

// 显示 topnet cli
program.description('display topnet cli').action(() => {
  welcome()
})

// 创建命令
program
  .command('create [projectName]')
  .description('clone git template to generate project')
  .action(create)

// 设置模板
program
  .command('set <templateName> <templateRepo> <templateVersion>')
  .description('set a template storage')
  .action(set)

// 删除模板
program
  .command('unset <templateName>')
  .description('del a template storage')
  .action(unset)

// 目录命令
program.command('ls').description('display all templates').action(ls)

// 拷贝命令
program
  .command('copy <sourceDir> <targetDir>')
  .alias('cp')
  .description('copy dir')
  .action(copy)

// 发布静态资源到服务器
program
  .command('deploy <source>')
  .description('deploy static source')
  .action(deploy)

program
  .command('download <template> <dirname>')
  .description('download a big screen template')
  .action(download)

// 解析命令
program.parse(process.argv)
