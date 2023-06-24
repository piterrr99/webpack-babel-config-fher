const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const path = require('path')

module.exports = {

    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        assetModuleFilename: (pathData)=>{
            const filepath = path
            .dirname(pathData.filename)
            .split('/')
            .slice(1)
            .join('/');
            return  `${filepath}/[name].[hash][ext][query]`;
        }
    },

    mode: 'development',
    optimization: {
        minimizer: [new CssMinimizerWebpackPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.png/,
                type: 'asset/resource',
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),
        
    ]

}

