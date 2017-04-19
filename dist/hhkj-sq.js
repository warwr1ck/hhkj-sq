/* !
* hhkj-sq.js v1.2.5
* (c) 2017 wanglk<warwr1ck@126.com>
* Released under the MIT License.
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.HhkjSq = global.HhkjSq || {})));
}(this, (function (exports) { 'use strict';

var ua = window.navigator.userAgent;

// 是否是测试版
var isDebug = /:[\d]+$/.test(location.host);

// 是否是108社区app
var isApp = /108sq/i.test(ua);
var isAndroid = /android/i.test(ua);
var isIPhone = /iphone/i.test(ua);

// 是否是PC断模拟app环境
var isPCDebug = /pc/i.test(ua) && /108sq/i.test(ua);

var appInfo;
var ua$1 = window.navigator.userAgent;
if (isApp) {
	var reg = /108sq\/([^/]*)\/([^/]*)\/([^/]*)\/([^/]*)$/i;
	var match = ua$1.match(reg);
	appInfo = {
		name: '108sq',
		version: match ? match[1] : '',
		cityId: match ? match[2] : '',
		channelName: match ? match[3] : '',
		netType: match ? match[4] : ''
	};
} else {
	appInfo = null;
}

var appInfo$1 = appInfo;

/*
* hosts
* @return {Object}
*/

