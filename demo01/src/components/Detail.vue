<template>
  <div class="detail">
    <div class="loading" v-if="!isshow">
      <img class="auto-img" src="../assets/timg.gif" alt>
    </div>
    <van-row v-if="isshow">
      <van-col span="24" class="p">
        <div class="p-child">
          <span class="register-text" @click="goPath()">返回</span>
        </div>
        <img class="auto-img" :src="detail.itempic">
      </van-col>
      <van-col span="24" class="content">
        <van-row class="detail-box">
          <van-col span="24">
            <div class="pname">{{detail.itemtitle}}</div>
          </van-col>
          <van-col span="24">
            <div class="desc">{{detail.itemdesc}}</div>
          </van-col>
          <van-col span="24">
            <div class="price">{{detail.itemprice}}元</div>
          </van-col>
        </van-row>
      </van-col>
    </van-row>

    <van-goods-action>
      <van-goods-action-big-btn @click="addOrBuy(0)" text="加入购物车"/>
      <van-goods-action-big-btn primary text="立即购买" @click="addOrBuy(1)"/>
    </van-goods-action>

    <van-sku
      v-model="showBase"
      :sku="skuData.sku"
      :goods="skuData.goods_info"
      :hide-stock="skuData.sku.hide_stock"
      reset-stepper-on-hide
      reset-selected-sku-on-hide
      disable-stepper-input
      :show-add-cart-btn="false"
      :close-on-click-overlay="closeOnClickOverlay"
      @buy-clicked="onBuyClicked"
    />
    <template slot="sku-actions" slot-scope="props">
      <div class="van-sku-actions">
        <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
        <van-button
          type="primary"
          bottom-action
          @click="props.skuEventBus.$emit('sku:buy')"
        >{{text == 0 ? '加入购物车' : '立即购买'}}</van-button>
      </div>
    </template>
  </div>
</template>

<script>
import { GoodsAction, GoodsActionBigBtn, Sku, Icon } from "vant";
import skuData from "../data/vdata.js";
import TopNav from "../components/TopNav";
import tool from "../Utils/tool.js";

export default {
  name: "Detail",
  data() {
    this.skuData = skuData;
    return {
      //用户登录状态
      userLoginStatus: null,
      //0: 加入购物车, 1: 购买
      text: 0,
      title: "商品详情",
      showBase: false,
      closeOnClickOverlay: true,
      // 当前商品信息
      detail: null,
      colorIndex: 0,
      ramIndex: 0,
      active: 0,
      isshow: false,
      tname:''
    };
  },

  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [Sku.name]: Sku,
    [Icon.name]: Icon,
    "top-nav": TopNav
  },
  created() {
    var products = JSON.parse(localStorage.getItem("dataList"));

    let id = this.$route.params.pid;
    this.tname = this.$route.params.tname;

    console.log(" tname==>", this.$route.params.tname);

    let url = "/api/item_detail/apikey/liuguichun/itemid/" + id;
    this.axios.get(url).then(data => {
      this.isshow = true;
      this.detail = data.data.data;

      // console.log("this.detail ==>", this.detail);
      this.skuData.goods_info = {
        picture: this.detail.itempic,
        title: this.detail.itemtitle
      };

      this.skuData.sku.list[0].goods_id = this.detail.itemid;
      this.skuData.sku.list[0].price = this.detail.itemprice * 100;
      console.log("this.skuData ==> ", this.skuData);
    });

    // this.skuData.sku.tree[0].v[0].name = this.currentProduct.color;

    //获取用户登录状态
    var userLogin = localStorage.getItem("userLogin");
    this.userLoginStatus =
      userLogin == undefined ? null : JSON.parse(userLogin);

    console.log("this.userLoginStatus ==>", this.userLoginStatus);
  },

  methods: {
    //添加购物车或者购买
    addOrBuy(text) {
      if (!this.userLoginStatus) {
        //如果未登录, 提示用户登录
        this.$toast("您尚未登录");
      } else if (this.userLoginStatus.loginStatus) {
        //text: 0, 1
        this.text = text;

        //显示sku面板
        this.showBase = true;
      }
    },

    onBuyClicked(data) {
      // console.log('data ==>', data);

      var shopcartData = localStorage.getItem("shopcart");

      shopcartData = shopcartData == undefined ? [] : JSON.parse(shopcartData);

      // 选中的要添加购物车的商品信息
      var currentProduct = {
        userId: this.userLoginStatus.userId,
        name: this.detail.itemtitle,
        price: this.detail.itemprice,
        count: data.selectedNum,
        thumbnail: this.detail.itempic,
        time: tool.format(new Date(), "yyyy-MM-dd hh:mm:ss")
      };

      //    console.log('currentProduct ==>',currentProduct)
      shopcartData.push(currentProduct);

      console.log("shopcartData ==>", shopcartData);

      // 把该商品储存在缓存中
      localStorage.setItem("shopcart", JSON.stringify(shopcartData));

      // 弹窗消失
      this.showBase = false;
    },

//  返回上一页
    goPath() {
      if(this.$route.params.tname === 'goods') {
        this.$router.push({name:'goods'});
      }else if(this.$route.params.tname === 'Order'){
       this.$router.push({name:'Order'});
         
      }else{
        this.$router.go(-1);
      }
     
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  height: 1.3333rem;
  background-image: linear-gradient(to right, #62aaf5 0%, #1989fa 100%);
  .back-text {
    float: left;
    font-size: 18px;
    color: #fff;
    margin-left: 0.5333rem;
    margin-top: calc(1.3333rem / 2 - 9px);
  }
}

.detail-box {
  padding: 0 0.4rem;
  .desc {
    color: #aaa;
  }
  .pname {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    font-size: 0.48rem;
  }
  .price {
    padding-top: 0.4rem;
    color: #e4393c;
    font-size: 0.48rem;
  }
}

.p {
  position: relative;
  //  display:none;
  .p-child {
    width: 100%;
    height: 1.3333rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    background: rgba(255, 255, 255, 0.6);
    .register-text {
      width: 0.9333rem;
      height: 0.9333rem;
      float: left;
      font-size: 14px;
      text-align: center;
      color: #fff;
      line-height: 0.9333rem;
      margin-left: 0.2666rem;
      margin-top: 0.2666rem;
      display: block;
      border-radius: 50%;
      background: rgb(100, 99, 99);
    }
  }
  .auto-img {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.content {
  position: absolute;
  left: 0;
  top: 10.3333rem;
}
</style>



