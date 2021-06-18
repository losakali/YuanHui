<template>
	<view class="login">
		<!-- 用户头像 -->
		<user-image></user-image>
		
		<!-- 登录表单 -->
		<!-- 
		validateTrigger 触发校验的时机 bind 输入时
		name 校验规则对象
		 -->
		<view class="loginFrom">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" validateTrigger="bind" >
				<uni-forms-item name="email">
					<uni-easyinput prefixIcon="email-filled" class="input" v-model="formData.email" type="email" placeholder="请输入邮箱" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<uni-easyinput prefixIcon="locked" type="password" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
				<button type="primary" @click="login">登录</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	// 导入用户头像组件
	import userImg from '../../components/user-image/user-image.vue'
	export default {
		data() {
			return {
				// 表单数据对象
				formData: {
					email: '743853038@qq.com',
					password: 'asd8168250'
				},
				// 表单验证规则
				rules:{
					// 对email字段进行必填验证
					email: {
						rules: [{
							required: true,
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					},
					//  对密码字段进行必填验证
					password: {
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								minLength: 6,
								maxLength: 15,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					}
				}
			}
		},
		// 注册组件
		components:{ 'user-image':userImg },
		methods: {
			// 登录
			login(){
				// 验证表单
				this.$refs.form.validate(valid=>{
					if(valid!==null) return
					// 发起登录请求
					this.$http.post('/api/auth/login',this.formData).then(res=>{
						// 成功
						// 调用全局中的注册方法 把获取回来的 用户id 头像 用户名 保存在全局store中
						this.$store.commit('add',res.data)
						// 跳转到首页
						uni.switchTab({ url:'../index/index' })
						// 跳转后刷新页面
						// window.location.reload()
					}).catch(err=>{
						// 失败 弹出失败信息
						uni.showToast({
							title:err.data.message,
							icon:'none',
							duration:2000
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		padding: 0 20rpx;
	}
</style>
