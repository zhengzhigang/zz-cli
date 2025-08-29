const { readTemplate } = require('../libs/utils')

const promptTemplateConfig = () => {
  let config = [
    {
      type: 'list',
      name: 'template',
      message: 'Please a project template：',
      choices: readTemplate(),
    }
  ]
  return config
}

module.exports = {
  promptTemplateConfig,
}
