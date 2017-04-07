var fs = require('fs')
var path = require('path')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var uglify = require('rollup-plugin-uglify')
var version = require('./package.json').version

var banner =
`/* !
* hhkj-sq.js v${version}
* (c) ${new Date().getFullYear()} wanglk<warwr1ck@126.com>
* Released under the MIT License.
*/\n\n`

build()
build(true)


function build(isMin) {
  let plugins = [babel()]
  let filename = 'hhkj-sq.js'
  if (isMin) {
    plugins.push(uglify())
    filename = 'hhkj-sq.min.js'
  }
  rollup.rollup({
    entry: path.resolve(__dirname, 'src/index.js'),
    plugins: plugins
  }).then(bundle => {
    return write(path.resolve(__dirname, 'dist/' + filename), bundle.generate({
      format: 'umd',
      moduleName: 'HhkjSq'
    }).code)
  }).then(() => {
    console.log(filename + ' v' + version +' builded')
  }).catch(console.log)

}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function write (dest, code) {
  return new Promise (function (resolve, reject) {
    code = banner + code
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}