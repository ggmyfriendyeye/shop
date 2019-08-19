<template>
  <div class="classify">
    <div class="header">
      <div class="back">
        <img  src="../assets/返 回 2.png" @click="goPath({name: 'goods',query:{num:0}})" alt>
      </div>
      <div class="header-content">超级分类</div>
    </div>
    <div class="content">
      <div class="content-left">
        <ul>
          <li
            class="left-item"
            :class="{active:item.isCheck}"
            v-for="(item, index) in menus"
            :key="index"
            @click="toggle(item,index)"
          >{{item.title}}</li>
        </ul>
      </div>
      <div class="content-right">
        <!-- 三级路由 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { Search } from "vant";

export default {
  name: "Classify",
  data() {
    return {
      idx: 0,
      menus: [
        { title: "女装", isCheck: true, path: { name: "Product1" } },
        { title: "男装", isCheck: false, path: { name: "Menu" } },
        { title: "内衣", isCheck: false, path: { name: "Ny" } },
        { title: "美妆", isCheck: false, path: { name: "Mz" } },
        { title: "配饰", isCheck: false, path: { name: "Ps" } },
        { title: "鞋品", isCheck: false, path: { name: "Xp" } },
        { title: "箱包", isCheck: false, path: { name: "Xb" } },
        { title: "儿童", isCheck: false, path: { name: "Et" } },
        { title: "母婴", isCheck: false, path: { name: "My" } },
        { title: "居家", isCheck: false, path: { name: "JuJia" } },
        { title: "美食", isCheck: false, path: { name: "MeiShi" } },
        { title: "数码", isCheck: false, path: { name: "ShuMa" } },
        { title: "家电", isCheck: false, path: { name: "JiaDian" } }
      ]
    };
  },
  components: {
    [Search.name]: Search
  },

  methods: {
    goPath(path) {
        this.$router.push(path);
    },
    toggle(item, index) {
      // console.log("item ==> ", item);

      if (this.idx == index) {
        return;
      }

      item.isCheck = true;

      this.menus[this.idx].isCheck = false;

      this.idx = index;

      this.$router.push(item.path);
    }
  },

  mounted() {
    const url = "/api/super_classify/apikey/liuguichun";
    let data = JSON.parse(localStorage.getItem("CLASS"));

    if (!data) {
      this.axios.get(url).then(r => {
        this.products = r.data.general_classify;

        console.log(" this.products ==>", this.products);

        localStorage.setItem("CLASS", JSON.stringify(r.data.general_classify));
      });
    } else {
      this.products = JSON.parse(localStorage.getItem("CLASS"));
    }
  }
};
</script>
<style lang="less" scoped>
.classify {
  .header {
    width: 100%;
    height: 1.3333rem;
    background: #f2f2f2;
    z-index: 10;
    position: fixed;
    top: 0;
    .back {
      width: 2.4000rem;
      height: 1.3333rem;
      line-height: 1.3333rem;
      float: left;
     padding-left:0.2666rem;
    }
    .header-content {
      width: calc(100% - 100px);
      height: 1.3333rem;
      float: left;
      line-height: 1.3333rem;
      text-align: center;
      font-size: 0.4266rem;
    }
  }
  .content {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    // background: black;
    padding-top: 1.3333rem;
    padding-bottom: 1.3333rem;
    .content-left {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2.6666rem;
      background-color: #fefefe;
      padding-top: 1.3333rem;
      padding-bottom: 1.3333rem;
      border-right:1px solid #ccc;
      z-index: 5;
      overflow-y: auto;
      ul {
        .left-item {
          width: calc(100% - 2px);
          height: 1.3333rem;
          line-height: 1.3333rem;
          text-align: center;
          color: #333;
          font-size: 13px;
        }
        .active {
          background-color: #fff;
          color: #ff6700;
          border-left: 0.05333rem solid #ff6700;
        }
      }
    }
    .content-right {
      position: absolute;
      width: calc(100% - 100px);
      left: 2.6666rem;
      top: 0;
      bottom: 0;
      padding-top: 1.3333rem;
      padding-bottom: 1.3333rem;
    }
  }
}
</style>

