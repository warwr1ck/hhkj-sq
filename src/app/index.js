import ajax from './ajax'
import openUpload from './openUpload'
import statistics from './statistics'
import {isPCDebug} from '../utils'

var app = {
  /*
  * app是否提供了name的方法
  * @name {String}
  * @return {Boolean}
  */
  _hasMethod : function(name){
    return !!window['ChangShuoJSBridge'] && !!window['ChangShuoJSBridge'][name];
  },
  _callMethod : function(name){
    if(!this._hasMethod(name)){
      return;
    }
    return window['ChangShuoJSBridge'][name].apply(window['ChangShuoJSBridge'], Array.prototype.slice.call(arguments).slice(1));
  },

  /*
  * 展示loading
  * @sTips {String}
  */
  showWaiting:function(sTips){
    return this._callMethod('showWaiting', sTips);
  },
  hideWaiting:function(){
    return this._callMethod('hideWaiting');
  },

  /*
  * 展示toast
  * @message {String}
  */
  showToast:function(message){
    return this._callMethod('showToast', message);
  },

  /*
  * 跳转登陆页面
  * @isReloadOnSuccess {Boolean} 登陆成功后是否刷新页面
  */
  toLogin:function(isReloadOnSuccess){
    return this._callMethod('toLogin', isReloadOnSuccess);
  },

  /*
  * 获取用户token信息
  * @retuan {String}
  */
  getToken : function(){
    return this._callMethod('getToken');
  },

  /*
  * 获取设备信息
  */
  getEncryptMobile : function(){
    return this._callMethod('getEncryptMobile');
  },

  /*
  * 获取设备信息
  */
  getEncodeMobileFlag : function(){
    return this._callMethod('getEncodeMobileFlag');
  },

  /*
  * 隐藏右上角按钮信息（复制链接，在浏览器中打开链接）
  */
  hideMoreMenu : function(){
    return this._callMethod('hideMoreMenu');
  },

  /*
  * 获取用户Id
  * @return {Number}
  */
  getUserId : function(){
    return this._callMethod('getUserId');
  },

  /*
  * 获取用户名
  * @return {String}
  */
  getUserName : function(){
    return this._callMethod('getUserName');
  },

  /*
  * 发送私信
  * @cnt {String} 私信内容
  */
  sendMessage : function(cnt){
    return this._callMethod('sendMessage',cnt);
  },

  /*
  * 分享给微信好友
  * @title {String} 分享页面的标题，必填
  * @titleUrl {String} 分享页面的链接
  * @content {String} 分享内容
  * @imageUrl {String} 分享图标的链接
  */
  shareWebPageToWeiXin: function(title, titleUrl, content, imageUrl) {
    return this._callMethod('shareWebPageToWeiXin', title, titleUrl, content, imageUrl);
  },

  /*
  * 分享到微信朋友圈
  * @title {String} 分享页面的标题，必填
  * @titleUrl {String} 分享页面的链接
  * @imageUrl {String} 分享图标的链接
  */
  shareWebPageToWeiXinFriends: function(title, titleUrl, imageUrl) {
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
  shareWebPage:function(config){
    return this._callMethod('shareWebPage',JSON.stringify(config));//
  },

  /*
  * 打开一个新的webView（非每个页面拥有此方法）
  * 如没有此方法，通过location.href跳转页面
  * @url {String} 完整的url
  */
  startNewWebView: function(url) {
    if (this._hasMethod('startNewWebView')) {
      return this._callMethod('startNewWebView', url);
    }
    else {
      location.href = url;
    }
  },

  /*
  * 统计方法
  * @configs {Object} 统计的信息
  *   @pageName {String} 页面名，必填
  *   @eventName {String} 事件名，必填
  */
  webStatistics : statistics,

  /*
  * app提供的支付方法
  * @payInfo {Result} 订单信息，接口返回
  * @payType {Number} 支付类型
  *   @1 支付宝
  *   @2 微信支付
  */
  pay:function(payInfo,payType){
    return this._callMethod('pay',payInfo,payType);
  },

  /*
  * 获取当前站点的domain名称
  * @return {String}
  */
  getSiteDomain:function(){
    return this._callMethod('getSiteDomain');
  },

  /*
  * ajax方法
  */
  ajax: ajax,

  /*
  * 上传图片的方法
  */
  openUpload: openUpload,

  /*
  * 打开图片
  * @src {String}
  */
  openImage:function(src){
    return this._callMethod('openImage',src);
  },

  /*
  * 右上角按钮分享信息配置
  * @configs {Object} 
  *   @isShow {Boolean} 是否显示分享按钮
  *   @title {String} 分享页面的标题，默认为当前网页的标题
  *   @describe {String} 分享页面描述，默认为网页描述
  *   @shareImg {String} 分享图片的地址
  *   @link {String} 分享页面的地址
  *   @immediate {Boolean} 显示app分享组件 app版本3.14.0增加此参数
  */
  appWebShare: function (configs) {
    return this._callMethod('appWebShare', JSON.stringify(configs))
  },

  /*
 * 查看图片详情，app 3.14.0增加此方法
 * @config {Object}
 *   @images {Array} 图片url数组，不带域名的情况下客户端会默认加上photoshow的域名
 *   @index {Number} 当前需要展示的图片所在的images的index
 */
  openImagesWithIndex: function (config) {
    var _defalut = {
      index: config.index || 0,
      images: config.images ? config.images.join(',') : ''
    }
    return this._callMethod('openImagesWithIndex', JSON.stringify(_defalut))
  }
}

if (isPCDebug) {
  // PC端
  app.getToken = function() {
    return 'DEBUG TOKEN';
  };
  app.getUserId = function() {
    return '5924';
  };
  app.getUserName = function () {
    return 'user_DEBUG'
  }
  window.addEventListener('load', function () {
    window.bridgeEvent = document.createEvent('Event')
    window.bridgeEvent.initEvent('ChangJSBridgeReady', false, false)
    document.dispatchEvent(window.bridgeEvent)
  })
}

export default app
