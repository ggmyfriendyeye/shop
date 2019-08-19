<template>
  <div class="orders">
    <div class="header">
        <van-nav-bar title="商品订单" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <van-icon name="search" slot="right" />
        </van-nav-bar>
    </div>
    <van-tabs v-model="active" color="#ff6700" title-active-color="#ff6700" background="#fdfdfd">
      <van-tab title="全部">
        <div v-if="orderCode.length == 0">
          <van-row>
            <van-col span="24">
              <div class="load-img">
                <div class="img">
                 您还没有  订单
                </div>
              </div>
            </van-col>
          </van-row>
          <div class="like">
            <img class="auto-img" src="https://i8.mifile.cn/b2c-mimall-media/e95ade2750a7fde92369b416c7d3176d.jpg" alt>
          </div>
          <div class="main">
            <van-row>
              <van-col
                span="12"
                class="col-box"
                v-for="(item, index) in  currentData"
                :key="index"
                @click.native="goPath({name: 'Detail', params: {pid: item.itemid,tname:'Order'}})"
              >
                <div>
                  <img class="auto-img" v-lazy="item.itempic" alt>
                </div>
                <div class="product-info">
                  <p class="title">{{item.itemshorttitle}}</p>
                  <p class="price">{{item.itemprice}}元</p>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="order" v-for="(item, index) in orderCode" :key="index">
          <div class="clearfix top">
            <div class="fl t">订单编号: {{item}}</div>
            <div class="fr clearfix">
              <span class="fl t">{{orderTime[index]}}</span>
              <span class="fl icon-del" @click="removeOrder(index, item)"><van-icon name="delete" /></span>
            </div>
          </div>

          <div>
            <van-card
              :num="item1.count"
              :price="item1.price" 
              :title="item1.name"
              v-for="(item1, index1) in orderDatas[item]"
              :key="index1"
              :thumb="item1.thumbnail"
              @click="goState(item1.id)"
            />
          </div>
		    </div>
      </van-tab>
      <van-tab title="待付款 ">
        <van-row>
          <van-col span="24">
            <div class="load-img">
              <div class="img">
                您还没有  待付款订单
              </div>
            </div>
          </van-col>
        </van-row>
        <div class="like">
          <img class="auto-img" src="https://i8.mifile.cn/b2c-mimall-media/e95ade2750a7fde92369b416c7d3176d.jpg" alt>
        </div>
        <div class="main">
          <van-row>
            <van-col
              span="12"
              class="col-box"
              v-for="(item, index) in  listData"
              :key="index"
              @click.native="goPath({name: 'Detail', params: {pid: item.itemid,tname:'Order'}})"
            >
              <div>
                <img class="auto-img" v-lazy="item.itempic" alt>
              </div>
              <div class="product-info">
                <p class="title">{{item.itemshorttitle}}</p>
                <p class="price">{{item.itemprice}}元</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="待收货">
        <van-row>
          <van-col span="24">
            <div class="load-img">
              <div class="img">
               您还没有 待收货订单
              </div>
            </div>
          </van-col>
        </van-row>
        <div class="like">
          <img class="auto-img" src="https://i8.mifile.cn/b2c-mimall-media/e95ade2750a7fde92369b416c7d3176d.jpg" alt>
        </div>
        <div class="main">
          <van-row>
            <van-col
              span="12"
              class="col-box"
              v-for="(item, index) in  listData"
              :key="index"
              @click.native="goPath({name: 'Detail', params: {pid: item.itemid,tname:'Order'}})"
            >
              <div>
                <img class="auto-img" v-lazy="item.itempic" alt>
              </div>
              <div class="product-info">
                <p class="title">{{item.itemshorttitle}}</p>
                <p class="price">{{item.itemprice}}元</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="待评价">
        <van-row>
          <van-col span="24">
            <div class="load-img">
              <div class="img">
               您还没有  待评价订单
              </div>
            </div>
          </van-col>
        </van-row>
        <div class="like">
          <img class="auto-img" src="https://i8.mifile.cn/b2c-mimall-media/e95ade2750a7fde92369b416c7d3176d.jpg" alt>
        </div>
        <div class="main">
          <van-row>
            <van-col
              span="12"
              class="col-box"
              v-for="(item, index) in  listData"
              :key="index"
              @click.native="goPath({name: 'Detail', params: {pid: item.itemid,tname:'Order'}})"
            >
              <div>
                <img class="auto-img" v-lazy="item.itempic" alt>
              </div>
              <div class="product-info">
                <p class="title">{{item.itemshorttitle}}</p>
                <p class="price">{{item.itemprice}}元</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Row, Col, Card,Icon,NavBar} from "vant";

