const path = require('path');

module.exports = {
    entry: "./app/javascripts/MetacoinClient.js",
    output: {
        path: path.resolve(__dirname, "app/build/bundles"),
        filename: "MetacoinBundle.js"
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};