var hosts = isDebug ? {
	"main": "http://www.108sq.org:920",
	"app": "http://app.108sq.org:920",
	"login": "http://login.108sq.org:807",
	"userop": "http://userop.108sq.org:1204",
	"discuss": "http://discuss.108sq.org:901",
	"discuss1": "http://discuss1.108sq.org:1202",
	"uploadimg": "http://photo.108sq.org:811",
	"showimg": "http://photoshow.108sq.org:814",
	"merchant": "http://sj.108sq.org:703",
	"activity": "http://huodong.108sq.org:815",
	"shuo": "http://shuo.108sq.org:821",
	"shuocdn": "http://shuo.108sq.org:821",
	"dynamic": "http://dynamic.108sq.org:826",
	"mtalk": "http://mtalksvc.108sq.org:831",
	"shop": "http://shop.108sq.org:1505",
	"dynamicnew": "http://dynamic.108sq.org:826",
	"jiangli": "http://jiangli.tc108.org:1505",
	"love": "http://love.108sq.org:1505",
	"pay": "http://pay.108sq.org:1203",
	"friendv2": "http://friendv2.108sq.org:1505",
	"friend": "http://friend.108sq.org:806",
	"pkplugin": "http://pkplugin.108sq.org:1505",
	"business": "http://business.108sq.org:920",
	"message": "http://message.108sq.org:809",
	"businessad": 'http://businessad.108sq.org:71',
	"enrolling": "http://enrolling.108sq.org:1505",
	"m": "http://m.108sq.org:920",
	"nodomain": "http://108sq.org:920",
	"mtalksvcv2": "http://mtalksvcv2.108sq.org:831",
	"mtalksvc": "http://mtalksvc.108sq.org:831",
	"common": "http://common.108sq.org:1505",
	"usertxcdn": "http://usertxcdn.108sq.org:920"
} : {
	"main": "http://www.108sq.com",
	"app": "http://app.108sq.com",
	"login": "http://login.108sq.com",
	"userop": "http://userop.108sq.com",
	"discuss": "http://discuss.108sq.com",
	"discuss1": "http://discuss.108sq.com",
	"uploadimg": "http://photo.108sq.com",
	"showimg": "http://photoshow.108sq.com",
	"merchant": "http://sj.108sq.com",
	"activity": "http://huodong.108sq.com",
	"shuo": "http://shuo.108sq.com",
	"shuocdn": "http://shuocdn.108sq.com",
	"dynamic": "http://dynamic.108sq.com",
	"mtalk": "http://mtalksvc.tc108.net",
	"shop": "http://shop.108sq.com",
	"dynamicnew": "http://dynamic.108sq.com",
	"jiangli": "http://jiangli.108sq.com",
	"love": "http://love.108sq.com",
	"pay": "http://pay.108sq.com",
	"friendv2": "http://friendv2.108sq.com",
	"friend": "http://friend.108sq.com",
	"pkplugin": "http://pkplugin.108sq.com",
	"business": "http://business.108sq.com",
	"message": "http://message.108sq.com",
	"businessad": "http://businessad.108sq.com",
	"enrolling": "http://enrolling.108sq.com",
	"m": "http://m.108sq.com",
	"nodomain": "http://108sq.com",
	"mtalksvcv2": "http://mtalksvcv2.sq108.net",
	"mtalksvc": "http://mtalksvc.sq108.net",
	"common": "http://common.108sq.com",
	"usertxcdn": "http://usertxcdn.108sq.com"
};

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
var ajax = function ajax(configs) {
  var defaults = {
    type: 'GET',
    url: '',
    waiting: '',
    params: {},
    success: null,
    error: null,
    complete: null,
    isNeedDecode: false
  },
      options = {};
  for (var i in defaults) {
    options[i] = configs.hasOwnProperty(i) ? configs[i] : defaults[i];
  }
  var j2p = function j2p(json) {
    var a = [];
    for (var i in json) {
      a.push(i + '=' + json[i]);
    }return a.join('&');
  };
  var random = parseInt(Math.random() * 1000000000000 + 1000000000000);
  var success = '',
      error = '',
      complete = '';
  if (options.success) {
    success = 'APP_CALLBACK_SUCCESS_' + random;
    window[success] = function (response) {
      if (typeof response == 'string') {
        response = JSON.parse(response);
      }
      options.success && options.success.call(window, response);
    };
  }
  if (options.error) {
    error = 'APP_CALLBACK_ERROR_' + random;
    window[error] = function () {
      options.error && options.error.call(window);
    };
  }
  if (options.complete) {
    complete = 'APP_CALLBACK_COMPLETE_' + random;
    window[complete] = function () {
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
    complete: complete,
    isNeedDecode: options.isNeedDecode
  };
  //判断是否是本地文件
  this._callMethod('ajax', JSON.stringify(params));
};

if (isPCDebug) {
  // PC端模拟ajax，不带登陆信息
  ajax = function ajax(options) {
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
    };

    for (var i in _default) {
      options[i] = options.hasOwnProperty(i) ? options[i] : _default[i];
    }
    function j2p(json) {
      var arr = [];
      for (var i in json) {
        arr.push(i + '=' + json[i]);
      }
      return arr.join('&');
    }
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        options.complete && options.complete();
        if (xhr.status >= 200 && xhr.status < 400) {
          var resp = JSON.parse(xhr.responseText);
          options.success && options.success.call(window, resp);
        } else {
          options.error && options.error();
        }
      }
    };
    if (options.type === 'GET') {
      xhr.open('GET', options.url + '?' + j2p(options.params), true);
      xhr.setRequestHeader('Access-Token', options.headers['Access-Token']);
      xhr.send();
    } else if (options.type === 'POST') {
      xhr.open('POST', options.url, true);
      xhr.setRequestHeader('Access-Token', options.headers['Access-Token']);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(options.params);
    }
  };
}

var ajax$1 = ajax;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

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