export default {
  name: "Order",
  data() {
    return {
      title: "我的订单",
      active: 0,
      currentData: null,
      listData: null,

      // 当前用户的订单信息
      orderDatas: {

      },

      // 当前用户的编号
      orderCode: [],
      orderTime: []
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
		[Icon.name]: Icon,
		[NavBar.name]: NavBar,
  },
  created() {
    let active = this.$route.params.active +1;
   
       this.active = active;
          console.log("active ==>", active);

//订单数据
var orderData = localStorage.getItem('order');

orderData = orderData == undefined ? [] : JSON.parse(orderData);

console.log('orderData ==>',orderData);

if(orderData.length === 0) {
  return;
}

// 获取用户登陆状态
var userLogin = JSON.parse(localStorage.getItem('userLogin'));

orderData.forEach(v => {
  if(v.userId == userLogin.userId) {
    var arr = [];
    if(this.orderCode.indexOf(v.orderId) === -1){
      this.orderCode.push(v.orderId);
      this.orderTime.push(v.orderTime);

      //筛选订单编号的商品
      orderData.forEach(v1 => {
        if(v1.orderId == v.orderId ) {
          arr.push(v1)
        }
      })
      
						this.orderDatas[v.orderId] = arr;
    }
  }
  
});

     console.log('this.orderDatas ==>',this.orderDatas)
   
   
  },

  mounted() {
    var data = localStorage.getItem("orderData");
    data = data === undefined ? [] : JSON.parse(data);

    if (!data) {
      console.log("没有缓存");
      let url = "/api/itemlist/apikey/liuguichun/nav/3/cid/0/back/10/min_id/1";
      this.axios.get(url).then(data => {
        console.log("data ==>", data);
        this.currentData = data.data.data;
        localStorage.setItem("orderData", JSON.stringify(data.data.data));
      });
    } else {
      console.log("有缓存");
      this.currentData = JSON.parse(localStorage.getItem("orderData"));
    }

    //Mine.vue
    // http://v2.api.haodanku.com/get_deserve_item/apikey/你的apikey
    var newData = localStorage.getItem("newData");
    newData = newData === undefined ? [] : JSON.parse(newData);

    if (!newData) {
      console.log("没有缓存");
      let url = "/api/get_deserve_item/apikey/liuguichun";
      this.axios.get(url).then(re => {
        console.log("re ==>", re);
        this.listData = re.data.item_info;
        localStorage.setItem("newData", JSON.stringify(re.data.item_info));
      });
    } else {
      console.log("有缓存");
      this.listData = JSON.parse(localStorage.getItem("newData"));
    }
  },
   updata() {
      cosnole.log('------active----',this.active)
   },
  methods: {
    goPath(path) {
      this.$router.push(path);
    },
    
    //导航栏
    onClickLeft() {
      this.$router.push({name:'Mine'});
    },
    onClickRight() {
      alert('还没做----')
    },

    // 删除订单
    removeOrder(index, orderId) {

				//index: 下标
				//orderId: 订单id

				this.orderCode.splice(index, 1);

				this.orderTime.splice(index, 1);

				delete this.orderDatas[orderId];


				//在本地存储移除当前用户的订单
				var userId = JSON.parse(localStorage.getItem('userLogin')).userId;

				//获取本地存储订单数据
				var allOrderDatas = JSON.parse(localStorage.getItem('order'));

				for (var i = 0; i < allOrderDatas.length; i++) {
					if (orderId == allOrderDatas[i].orderId && userId == allOrderDatas[i].userId) {
						allOrderDatas.splice(i, 1);
						i--;
					}
				}

				localStorage.setItem('order', JSON.stringify(allOrderDatas));

			}
  }
};
</script>
<style lang='less' scoped>
.van-nav-bar .van-icon {
    color: #ccc;
    vertical-align: middle;
}
.header {
  width: 100%;
  background: #f2f2f2;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  .header-nav1 {
    width: 40%;
    height: 1.3333rem;
    .nav-left {
      line-height: 0.85333rem;
      padding: 0.3466rem 0.2666rem 0rem;
    }
    .nav-right {
      padding-top: 0.2666rem;
      font-size: 16px;
      font-weight: 300;
      color: #444;
      line-height: 0.8533rem;
    }
  }
  .header-nav2 {
    width: 10%;
    height: 1.3333rem;
    padding: 0rem 0rem 0rem 0.2666rem;
  }
}

.load-img {
  width: 100%;
  overflow: hidden;
  position: relative;
  .img {
    font-size: 0.4266rem;
    text-align: center;
    background: url(https://s1.mi.com/m/images/m/empty.png) 50% 0 no-repeat;
    background-size: 2rem 2rem;
    padding-top: 2.5rem;
    color: #999;
    margin: .8rem 1rem 0;
    p {
      color: #888;
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      background: #f5f5f5;
      padding: 5px 0rem;
    }
  }
}
.like {
  width: 100%;
}
.main {
  .col-box {
    padding: 0.0533rem;
    > div {
      > img[lazy="loading"] {
        display: block;
        width: 1.3333rem;
        height: 1.3333rem;
        margin: 0 auto;
      }
    }
    .product-info {
      text-align: center;
      .title {
        color: #888;
        margin-top: 0.2666rem;
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
.fr {
  float: right;
}
.order .top{
		padding: 0.4rem;
	}

	.t{
		color: #aaa;
		font-size: 12PX;
	}

	.icon-del{
		margin-left: 0.4rem;
		font-size: 16PX;
		color: #e4393c;
	}
</style>

