const path = require('path')
const open = require('open')
const inquirer = require('inquirer')
const logSymbols = require('log-symbols')
const { awaitLoadding, spawnExec, log } = require('../libs/utils')

const install = async (name) => {
  // 根据用户输入决定是否需要安装依赖
  let { isInstall } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isInstall',
      message: 'Do you install NPM dependencies? Installation takes a while!',
    },
  ])

  if (isInstall) {
    const projectDir = path.join(process.cwd(), name)
    const package = require(path.resolve(projectDir, 'package.json'))
    if (package && package.version) {
      await awaitLoadding('Installing dependencies...', spawnExec, 'npm', ['install'], {
        cwd: `./${name}`,
        stdio: ['pipe', process.stdout, process.stderr],
      }) // inherit 输出同步到父级进程；pipi 以管道流的方式输出到父级进程

      // 执行项目命令，打开浏览器
      const port = process.env.port || 8080
      open(`http://localhost:${port}`)
      await spawnExec('npm', ['run', 'serve'], {
        cwd: `./${name}`,
        stdio: 'inherit',
      })
    }
  } else {
    // 输出日志
    log(
      `
${logSymbols.success} Simple Template initialization completed
=========================================
Start your project
=========================================
cd ${name}
npm install
npm run serve
=========================================
        `,
      'green'
    )
  }
}

module.exports = install
