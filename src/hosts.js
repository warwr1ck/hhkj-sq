/*
* hosts
* @return {Object}
*/

import {isDebug} from './utils'
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
	"pay" : "http://pay.108sq.org:1203",
	"friendv2" : "http://friendv2.108sq.org:1505",
	"friend" : "http://friend.108sq.org:806",
	"pkplugin" : "http://pkplugin.108sq.org:1505",
	"business" :"http://business.108sq.org:920",
	"message"  : "http://message.108sq.org:809" ,
	"businessad" :'http://businessad.108sq.org:71',
	"enrolling": "http://enrolling.108sq.org:1505" ,
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
	"discuss1": "http:discuss.108sq.com",
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
	"m": "http://m.108sq.com",
	"nodomain": "http://108sq.com",
	"mtalksvcv2": "http://mtalksvcv2.sq108.net",
	"mtalksvc": "http://mtalksvc.sq108.net",
	"common": "http://common.108sq.com",
	"usertxcdn": "http://usertxcdn.108sq.com"
}

export default hosts
