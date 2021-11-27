<template>
	<view>
		detail
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		// onLoad(options){
		// 	console.log('options',options)
		// },
		mounted(options){
			// 如果是小程序生命周期,使用onLoad可以通过形参options可以获取query参数
			// 如果是Vue生命周期,使用mounted中的this.$mp可以获取到query参数
			console.log('mounted',this)
		}
	}
</script>

<style lang="stylus">

</style>
