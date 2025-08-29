var downloadUrl = require('download')
var gitclone = require('git-clone')
var rm = require('rimraf').sync

/**
 * 下载项目
 *
 * @param {String} repo git/gitlab地址
 * @param {String} dest 目标源
 * @param {Object} opts 参数选项
 * @param {Function} fn 回调函数
 */

function downloadUtil(repo, dest, opts, fn) {

  if (typeof opts === 'function') {
    fn = opts
    opts = null
  }
  opts = opts || {}
  var clone = opts.clone || false
  delete opts.clone
  
  repo = normalize(repo)
  repo.checkout = opts

  var url = repo.url || getUrl(repo, clone)

  if (clone) {
    var cloneOptions = {
      checkout: repo.checkout,
      shallow: repo.checkout === 'master',
      ...opts,
    }
    gitclone(url, dest, cloneOptions, function (err) {
      if (err === undefined) {
        rm(dest + '/.git')
        fn()
      } else {
        fn(err)
      }
    })
  } else {
    var downloadOptions = {
      extract: true,
      strip: 1,
      mode: '666',
      ...opts,
      headers: {
        accept: 'application/zip',
        ...(opts.headers || {}),
      },
    }
    downloadUrl(url, dest, downloadOptions)
      .then(function () {
        fn()
      })
      .catch(function (err) {
        console.error(err)
        fn(err)
      })
  }
}

/**
 * 解析地址
 *
 * @param {String} repo 地址
 * @return {Object}
 */

function normalize(repo) {
  var regex = /^(?:(direct):([^#]+)(?:#(.+))?)$/
  var match = regex.exec(repo)

  if (match) {
    var url = match[2]
    var directCheckout = match[3] || 'master'

    return {
      type: 'direct',
      url: url,
      checkout: directCheckout,
    }
  } else {
    regex = /^(?:(github|gitlab|bitbucket|topnet):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/ // 修改
    match = regex.exec(repo)

    var type = match[1] || 'github'
    var origin = match[2] || null
    var owner = match[3]
    var name = match[4]
    var checkout = match[5] || 'master'

    if (origin == null) {
      if (type === 'github') {
        origin = 'github.com'
      } else if (type === 'gitlab') {
        origin = 'gitlab.com'
      } else if (type === 'bitbucket') {
        origin = 'bitbucket.org'
      } else if (type === 'topnet') {
        // 修改
        origin = '192.168.3.19'
      }
    }

    return {
      type: type,
      origin: origin,
      owner: owner,
      name: name,
      checkout: checkout,
    }
  }
}

/**
 * 添加地址协议头
 *
 * @param {String} url
 * @return {String}
 */

function addProtocol(repo, clone) {
  let origin = ''
  if (!/^(f|ht)tps?:\/\//i.test(repo.origin)) {
    if (clone) {
      origin = 'git@' + repo.origin
    } else {
      // 修改
      let url = repo.type === 'topnet' ? 'http://' : 'https://' // 修改
      origin = url + repo.origin
    }
  }

  return origin
}

/**
 * 获取真实的url地址
 *
 * @param {Object} repo
 * @return {String}
 */

function getUrl(repo, clone) {
  var url

  var origin = addProtocol(repo, clone)
  if (/^git@/i.test(origin)) {
    origin = origin + ':'
  } else {
    origin = origin + '/'
  }

  // Build url
  if (clone) {
    url = origin + repo.owner + '/' + repo.name + '.git'
  } else {
    if (repo.type === 'github') {
      url = origin + repo.owner + '/' + repo.name + '/archive/' + repo.checkout + '.zip'
    } else if (repo.type === 'gitlab' || repo.type == 'topnet') {
      // 修改
      url = `${origin}${repo.owner}/${repo.name}/-/archive/${repo.checkout}/${repo.name}-${repo.checkout}.zip`
    } else if (repo.type === 'bitbucket') {
      url = origin + repo.owner + '/' + repo.name + '/get/' + repo.checkout + '.zip'
    }
  }
  return url
}

module.exports = downloadUtil
