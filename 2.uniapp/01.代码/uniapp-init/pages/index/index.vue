<template>
	<view class="indexContainer">
		<!-- indexContainer -->
		<!-- uniapp同时兼容html和小程序的标签,
				如果当前运行环境是小程序,就会将html标签转换为对应的小程序标签
				如果当前运行环境是h5,就会将小程序标签转换为对应的html标签(兼容性不错)
		 -->
		<!-- <div>123</div> -->
		<view class="header">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="search">
				<i class="iconfont icon-sousuo"></i>
				<input class="searchInput" placeholder-class="placeholder" placeholder="搜索商品" type="text" value="" />
			</view>
			<button class="username">七月</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
		,
		onLoad() {}
		,
		methods:{}
		
	}
		
	
</script>

<style lang="stylus">
	// 向后缩进tab,向前缩进是shift+tab
.indexContainer
	.header
		display flex
		align-items  center
		padding-top 20upx
		.logo
			width 118upx
			height 40upx
			margin 0 20upx
			flex-shrink  0
		.search
			position relative
			width 800upx
			height 60upx
			background  #ccc
			border-radius  10upx
			padding-left 60upx
			flex-grow 1
			.iconfont
				position absolute
				left 20upx
				top 50%
				transform translateY(-50%)
			.searchInput
				height 100%
			.placeholder
				text-align center
				font-size 24upx
				line-height 60upx
				text-indent -60upx
		.username
			width 140upx
			height 60upx
			color  red
			font-size 24upx
			margin 0 20upx
			flex-shrink  0
</style>
