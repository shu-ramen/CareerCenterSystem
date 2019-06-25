
require('@babel/register');
const path = require('path');

module.exports = {
    entry: {
      accounts_signup:           path.resolve(__dirname, "src/accounts/signup.jsx"),
      registration_login:        path.resolve(__dirname, "src/registration/login.jsx"),
      registration_logged_out:   path.resolve(__dirname, "src/registration/logged_out.jsx"),
      share_header:              path.resolve(__dirname, "src/share/header.jsx"),
      share_error:               path.resolve(__dirname, "src/share/error.jsx"),
      share_message:             path.resolve(__dirname, "src/share/message.jsx"),
      home_index:                path.resolve(__dirname, "src/home/index.jsx"),
      library_index:             path.resolve(__dirname, "src/library/index.jsx"),
      library_register_category: path.resolve(__dirname, "src/library/register_category.jsx"),
    },
    output: {
        path: path.resolve(__dirname, "../static/js/") ,
        filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    resolve: {
      extensions: [".js","jsx"],
    }
}