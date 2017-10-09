var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = process.env.PORT || 3050;

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true
}).listen(port, '0.0.0.0', function (err) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:' + port + '/');
});
