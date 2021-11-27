<template>
	<view class="categorysContainer">
		<image class="titleImg" :src="categoryObj.titlePicUrl" mode=""></image>
		<scroll-view class="categoryScroll" scroll-x="true" >
			<view 
			class="categoryItem" 
			v-for="category in categoryObj.itemList"
			:key="category.id"
			>
				<image class="itemImg" :src="category.listPicUrl" mode=""></image>
				<view class="itemText">
					{{category.name}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return {};
		},
		props:["categoryObj"],
		created(){
		},
		methods:{}
	}
</script>

<style lang="stylus">
	.categorysContainer
			padding 40upx 0
			.titleImg
				width 100%
				height 370upx
			.categoryScroll
				white-space nowrap
				.categoryItem
					display inline-block
					width 200upx
					margin 0 20upx
					.itemImg
						width 200upx
						height  200upx
						background #eee
					.itemText
						height 60upx
						font-size 24upx
						overflow hidden
						display -webkit-box
						-webkit-line-clamp 2
						-webkit-box-orient vertical
						white-space pre-wrap
</style>
