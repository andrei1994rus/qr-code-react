const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');

module.exports=
{
	mode:'production',
	entry:
	{
		app:path.resolve(__dirname,'./src/index.js'),
	},
    output:
    {
        path:path.resolve(__dirname,'./dist'),
        filename:'[name].[contenthash].js',
    },
	module:
	{
        rules:
        [
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:["babel-loader"],
            },
            {
            	test:/\.(s*)css$/,
                exclude:/node_modules/,
                use:
                [
                	MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:
                        {
                            modules:true,
                            sourceMap:true,
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:
                        {
                            sourceMap:true,
                        }
                    }
                ],
            }
        ]
    },
    resolve:
    {
        extensions:["*", ".js", ".jsx",".scss"],
    },
	plugins:
	[
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin(
		{
			template:'./src/index.html',
		}),
		new MiniCssExtractPlugin(
		{
            filename:'styles.[contenthash].css',
        }),
	],
	devServer:
	{
		port:3000,
		hot:true,
		static:'./dist'
	}
}
