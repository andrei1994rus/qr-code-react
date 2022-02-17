const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const path=require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');

let mode='development';

if(process.env.NODE_ENV==='production')
{
	mode='production';
}

const production=mode==='production';

module.exports=
{
	entry:path.resolve(__dirname,'./src/index.js'),
    output:
    {
        path:path.resolve(__dirname,'./dist'),
        filename:'bundle.js',
    },
	mode:mode,
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
                	production ? MiniCssExtractPlugin.loader : 'style-loader',
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
            filename:'styles.css',
        }),
	],
	devServer:
	{
		port:3000,
		hot:true,
		static:'./dist'
	}
}