<template>
    <div class="goods">
		<div class="header">
			<div class="logo fl"></div>
			<div class="content-text fl">
				<input type="text" @focus="goPath({name: 'Search'})">
			</div>
			<div class="right fl" @click="goPath({name: 'Login'})">登陆</div>
		</div>
		<div class="wrapper" ref="wrapper">
			<ul class="content">
				<div class="newxin" v-if="down"> {{pulldownTip.text}}</div>
				<!-- 轮播图 -->
				<div class="banner">
					<van-swipe :autoplay="3000" indicator-color="red">
						<van-swipe-item v-for="(item, index) in banners" :key="index" class="item-img">
						<img class="auto-img" :src="item.url" alt>
						</van-swipe-item>
					</van-swipe>
				</div>
				<!-- 消息通知 -->
				<van-notice-bar text="好消息！好消息！特价大酬宾，买100送50优惠卷，买200送70优惠卷" left-icon="volume-o" :scrollable="true"/>
				<div class="main">
					<van-row>
						<van-col
						span="12"
						class="col-box"
						v-for="(item, index) in listData"
						:key="index"
						@click.native="goPath({name: 'Detail', params: {pid: item.itemid,tname:'goods'}})"
						>
						<div>
							<img class="auto-img" :src="item.itempic" alt>
						</div>
						<div class="product-info">
							<p class="title">{{item.itemshorttitle}}</p>
							<p class="price">{{item.itemprice}}元</p>
						</div>
						</van-col>
					</van-row>
				</div>
				<div class="newxin" v-if="up">{{pulldownTip.textup}}</div>
			</ul>
		</div>
	</div>	
