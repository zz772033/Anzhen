const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    publicPath: '',
    outputDir: 'dist',
    lintOnSave: false,
    filenameHashing: false,
    productionSourceMap: false,
    pages: {
        index: {
            name: 'index',
            title: 'Anzhen Engine',
            entry: 'src/index.js',
            inject: 'head',
            template: 'src/index.html',
            filename: 'index.html'
        }
    },
    chainWebpack: config => {
        let limit = 4096;
        config.plugin('html-index').tap(options => {
            options[0].minify = false;
            return options;
        });
        config.module
            .rule('vue')
            .use('cache-loader')
            .loader('iview-loader')
            .tap(options => Object.assign(options, { prefix: true }));
        config.module
            .rule('svg')
            .use('file-loader')
            .loader('url-loader')
            .tap(options =>
                Object.assign(
                    {},
                    {
                        limit: limit,
                        name: 'assets/images/[name].[ext]'
                    }
                )
            );
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options =>
                Object.assign(
                    {},
                    {
                        limit: limit,
                        name: 'assets/images/[name].[ext]'
                    }
                )
            );
        config.module
            .rule('fonts')
            .use('url-loader')
            .tap(options =>
                Object.assign(
                    {},
                    {
                        limit: limit,
                        name: 'assets/fonts/[name].[ext]'
                    }
                )
            );
        config.module
            .rule('media')
            .use('url-loader')
            .tap(options =>
                Object.assign(
                    {},
                    {
                        limit: limit,
                        name: 'assets/media/[name].[ext]'
                    }
                )
            );
    },
    css: {
        sourceMap: false,
        extract: {
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css'
        }
    },
    configureWebpack: {
        output: {
            library: 'App',
            libraryTarget: 'umd',
            filename: 'assets/js/[name].js',
            chunkFilename: 'assets/js/[id].js'
        },
        performance: {
            maxAssetSize: 1024 * 1024,
            maxEntrypointSize: 1024 * 1024
        },
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery'
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'src/static'),
                    to: 'static',
                    ignore: ['.*']
                }
            ]),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'src/thirdparty'),
                    to: 'thirdparty',
                    ignore: ['.*']
                }
            ])
        ]
    }
};
