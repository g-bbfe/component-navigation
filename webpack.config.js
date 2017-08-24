const path = require('path');

module.exports = {
  entry: './src/www/business/apps/navigation/menu/index.js',

  output: {
    path: path.resolve(__dirname, 'src/www/lib'),
    filename: 'menu.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/www/business')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "less-loader", options: {
            sourceMap: true
          }
        }],
      },
    ]
  },
  resolve: {
    alias: {
      static: path.join(__dirname, 'src/www/static')
    }
  },
  devtool: 'source-map',
  devServer: {
    contentBase: [path.join(__dirname, "src/www/business/apps/navigation/menu"),path.join(__dirname, "src/www/lib")],
    compress: true,
    stats: 'minimal',
    watchContentBase: true,
    port: 8010
  }
};
