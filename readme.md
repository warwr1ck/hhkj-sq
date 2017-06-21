## 昊汉网络-108社区 app api

包含了app提供的所有JS接口，以及hosts

```ES6
import {isAndroid, isIPhone, hosts, appInfo, app, isPCDebug} from 'hhkj-sq'
```
或直接引用
```
  <script src="http://commoncnd.108sq.com/Scripts/hhkj-sq.min.js"></script>
  <script>
    console.log(HhkjSq)
  </script>
```

### hosts
- 108社区域名，正式版后不跟端口号，测试版地址后跟端口号
- 以域名是否有端口号区分正式版跟测试版

### appInfo
- 用userAngent来获取app信息
- 非108社区app中返回 ```null```
- 108社区app中返回站点Id等信息

### app
- 108社区app通过```JSbridge```提供的客户端方法

### isPCDebug
- PC端通过userAngent模拟客户端的信息

### toast (1.3.0添加)
```javascript
import {toast} from 'hhkj-sq'

toast({
  message: 'message',
  duration: 3000
})
toast('hello world')
```

