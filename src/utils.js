var ua = window.navigator.userAgent

// 是否是测试版
export var isDebug = /:[\d]+$/.test(location.host)

// 是否是108社区app
export var isApp = /108sq/i.test(ua)
export var isAndroid = /android/i.test(ua)
export var isIPhone = /iphone/i.test(ua)

// 是否是PC断模拟app环境
export var isPCDebug = /pc/i.test(ua) && /108sq/i.test(ua)
