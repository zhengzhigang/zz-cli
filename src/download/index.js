const { downloadTemplate } = require('./download')

const download = async (...args) => {
  let [templateName, dirName] = args
    downloadTemplate(templateName, dirName)
}

module.exports = download
