<template>
  <div class="shopcart">
    <top-nav :is-has-back="false" :title="title" :icon="icon" :is-has-icon="isHas" @edit="edit"></top-nav>

    <div class="shopcart-product">
      <!-- 用户已登录且购物车有商品 -->
      <div v-if="isHas">
        <van-row class="card-row" v-for="(item, index) in currentUserProduct" :key="index">
          <van-col class="card-col" :span="s1">
            <van-checkbox v-model="item.checked" checked-color="#1989FA" @change="clacMoney"></van-checkbox>
          </van-col>
          <van-col :span="s2" :offset="offset">
            <van-card
              :num="item.count"
              :price="item.price"
              :title="item.name"
              :thumb="item.thumbnail"
            >
              <div slot="footer">
                <van-button size="mini" v-show="isEdit" @click="removeProduct(index)">删除</van-button>
              </div>
            </van-card>
          </van-col>
        </van-row>
        <van-submit-bar :price="price" :button-text="text" ref="subbar" @click.native="submitOrder">
          <van-checkbox v-model="checked"  @change="allSelected">全选</van-checkbox>
        </van-submit-bar>
      </div>

      <!-- 用户未登录或者用户已登录且购物车没有商品 -->
      <div class="not-found" v-if="!isHas">
        <p class="not-title">购物车空空如也</p>
        <van-row>
          <van-col
            :ref="'van' + index"
            @click.native="goState({name: 'Detail', params: {pid: item.id}, query: {active: 1}})"
            span="12"
            class="col-box"
            v-for="(item, index) in products"
            :key="index"
          >
            <div>
              <img class="auto-img" :src="item.itempic">
            </div>
            <div class="product-info">
              <p class="title">{{item.itemshorttitle}}</p>
              <p class="price">{{item.itemprice}}元</p>
            </div>
          </van-col>
        </van-row>
        <div class="underline" v-if="isNone">嘿，我是有底线的！</div>
      </div>
    </div>

    <van-actionsheet v-model="show" title="填写收货人信息">
      <van-address-edit
        :area-list="areaList"
        :show-delete="false"
        show-search-result
        :address-info="addressInfo"
        save-button-text="确认"
        @save="comfirm"
      />
    </van-actionsheet>
  </div>
</template>

<script>
import TopNav from "../components/TopNav";

import areaList from "../data/area.js";

import tool from "../Utils/tool.js";

import {
  Card,
  Button,
  Checkbox,
  SubmitBar,
  AddressEdit,
  Actionsheet
} from "vant";

