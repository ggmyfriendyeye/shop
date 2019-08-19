<template>
	
	<div class="nav">
		<div v-if="isHasBack" class="back-text text" @click="back">
			<van-icon name="arrow-left" />
		</div>
		<div class="p-detail">{{title}}</div>
		<div v-if="isHasIcon" class="edit text" @click="edit">
			<van-icon :name="icon" />
		</div>
	</div>

</template>

<script>

import {Icon} from 'vant'

	export default {
		name: 'TopNav',
		props: {
			//导航标题
			title: {
				type: String
			},

			//导航右边的图标
			icon: {
				type: String,
				default: 'edit'
			},

			//是否含有右边图标
			isHasIcon: {
				type:Boolean,
				default: false
			},

			//是否含有返回按钮
			isHasBack: {
				type: Boolean,
				default: true
			},

			//查询参数
			active: {
				type: Number,
				default: -1
			}
		},
		components: {
			[Icon.name]: Icon
		},

		methods: {

			back() {
				//返回上一级
				if (this.active == 1) {
					this.$router.push({name: 'Shopcart', query: {active: this.active}})
				} else {
					this.$router.go(-1);
				}
				
			},

			edit() {
				this.$emit('edit');
			}

		}
	}
</script>

<style lang="less" scoped>
	.nav{
		height: 1.3333rem;
		background:#f2f2f2;
		position: relative;
		.text{
			font-size: 20PX;
			color: #333;
			margin-top: calc(1.3333rem / 2 - 9PX);
			position: relative;
			z-index: 2;
		}

		.back-text{
			float: left;
			margin-left: 0.5333rem;
		}

		.p-detail{
			color: #333;
			text-align: center;
			font-size: 16PX;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			z-index: 1;
			line-height: 1.3333rem;
		}

		.edit{
			float: right;
			margin-right: 0.5333rem;
		}
	}
</style>