<template>
<div class="wrap">
    <div class="header">
       <img src="../assets/返 回 2.png" @click="goPath({name:'Mine'})" alt="">
       <span>售后服务</span>
    </div>
    <van-tabs v-model="active" color="#ff6700" title-active-color="#ff6700" background="#fdfdfd">
        <van-tab title="售后申请">
            <van-row>
                <van-col span="24">
                    <div class="empty"></div>
                    <div class="equipment">设备号申请</div>  
                    <div class="search">
                       <div class="content">
                           <div class="content-left">
                               <input type="text" placeholder="请输入IMEI或SN码">
                               <span>获取本机IMEI</span>
                           </div>
                           <div class="content-right">
                               <div class="btn">申请售后</div>
                           </div>
                       </div>
                    </div>
                </van-col>
            </van-row>
        </van-tab>
        <van-tab title="进度查询">
            <van-row>
                <van-col span="24" class="ser">
                    <div class="main">
                        <img src="../assets/订单.jpg" alt="">
                    </div>
                </van-col>
            </van-row>
        </van-tab>
    </van-tabs>
</div>
</template>
<script>
export default {
    name: 'Exit',
     data() {
        return {
        active: 2,
        value:''
        };
    },
    methods: {
        goPath(path) {
            this.$router.push(path);
        }
    }
}
</script>
<style lang="less" scoped>
  .header{
        width:100%;
        height: 1.3333rem;
        background: #ddd;
        position: relative;
        img{
            position:absolute;
            left:0;
            top:0;
            bottom:0;
            margin:auto;
            display:block;
            padding:0.1333rem;
        }
        span{
            position:absolute;
            left:35px;
            top:0;
            bottom:0;
            margin:auto;
            display:inline-block;
            font-size:15px;
            height: 1.3333rem;
            line-height:1.3333rem;
        }
    }
    .empty{
        width: 100%;
        height: 10px;
        background:#ddd;
    }
    .equipment{
        width: calc(100% -10px);
        height: 30px;
        line-height:30px;
        padding:2px 5px;
        border-bottom:1px solid #ddd;
    }
    .search{
        width: 100%;
        height: 50px;
        position:relative;
        .content{
            width: 95%;
            height: 0.8rem;
            position:absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            margin:auto;
            .content-left{
                width: 85%;
                height: 0.8rem;
                border-bottom:1px solid #ddd;
                float:left;
                input{
                    width: 70%;
                    height: 25px;
                    outline: none;
                    border:none;
                }
                span{
                    margin-right:10px;
                    font-size:13px;
                    font-weight:300;
                }
            }
            .content-right{
                width: 15%;
                height: 0.8rem;
                float:right;
                .btn{
                    width: 100%;
                    height: 0.5333rem;
                    border:1px solid #ff6700;
                    border-radius: 4px;
                    line-height:0.5333rem;
                    text-align:center;
                    font-size:12px;
                    font-weight:500;
                    color:#ff6700;
                }
            }
        }
    }
   .main{
       img{
           width: 100%;
       }
   }
</style>


