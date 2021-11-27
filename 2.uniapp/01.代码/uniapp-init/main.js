import Vue from 'vue'
import App from './App'
import axios from './utils/axios.js';

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$axios=axios;

// mpType->声明当前App组件为小程序实例
// mp mini program	
// type	类型
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
	
	// onLaunch: function() {
	// 	console.log('App Launch')
	// },
	// onShow: function() {
	// 	console.log('App Show')
	// },
	// onHide: function() {
	// 	console.log('App Hide')
	// }
})
app.$mount()
