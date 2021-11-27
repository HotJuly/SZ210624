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
			<view class="navItem"
			:class="currentIndex===-1?'active':''"
			@click="changeCurrentIndex(-1)"
			>推荐</view>
			<view class="navItem" 
			:class="currentIndex===index?'active':''"
			v-for="(item,index) in indexData.kingKongModule.kingKongList" 
			:key="item.L1Id"
			@click="changeCurrentIndex(index)"
			>
				{{item.text}}
			</view>
		</scroll-view>
		
		<scroll-view class="contentContainer" scroll-y="true" >
			<Recommend v-if="currentIndex===-1"></Recommend>
			<CateList :navIndex="currentIndex" v-else></CateList>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import Recommend from '../../components/Recommend/Recommend.vue';
	import CateList from '../../components/CateList/CateList.vue';
	import axios from '../../utils/axios.js';
	export default {
		components:{
			Recommend,
			CateList
		},
		data() {
			return {
				// indexData:{}
				currentIndex:-1
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
			// this.$store.dispatch('home/getIndexData');
			this.$store.dispatch('getIndexData');
			// console.log(this.$store.state.home.initData)
			// console.log(this.indexData)
		},
		methods:{
			changeCurrentIndex(index){
				this.currentIndex = index;
			}
		},
		computed:{
			// indexData(){
			// 	return this.$store.state.home.indexData
			// },
			// ...mapState(["indexData"])
			...mapState({
				// indexData:(state)=>{return state.home.indexData}
				indexData:state=>state.home.indexData
			}),
			// ...mapState("home",["indexData"])
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
	.contentContainer
		// 小程序端height = 屏幕100%height - header高度 - nav高度
		// h5端height = 屏幕100%height - header高度 - nav高度 - 导航栏高度 - tabBar高度
		// /* #ifdef MP-WEIXIN */
		// height calc(100vh - 100upx - 84upx)
		// /* #endif */
		// /* #ifdef H5 */
		// height calc(100vh - 100upx - 84upx - 100upx - 88upx)
		// /* #endif */
		
		height calc(100vh - 100upx - 84upx - var(--window-top) - var(--window-bottom))
</style>
