<template>
	<view class="hardware">
		<view class="hard_box">
			<view class="form">
				<uni-forms labelPosition="top" :modelValue="formData" ref="form" :rules="rules" validateTrigger="bind">
				            <uni-forms-item label="分类" name="hard_type">
								<!-- inverted 无背景色 -->
								<uni-tag v-for="(item,index) in type" :text="item" type="success"
								 :key="index" :inverted="formData.hard_type==index?false:true"
									@click="seleType(index)"></uni-tag>
				            </uni-forms-item>
							<uni-forms-item label="硬件名称" name="type_name">
							    <uni-easyinput type="text" v-model="formData.type_name" placeholder="请输入姓名" />
							</uni-forms-item>
				</uni-forms>
			</view>
			<view class="btn">
				<button type="primary" @click="add">添加</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:['cpu','主板','显卡','内存','固态硬盘','机械硬盘','电源','机箱','显示器','键鼠'],
				// 表单数据
				formData:{
					hard_type:0,
					type_name:''
				},
				// 表单验证
				// 表单验证规则
				rules:{
					//  对密码字段进行必填验证
					type_name: {
						rules: [{
								required: true,
								errorMessage: '请输入硬件名称',
							}
						]
					}
				}
			}
		},
		methods: {
			// 选中类型
			seleType(index){
				this.formData.hard_type = index
			},
			// 添加硬件
			add(){
				console.log(this.formData)
				// 验证表单
				this.$refs.form.validate(valid=>{
					if(valid!==null) return
					// 发起请求
					this.$http.post('api/pc/addhard',this.formData).then(res=>{
						uni.showToast({
							title: '添加成功',
							icon: 'none'
						})
					}).catch(err=>{
						console.log(err)
						uni.showToast({
							title: '添加失败',
							icon: 'none'
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.hardware{
	box-sizing: border-box;
	width: 750rpx;
	height: 750rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 20rpx;
	.hard_box{
		.form{
			.uni-tag{
				margin: 8rpx;
			}
		}
	}
}
</style>