export default {
  name: "Shopcart",

  data() {
    return {
      show: false,

      //收货人信息
      addressInfo: {
        //每条地址的唯一标识
        id: "",

        //收货人姓名
        name: "",

        //收货人手机号
        tel: "",

        //省份
        province: "",

        //城市
        city: "",

        //区县
        county: "",

        //详细地址
        addressDetail: ""
      },

      //地址数据
      areaList,

      title: "购物车",
      isHas: false,

      isNone: false,

      //是否处于编辑状态
      isEdit: false,

      s1: 3,

      s2: 21,

      offset: 3,

      icon: "edit",

      checked: true,

      text: "提交订单",

      price: 0,

      //商品
      products: [],

      //所有商品
      allProducts: [],

      //当前用户购物车的商品
      currentUserProduct: [],

      //开始截取下标
      startIndex: 0,

      //结束截取下标
      endIndex: 8
    };
  },

  components: {
    "top-nav": TopNav,
    [Card.name]: Card,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [AddressEdit.name]: AddressEdit,
    [Actionsheet.name]: Actionsheet
  },

  created() {
    //获取用户登录状态
    var userLogin = localStorage.getItem("userLogin");

    if (userLogin) {
      //如果已经登录

      userLogin = JSON.parse(userLogin);

      //获取购物车数据
      var shopcartData = localStorage.getItem("shopcart");

      shopcartData =
        shopcartData === undefined ? null : JSON.parse(shopcartData);

      if (shopcartData) {
        //如果购物车有商品

        //保存当前用户购物车商品
        this.currentUserProduct = [];

        //筛选当前用户的购物车商品
        shopcartData.forEach(v => {
          if (v.userId == userLogin.userId) {
            v.checked = true;
            this.price += v.price * 100 * v.count;
            console.log('--------',v.price)
			
            this.currentUserProduct.push(v);
          }
        });

        if (this.currentUserProduct.length === 0) {
          console.log("购物车没有商品");

          this.sendProduct();
        } else {
          //当前用户购物车有商品
          console.log("this.currentUserProduct ==> ", this.currentUserProduct);

          this.isHas = true;
        }
      } else {
        this.sendProduct();
        console.log("购物车没有商品");
      }
    } else {
      //如果未登录
      this.sendProduct();
    }
  },

  mounted() {
    var timers = [];

    //商品懒加载
    window.onscroll = () => {
      //当前商品数组和所有商品数组一样时, 直接拦截
      if (this.products.length >= this.allProducts.length) {
        this.isNone = true;
        return;
      }

      //获取页面距离
      var scrollTop = document.documentElement.scrollTop;

      //获取最后一个节点
      var lastRef = this.$refs["van" + (this.products.length - 1)][0].$el;

      //获取最后一个节点的offsetTop
      var offsetTop = lastRef.offsetTop;

      //获取最后一个节点的高度
      var height = lastRef.offsetHeight;

      var h = offsetTop - height - 200;

      if (scrollTop >= h) {
        var timer = setTimeout(() => {
          this.products.push(
            ...this.allProducts.slice(this.startIndex, this.endIndex)
          );

          this.startIndex = this.endIndex;
          this.endIndex += 8;

          clearTimeout(timer);
          timer = null;
          timers = [];
        }, 500);

        timers.push(timer);

        for (var i = 1; i < timers.length; i++) {
          clearTimeout(timers[i]);
        }
      }
    };

    //如果当前用户购物车存在商品才会设置提交订单栏的bottom值
    if (this.isHas) {
      var bottom = document.getElementsByClassName("tabbar")[0].clientHeight;

      this.$refs.subbar.style.bottom = bottom + "PX";
    }
  },

  methods: {
    goState(path) {
      console.log("aaa");
      this.$router.push(path);
    },

    //推荐商品
    sendProduct() {
      //获取8个商品
      var productsData = JSON.parse(localStorage.getItem("products"));

      //所有商品
      this.allProducts = productsData;

      this.products = productsData.slice(this.startIndex, this.endIndex);

      console.log('products111==>', this.products);

      this.startIndex = this.endIndex;
      this.endIndex += 8;
    },

    //编辑
    edit() {
      var _text = document.getElementsByClassName("van-submit-bar__text")[0];

      var spans = _text.querySelectorAll("span");

      if (this.currentUserProduct.length === 0) {
        this.isHas = false;

        this.sendProduct();
      }

      if (!this.isEdit) {
        this.icon = "certificate";
        this.isEdit = true;
        this.text = "全部删除";
        spans[0].textContent = "";
        spans[1].textContent = "";
      } else {
        this.icon = "edit";
        this.isEdit = false;
        this.text = "提交订单";
        spans[0].textContent = "合计：";
        spans[1].textContent = "¥ " + this.price.toFixed(2);
      }
    },

    //删除商品
    removeProduct(index) {
      //获取本地储存购物车数据
      var shopcartProduct = JSON.parse(localStorage.getItem("shopcart"));

      //删除页面当前用户购物车商品

      var product = index == undefined ? this.currentUserProduct.splice(0) : this.currentUserProduct.splice(index, 1); //[{}, {}]

      for (var n = 0; n < product.length; n++) {
        //当前被删除商品的时间
        var time = new Date(product[n].time).getTime();

        //查找匹配删除的商品, 从本地存储删除
        for (var i = 0; i < shopcartProduct.length; i++) {
          var v = shopcartProduct[i];
          var t = new Date(v.time).getTime();
          //如果用户名,商品id,时间一致, 则删除
          if (
            v.userId == product[n].userId &&
            v.id == product[n].id &&
            t == time
          ) {
            shopcartProduct.splice(i, 1);

            break;
          }
        }
      }

      localStorage.setItem("shopcart", JSON.stringify(shopcartProduct));
    },

    //全选
    allSelected() {
      this.currentUserProduct.forEach(v => {
        v.checked = this.checked;
      });
    },

    // 单选控制全选
    allSelectedStatus() {

				for (var i = 0; i < this.currentUserProduct.length; i++) {
					if (!this.currentUserProduct[i].checked) {
						this.checked = false;
						return;
					}
				}

				this.checked = true;
			},

    submitOrder() {
      if (this.isEdit) {
        //处于编辑状态
        this.removeAllProduct();
      } else {
        if (parseFloat(this.price) > 0) {
          this.show = true;

          var userInfo = JSON.parse(localStorage.getItem("userLogin"));

          this.addressInfo.tel = userInfo.userId;
        }
      }
    },

    //全部删除
    removeAllProduct() {
      if (this.currentUserProduct.length === 0) {
        return;
      }
      if (this.checked) {
        //可删除
        this.removeProduct();
      } else {
        //提示
        this.$toast("请选择所有商品");
      }
    },

    //计算订单总价
    clacMoney() {
     this.price = 0;
				if(!this.isEdit) {
					this.currentUserProduct.forEach(v => {
						if (v.checked) {
							this.price += parseFloat(v.price) * 100 * v.count;
						}
					})
				}	

				this.allSelectedStatus();

				return this.price;
    },

    // 确认提交提单
    comfirm(data) {
      //data: 收货信息

      data.id = new Date().getTime.toString();
      console.log("data ==> ", data);

      //从购物车移除当前用户的商品
					var shopcartData = JSON.parse(localStorage.getItem('shopcart'));

      // 提交订单
      var orderData = localStorage.getItem("order");

      orderData = orderData == undefined ? [] : JSON.parse(orderData);

      //生成订单id
      var orderId = "order" + new Date().getTime().toString();

      this.currentUserProduct.forEach(v => {
        if (v.checked) {
             //移除当前用户的购物车商品
							for (var i = 0; i < shopcartData.length; i++) {
								if (v.userId == shopcartData[i].userId && v.id === shopcartData[i].id && v.time == shopcartData[i].time) {
									shopcartData.splice(i, 1);
									break;
								}
							}



          //构造我的订单信息
          v.address =
            data.province + data.city + data.county + data.addressDetail;

          v.phone = data.tel;

          v.username = data.name;

          v.orderTime = tool.format(new Date(), "yyyy-MM-dd hh:mm:ss");

          v.orderId = orderId;

          v.status = 2; //已收货

          orderData.push(v);
        }
      });

      localStorage.setItem("order", JSON.stringify(orderData));

      	localStorage.setItem('shopcart', JSON.stringify(shopcartData));

      this.$router.push({ name: "Order" });
    }
  },

  //离开当前组件守卫
  beforeRouteLeave(to, form, next) {
    window.onscroll = null;
    next();
  }
};
</script>

<style lang="less" scoped>
.not-found {
  padding-top: 0.8rem;
  .not-title {
    text-align: center;
    font-size: 0.54rem;
    color: #aaa;
  }
  .col-box {
    padding: 0.2133rem;

    .product-info {
      text-align: center;
      .title {
        color: #888;
        margin-top: 0.2666rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .price {
        color: #e4393c;
        margin-top: 0.2666rem;
      }
    }
  }
}

.underline {
  text-align: center;
  color: #aaa;
  font-size: 12px;
  padding: 0.2666rem 0;
}

.card-row {
  position: relative;
  margin-top: 0.4rem;
  .card-col {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .van-checkbox {
    text-align: center;
  }
  .van-card__bottom {
    margin-top: 0.2666rem;
  }
}

.van-submit-bar__bar .van-checkbox {
  margin-left: 0.2666rem;
}
</style>