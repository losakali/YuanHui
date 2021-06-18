import Vue from 'vue'
import App from './App'
// 引入 vuex 实例 store
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store

// 导入 luch-request 请求插件
import Request from 'js_sdk/luch-request/luch-request/index.js'
// 创建 luch-request 实例
const http = new Request()

// 请求拦截器
// http.interceptors.request.use(config => {
// 	return config
// })

http.interceptors.request.use(config => {
	let token = uni.getStorageSync('token')
	if(token){
		config.header = { ...config.header }
		// 'Bearer ' 必须在token前面添加这个字符串 不然后台不认
		config.header.Authorization='Bearer '+token
	}
	// 弹出加载框
	uni.showLoading({ title: '加载中' })
	return config
})
// 响应拦截器
http.interceptors.response.use(response => {
	// 服务端返回的状态码不等于200，则返回错误信息 reject()
	// if (response.data.status !== 200) { 
	// 	// 显示后端定义的错误信息
	//     uni.showToast({
	//     	title: response.data.message,
	//     	icon: 'none'
	//     })
	//     return Promise.reject(response) 
	//  }
	// if (response.config.custom.verification) { // 演示自定义参数的作用
	//   return response.data
	// }
	// 响应成功直接返回 res
	console.log(response)
	// 响应成功 关闭加载框
	uni.hideLoading()
	return response
}, response => {
	/*  对响应错误做点什么 （statusCode !== 200）*/
	// 响应成功 关闭加载框
	uni.hideLoading()
	return Promise.reject(response)
})

// 挂载到全局
Vue.prototype.$http = http

Vue.config.productionTip = false



App.mpType = 'app'

const app = new Vue({
	...App,
	// 挂载到全局
	store
})
app.$mount()
