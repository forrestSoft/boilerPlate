const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './index.js', './index.tpl'],
    // main: './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  mode: 'development',
  devtool: '#source-map',
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html|tpl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.tpl",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    }),
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  ]
}