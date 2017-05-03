import {isApp, jsonpRequest, getOS} from '../utils.js'

/*
* 统计方法
* @configs {Object} 统计的信息
*   @pageName {String} 页面名，必填
*   @eventName {String} 事件名，必填
*/

let statistics
if (isApp) {
  statistics = function (configs) {
    return this._callMethod('webStatistics', JSON.stringify(configs))
  }
} else {
  let ma = {
    log: function (params) {
      let args = filterArgs(params)
      jsonpRequest({
        url: 'http://analytics.108sq.com/log/',
        params: {
          version: ma.version,
          os: getOS(),
          page: params.pageName,
          event: params.eventName,
          args: encodeURIComponent(args)
        },
        callback: 'logCallback'
      })
    },
    version: '1.0.0'
  }
  statistics = ma.log
}

function filterArgs (params) {
  let argsObj = {}
  for (let i in params) {
    if (i != 'pageName' && i != 'eventName' && params.hasOwnProperty(i)) {
      argsObj[i] = params[i]
    }
  }
  let args = Object.keys(argsObj).map(item => `${item}=${argsObj[item]}`).join(',')
  return args
}

export default statistics
