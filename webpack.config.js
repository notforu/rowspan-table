const path = require("path");
const autoprefixer = require("autoprefixer");
const fbFixes = require("postcss-flexbugs-fixes");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isProduction = process.env.NODE_ENV === "PRODUCTION";

const result = {
	entry: [
		"babel-polyfill",
		"./src/index.js",
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},
			{
				test: /^((?!\.module).)*scss$/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
						options: {
							importLoaders: 2
						}
					}, {
						loader: "postcss-loader",
						options: {
							sourceMap: true,
							indent: "postcss",
							plugins: () => [
								fbFixes,
								autoprefixer({
									browsers: [
										">1%",
										"last 4 versions",
										"Firefox ESR",
										"not ie < 9" // React doesn"t support IE8 anyway
									],
									flexbox: "no-2009"
								})
							]
						}
					},
					{ loader: "sass-loader" }
				]
			}
		]
	},
	resolve: {
		modules: [path.resolve("src"), "node_modules"],
		extensions: ["*", ".js", ".jsx"],
	},
	output: {
		path: path.join(__dirname, "/public"),
		filename: "bundle.js",
		publicPath: "/public"
	},
	plugins: []
};

if (!isProduction) {
	result.devServer = {
		inline: true,
		contentBase: "./public",
		publicPath: "/public",
		historyApiFallback: true,
	};
	result.module.rules.unshift({
		test: /\.(js|jsx)$/,
		loader: "eslint-loader",
		exclude: /(node_modules)/,
		enforce: "pre",
		options: {
			emitOnWarning: true,
			emitOnError: true,
		}
	});
} else {
	result.plugins = result.plugins.concat([
		new webpack.optimize.ModuleConcatenationPlugin(),
		new UglifyJsPlugin({ sourceMap: true })
	]);
}

module.exports = result;
