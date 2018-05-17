var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './src/example/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot-loader/webpack', 'babel-loader'],
      include: path.join(__dirname, 'src')
    },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
};
