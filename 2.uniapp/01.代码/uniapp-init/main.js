import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// mpType->声明当前App组件为小程序实例
// mp mini program	
// type	类型
App.mpType = 'app'

const app = new Vue({
    // ...App
	
	onLaunch: function() {
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
})
app.$mount()
