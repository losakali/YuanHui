<template>
		<!-- 头像 -->
		<view class="user-iamge">
			<!-- 判断用户头像是否存在 不存在显示默认头像 -->
			<image :src="userImg?userImg:'../../static/girl_glance_anime.jpg'"></image>
		</view>
</template>

<script>
	export default {
		name:'user-image',
		props:['userImg'],
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
		// 头像
		.user-iamge {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			border: 2px solid #ccc;
			overflow: hidden;
			margin: 30rpx auto;
			image {
				width: 100%;
				height: 100%;
			}
		}
</style>
