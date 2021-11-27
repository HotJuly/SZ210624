const Koa = require('koa');
const KoaRouter = require('koa-router');

// 1.创建服务器应用实例对象
// const app = express();
const app = new Koa();

/* 3.注册路由
	express:app.get(路由地址,回调函数)
*/
// 3.1创建路由器实例对象
const router = new KoaRouter();

// 3.2使用中间键,告知服务器,需要使用当前所有的路由
app.use(router.routes())

// 3.3注册路由
/*
	express
		回调函数接受三个参数
			request	->	请求报文对象
			response ->	响应报文对象
			next ->	执行下一个中间键函数
	koa
		回调函数接收两个参数
			ctx->request+response->请求报文对象+响应报文对象
			next->执行下一个中间键函数
			返回相应数据:ctx.body="需要返回的数据"

*/
router.get('/test',function(ctx,next){
	console.log('/test success')
	ctx.body = "test success"
})

// 用于返回首页数据的接口
const indexData = require('./datas/index.json');
router.get('/getIndexData',function(ctx,next){
	// console.log('/test success')
	ctx.body = indexData
})

// 用于返回分类页面数据的接口
const categoryDatas = require('./datas/categoryDatas.json');
router.get('/getCategoryDatas',function(ctx,next){
	// console.log('/test success')
	ctx.body = categoryDatas
})
	

// 2.将服务器应用实例运行到某个指定端口,并监听该端口
app.listen(3005,function(error){
	if(error){
		console.log('服务器启动失败',error)
	}else{
		console.log('服务器启动成功,启动于:http://localhost:3005"')
	}
})