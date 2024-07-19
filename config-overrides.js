const { override, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackPlugin(
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  )
);
