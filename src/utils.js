var ua = window.navigator.userAgent

// 是否是测试版
export var isDebug = /:[\d]+$/.test(location.host)

// 是否是108社区app
export var isApp = /108sq/i.test(ua)
export var isAndroid = /android/i.test(ua)
export var isIPhone = /iphone/i.test(ua)

// 是否是PC断模拟app环境
export var isPCDebug = /pc/i.test(ua) && /108sq/i.test(ua)

/*
* jsonp请求方法（简易）
* @options {Object} 请求参数
*   @url {String} 请求地址
*   @params {Object} 请求参数
*   @success {Function} 成功回掉函数
*   @callback {String} 成功回掉函数名字
*/
export function jsonpRequest (options) {
  var script = document.createElement('script')
  if (options.callback) {
    window[options.callback] = options.success || function () {}
  } else {
    var random = parseInt(Math.random() * 1000000) + 1000000
    options.callback = '_jsonpCallback' + random
    window[options.callback] = options.success || function () {}
  }
  script.onload = function () {
    this.parentNode.removeChild(this)
  }
  script.onerror = function () {
    this.parentNode.removeChild(this)
  }
  var head = document.querySelector('head')
  head.appendChild(script)
  script.src = options.url + '?callback=' + options.callback + '&' + j2p(options.params)
}

// json格式文件转换为字符串
function j2p (json) {
  var arr = []
  for (var i in json) {
    json.hasOwnProperty(i) && arr.push(i + '=' + json[i])
  }
  return arr.join('&')
}

export function getOS () {
  var u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
    return "Android"
  } else if (u.indexOf('iPhone') > -1) {//苹果手机
    return "iPhone OS"
  } else if (u.indexOf('Windows Phone') > -1) {
    return "Windows Mobile"
  }
  return ""
}
