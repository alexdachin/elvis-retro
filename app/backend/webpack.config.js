const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    'connect-handler': './src/handlers/connect-handler.ts',
    'create-note-handler': './src/handlers/create-note-handler.ts',
    'disconnect-handler': './src/handlers/disconnect-handler.ts',
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
}
