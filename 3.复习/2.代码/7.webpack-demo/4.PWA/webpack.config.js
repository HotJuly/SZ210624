const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

/*
    离线缓存:PWA
*/

module.exports={
    entry:"./src/main.js",//入口文件地址
    output:{
        filename:"[name].js",//编译之后文件名称
        path:resolve(__dirname,"build")//编译之后文件保存地址
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./public/index.html"
        }),
        new WorkboxPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    mode:"production",//开发环境development,生产环境production,
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")//配置路径别名,别名叫做@,路径需要resolve拼接
        },
        extensions:[".vue",".jsx",".js",".json"]//配置文件扩展名,如果引入文件时候没有写具体扩展名,他会尝试该数组所有的扩展名
    }
}