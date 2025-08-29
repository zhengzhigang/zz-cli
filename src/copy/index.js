const fs = require('fs-extra')
const { awaitLoadding } = require('../libs/utils')

const copy = async (...args) => {
  let [sourceDir, targetDir] = args
  await awaitLoadding('Copying files', fs.copy, sourceDir, targetDir)
}

module.exports = copy
