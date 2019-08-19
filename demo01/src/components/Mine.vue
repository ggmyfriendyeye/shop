<template>
  <div class="mine">
    <div class="header">
      <!-- 登陆状态 -->
      <div class="box1" v-show="isShow">
        <div class="img">
          <img src="../assets/头像.jpeg" alt>
        </div>
        <div class="user-text">
          <span>{{user.userId}}</span>
        </div>
      </div>
      <div class="box1" v-show="!isShow">
        <div class="img">
          <img src="../assets/未登录头象.png" alt>
        </div>
        <div class="user-text">
          <span @click="goState({name:'Login'})">登陆/注册</span>
        </div>
      </div>
      <!-- 未登录状态 -->
      <div class="box2"></div>
      <div class="box3">
        <div class="member"  @click="goState({name: 'Mcenter'})">
          <span style="padding-top:4px;">
            <img src="../assets/会员 (1).png" alt>
          </span>
          <span>会员积分</span>
        </div>
      </div>
    </div>
    <!-- 订单 -->
    <div class="order-content">
      <div class="order" @click="goPath({name: 'Order',params: {active: -1}})">
        <div class="left">我的订单</div>
        <div class="right">
          <div class="right-text">全部订单</div>
          <div class="right-img">
            <img src="../assets/返 回 (1).png" alt>
          </div>
        </div>
      </div>
      <div class="set-item">
        <div
          class="tab"
          v-for="(item, index) in tabs"
          :key="index"
          @click="goPath({name: 'Order', params: {active: index}})"
        >
          <div class="set-img">
            <img :src="item.url" alt>
          </div>
          <p>{{item.title}}</p>
        </div>
         <div class="tab" @click="goPath({name: 'Exit'})">
          <div class="set-img">
            <img src="../assets/退换修.png" alt>
          </div>
          <p>退换修</p>
        </div>
      </div>
      <div class="banner-list">
        <div class="banner-content">
          <div class="tab">
            <div class="set-img">0</div>
            <p>优惠卷</p>
          </div>
          <div class="tab">
            <div class="set-img">20万</div>
            <p>最高额度</p>
          </div>
          <div class="tab">
            <div class="set-img">0</div>
            <p>礼品卡</p>
          </div>
          <div class="tab">
            <div class="set-moneny">
              <img src="../assets/我的钱包.png" alt>
            </div>
            <p>我的钱包</p>
          </div>
        </div>
      </div>

      <van-row>
        <van-col span="24">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image.url" class="swiper auto-img">
            </van-swipe-item>
          </van-swipe>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24" v-for="(item,index) in datas" :key="index" >
          <div class="nav-left">
            <img :src="item.url" alt>
          </div>
          <div class="nav-right">
            <span class="nav-right-text">{{item.title}}</span>
            <span class="nav-right-img" @click="goPath(item.path)">
              <img src="../assets/返 回 (1).png"  alt>
            </span>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Toast } from "vant";
