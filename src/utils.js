// 是否是测试版
export const isDebug = /:[\d]+$/.test(location.host)

// 是否是108社区app
export const isApp = /108sq/i.test(ua)

var ua = window.navigator.userAgent

export const isAndroid = /android/i.test(ua)
export const isIPhone = /iphone/i.test(ua)

// 是否是PC断模拟app环境
export const isPCDebug = /pc/i.test(ua) && /108sq/i.test(ua)
