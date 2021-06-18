<template>
	<view class="pcDiy">
		<!-- 表单区域 -->
		<view class="pcFrom">
			<uni-forms :modelValue="formData" ref="form">
				<!-- 
				uni-combox
				:candidates="candidates" 下拉列表项
				 -->
				<uni-forms-item name="cpu">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="CPU" v-model="formData.cpu" emptyTips="无"></uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.cpu_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="zhuban">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="主板" v-model="formData.zhuban" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.zhuban_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="neicun">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="内存" v-model="formData.neicun" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.neicun_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="xianka">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="显卡" v-model="formData.xianka" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.xianka_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="gutai">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="固态硬盘" v-model="formData.gutai" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.gutai_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="jixie">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="机械硬盘" v-model="formData.jixie" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.jixie_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="dianyuan">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="电源" v-model="formData.dianyuan" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.dianyuan_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="sanre">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="散热器" v-model="formData.sanre" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.sanre_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="jixiang">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="机箱" v-model="formData.jixiang" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.jixiang_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="xianshi">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="显示器" v-model="formData.xianshi" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.xianshi_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="jianshu">
					<view class="form_tab">
						<view class="left">
							<uni-combox labelWidth="50px" label="键鼠" v-model="formData.jianshu" emptyTips="无">
							</uni-combox>
						</view>
						<view class="right">
							<uni-easyinput v-model="formData.jianshu_price" placeholder="0" type="number" />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item name="pc_price">
					<view class="pc_price">
						<view class="pc_price_tab">
							<text>运费：</text>
							<uni-easyinput type="number" v-model="formData.yunfei" placeholder="0" />
						</view>
						<view class="pc_price_tab">
							<text>成本：</text>
							<uni-easyinput type="number" v-model="totalPrice" disabled />
						</view>
					</view>
					<view class="pc_price">
						<view class="pc_price_tab">
							<text>总价：</text>
							<uni-easyinput type="number" v-model="formData.zongjia" placeholder="0" />
						</view>
						<view class="pc_price_tab">
							<text>利润：</text>
							<uni-easyinput type="number" v-model="lirunPrice" disabled />
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="分类" name="fenlei">
					<view class="type">
						<!-- inverted 无背景色 -->
						<uni-tag v-for="(item,index) in pcType" size="small" :text="item.type_name" type="success"
							:circle="true" :key="item.id" :inverted="formData.type_id==item.id?false:true"
							@click="seleType(item.id)"></uni-tag>
					</view>
				</uni-forms-item>
				<uni-forms-item label="标题" name="peizhi_title">
					<uni-easyinput type="text" v-model="formData.peizhi_title"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="图片" name="zhuji_image">
					<!-- 上传图片组件 -->
					<add-image ref="son" :count="count" :imagesList="imagesList" :imgPath="imgPath"
						@changImgList="changImg($event)" @delImg="delImg($event)"></add-image>
				</uni-forms-item>
				<button type="primary" @click="addPeiZhi">添加</button>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	// 导入图片上传组件
	import addImg from '../../components/add-image/add-image.vue'
	// 导入全局中的分类
	import { mapState } from 'vuex'
	export default {
		onLoad() {
			// 获取分类
			this.$store.dispatch('getPcType', this.$http)
		},
		data() {
			return {
				// 数据库图片
				imagesList:[],
				// 图片上传限制
				count: 9,
				// 临时图片数组
				imgList: [],
				// 要删除的数据库图片数组
				delImgList: [],
				// 要删除图片的地址 从 app 开始截取
				imgPath: 'http://localhost/apiToken/laravel-airlock-sample/storage/app/',
				// 表单数据
				formData: {
					peizhi_title: 'ff',
					cpu: 'gg',
					cpu_price: '',
					zhuban: 'dd',
					zhuban_price: '',
					neicun: 'ff',
					neicun_price: '',
					xianka: 'ss',
					xianka_price: '',
					gutai: 'gg',
					gutai_price: '',
					jixie: 'nn',
					jixie_price: '',
					dianyuan: 'ccc',
					dianyuan_price: '',
					sanre: 'cc',
					sanre_price: '',
					jixiang: 'xcxx',
					jixiang_price: '',
					xianshi: 'nnn',
					xianshi_price: '',
					jianshu: 'ccc',
					jianshu_price: '',
					yunfei: '',
					chengben: 0,
					zongjia: '',
					lirun: 0,
					user_id: '',
					zhuji_image: [],
					type_id: 1
				},
				// 分类索引
				type_index: 0,
				list_styles: {
					'borderStyle': {
						'color': '#eee', // 边框颜色
						'width': '1px', // 边框宽度
						'style': 'solid', // 边框样式
						'radius': '5px' // 边框圆角，不支持百分比
					},
					'border': false, // 是否显示边框
					'dividline': true // 是否显示分隔线
				},
				image_styles: {
					'height': 60, // 边框高度
					'width': 60, // 边框宽度
					'border': { // 如果为 Boolean 值，可以控制边框显示与否
						'color': '#eee', // 边框颜色
						'width': '1px', // 边框宽度
						'style': 'solid', // 边框样式
						'radius': '50%' // 边框圆角，支持百分比
					}
				},
				imgSrc: ''
			}
		},
		// 注册组件
		components: { 'add-image': addImg },
		// 计算属性
		// 在计算属性中把全局中的数据映射
		computed: {
			...mapState(['loginStatus', 'pcType']),
			// 计算总价
			totalPrice() {
				let arr = [this.formData.cpu_price, this.formData.zhuban_price, this.formData.neicun_price, this
					.formData
					.xianka_price, this.formData.gutai_price, this.formData.jixie_price, this.formData
					.dianyuan_price, this.formData.sanre_price, this.formData.jixiang_price, this.formData
					.xianshi_price, this.formData.jianshu_price, this.formData.yunfei
				]
				let s = 0
				for (let i = arr.length - 1; i >= 0; i--) {
					if (arr[i] === '') {
						arr[i] = 0
					}
					s += parseInt(arr[i])
				}
				return s
				// 将 this.aaa + 1 返回
			},
			lirunPrice() {
				if (this.formData.zongjia === '') return 0
				return parseInt(this.formData.zongjia) - parseInt(this.totalPrice)
			}
		},
		methods: {
			// 图片改动时间 接收改变后的临时图片路径数组
			changImg(res) {
				this.imgList = res
			},
			// 删除后端图片事件 接收要删除的后端图片数组索引 和 要删除的图片后端相对路径地址数组
			delImg(res) {
				this.delImgList = res.delImgList
				this.formData.zhuji_image.splice(res.index, 1)
			},
			one() {
				let i = 0
				this.delImgList.forEach((item, index) => {
					this.$http.post('api/pc/delImg', { filename: item }).then(res => {
						i++
					})
				})
				// 弹出加载框
				uni.showLoading({ title: '图片上传中' })
				let timer = setInterval(() => {
					if (counter === this.delImgList.length) {
						// 响应成功 清除定时器
						clearInterval(timer)
						this.two()
						return
					}
				}, 1000)
			},
			two() {
				if (this.imgList.length !== 0) {
					let counter = 0
					this.imgList.forEach((item, index) => {
						// 上传图片
						uni.uploadFile({
							url: 'http://localhost/apiToken/laravel-airlock-sample/public/index.php' +
								'/api/pc/upload',
							filePath: item,
							fileType: 'image',
							name: 'file',
							header: { Authorization: 'Bearer ' + uni.getStorageSync('token') },
							success: res => {
								// 把返回的图片地址 添加到数据库的图片数组中
								var res = JSON.parse(res.data)
								var path = res.data.url.toString()
								this.imagesList = this.imagesList.concat(path)
								counter++
							}
						})
					})
					// 弹出加载框
					uni.showLoading({ title: '图片上传中' })
					let timer = setInterval(() => {
						if (counter === this.imgList.length) {
							// 响应成功 清除定时器
							clearInterval(timer)
							this.add()
							return
						}
					}, 1000)
				} else {
					this.add()
				}
			},
			// 添加
			addPeiZhi() {
				// 清空add-image 中的临时图片数组
				this.$refs.son.imgList = []
				if (this.delImgList.length !== 0) {
					this.one()
					return
				} else if (this.imgList.length !== 0) {
					this.two()
					return
				} else {
					this.add()
				}
			},
			add() {
				// 响应成功 关闭加载框
				uni.hideLoading()
				this.formData.chengben = this.totalPrice
				this.formData.lirun = this.lirunPrice
				// 把 imagesList 数组转换成字符串 赋值给 formData.zhuji_image
				this.formData.zhuji_image = this.imagesList.toString()
				this.formData.user_id = JSON.parse(uni.getStorageSync('user')).id
				// 发起添加配置请求
				this.$http.post('api/pc/addpeizhi', this.formData).then(res => {
					console.log(res)
					// 添加成功 跳转到首页
					uni.navigateTo({ url:'../index/index' })
				}).catch(err => {
					console.log(err)
				})
			},
			// 根据点击的id 改变type_id
			seleType(id) {
				this.formData.type_id = id
			},

		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-forms-item__inner {
		padding-bottom: 10rpx !important;
	}

	/deep/ .uni-combox__input-box {
		box-sizing: border-box;
		border: 1px solid #eee;
		border-radius: 5px;
	}

	/deep/ .uni-combox__label {
		font-size: 12px;
	}

	.pcDiy {
		padding: 0 10rpx;

		.pcFrom {
			margin-top: 20rpx;

			.form_tab {
				display: flex;
				box-sizing: border-box;

				.uni-combox {
					height: auto;
				}

				.left {
					width: 80%;
					margin-right: 4rpx;
				}

				.right {
					width: 20%;
				}
			}

			.pc_price {
				display: flex;
				box-sizing: border-box;
				height: 72rpx;
				font-size: 12px;
				margin-bottom: 4rpx;

				.pc_price_tab {
					display: flex;
					padding: 0 4rpx;
					line-height: 72rpx;
					height: 100%;
					flex: 1;
				}
			}

			.type {
				display: flex;
				height: 100%;
				align-items: center;

				.uni-tag {
					font-size: 12px;
					text-align: center;
					margin: 0 4rpx;
					flex: 1;
				}
			}
		}
	}
</style>
