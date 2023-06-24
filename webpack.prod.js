const HtmlWebPackPlugin = require('html-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path')

module.exports = {

    entry: './src/index.js',
    

    mode: 'production',
    optimization: {
        minimizer: [new CssMinimizerWebpackPlugin(),
                    new TerserPlugin()
                ]
    },
    output: {
        filename: '[name].[hash].js',
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
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                  "babel-loader",
                ]
              },
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
            filename: '[name].[hash].css',
            ignoreOrder: false,
        }),
        new CleanWebpackPlugin(),
        
    ]

}

