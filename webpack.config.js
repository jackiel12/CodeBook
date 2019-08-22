const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    mode: 'development',
    devServer: {
      publicPath: '/build/',
      proxy: {
        '/data': 'http://localhost:3000'
      }
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
          }
        ]
      }
      
}