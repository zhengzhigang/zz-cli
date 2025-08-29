const path = require('path')
const fs = require('fs-extra')
const scpClient = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('正在发布到服务器...')

const Client = require('ssh2').Client

const deploy = (...args) => {
  let [source] = args
  if (!source || source.indexOf('.json') <= -1) {
    return false
  }
  const pathStr = process.platform === 'win32' ? '\\' : '/';
  let filePath = process.cwd() + pathStr + source
  const server = require(filePath)
  const host = server.host || '192.168.3.42'
  const username = server.username || 'root'
  const password = server.password || 'top@123'
  const conn = new Client()
  conn
    .on('ready', function () {
      // rm 删除dist文件
      conn.exec('rm -rf ' + server.path, function (err, stream) {
        if (err) throw err
        stream
          .on('close', function (code, signal) {
            // 在执行shell命令后，把开始上传部署项目代码放到这里面
            spinner.start()
            scpClient.scp(
              server.localPath,
              {
                host: host,
                username: username,
                password: password,
                path: server.path,
              },
              function (err) {
                spinner.stop()
                if (err) {
                  console.log(chalk.red('发布失败.\n'))
                  throw err
                } else {
                  console.log(chalk.green('Success! 成功发布到服务器! \n'))
                }
              }
            )
            conn.end()
          })
          .on('data', function (data) {
            console.log('STDOUT: ' + data)
          })
          .stderr.on('data', function (data) {
            console.log('STDERR: ' + data)
          })
      })
    })
    .connect({
      host: host,
      username: username,
      password: password,
    })
}

module.exports = deploy
