<template>
  <div class="hello">
    <!-- 二级路由 -->
    <div>
      <router-view></router-view>
    </div>

    <van-tabbar class="tabbar" v-model="active" active-color="#FF1493" style="z-index:10;">
      <van-tabbar-item
        :icon="item.icon"
        v-for="(item, index) in tabs"
        :key="index"
        @click="goPath(item)"
      >{{item.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template> 
<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "Main",
  data() {
    return {
      active: 0,
      tabs: [
        { title: "首页", icon: "home-o", path: { name: "goods" } },
        { title: "分类", icon: "apps-o", path: { name: "Product1" } },
        { title: "购物车", icon: "shopping-cart-o", path: { name: "Shopcart" }},
        { title: "我的", icon: "manager-o", path: { name: "Mine" } }
      ]
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  created() {
    let state = this.$route.query;
    let m = Number(state.num); 
    // if(state) {
    //    this.active = Number(state.num);
    // }
   
    console.log('state',m)
  
  },
  beforeUpdate() {
    // this.active = this.active -1;
    console.log('+++++',this.active)
  },

  methods: {
    goPath(item) {
      this.$router.push(item.path);
    }
  }
};
</script>
<style lang="less" scoped>
.hello {
  padding-bottom: 1.3333rem;
  .tabbar {
    max-width: 640px;
    margin: 0 auto;
    right: 0;
  }
}
</style>
