const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/*
    tree-shaking(树摇)
    问题:在引入文件的时候,某些文件暴露多个内容,但是我们只会用到其中的部分内容,
        但是结果这些没用到的函数,也会出现在最终的js文件中,无形中增加了项目体积
    解决:
        1.将mode属性修改为production(会自动使用TerserPlugin)
        2.手动启动TerserPlugin插件配置

    注意:
        1.想使用树摇插件,必须使用ES6模块化语法,不支持commonjs语法

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
        })
    ],
    mode:"production",//开发环境development,生产环境production,
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")//配置路径别名,别名叫做@,路径需要resolve拼接
        },
        extensions:[".vue",".jsx",".js",".json"]//配置文件扩展名,如果引入文件时候没有写具体扩展名,他会尝试该数组所有的扩展名
    },
    // optimization: {
    //     minimizer: [new TerserPlugin()]
    // }
}