</template>
<script>
    import BScroll from 'better-scroll';
    import { Search, Swipe, SwipeItem, Tab, Tabs, NoticeBar} from "vant";
	export default {
		data() {
			return {
				loadingConnecting: false,
				down: false,
				up: true,
				pulldownTip: {
					text: '下拉刷新', // 松开立即刷新
					textup: '上拉加载更多', // 松开立即刷新
					rotate: '' // icon-rotate
                },
                banners: [
					{ url: "https://i8.mifile.cn/v1/a1/6ee55dad-dadc-79d4-1c37-d1694c088d40.webp?width=720&heihgt=440"},
					{ url: "https://i8.mifile.cn/v1/a1/41e31ea6-a34e-69d4-aba3-a9ec2cf2f802.webp?width=720&heihgt=440" },
					{ url: "https://i8.mifile.cn/v1/a1/5e7d9b5b-3e6a-3720-7ea2-50f92aad856c.webp?width=720&heihgt=440" }
				],
				active: 0,
				 datas: null,
				// 所有商品数据
				listData: null,
				//开始截取下标
				startIndex: 0,
				//结束截取下标
				endIndex: 4,
				count: 0,
				 length: 0,

			};
        },
        components: {
			[Search.name]: Search,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[NoticeBar.name]: NoticeBar
  },
   created() {
	   let products = localStorage.getItem('products');
	//    productsData = products === undefined ? null : JSON.parse(products);

	   if(!products) {
		console.log('没缓存')
		const url = "http://v2.api.haodanku.com/sales_list/apikey/liuguichun/sale_type/1";
		this.axios.get(url).then((r) => {
		console.log('r==>',r);
		this.datas = r.data.data;
		
		// 设置缓存
		localStorage.setItem('products', JSON.stringify(r.data.data));

        this.length = r.data.data.length;
        this.listData = r.data.data.slice(this.startIndex, this.endIndex);
        this.startIndex = this.endIndex;
		this.endIndex += 3;
		if(this.endIndex >= this.length) {
			return 
		}
      })
	   }else{
		   console.log('有缓存')
		   // 从缓存获取数据
		  this.datas = JSON.parse( localStorage.getItem('products'))
		   this.length = this.datas.length;
        this.listData = this.datas.slice(this.startIndex, this.endIndex);
        this.startIndex = this.endIndex;
		this.endIndex += 3;
		if(this.endIndex >= this.length) {
			return 
		}

	   }
  },
		mounted() {
			setTimeout(() => {
				this.BS();
            }, 20);
		},
		watch: {
			// 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
			data() {
				setTimeout(() => {
					this.BS();
				}, this.refreshDelay);
			}
		},
		methods: {
			BS() {
				if(!this.$refs.wrapper) {
					return;
				}
				// better-scroll的初始化
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click,
					scrollX: this.scrollX
				});
				this.scroll.on('scroll', pos => {
					// console.log(pos.y);
					//如果下拉超过50px 就显示下拉刷新的文字
					if(pos.y > 5) {
						this.pulldownTip.text = "放手刷新"
						this.down = true
					} else {
						this.down = false
					}
				});
				//touchEnd 通过这个方法来监听下拉刷新
				this.scroll.on('touchEnd', pos => {
					// 下拉动作
					if(pos.y > 5) {
						console.log('下拉刷新成功');
						console.log('这里执行你方法');
					   //===============================
					//    console.log('---',this.startIndex,this.endIndex)
						this.listData = this.datas.slice(this.startIndex, this.endIndex)
						this.startIndex = this.endIndex;
						this.endIndex += 3;
						if(this.endIndex > this.length) {
						   return 
						}

						// 最后一个数据
						var lastData = this.datas.slice(this.length - (this.count + 1),this.length - this.count);
						this.count++;
						if(this.count >= this.length) {
							this.count = 0;
						}
						// console.log('this.count ==>',this.count)
						// console.log('lastData ==>',lastData)
						this.listData.unshift(lastData[0]);
							// console.log('2--------',this.listData)
						//============================
						this.down = false;
					}
					if(this.scroll.maxScrollY > pos.y + 10) {
						console.log('加载更多');

					this.listData.push(...this.datas.slice(this.startIndex, this.endIndex))
					this.startIndex = this.endIndex;
					this.endIndex += 4;
					//  console.log('---',this.startIndex,this.endIndex)

					// console.log('3-----------',this.listData)


						//使用refresh 方法 来更新scroll  解决无法滚动的问题
						this.scroll.refresh();
					}
					// console.log(this.scroll.maxScrollY + '总距离----下拉的距离' + pos.y);
				});
				// console.log(this.scroll.maxScrollY);
      },

      // 跳转到详情页
      goPath(path) {
        this.$router.push(path);
      }
      
		},
		props: {
			/**
			 * 1 滚动的时候会派发scroll事件，会截流。
			 * 2 滚动的时候实时派发scroll事件，不会截流。
			 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
			 */
			probeType: {
				type: Number,
				default: 3
			},
			/**
			 * 点击列表是否派发click事件
			 */
			click: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否开启横向滚动
			 */
			scrollX: {
				type: Boolean,
				default: false
			},
			/**
			 * 是否派发滚动事件
			 */
			listenScroll: {
				type: Boolean,
				default: false
			},
			/**
			 * 列表的数据
			 */
			data: {
				type: Array,
				default: null
			},
			/**
			 * 是否派发滚动到底部的事件，用于上拉加载
			 */
			pullup: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否派发顶部下拉的事件，用于下拉刷新
			 */
			pulldown: {
				type: Boolean,
				default: true
			},
			/**
			 * 是否派发列表滚动开始的事件
			 */
			beforeScroll: {
				type: Boolean,
				default: false
			},
			/**
			 * 当数据更新后，刷新scroll的延时。
			 */
			refreshDelay: {
				type: Number,
				default: 20
			}
		}
	}

	;
