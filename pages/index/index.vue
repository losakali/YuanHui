<template>
	<view class="index">
		<!-- 搜索框 -->
		<view class="search">
			<uni-easyinput suffixIcon="search" v-model="searchValue" placeholder="请输入内容" @iconClick="search">
			</uni-easyinput>
		</view>

		<!-- 选项栏 -->
		<view class="tab">
			<view class="top">
				<!-- 左边 -->
				<view class="left" @click="(tabFalg=!tabFalg)&&(addtab=false)">
					<text class="fenlei">分类 </text>
					<uni-icons type="arrowup" size="14" v-show="tabFalg"></uni-icons>
					<uni-icons type="arrowdown" size="14" v-show="!tabFalg"></uni-icons>
				</view>
				<!-- 中间 -->
				<view class="center">
					<text @click="falg=!falg">{{falg?"升序":"降序"}}</text>
				</view>
				<!-- 右边 -->
				<view class="right">
					<text @click="(addtab=!addtab)&&(tabFalg=false)">添加</text>
				</view>
			</view>
			<!-- 分类列表 -->
			<view class="bottom">
				<view class="list" v-show="tabFalg">
					<uni-list>
						<uni-list-item v-for="item in pcType" :key="item.id" :title="item.type_name" clickable>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
			<view class="bottom">
				<view class="list" v-show="addtab">
					<uni-list>
						<uni-list-item title="添加配置" clickable link to="../pcDiy/pcDiy">
						</uni-list-item>
						<uni-list-item title="添加硬件" link to="../hardware/hardware" clickable>
						</uni-list-item>
					</uni-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 导入全局组件中的数据
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				// 搜索的内容
				searchValue: '',
				// 升序降序
				falg: true,
				// 分类列表开关
				tabFalg: false,
				// 添加列表开关
				addtab:false
			}
		},
		onLoad() {
			// 获取分类
			this.$store.dispatch('getPcType',this.$http)
		},
		// 在计算属性中把全局中的数据映射
		computed: { ...mapState(['loginStatus', 'pcType']) },
		methods: {
			// 搜索
			search() {
				console.log('搜索')
			},
			change() {
				console.log('123')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		box-sizing: border-box;
		padding: 0 20rpx;

		.search {
			margin-top: 20rpx;
		}
	}

	.tab {
		width: 750rpx;
		position: fixed;
		top: 200rpx;
		font-size: 14px;

		.top {
			display: flex;
			width: 100%;

			.left {
				flex: 1;
				text-align: center;

				.fenlei {
					line-height: 96rpx;
					margin-right: 10rpx;
				}
			}

			.center {
				flex: 1;
				line-height: 96rpx;
				text-align: center;
			}

			.right {
				flex: 1;
				line-height: 96rpx;
				text-align: center;
			}
		}
	}
</style>
