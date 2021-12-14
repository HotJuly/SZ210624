const {resolve} = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

/*
    代码分割:code split
    问题:
        多个入口文件中,同时依赖于一个文件,结果打包编译结束,会发现多个出口文件中,都具有依赖文件的所有代码,
            无形中增加了项目体积
    解决:
        多入口文件
            1.在配置对象中添加属性optimization->splitChunks->chunks:"all"
                问题:webpack默认只会拆解大于30000B的共同依赖文件
                解决:optimization->splitChunks->minSize:1

        单入口文件
            单入口文件的代码切割,俗称懒加载
            webpack如果在编译过程中遇到import函数,就会自动将被引入的文件,单独拆分为一个js文件
            面试题:如何自定义chunk名称
                参考main.js中的语法
 */

module.exports={
    entry:{
        main:"./src/main.js",
        // home:"./src/home.js"
    },//入口文件地址
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
                //一般用于配置多个loader
                // loader:""  一般用于配置一个loader
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
                //一般用于配置多个loader
                // loader:""  一般用于配置一个loader
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./public/index.html"
        })
    ],
    mode:"development",//开发环境development,生产环境production,
    resolve:{
        alias:{
            "@":resolve(__dirname,"./src")//配置路径别名,别名叫做@,路径需要resolve拼接
        },
        extensions:[".vue",".jsx",".js",".json"]//配置文件扩展名,如果引入文件时候没有写具体扩展名,他会尝试该数组所有的扩展名
    },
    optimization:{
        splitChunks:{
            chunks:"all",
            minSize: 1,
        }
    }
}