export default {
  name: "Mine",
  data() {
    return {
      // 是否登陆
      isShow: true,
      tabs: [
        { title: "待付款", url: require("../assets/待付款.png") },
        { title: "待收货", url: require("../assets/待收货.png") },
        { title: "待评价", url: require("../assets/待评价.png") }
      ],
      images: [
        { url: 'https://i8.mifile.cn/v1/a1/a54103e5-c541-77d9-f209-f99935439182!720x360.webp' },
        { url: 'https://i8.mifile.cn/v1/a1/fe08cdfd-5a9c-0c44-ac75-924ea7494207!720x360.webp' },
        { url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d40eff41e0d772f9d270cb4a2c17ee5a.jpg?thumb=1&w=720&h=360'}
      ],
      datas: [
        { title: "小米会员", url: require("../assets/会员 (1).png"),path:{name:'Member'} },
        { title: "会员中心", url: require("../assets/会员.png") ,path:{name:'Mcenter'}},
        { title: "设置", url: require("../assets/设 置.png") ,path:{name:'SetUser'}}
      ],
      user:{}
    };
  },

  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast
  },
  created() {
   var user = localStorage.getItem('userLogin');
   user = user === undefined ? [] : JSON.parse(user);
  console.log('+++++',user)
  if(user && user.loginStatus) {
       // 已登录
     this.isShow = true;

  }else{
    // 未登录
    this.isShow = false;

  }
   this.user = user;
  },

  methods: {
    goPath(path) {
      // 获取登陆状态
      var userLogin = localStorage.getItem('userLogin');
      userLogin = userLogin === undefined ? [] : JSON.parse(userLogin);
      if(userLogin.loginStatus){
       this.$router.push(path);
      }else {
        Toast.fail('请先登陆');
      }
    },
    goState(path) {
       this.$router.push(path);
    }

  }
};
</script>
<style lang="less" scoped>
.mine {
  width: 100%;
  box-sizing: border-box;
  .header {
    width: 100%;
    height: 2.1333rem;
    background: url(https://m.mi.com/static/img/bg.63c8e19851.png) center 0 #f37d0f;
    background-size: auto 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .box1 {
      width: 50%;
      height: 2.1333rem;
      float: left;
      position: relative;
      .img {
        width: 1.3333rem;
        height: 1.333rem;
        border-radius: 50%;
        border: 1px solid white;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 8px;
        margin: auto;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .user-text {
        height: 0.8rem;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0.9333rem;
        margin: auto;
        span {
          font-size: 15px;
          font-weight: 300;
          color: #fff;
          text-align: center;
        }
      }
    }
    .box2 {
      width: 20%;
      height: 2.1333rem;
      float: left;
    }
    .box3 {
      width: 30%;
      height: 2.1333rem;
      float: left;
      position: relative;
      .member {
        width: 100px;
        height: 25px;
        background: yellow;
        border-radius: 8px 0rem 0rem 8px;
        float: right;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        > span {
          display: inline-block;
          line-height: 25px;
          padding: 0px 5px;
          vertical-align: middle;
          color: tomato;
        }
      }
    }
  }
  .order-content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    padding-top: 2.1333rem;
    padding-bottom: 1.3333rem;
    .order {
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #ccc;
      color: #333;
      .left {
        float: left;
        font-size: 0.4266rem;
        font-weight: 300;
        line-height: 0.8rem;
        padding: 0.2133rem;
      }
      .right {
        float: right;
        font-size: 0.4266rem;
        font-weight: 300;
        line-height: 0.8rem;
        padding: 0.2133rem;
        .right-text {
          display: inline-block;
        }
        .right-img {
          display: inline-block;
        }
      }
    }
    .set-item {
      padding: 0.2666rem;
      display: flex;
      .tab {
        padding: 0.1333rem;
        flex: 1;
        > div {
          padding-left: 25%;
        }
        p {
          color: #333;
          font-size: 14px;
          padding: 0.0533rem;
          text-align: center;
        }
      }
    }
    .banner-list {
      background: #ddd;
      width: 100%;

      overflow: hidden;
      .banner-content {
        width: 100%;
        margin: 0.2666rem 0rem;
        background: #fff;
        display: flex;
        .tab {
          flex: 1;
          .set-img {
            padding-top: 0.2666rem;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
          }
          .set-moneny {
            padding-top: 0.32rem;
            text-align: center;
          }
          p {
            color: #333;
            font-size: 0.3733rem;
            text-align: center;
            padding: 0.2666rem 0rem;
          }
        }
      }
    }
  }
}
.swiper {
  height: 120px;
}
.nav-left {
  width: 10%;
  height: 40px;
  float: left;
  position: relative;
  img {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
  }
}
.nav-right {
  width: 90%;
  height: 40px;
  float: right;
  border-bottom: 1px solid #ddd;
  .nav-right-text {
    font-size: 13px;
    color: #333;
    line-height: 40px;
    font-weight: 300;
    // padding: 5px;
  }
  .nav-right-img {
    float: right;
    font-size: 13px;
    color: #333;
    line-height: 40px;
    font-weight: 300;
    padding: 0rem 5px;
  }
}
</style>


