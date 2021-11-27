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
		
		<!-- 导航区域 -->
		<scroll-view class="navScroll" 
			v-if="indexData.kingKongModule"  
			enable-flex 
			scroll-x >
			<view class="navItem active">推荐</view>
			<view class="navItem" 
			v-for="item in indexData.kingKongModule.kingKongList" 
			:key="item.L1Id">
				{{item.text}}
			</view>
		</scroll-view>
		
		<swiper class="bannerSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg" src="/static/images/index/1.webp" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg"  src="/static/images/index/2.webp" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg"  src="/static/images/index/3.webp" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		
		<Categorys 
		v-for="(categoryObj,index) in indexData.categoryModule" 
		:key="index"
		:categoryObj="categoryObj"
		></Categorys>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import Categorys from '../../components/categorys/categorys.vue';
	import axios from '../../utils/axios.js';
	export default {
		components:{Categorys},
		data() {
			return {
				// indexData:{}
			}
		},
		// uniapp兼容小程序和Vue的生命周期,使用哪种都可以,建议使用Vue的
		// created(){
		// 	console.log('created')
		// },
		// onLoad() {
		// 	console.log('onLoad')
		// },
		async mounted(){
			// console.log('mounted')
			// uniapp兼容小程序所有的API
			// uni.request({
			// 	// url:"/api/getIndexData",
			// 	url:"http://localhost:3005/getIndexData",
			// 	success:(res)=>{
			// 		// console.log('res',res)
			// 		this.indexData = res.data;
			// 	}
			// })
			// const result = await axios('/getIndexData');
			// this.indexData = result;
			this.$store.dispatch('getIndexData');
			// console.log(this.$store.state.home.initData)
		},
		methods:{},
		computed:{
			// indexData(){
			// 	return this.$store.state.home.indexData
			// },
			...mapState({
				// indexData:(state)=>{return state.home.indexData}
				indexData:state=>state.home.indexData
			})
		}
		
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
	.navScroll
		// display flex
		white-space nowrap
		.navItem
			display inline-block
			width 140upx
			height 80upx
			font-size 28upx
			text-align center
			line-height 80upx
			&.active
				border-bottom 4upx solid red
	.bannerSwiper
		.swiper-item
			height 100%
			.bannerImg
				width 100%
				height 100%
</style>