</script>
<style lang="less" scoped>
	* {
		margin: 0px;
		padding: 0px;
	}
	
	.wrapper {
		width: 100%;
		height: calc(100% - 50px);
		margin-top:50px;
		position: absolute;
		overflow: hidden;
	}
	
	.wrapper .content {
		width: 100%;
	}
	
	.wrapper .content li {
		background-color: #ffffff;
		width: 100%;
		height: 66px;
		text-align: center;
		line-height: 66px;
		border-bottom: solid 1px #f0f0f0;
	}
	/* 刷新 */
	
	.newxin {
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		// background: red;
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAABg1BMVEUAAAC9vcGpqayzs7bNzdGYmJuVlZjKys6bm5/Jyc2cnJ+cnJ/Kys3Ly8+cnJ/R0dWfn6PJyczDw8fIyMzR0dXIyMzExMeioqXLy8+oqKzNzdGzs7a2trmdnaCUlJevr7LHx8uXl5q2trmenqGwsLO2trqxsbWhoaSXl5qxsbS1tbmwsLSjo6eUlJe4uLucnJ+VlZjIyMzDw8eysragoKOXl5qVlZjR0dXR0dW2trqioqbCwsbR0dWjo6a2trqZmZyzs7agoKPR0dWjo6bCwsbQ0NSvr7LJyc2cnKDFxcm8vL+ZmZzOztHMzNC+vsKXl5uZmZyjo6a9vcGYmJyurrGtrbHOztK3t7ucnJ+urrGjo6fHx8uxsbTDw8etrbCkpKe4uLzBwcWxsbSbm564uLvExMjR0dWYmJuUlJiioqbNzdHDw8e7u7+oqKvIyMy3t7q1tbmwsLOurrKdnaCcnJ+pqazCwsa9vcHJyc3OztLMzNCXl5qqqq2hoaW+vsK+vsHIyMsWRiyNAAAAZnRSTlMA5uYS5uaBExMQEAwLAQH4+Pf2wYODg4BfSSAMAcHBwKqpg4KBf19fXCL49/f39fX05ubm5ubm5cTEw8G+vru4q6uqhX9+fn19WUpKSUlJSSQhHh739efl5eTkxsS3qKinpoeEWSQqdCoWAAACIElEQVQ4y7XT91faUBTA8RumEBKRLaAisrR171m3VVut3Xs3JVDCtnQI/dN783g5jDzHL35/5HzOveddTkDfA5PpIdwkUyZjgiuy7e3ZQO1XJvO7+cvBgY0B1yRpSWiHgrumuBmwV5KkQDs8rClKHwNuI1x0tKBjGmGEAYPqSE8LetWBQWDkQdgb1GCwr6b88wIrxyLKbYDn5DwRHDjt6AD2wfHhR4AF1JHawdWB5G3fIq53zStZ0un0uIXHeyxJ0hrQ3IryRsA1Plc2m93VILaQEsHq8Vg1aPV6rSAEZpCdn+/S1WnSYA90ZXVniVulf5CYWiDS0g19hM0cCqDFW6aYEJnL1/n0J8NT9/SrV12fHsOtdTr/hzR/CoxOuHq93mg0uBMwf6eZWZD7SeOugz9oHBybqTtmwSOOuiO4rfDgk/qDGzcmPnYenP8yWalURrphPJ/PT0RDoCWmXiIrl3UwWiggffE1DCT7AGHlAf3q5QKhy0ZQu0/YXFKEHr8fMUWxmBHCiVlC402IzDnCA4grF/K6BodKxbe4MhQdQxqnq51b5ONKXsjyXYB+g6Ef4FmpWEwANro5tmHsfPocwg8AhlzVAPC+VCrOhoDVjjrwDCCXq/7FQU9x5GeWO3PKsrwDGoQYjrwzyoBb6F7zLRh6hSM3GVAdmIQWhIQ6kgHXZXlFbIdhvNAQA9r9fjtQWG3efH/fCJdGz3N99OC6/gMPF6RsShfrcQAAAABJRU5ErkJggg==");
		background-size: 26px 26px;
		background-position: center center;
		background-repeat:no-repeat;
    }
	
	.header {
    width: 100%;
    height: 1.0666rem;
    background: #fd6305;
    position: fixed;
    top: 0;
    left: 0;
    // overflow: hidden;
    z-index: 5;
    .logo {
      width: 15%;
      height: 1.0666rem;
      background: url("../assets/img/svg/mi.svg") no-repeat center center;
      background-size: 0.8rem;
    }
    .content-text {
      width: 70%;
      height: 1.0666rem;
      input {
        width: 100%;
        line-height: 0.8rem;
        height: 0.8rem;
        background: #fff;
        border: none;
        padding: 0;
        margin: 0.1333rem 0 0 0;
        outline: none;
        text-indent: 10px;
      }
    }
    .right {
      width: 15%;
      height: 1.0666rem;
      font-size: 0.4266rem;
      display: inline-block;
      line-height: 1.0666rem;
      text-align: center;
      // margin: -1px 0 0 0;
      vertical-align: top;
      padding: 0;
      color: #fff;
      font-weight: 400;
    }
  }
     .banner {
    width: 100%;
    margin: 0rem 0rem 0.2666rem 0rem;
    .item-img {
      width: 100%;
      .auto-img {
        height: 4rem;
      }
    }
  }
   .main {
    .col-box {
      padding: 0.0533rem;
      > div {
        > img[lazy="loading"] {
          display: block;
          width: 50px;
          height: 50px;
          margin: 0 auto;
        }
      }
      .product-info {
        text-align: center;
        .title {
          color: #888;
          margin-top: 0.2666rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .price {
          color: #e4393c;
          margin-top: 0.2666rem;
        }
      }
    }
  }


.fl {
  float: left;
}
</style>
