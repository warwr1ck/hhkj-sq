var path = require('path')
var webpack = require('webpack')
module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, 
        options: {
          presets: ['es2015']
        }
      }
    ]
  }
}
