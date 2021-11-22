/*
    封装代码核心思想
        1.保留重复出现的代码
        2.将每次不同的内容提取单独传入
    
    封装函数
        1.保留重复出现的代码
        2.将每次不同的内容提取为形参
        3.谁调用谁传入

    封装组件
        1.保留重复出现的结构和少量js
        2.将每次不同的内容提取为props
        3.谁使用谁传入
*/
import config from './config';
export default function(url,data={},method="GET"){

    // 发送请求是同步的,返回响应是异步的
    return new Promise((resolve,reject)=>{
        wx.request({
            url:config.mpHost + url,
            data,
            method,
            success:(res)=>{
                // console.log(res)
                // result= res;

                // res是响应报文对象,res.data是响应体
                resolve(res.data);
            }
        })
    })
}