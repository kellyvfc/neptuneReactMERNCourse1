const presetEnv = require.resolve('@babel/preset-env');
const presetReact = require.resolve('@babel/preset-react');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const transformRunTimePlugin = require.resolve('@babel/plugin-transform-runtime')

module.exports = settings => ({
    target: 'web',
    mode: 'production',
    devtool: 'none',
    output: {
        filename: '[name].bundle.js',
        path: '/',
        publicPath: `/webapp/${settings.appName}`
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [presetEnv, presetReact],
                        plugins: [transformRunTimePlugin]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(resourcePath) {
                                return resourcePath;
                            },
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BASENAME: JSON.stringify(`/webapp/${settings.appName}`)
        }),
        new htmlWebpackPlugin({
            templateContent: settings.htmlTemplate
        })
    ]
});
