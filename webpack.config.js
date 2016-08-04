var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './app/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: [
		'./app/index.js'
	],
	output: {
		path: './dist',
		filename: 'index_bundle.js'
	},
	module: {
		loaders: [
			{test: [/\.js$/, /\.jsx$/], exclude: /node_modules/, loader: 'babel-loader'}
		]
	},
	plugins: [HtmlWebpackPluginConfig],
	devtool: 'source-map',
	devServer: {
		stats: 'errors-only',
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
