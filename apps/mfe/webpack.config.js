const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = async (_, { mode = 'development' }) => {
  return {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    target: 'web',
    mode,
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: 'auto',
      chunkFilename: 'js/[id].[contenthash].js',
      filename: 'js/[name].[contenthash].js',
      clean: true,
    },
    devServer: {
      hot: true,
      open: ['/mfe'],
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'src', 'public'),
      },
      compress: true,
      port: 5556,
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      extensions: ['.css', '.js', '.jsx', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'public', 'index.html'),
      }),

      new ModuleFederationPlugin({
        name: 'MfeApp',
        filename: 'js/mfe-app-entry.js',
        exposes: {
          './MfeRootApp': './src/app.jsx',
          './MfeRemoteComp': './src/messageReceiver.jsx'
        },
        shared: [
          {
            react: {
              requiredVersion: '^18.2.0',
              singleton: true,
              eager: true,
            },
            'react-dom': {
              requiredVersion: '^18.2.0',
              singleton: true,
              eager: true,
            },
            'react-router-dom': {
              requiredVersion: '^6.3.0',
              singleton: true,
              eager: true,
            },
            'react-redux': {
              singleton: true,
              eager: true,
            }
          }
        ]
      })
    ],
  };
};
