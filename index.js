var ua = window.navigator.userAgent

var isAndroid = /android/i.test(ua)
var isIPhone = /iphone/i.test(ua)
var isDebug = /pc/i.test(ua)
var isApp = /108sq/i.test(ua)
var isDebug = /:[\d]+$/.test(location.host)

var appInfo 

if (isApp) {
	var reg = /108sq\/([^/]*)\/([^/]*)\/([^/]*)\/([^/]*)$/i
	var match = ua.match(reg)
	appInfo = {
		name: '108sq',
		version: match ? match[1] : '',
		cityId: match ? match[2] : '',
		channelName: match ? match[3] : '',
		netType: match ? match[4] : ''
	}
} else {
	appInfo = null
}

var hosts = isDebug ? {
	"main": "http://www.108sq.org:920",
	"app": "http://app.108sq.org:920",
	"login": "http://login.108sq.org:807",
	"userop": "http://userop.108sq.org:1204",
	"discuss": "http://discuss.108sq.org:901",
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
	"pay" : "http://pay.108sq.org:1203",
	"friendv2" : "http://friendv2.108sq.org:1505",
	"friend" : "http://friend.108sq.org:806",
	"pkplugin" : "http://pkplugin.108sq.org:1505",
	"business" :"http://business.108sq.org:920",
	"message"  : "http://message.108sq.org:809" ,
	"businessad" :'http://businessad.108sq.org:71',
	"enrolling": "http://enrolling.108sq.org:1505" ,
	"m": "http://m.108sq.org:920"
} : {
	"main": "http://www.108sq.com",
	"app": "http://app.108sq.com",
	"login": "http://login.108sq.com",
	"userop": "http://userop.108sq.com",
	"discuss": "http://discuss.108sq.com",
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
	"pay" : "http://pay.108sq.com",
	"friendv2" : "http://friendv2.108sq.com",
	"friend" : "http://friend.108sq.com",
	"pkplugin" : "http://pkplugin.108sq.com",
	"business" :"http://business.108sq.com",
	"message"  : "http://message.108sq.com" ,
	"businessad" : "http://businessad.108sq.com",
	"enrolling": "http://enrolling.108sq.com",
	"m": "http://m.108sq.com"
}

var app = {
	_hasMethod : function(name){
		return !!window['ChangShuoJSBridge'] && !!window['ChangShuoJSBridge'][name];
	},
	_callMethod : function(name){
		if(!this._hasMethod(name)){
			return;
		}
		return window['ChangShuoJSBridge'][name].apply(window['ChangShuoJSBridge'], Array.prototype.slice.call(arguments).slice(1));
	},
	showWaiting:function(sTips){
		return this._callMethod('showWaiting', sTips);
	},
	showToast:function(message){
		return this._callMethod('showToast', message);
	},
	hideWaiting:function(){
		return this._callMethod('hideWaiting');
	},
	toLogin:function(isReloadOnSuccess){
		return this._callMethod('toLogin', isReloadOnSuccess);
	},
	getToken : function(){
		return this._callMethod('getToken');
	},
	getEncryptMobile : function(){
		return this._callMethod('getEncryptMobile');
	},
	getEncodeMobileFlag : function(){
		return this._callMethod('getEncodeMobileFlag');
	},
	hideMoreMenu : function(){
		return this._callMethod('hideMoreMenu');
	},
	getUserId : function(){
		return this._callMethod('getUserId');
	},
	getUserName : function(){
		return this._callMethod('getUserName');
	},
	isShareable: function() {
		return this._hasMethod('shareWebPageToWeiXin');
	},
	sendMessage : function(cnt){ 	//私信
		return this._callMethod('sendMessage',cnt);
	},
	shareWebPageToWeiXin: function(title, titleUrl, content, imageUrl) { //titleUrl必填
		return this._callMethod('shareWebPageToWeiXin', title, titleUrl, content, imageUrl);
	},
	shareWebPageToWeiXinFriends: function(title, titleUrl, imageUrl) { //titleUrl必填
		return this._callMethod('shareWebPageToWeiXinFriends', title, titleUrl, '', imageUrl);
	},
	shareWebPage:function(config){
		//config={
		// 	"title":"",
		//	"titleUrl":"",
		//	"content":"",
		//	"imageUrl":"",
		//	"shareType":1:QQ分享2:QQ空间分享3:微信分享4:微信朋友圈分享 int
		//	"infoid":"" 非必填
		// }
		return this._callMethod('shareWebPage',JSON.stringify(config));//
	},
	startNewWebView: function(url) {
		if (this._hasMethod('startNewWebView')) {
			return this._callMethod('startNewWebView', url);
		}
		else {
			location.href = url;
		}
	},
	openUpload: function(configs) {
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
   	},
	webStatistics : function(jsonstr){
		return this._callMethod('webStatistics',jsonstr);
	},
	pay:function(payInfo,payType){
		return this._callMethod('pay',payInfo,payType);
	},
	getSiteDomain:function(){
		return this._callMethod('getSiteDomain');
	},
	ajax: function(configs) {

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
		
	},
	openImage:function(src){
		return this._callMethod('openImage',src);
	}
}

if (isDebug) {
	app.getToken = function() {
		return 'DEBUG TOKEN';
	};
	app.getUserId = function() {
		return '5924';
	};
	app.getUserName = function () {
		return 'user_DEBUG'
	}
	
	window.onload = function () {
		window.bridgeEvent = document.createEvent('Event');
		window.bridgeEvent.initEvent('ChangJSBridgeReady', false, false);
		document.dispatchEvent(window.bridgeEvent);
	}
}

module.exports = {
	isAndroid: isAndroid,
	isIPhone: isIPhone,
	appInfo: appInfo,
	hosts: hosts,
	app: app
}