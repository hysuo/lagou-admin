const path = require("path")
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode:'development',
    entry:'./src/app.js',
    output:{
        path:path.resolve(__dirname,'../dev'),
        filename:'app.js'
    },
    devServer:{
        contentBase:path.resolve(__dirname,'../dev'),
        port:8000,
        proxy: {
            "/api": {
              target: "http://localhost:3000"
            }
          }
    },
    module:{
        rules:[{
            test:/\.art$/,
            loader:'art-template-loader'
        },
        {
            test: /\.(scss|css)$/,
            loader: ['style-loader', 'css-loader', 'sass-loader']
        }
    ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html'
        }),
        new copyWebpackPlugin([{
            from:'./public',
            to:'./public'
        }])
    ]
}