var openUpload = function openUpload(configs) {
  var defaults$$1 = {
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
  for (var i in defaults$$1) {
    options[i] = configs.hasOwnProperty(i) ? configs[i] : defaults$$1[i];
  }
  var j2p = function j2p(json) {
    var a = [];
    for (var i in json) {
      a.push(i + '=' + json[i]);
    }return a.join('&');
  };
  var random = parseInt(Math.random() * 1000000000000 + 1000000000000);
  var start = '',
      cancel = '',
      success = '',
      failure = '',
      complete = '';
  if (options.start) {
    start = 'APP_UPLOAD_CALLBACK_START_' + random;
    window[start] = function () {
      options.start && options.start(window);
    };
  }
  if (options.cancel) {
    cancel = 'APP_UPLOAD_CALLBACK_CANCEL_' + random;
    window[cancel] = function () {
      options.cancel && options.cancel(window);
    };
  }
  if (options.complete) {
    complete = 'APP_UPLOAD_CALLBACK_COMPLETE_' + random;
    window[complete] = function () {
      options.complete && options.complete(window);
    };
  }
  if (options.success) {
    success = 'APP_UPLOAD_CALLBACK_SUCCESS_' + random;
    window[success] = function (response) {
      if (options.dataType == 'json' && (typeof response === 'undefined' ? 'undefined' : _typeof(response)) !== 'object') {
        response = JSON.parse(response);
      } else if (options.dataType == 'text') {
        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) == 'object') {
          response = JSON.stringify(response);
        }
      }
      options.success && options.success.call(window, response);
    };
  }
  if (options.failure) {
    failure = 'APP_UPLOAD_CALLBACK_FAILURE_' + random;
    window[failure] = function (response) {
      if (options.dataType == 'json' && (typeof response === 'undefined' ? 'undefined' : _typeof(response)) !== 'object') {
        response = JSON.parse(response);
      } else if (options.dataType == 'text') {
        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) == 'object') {
          response = JSON.stringify(response);
        }
      }
      options.failure && options.failure.call(window, response);
    };
  }
  if (options.complete) {
    complete = 'APP_CALLBACK_COMPLETE_' + random;
    window[complete] = function () {
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
};

var app = {
  /*
  * app是否提供了name的方法
  * @name {String}
  * @return {Boolean}
  */
  _hasMethod: function _hasMethod(name) {
    return !!window['ChangShuoJSBridge'] && !!window['ChangShuoJSBridge'][name];
  },
  _callMethod: function _callMethod(name) {
    if (!this._hasMethod(name)) {
      return;
    }
    return window['ChangShuoJSBridge'][name].apply(window['ChangShuoJSBridge'], Array.prototype.slice.call(arguments).slice(1));
  },

  /*
  * 展示loading
  * @sTips {String}
  */
  showWaiting: function showWaiting(sTips) {
    return this._callMethod('showWaiting', sTips);
  },
  hideWaiting: function hideWaiting() {
    return this._callMethod('hideWaiting');
  },

  /*
  * 展示toast
  * @message {String}
  */
  showToast: function showToast(message) {
    return this._callMethod('showToast', message);
  },

  /*
  * 跳转登陆页面
  * @isReloadOnSuccess {Boolean} 登陆成功后是否刷新页面
  */
  toLogin: function toLogin(isReloadOnSuccess) {
    return this._callMethod('toLogin', isReloadOnSuccess);
  },

  /*
  * 获取用户token信息
  * @retuan {String}
  */
  getToken: function getToken() {
    return this._callMethod('getToken');
  },

  /*
  * 获取设备信息
  */
  getEncryptMobile: function getEncryptMobile() {
    return this._callMethod('getEncryptMobile');
  },

  /*
  * 获取设备信息
  */
  getEncodeMobileFlag: function getEncodeMobileFlag() {
    return this._callMethod('getEncodeMobileFlag');
  },

  /*
  * 隐藏右上角按钮信息（复制链接，在浏览器中打开链接）
  */
  hideMoreMenu: function hideMoreMenu() {
    return this._callMethod('hideMoreMenu');
  },

  /*
  * 获取用户Id
  * @return {Number}
  */
  getUserId: function getUserId() {
    return this._callMethod('getUserId');
  },

  /*
  * 获取用户名
  * @return {String}
  */
  getUserName: function getUserName() {
    return this._callMethod('getUserName');
  },

  /*
  * 发送私信
  * @cnt {String} 私信内容
  */
  sendMessage: function sendMessage(cnt) {
    return this._callMethod('sendMessage', cnt);
  },

  /*
  * 分享给微信好友
  * @title {String} 分享页面的标题，必填
  * @titleUrl {String} 分享页面的链接
  * @content {String} 分享内容
  * @imageUrl {String} 分享图标的链接
  */
  shareWebPageToWeiXin: function shareWebPageToWeiXin(title, titleUrl, content, imageUrl) {
    return this._callMethod('shareWebPageToWeiXin', title, titleUrl, content, imageUrl);
  },

  /*
  * 分享到微信朋友圈
  * @title {String} 分享页面的标题，必填
  * @titleUrl {String} 分享页面的链接
  * @imageUrl {String} 分享图标的链接
  */
  shareWebPageToWeiXinFriends: function shareWebPageToWeiXinFriends(title, titleUrl, imageUrl) {
    return this._callMethod('shareWebPageToWeiXinFriends', title, titleUrl, '', imageUrl);
  },

  /*
  * 分享到微信、微信朋友圈、QQ、QQ空间
  * @config {Object} 分享信息配置
  *   @title {String} 分享页面的标题，必填
  *   @titleUrl {String} 分享页面的链接，必填
  *   @content {String} 分享页面的内容
  *   @imageUrl {String} 分享图标的链接
  *   @shareType {Number} 分享类型
  *     @1 QQ好友
  *     @2 QQ空间
  *     @3 微信好友
  *     @4 微信朋友圈
  *   @infoid {Number} 帖子的id，（分享获得积分用），非必填
  */
  shareWebPage: function shareWebPage(config) {
    return this._callMethod('shareWebPage', JSON.stringify(config)); //
  },

  /*
  * 打开一个新的webView（非每个页面拥有此方法）
  * 如没有此方法，通过location.href跳转页面
  * @url {String} 完整的url
  */
  startNewWebView: function startNewWebView(url) {
    if (this._hasMethod('startNewWebView')) {
      return this._callMethod('startNewWebView', url);
    } else {
      location.href = url;
    }
  },

  /*
  * 统计方法
  * @configs {Object} 统计的信息
  *   @pageName {String} 页面名，必填
  *   @eventName {String} 事件名，必填
  */
  webStatistics: function webStatistics(configs) {
    return this._callMethod('webStatistics', JSON.stringify(configs));
  },

  /*
  * app提供的支付方法
  * @payInfo {Result} 订单信息，接口返回
  * @payType {Number} 支付类型
  *   @1 支付宝
  *   @2 微信支付
  */
  pay: function pay(payInfo, payType) {
    return this._callMethod('pay', payInfo, payType);
  },

  /*
  * 获取当前站点的domain名称
  * @return {String}
  */
  getSiteDomain: function getSiteDomain() {
    return this._callMethod('getSiteDomain');
  },

  /*
  * ajax方法
  */
  ajax: ajax$1,

  /*
  * 上传图片的方法
  */
  openUpload: openUpload,

  /*
  * 打开图片
  * @src {String}
  */
  openImage: function openImage(src) {
    return this._callMethod('openImage', src);
  },

  /*
  * 右上角按钮分享信息配置
  * @configs {Object} 
  *   @isShow {Boolean} 是否显示分享按钮
  *   @title {String} 分享页面的标题，默认为当前网页的标题
  *   @describe {String} 分享页面描述，默认为网页描述
  *   @shareImg {String} 分享图片的地址
  *   @link {String} 分享页面的地址
  */
  appWebShare: function appWebShare(configs) {
    return this._callMethod('appWebShare', JSON.stringify(configs));
  }
};

if (isPCDebug) {
  // PC端
  app.getToken = function () {
    return 'DEBUG TOKEN';
  };
  app.getUserId = function () {
    return '5924';
  };
  app.getUserName = function () {
    return 'user_DEBUG';
  };
  window.addEventListener('load', function () {
    window.bridgeEvent = document.createEvent('Event');
    window.bridgeEvent.initEvent('ChangJSBridgeReady', false, false);
    document.dispatchEvent(window.bridgeEvent);
  });
}

exports.isAndroid = isAndroid;
exports.isIPhone = isIPhone;
exports.isPCDebug = isPCDebug;
exports.appInfo = appInfo$1;
exports.hosts = hosts;
exports.app = app;

Object.defineProperty(exports, '__esModule', { value: true });

})));
