/**
 * 客户端提供的上传图片的方法
 * @configs {object} 配置信息
 *   @url {String} 接口地址，必须是完整的url
 *   @waiting {String} 请求过程中显示的等待信息
 *   @maxwidth {Number} 图片最大边长
 *   @quality {Number} 图片质量 0 - 100
 *   @dataType {String} 'json' or 'text' 传到回掉函数中的数据类型
 *   @params {Object} 请求的参数
 *   @start {Function} 开始上传时回掉函数
 *   @cancel {Function} 请求取消时回掉函数
 *   @success {Function} 图片上传成功时回掉函数
 *   @failure {Function} 图片上传失败时回掉函数
 *   @complete {Function} 请求完成时回掉函数
 */

const openUpload = function (configs) {
  var defaults = {
    url: '',
    waiting: '',
    // 最大边长
    maxwidth: 0,

    // 图片质量 0-100
    quality: 100,

    dataType: 'json',
    params: {},
    start: null,
    cancel: null,
    success: null,
    failure: null,
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
  var start = '', cancel = '', success = '', failure = '', complete = '';
  if (options.start) {
    start = 'APP_UPLOAD_CALLBACK_START_' + random;
    window[start] = function() {
      options.start && options.start(window);
    };
  }
  if (options.cancel) {
    cancel = 'APP_UPLOAD_CALLBACK_CANCEL_' + random;
    window[cancel] = function() {
      options.cancel && options.cancel(window);
    };
  }
  if (options.complete) {
    complete = 'APP_UPLOAD_CALLBACK_COMPLETE_' + random;
    window[complete] = function() {
      options.complete && options.complete(window);
    };
  }
  if (options.success) {
    success = 'APP_UPLOAD_CALLBACK_SUCCESS_' + random;
    window[success] = function(response) {
      if (options.dataType == 'json' && typeof response !== 'object') {
        response = JSON.parse(response);
      }
      else if (options.dataType == 'text') {
        if (typeof response == 'object') {
          response = JSON.stringify(response);
        }
      }
      options.success && options.success.call(window, response);
    };
  }
  if (options.failure) {
    failure = 'APP_UPLOAD_CALLBACK_FAILURE_' + random;
    window[failure] = function(response) {
      if (options.dataType == 'json' && typeof response !== 'object') {
        response = JSON.parse(response);
      }
      else if (options.dataType == 'text') {
        if (typeof response == 'object') {
          response = JSON.stringify(response);
        }
      }
      options.failure && options.failure.call(window, response);
    };
  }
  if (options.complete) {
    complete = 'APP_CALLBACK_COMPLETE_' + random;
    window[complete] = function() {
      options.complete && options.complete(window);
    };
  }

  var params = {
    url: options.url,
    waiting: options.waiting,
    params: j2p(options.params),
    maxwidth: options.maxwidth,
    quality: options.quality,
    start: start,
    cancel: cancel,
    success: success,
    failure: failure,
    complete: complete
  };
  this._callMethod('openUpload', JSON.stringify(params));
}

export default openUpload
