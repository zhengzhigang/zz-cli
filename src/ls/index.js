const { log, readTemplate } = require('../libs/utils')
/**
 * 列出模板项目名称
 */
const ls = () => {
  const data = readTemplate()
  log(`[模板名称]=[站点]:[作者/项目名称]:[可选版本]`, 'yellow')
  data.forEach((d) => {
    log(`${d.name}=${d.value}=${d.version}`, 'green')
  })
}

module.exports = ls
