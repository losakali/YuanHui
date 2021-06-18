<template>
	<view class="add-image">
		<!-- 图片上传 -->
		<!-- 因为同样的key值会报错 所以在key加前缀 防止重复 -->
		<view class="images_box">
			<!-- 显示数据库中的图片 -->
			<view v-show="imagesList==[]?false:true" class='img-box' v-for="(item, index) in imagesList" :key="'sql_'+index">
				<!-- 要显示的图片 -->
				<image class='img_1' :src='item' mode='aspectFill'></image>
				<!-- 删除按钮 -->
				<view class='img-delete' @click='imgDelete2(item,index,imgPath)'>
					<image class='img_2' src='../../static/delect.png'></image>
				</view>
			</view>
			<!-- 显示未上传的图片 -->
			<view class='img-box' v-for="(item, index) in imgList" :key="'item_'+index">
				<!-- 要显示的图片 -->
				<image class='img_1' :src='item' mode='aspectFill'></image>
				<!-- 删除按钮 -->
				<view class='img-delete' @click='imgDelete1(index)'>
					<image class='img_2' src='../../static/delect.png'></image>
				</view>
			</view>
			<!-- 添加图片 -->
			<view class='img-box2' @click='addPic1' v-show="imagesList.length+imgList.length<count">
				<image class='img' src='../../static/add_image.png'></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// 需要传递的值
		// 图片上传限制 数字
		// count
		// 临时图片数组
		// imgList
		// 数据库图片数组
		// imagesList
		// 要删除的数据库图片数组
		// delImgList
		// 要删除图片的地址 从 app 开始截取
		// imgPath:'http://localhost/apiToken/laravel-airlock-sample/storage/app/',
		props: ['count', 'imagesList', 'imgPath'],
		name: 'add-image',
		data() {
			return {
				imgList:[],
				delImgList:[]
			}
		},
		methods: {
			// 添加图片
			addPic1() {
				// 选择图片
				uni.chooseImage({
					count: this.count,
					//  original 原图，compressed 压缩图，默认二者都有
					sizeType: ['compressed'],
					// album 从相册选图，camera 使用相机，默认二者都有
					sourceType: ['album', 'camera'],
					success: res => {
						if (this.imgList.length === 0) {
							this.imgList = res.tempFilePaths
						} else if (this.imgList.length + this.imagesList.length < this.count) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						}
						// 把改动后的值传给父组件
						this.$emit('changImgList',this.imgList)
					}
				})
			},
			// 删除已选择 但 未上传的图片
			imgDelete1(index) {
				this.imgList.splice(index, 1)
				// 把改动后的值传给父组件
				this.$emit('changImgList',this.imgList)
			},
			// 删除已上传的图片
			imgDelete2(item, index,imgPath) {
				// 把要删除的图片的后端服务器相对路径添加到  delImgList
				let path = item.slice(imgPath.length)
				this.delImgList.push(path)
				// 删除对应的数据库图片数组中的值 imagesList
				this.$emit('delImg',{
					delImgList:this.delImgList,
					index:index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 上传图片组件样式
	.add-image {
		.images_box {
			display: flex;
			// 换行 必须给子元素设置最小和最大宽度
			 flex-wrap: wrap;
			.img-box {
				margin-right: 10rpx;
				margin-bottom: 10rpx;
				position: relative;
				width: 160rpx;
				height: 160rpx;
				min-width: 160rpx;
				max-height: 160rpx;
				border: 1px solid #f1f1f1;
				border-radius: 20rpx;
				overflow: hidden;
				.img_1 {
					width: 100%;
					height: 100%;
					display: block;
				}

				.img-delete {
					display: flex;
					justify-content: center;
					position: absolute;
					top: 5px;
					right: 5px;
					width: 62rpx;
					height: 62rpx;
					border-radius: 50%;
					background-color: rgba(0, 0, 0, 0.5);
					padding: 20rpx;
					box-sizing: border-box;

					.img_2 {
						width: 100%;
						height: 100%;
					}
				}
			}

			.img-box2 {
				position: relative;
				width: 160rpx;
				height: 160rpx;
				display: flex;
				justify-content: center;
				padding: 40rpx;
				box-sizing: border-box;
				border: 1px solid #f1f1f1;
				border-radius: 20rpx;
				min-width: 160rpx;
				max-height: 160rpx;
				.img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
