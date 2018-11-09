// vue.config.js
module.exports = {
    configureWebpack: {
        plugins: [
            new MyAwesomeWebpackPlugin()
            ],
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
            },
            test: /\.scss$/,
            use: [
                {
                loader: 'css-loader'
                },
                {
                loader: 'sass-loader'
                }   
        ]
    }
}
  
  