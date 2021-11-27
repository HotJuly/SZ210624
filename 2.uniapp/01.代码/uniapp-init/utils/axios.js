/*
	需求:由于uniapp具有同时打包成多端项目的特点,
		如果运行环境是h5,此时的基础路径应该是代理规则字符串/api
		如果运行环境是小程序,此时的基础路径应该是http://localhost:3005

*/
import config from './config.js';
let baseUrl;


// 方案一:
// 通过该属性可以获取到当前运行环境
// const platform = uni.getSystemInfoSync().platform;
// if(platform==="ios"){
// 	// 能进入这里说明当前运行环境是h5
// 	baseUrl="/api"
// }else if(platform==="devtools"){
// 	// 能进入这里说明当前运行环境是小程序
// 	baseUrl="http://localhost:3005"
// }


// 方案二:条件编译
// #ifdef H5
	baseUrl=config.h5Host;
// #endif

// #ifdef MP-WEIXIN
	baseUrl=config.mpHost;
// #endif


export default function(url,data={},method="GET"){
	return new Promise((resolve,reject)=>{
		uni.request({
			// url:"/api/getIndexData",
			url:baseUrl+url,
			data,
			method,
			success:(res)=>{
				resolve(res.data);
			}
		})
	})
}