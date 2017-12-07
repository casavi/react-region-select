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
		new ExtractTextPlugin('app.css', {
			allChunks: true
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: [{
					loader: 'babel-loader'
				}, {
					loader: 'react-hot-loader/webpack'
				}
				],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.scss/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader", options: {
						sourceMap: true
					}
				}, {
					loader: "sass-loader", options: {
						sourceMap: true,
						includePaths: [
							path.join(__dirname, 'src')
						]
					}
				}],
				include: path.join(__dirname, 'src')
			}
		]
	}
};
