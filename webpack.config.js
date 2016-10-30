module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        path: './dist',
        filename: 'boolean.min.js',
        library: '$',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    plugins: ['add-module-exports']
                }
            }
        ]
    }
};
