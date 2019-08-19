<template>
  <div class="search">
    <div class="header">
      <div class="back" @click="goPath({name: 'goods'})">
        <!-- <img class="auto-img" src="../assets/返回.png" @click="goPath({name: 'goods'})"> -->
      </div>
      <form class="form-content">
        <van-search
          ref="search"
          v-model="keyWord"
          placeholder="输入商品关键字"
          show-action
          background="#E6E6E6"
          @focus="focusFn"
        >
          <div slot="action" @click="search">搜索</div>
        </van-search>
      </form>
    </div>
    <div class="tags" v-show="isFocus">
       <div class="title">热门搜索</div>
       <img :src="searchImg">
      <ul class="tag-row clearfix">
        <li
          class="tag-col fl"
          v-for="(item, index) in searchHistory[userId]"
          :key="index"
          @click="searchForTag(item)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="product-data">
      <van-row>
        <van-col
          span="12"
          class="col-box"
          v-for="(item, index) in searchProducts"
          :key="index"
          @click.native="goPath({name: 'Detail', params: {pid: item.itemid}})"
        >
          <div>
            <img class="auto-img" v-lazy="item.itempic">
          </div>
          <div class="product-info">
            <p class="title">{{item.itemshorttitle}}</p>
            <p class="price">{{item.itemprice}}元</p>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";
export default {
  name: "Search",
  data() {
    return {
      currentData: null,
      keyWord: "女装",

      //搜索商品数据
      searchProducts: [],

      //当前用户的搜索历史记录
      searchHistory: {},

      //获取焦点
      isFocus: true,
      userId: "",
      searchImg: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/a425e85fa21ed71c2a8d64fe86f833f9.jpg?width=720&heihgt=200'
    };
  },

  components: {
    [Search.name]: Search
  },

  created() {
    //获取用户id
    this.userId = JSON.parse(localStorage.getItem("userLogin")).userId;
    console.log("this.userId ==>", this.userId);
    //获取当前用户的本地存储搜索历史记录
    var searchHistoryData = localStorage.getItem("searchHistory");

    this.searchHistory =
      searchHistoryData == undefined ? {} : JSON.parse(searchHistoryData);
  },

  mounted() {
    var search = this.$refs.search.querySelector("input");

    search.focus();
    // http://v2.api.haodanku.com/hot_key/apikey/你的apikey
    let url = "/api/hot_key/apikey/liuguichun";
    this.axios.get(url).then(r => {
      console.log("r ==>", r);
    });
  },

  methods: {
    goPath(path) {
      this.$router.push(path);
    },

    search() {
      this.isFocus = false;
      if (this.keyWord == "" || this.keyWord == undefined) {
        this.$toast("搜索关键不能为空");
        return;
      }

      this.searchProducts = [];

      // http://v2.api.haodanku.com/get_keyword_items/apikey/你的apikey/keyword/%25e5%25a5%25b3%25e8%25a3%2585/back/10/sort/0/cid/0
      let val = encodeURI(this.keyWord);
      let url =
        "/api/get_keyword_items/apikey/liuguichun/keyword/" +
        val +
        "/back/10/sort/0/cid/0";
      this.axios.get(url).then(r => {
        // console.log("r ==>", r);
        this.searchProducts = r.data.data;
      });

      if (!this.searchHistory[this.userId]) {
        this.searchHistory[this.userId] = [];
      } else if (this.searchHistory[this.userId].length >= 10) {
        this.searchHistory[this.userId].shift();
      }

      if (this.searchHistory[this.userId].indexOf(this.keyWord) === -1) {
        this.searchHistory[this.userId].push(this.keyWord);
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(this.searchHistory)
        );
      }
    },

    focusFn() {
      this.isFocus = true;
    },

    // 搜索记录
    searchForTag(keyWord) {
      this.keyWord = keyWord;
      this.search();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  box-sizing: border-box;
  overflow: hidden;
  .header {
    width: 100%;
    height: 54px;
    position: fixed;
    top: 0;
    left: 0;
    background: #E6E6E6;
    .back {
      width: 15%;
      height: 54px;
      float: left;
      line-height: 50px;
      text-align: left;
      position: relative;
      background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDg3MzE3Nzc5Mzc1IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MDkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzgxLjU2NjU1MyAxMDExLjY5OTM1NEwxNjguNjU5MDE1IDU0MC42OTA4NDFjLTIwLjQwMjk0NS0xNi4wMjU0LTIwLjQwMjk0NS00Mi4wMDkwNzUgMC01OC4wMzQ0NzRMNzgxLjU2NjU1MyAxMS42NDc4NTRjMjAuMzc3MzQ1LTE2LjAyNTQgNTMuNDAwOTMyLTE2LjAyNTQgNzMuNzc4Mjc4IDAgMjAuMzc3MzQ1IDE1Ljk5OTggMjAuMzc3MzQ1IDQyLjAwOTA3NSAwIDU4LjAwODg3NUwyNzkuMzI2NDMxIDUxMS42ODY0MDRsNTc2LjAxODQgNDQyLjAwNDA3NWMyMC4zNzczNDUgMTUuOTk5OCAyMC4zNzczNDUgNDEuOTgzNDc1IDAgNTguMDA4ODc1LTIwLjM3NzM0NSAxNi4wMjU0LTUzLjQwMDkzMiAxNi4wMjU0LTczLjc3ODI3OCAweiIgcC1pZD0iMTQxMCIgZmlsbD0iIzUxNTE1MSI+PC9wYXRoPjwvc3ZnPg==') no-repeat center center;
      background-size: 20px;
      .auto-img {
        width: 16px;
        height: 16px;
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .form-content {
      width: 85%;
      height: 50px;
      float: left;
    }
  }
  .product-data {
    padding-top: 1.3333rem;
  }
}

.tags {
    width: 100%;
    margin: 50px 0 0 0;
 .title {
      line-height: 40px;
      font-size: 12px;
      color: #333;
      text-indent: 20px;
    }
    img {
      width: 100%;
    }
     ul {
      padding: 0 10px;
      li {
        list-style-type: none;
        font-size: 12px;
        padding: 8px 10px;
        margin: 5px;
        display: inline-block;
        background: #F8F2EC;
        border: 1px solid #FAC288;
      }
    }
  // .tag-col {
  //   margin-right: 0.4rem;
  //   background-color: #f2f2f2;
  //   max-width: 260px;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   margin-top: 0.2rem;
  //   padding: 0.1rem;
  // }
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
</style>

