<template>
	<view class="register">
		<!-- 头像 -->
		<user-image></user-image>
		<!-- 注册 -->
		<view class="userFrom">
			<uni-forms ref="form" :modelValue="formData" :rules="rules" validateTrigger="bind">
				<uni-forms-item name="name">
					<uni-easyinput prefixIcon="contact-filled" type="text" v-model="formData.name"
						placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item name="email">
					<uni-easyinput prefixIcon="email-filled" class="input" v-model="formData.email" type="email"
						placeholder="请输入邮箱" />
				</uni-forms-item>
				<uni-forms-item name="password">
					<uni-easyinput prefixIcon="locked" type="password" v-model="formData.password"
						placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item name="password_confirmation">
					<uni-easyinput prefixIcon="locked-filled" type="password" v-model="formData.password_confirmation"
						placeholder="请再次输入密码" />
				</uni-forms-item>
				<button type="primary" @click="addUser">注册</button>
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
				formData: {
					name: 'losakali',
					password: 'asd8168250',
					password_confirmation: 'asd81682509',
					email: '743853038@qq.com'
				},
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 10,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
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
					},
					// 对确认密码字段进行必填校验
					password_confirmation: {
						rules: [{
								required: true,
								errorMessage: '请再次输入密码',
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
		components: { 'user-image': userImg },
		methods: {
			/**
			 * 复写 binddata 方法，如果只是为了校验，无复杂自定义操作，可忽略此方法
			 * @param {String} name 字段名称
			 * @param {String} value 表单域的值
			 */
			// binddata(name,value){
			// 通过 input 事件设置表单指定 name 的值
			//   this.$refs.form.setValue(name, value)
			// },
			// 触发提交表单
			addUser() {
				this.$refs.form.validate(valid => {
					// valid 为空代表 验证没有出错 不为空 验证出错 valid里会有错误信息
					console.log(valid)
					if (valid !== null) return
					// 发起注册请求
					this.$http.post('/api/auth/register', this.formData).then(res => {
						// 响应成功
						console.log(res.data)
						// 调用全局中的注册方法 把获取回来的 用户id 头像 用户名 保存在全局store中
						this.$store.commit('add', res.data)
						// 弹框输出注册成功信息
						uni.showToast({
							title: '注册成功',
							icon: 'none',
							duration: 2000,
							success() {
								// 延迟两秒后跳转到首页
								setTimeout(()=>{
									// 跳转到首页
									uni.switchTab({ url: '../index/index' })
								},2000)
							}
						})
					}).catch(err => {
						// 响应失败
						console.log(err)
						// 有后台错误提示 才执行提示 没有不执行
						let errors = err.data.errors
						let tit = ''
						// 循环错误信息 进行拼接
						Reflect.ownKeys(errors).forEach(key => {
							tit += errors[key][0]
						})
						// 弹框输出错误信息
						uni.showToast({
							title: tit,
							image: '../../static/error.png',
							duration: 2000
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		width: 750rpx;
		box-sizing: border-box;
		padding: 20rpx;

		// 表单
		.userFrom {
			button {
				width: 375rpx;
				margin: 40rpx auto;
			}
		}
	}
</style>
