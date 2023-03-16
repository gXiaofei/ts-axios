const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把 demo 放在不同的目录下
   * 每个子目录会建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集多目录入口文件,并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象,key 为目录名
   */

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);
    const entry = path.join(fullDir, 'app.ts');
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries;
  }, {}),


  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [{
        test: /\.ts$/,
        enforce: 'pre',
        use: [{
          loader: 'tslint-loader'
        }]
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

}
