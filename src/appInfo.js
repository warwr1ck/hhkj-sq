import {isApp} from './utils'

var appInfo
var ua = window.navigator.userAgent
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

export default appInfo
