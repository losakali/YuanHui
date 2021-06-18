import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		// 用户的登录状态
		loginStatus: false,
		// 用户数据
		user: {},
		pcType:[],
		// 删除图片域名
		baseUrl:'http://localhost/apiToken/laravel-airlock-sample/storage/app/public/pcImg/'
	},
	mutations: {
		add(state, res) {
			// 更改state中的变量要在这里更改。
			state.loginStatus = true
			state.user = res.data
			// 永久存储
			uni.setStorageSync('user', JSON.stringify(res.data))
			uni.setStorageSync('token',res[0].token)
			console.log(state.user)
		},
		// 退出登录
		logout(state) {
			state.loginStatus = false
			state.user = {}
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		// 初始化用户登录状态
		initUser(state) {
			 // 获取 getStorageSync 中存储的 用户信息
			let user = uni.getStorageSync('user')
			// 判断用户数据是否存在 存在把其赋值给全局 state.user 并把json字符串转换成数据对象
			if (user) {
				state.user = JSON.parse(user)
				// 把用户登录状态打开
				state.loginStatus = true
			}
			console.log(state.user)
		},
		// 电脑分类
		pcType(state,res){
			state.pcType = res.data
		}
	},
	actions: {
		getPcType(context,http){
			http.post('api/pc/pcType').then(res => {
				// 成功 把数据保存到全局
				context.commit('pcType', res.data)
			}).catch(err=>{
				// 失败打印错误信息
				console.log(err)
			})
		}
	}
})
export default store
