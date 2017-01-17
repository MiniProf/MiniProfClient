module.exports = {
  entry:  './www/react/components.js',
  output: {
    path: './www',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // Transform JSX in .jsx files
      {
        test: /\.jsx$/,
        loader:'babel-loader',
      }
    ],
  },
  resolve: {
    // Allow require('./blah') to require blah.jsx
    extensions: ['', '.js', '.jsx']
  }
};
