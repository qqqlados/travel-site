const path = require("path")

const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-mixins'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('autoprefixer')
]

module.exports = {
  entry: './app/assets/scripts/App.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  },
	devServer: {
	//'./app/**/*.html'
	onBeforeSetupMiddleware: function (devServer) {
		devServer.app.get("./app/**/*.html", function (req, res) {
			res.json({ custom: "response" });
		});
},
		static: path.resolve(__dirname, 'app'),
		hot: true,
		port: 3000,
		host: '0.0.0.0'
	},
  mode: 'development',
  module: {
	rules: [
		{
			test: /\.css$/i,
			use: ['style-loader','css-loader?url=false', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}] 
		}
	]
  }
}
