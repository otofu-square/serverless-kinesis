const path = require('path');
const slsw = require('serverless-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.build'),
    filename: '[name].js',
  },
  externals: ['aws-sdk'],
  plugins: [new UglifyJSPlugin()],
};
