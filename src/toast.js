/**
 * toast 提示
 * @options {Object, Number, String}
 *   @messgae {String, Number} toast信息
 *   @duration {Number} toast 时长
 */
function toast (options) {
  if (typeof options === 'string' || typeof options === 'number') {
    options = {
      message: options
    }
  }
  new Toast (options)
}

class Toast {
  constructor (options) {
    this.options = Object.assign({}, {
      message: '',
      duration: 2000
    }, options)
    this.init()
    this.createStyle()
  }

  init () {
    this.dom = getInstance(this.options.message)
    document.body.appendChild(this.dom)
    setTimeout(() => {
      this.dom.addEventListener('transitionend', this.destroy.bind(this))
      this.dom.className += ' hide'
    }, this.options.duration)
  }

  destroy () {
    document.body.removeChild(this.dom)
    this.dom.removeEventListener('trasnitioned', this.destroy)
  }

  createStyle () {
    let style = document.getElementById('_sq_toast_style')
    if (style) return
    style = document.createElement('style')
    style.id = '_sq_toast_style'
    style.innerHTML = [
      '._sq_toast-wrapper{',
        'position:fixed;',
        'left: 0;',
        'bottom: 15%;',
        'width:100%;',
        'box-sizing: border-box;',
        'text-align:center;',
        '-webkit-transform: translateY(-50%);',
        'transform: translateY(-50%);',
        '-webkit-transition: opacity .5s;',
        'transition: opacity .5s;',
        'z-index: 999;',
      '}',
      '._sq_toast-wrapper.hide{',
        'opacity: 0;',
      '}',
      '._sq_toast--main{',
        'display: inline-block;',
        'background: rgba(0,0,0,.4);',
        'color: #fff;',
        'font-size: 14px;',
        'padding: 4px 10px;',
        'border-radius: 99px;',
        'word-break: break-all;',
        'box-sizing: border-box;',
        'max-width: 60%;',
        'text-align: center;',
      '}',
    ].join('')
    document.head.appendChild(style)
  }
}

function getInstance (message) {
  let instance = document.createElement('div')
  instance.className = '_sq_toast-wrapper'
  let toast = document.createElement('div')
  toast.className = '_sq_toast--main'
  toast.innerText = message
  instance.appendChild(toast)
  return instance
}

export default toast
