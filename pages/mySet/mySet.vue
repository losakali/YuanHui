<template>
	<view class="mySet">
		<!-- 用户头像 -->
		<!-- 头像 -->
		<user-image :userImg="user.avatar"></user-image>
		<view class="userName">
			<!-- 只能判断布尔值 像undefind 这种判断不了 -->
			<text>{{loginStatus ? user.name : "未登录"}}</text>
		</view>
		<!-- 列表 -->
		<view class="list">
			<uni-list>
				<!-- 
				clickable 点击高亮
				设置 link 属性，会自动开启点击反馈即高亮，并给列表右侧添加一个箭头
				设置 to 属性，可以跳转页面，link 的值表示跳转方式，如果不指定，默认为 navigateTo
				 -->
				<uni-list-item title="开启点击反馈" clickable @click="onClick"></uni-list-item>
				<uni-list-item title="默认 navigateTo 方式跳转页面" link to="/pages/vue/index/index" @click="onClick($event,1)">
				</uni-list-item>
				<uni-list-item title="reLaunch 方式跳转页面" link="reLaunch" to="/pages/vue/index/index"
					@click="onClick($event,1)"></uni-list-item>
			</uni-list>
		</view>

		<!-- 登录和退出 -->
		<view class="btn">
			<button type="primary" v-show="!loginStatus" @click="login">登录/注册</button>
			<button type="warn" v-show="loginStatus" @click="logout">退出</button>
		</view>
	</view>
</template>

<script>
	// 导入全局组件中的数据
	import { mapState } from 'vuex'
	// 导入 用户头像组件
	import userImg from '../../components/user-image/user-image.vue'
	export default {
		data() {
			return { text: '未登录' }
		},
		// 在计算属性中把全局中的数据映射
		computed: { ...mapState(['loginStatus', 'user']) },
		// 注册组件
		components: { 'user-image': userImg },
		onLoad() {

		},
		methods: {
			// 登录
			login() {
				uni.navigateTo({ url: '../login/login' })
			},
			// 退出操作
			logout() {
				// 询问是否退出登录？
				uni.showModal({
					content: '是否要退出登录',
					success: async res => {
						// 判断是否退出 退出执行操作 不退出不执行任何操作
						if (res.confirm) {
							const { data: res } = await this.$http.post('/api/auth/logout')
							this.$store.commit('logout')
							// 回退上一个页面
							// uni.navigateBack({ delta: 1 })
							uni.showToast({
								title: '退出登录成功',
								icon: 'none'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mySet {
		padding: 0 20rpx;

		// 用户名
		.userName {
			text-align: center;
			color: #9C9C9C;
			margin-bottom: 20rpx;
		}

		// 登录 退出
		.btn {
			margin-top: 80rpx;
		}
	}
</style>
