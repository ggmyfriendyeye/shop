<template>
  <div class="hello">
    <div class="view">
      <img class="auto-img" src="../../assets/class4.jpg" alt>
    </div>
    <div class="main">
      <div class="content">
        <h4 class="h-text">{{data.data[0].next_name}}</h4>
        <div class="main-content">
          <van-row>
            <van-col
              span="12"
              class="col-box"
              v-for="(item, index) in data.data[0].info"
              :key="index"
            >
              <div>
                <img class="auto-img" v-lazy="item.imgurl" alt>
              </div>
              <div class="product-info">
                <p class="title">{{item.son_name}}</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="content">
        <h4 class="h-text">{{data.data[1].next_name}}</h4>
        <div class="main-content">
          <van-row>
            <van-col
              span="12"
              class="col-box"
              v-for="(item, index) in data.data[1].info"
              :key="index"
            >
              <div>
                <img class="auto-img" v-lazy="item.imgurl" alt>
              </div>
              <div class="product-info">
                <p class="title">{{item.son_name}}</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="content">
        <h4 class="h-text">{{data.data[2].next_name}}</h4>
        <div class="main-content">
          <van-row>
            <van-col
              span="12"
              class="col-box"
              v-for="(item, index) in data.data[2].info"
              :key="index"
            >
              <div>
                <img class="auto-img" v-lazy="item.imgurl" alt>
              </div>
              <div class="product-info">
                <p class="title">{{item.son_name}}</p>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, Tabs } from "vant";

export default {
  name: "Et",
  data() {
    return {
      data: null
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },

  created() {
    var data = localStorage.getItem("CLASS");

    data = data == undefined ? [] : JSON.parse(data);

    this.data = data[7];

    console.log(" this.data ==>", this.data);
  }
};
</script>
<style lang="less" scoped>
.hello {
  .view {
    padding: 0.2666rem 0.2666rem 0rem;
    height: 3.2rem;
    .auto-img {
      width: 100%;
      height: 100%;
    }
  }
}
.h-text {
  text-align: center;
  padding: 0.16rem;
  font-size: 0.4266rem;
  font-weight: 300;
}
.col-box {
  padding: 0.16rem;
}
.product-info {
  text-align: center;
  .title {
    color: #888;
    margin-top: 0.2666rem;
  }
}
</style>


