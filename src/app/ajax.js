import {isPCDebug} from '../utils'

/**
 * app ajax方法，无跨域问题，仅在社区中有用，自带登陆信息
 * @configs {Object} 参数配置
 *   @type {String} 请求类型，默认"GET"
 *   @url {String} 请求地址，必须是完整的url地址
 *   @waiting {String} 请求开始到结束为止等待过程中，请求等待过程中显示的信息
 *   @params {Object} 请求参数
 *   @success {Function} 成功的回掉函数
 *   @error {Function} 错误的回掉函数
 *   @complete {Function} 请求完成的回掉函数
 */
var ajax = function (configs) {
  var defaults = {
    type: 'GET',
    url: '',
    waiting: '',
    params: {},
    success: null,
    error: null,
    complete: null
  },
  options = {};
  for (var i in defaults) {
    options[i] = configs.hasOwnProperty(i) ? configs[i] : defaults[i];
  }
  var j2p = function(json) { 
    var a = []; 
    for (var i in json) a.push(i + '=' + json[i]); 
    return a.join('&'); 
  };
  var random = parseInt(Math.random() * 1000000000000 + 1000000000000);
  var success = '', error = '', complete = '';
  if (options.success) {
    success = 'APP_CALLBACK_SUCCESS_' + random;
    window[success] = function(response) {
      if (typeof response == 'string') {
        response = JSON.parse(response);
      }
      options.success && options.success.call(window, response);
    };
  }
  if (options.error) {
    error = 'APP_CALLBACK_ERROR_' + random;
    window[error] = function() {
      options.error && options.error.call(window);
    };
  }
  if (options.complete) {
    complete = 'APP_CALLBACK_COMPLETE_' + random;
    window[complete] = function() {
      options.complete && options.complete(window);
    };
  }

  var params = {
    type: options.type.toUpperCase(),
    url: options.url,
    waiting: options.waiting,
    params: j2p(options.params),
    success: success,
    error: error,
    complete: complete
  };
  //判断是否是本地文件
  this._callMethod('ajax', JSON.stringify(params));
}

if (isPCDebug) {
  // PC端模拟ajax，不带登陆信息
  ajax = function (options) {
    var _default = {
      url: '',
      type: 'GET',
      params: {},
      waiting: '',
      headers: {
        'Access-Token': 'DEBUG TOKEN'
      },
      success: null,
      complete: null,
      error: null
    }

    for (var i in _default) {
      options[i] = options.hasOwnProperty(i) ? options[i] : _default[i]
    }
    function j2p (json) {
      var arr = []
      for (var i in json) {
        arr.push(i+'='+json[i])
      }
      return arr.join('&')
    }
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        options.complete && options.complete()
        if (xhr.status >= 200 && xhr.status < 400) {
          var resp = JSON.parse(xhr.responseText)
          options.success && options.success.call(window, resp)
        } else {
          options.error && options.error()
        }
      }
    }
    if (options.type === 'GET') {
      xhr.open('GET', options.url + '?' + j2p(options.params), true)
      xhr.setRequestHeader('Access-Token', options.headers['Access-Token'])
      xhr.send()
    } else if (options.type === 'POST') {
      xhr.open('POST', options.url, true)
      xhr.setRequestHeader('Access-Token', options.headers['Access-Token'])
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(options.params)
    }
  }
}

export default ajax
