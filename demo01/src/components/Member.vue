<template>
   <div class="Member">
       <div class="header">
            <img src="../assets/返 回 2.png" @click="goPath({name:'Mine'})" alt="">
            <span>权益详情</span>
        </div>
        <div class="main">
           <div class="main-content">
                <van-row>
                <van-col span="24">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for="(image, index) in images" :key="index">
                           <img v-lazy="image.url" class="swiper auto-img">
                        </van-swipe-item>
                    </van-swipe>
                </van-col>
            </van-row>
            <div class="content">
               <div class="bar">
                   <div class="tab">
                     <div class="top">
                         <h4>商城礼包</h4>  
                         <span class="left">每月100元小米商城优惠卷</span>
                         <span class="right">权益介绍&nbsp;></span>
                     </div>
                     <div class="middle">
                         <div class="item">
                            <div class="top">
                                <div class="radio1"></div>
                                <div class="radio2"></div>
                                <span class="price">￥10</span>
                                <span class="s-text">满59元可用</span>
                            </div>
                            <div class="bottom">
                             <p>会员智能卷</p>
                            </div>
                         </div>
                         <div class="item">
                            <div class="top">
                                <div class="radio1"></div>
                                <div class="radio2"></div>
                                <span class="price">￥20</span>
                                <span class="s-text">满199元可用</span>
                            </div>
                            <div class="bottom">
                             <p>会员智能卷</p>
                            </div>
                         </div>
                          <div class="item">
                            <div class="top">
                                <div class="radio1"></div>
                                <div class="radio2"></div>
                                <span class="price">￥50</span>
                                <span class="s-text">满499元可用</span>
                            </div>
                            <div class="bottom">
                             <p>会员智能卷</p>
                            </div>
                         </div>
                          <div class="item">
                            <div class="top">
                                <div class="radio1"></div>
                                <div class="radio2"></div>
                                <span class="price">￥30</span>
                                <span class="s-text">满299元可用</span>
                            </div>
                            <div class="bottom">
                             <p>会员智能卷</p>
                            </div>
                         </div>
                     </div>
                   </div>
                    <div class="tab1">
                     <div class="top">
                          <h4 class="h-title">看看大家反馈</h4>  
                     </div>
                     <div class="middle">
                       <div class="comment">
                           <div class="left">
                               <img src="../assets/g3.jpeg" alt="">
                           </div>
                           <div class="right">
                               <h4>152*****55</h4>
                               <p>多福多寿犯得上犯得上反对法大幅度反对法</p>
                           </div>
                       </div>
                         <div class="comment">
                           <div class="left">
                               <img src="../assets/g.jpeg" alt="">
                           </div>
                           <div class="right">
                               <h4>152*****55</h4>
                               <p>多福多寿犯得上犯得上反对法大幅度反对法</p>
                           </div>
                       </div>
                        <div class="comment">
                           <div class="left">
                               <img src="../assets/g1.jpg" alt="">
                           </div>
                           <div class="right">
                               <h4>152*****55</h4>
                               <p>多福多寿犯得上犯得上反对法大幅度反对法</p>
                           </div>
                       </div>
                     </div>
                   </div>
                    <div class="tabs">
                   </div>
               </div>
            </div>
           </div>
        </div>
        <div class="footer">
            立即开通小米会员
        </div>
   </div>
</template>
<script>
import { Swipe, SwipeItem } from "vant";
export default {
    name:'Member',
    data() {
        return{
            images: [
        { url: require("../assets/mc.jpg") },
        { url: require("../assets/mc1.jpg") }
      ],
        }
    },
     methods: {
        goPath(path) {
            this.$router.push(path);
        }
    },
    components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
}
</script>
<style lang="less" scoped>
.Member{
    padding: 0;
    margin: 0;
}
 .header{
        width:100%;
        height: 1.3333rem;
        background:rgba(255, 255, 255, 0.829);
         position: fixed;
         top:0;
         left:0;
         z-index:1;
        span{
             position:absolute;
            right:10px;
            top:0;
            bottom:0;
            margin:auto;
            display:inline-block;
            font-size:15px;
            height: 1.3333rem;
            line-height:1.3333rem;
            color:#444;
            }
            img{
                position:absolute;
                left:0;
                top:0;
                bottom:0;
                margin:auto;
                display:block;
                padding:0.1333rem;
            }
    }
    .main{
       position:absolute;
       top:0;
       bottom:0;
       left:0;
       right:0;
       padding-top:1.3333rem;
       padding-bottom:1.3333rem;
       margin: auto;
    //    background:#ddd;
            .content{
                width: 100%;
                background:transparent;
                position:relative;
                 background:#ddd;
                .bar{
                    width: 95%;
                    height: auto;
                    background:transparent;
                    position:absolute;
                    left:0;
                    right:0;
                    top:-40px;
                    margin:auto;
                    z-index:2;
                    .tab{
                        width: 100%;
                        height: 200px;
                        border-radius: 5px;
                        background:rgba(255, 255, 255, 0.829);
                        border:1px solid red;
                        margin-top:10px;
                        margin-bottom:10px;
                        .top{
                            width: 95%;
                            height: 60px;
                            margin:0 auto;
                            border-bottom:1px solid #ddd;
                            span.left{
                                float:left;
                                margin-left:5px;
                                font-size: 12px;
                                font-weight: 300;
                                color:#333;
                            }
                            span.right{
                                float:right;
                                margin-right:5px;
                                 font-size: 12px;
                                font-weight: 200;
                                 color:#333;
                            }
                        }
                        .middle{
                            width: 97%;
                            height: 100px;
                            margin:0 auto;
                            border:1px solid #ccc;
                            display:flex;
                            .item{
                                height: 80px;
                                margin:5px;
                                flex: 1;
                                .top{
                                     position:relative;
                                     border-radius: 5px;
                                     background:red;
                                    .radio1{
                                    width: 10px;
                                    height: 10px;
                                    border-radius: 50%;
                                    background:#fff;
                                    position:absolute;
                                    left:-5px;
                                    top:0;
                                    bottom:0;
                                    margin:auto;
                                }
                                 .radio2{
                                    width: 10px;
                                    height: 10px;
                                    border-radius: 50%;
                                    background:#fff;
                                    position:absolute;
                                    right:-5px;
                                    top:0;
                                    bottom:0;
                                    margin:auto;
                                }
                                 span.price{
                                     display:block;
                                    font-size: 14px;
                                    font-weight: 400;
                                    padding:5px;
                                    color:#fff;
                                    text-align:center;
                                    }
                                span.s-text{
                                    display:block;
                                    font-size: 12px;
                                    font-weight: 200;
                                    padding:5px 2px;
                                    color:#fff;
                                    text-align:center;
                                }
                                }
                                .bottom{
                                    p{
                                        color:#333;
                                        padding:5px;
                                    }
                                }
                            }
                        }
                    }
                    .tab1{
                         width: 100%;
                        height: 200px;
                        border-radius: 5px;
                        background:rgba(255, 255, 255, 0.829);
                        border:1px solid red;
                        margin-top:10px;
                        margin-bottom:10px;
                        .top{
                            width: 95%;
                            margin:0 auto;
                             .h-title{
                                width: 100%;
                                height: 30px;
                                line-height:30px;
                                margin: 0;
                            }
                        }
                        .middle{
                            width: 95%;
                            margin:0 auto;
                            border:1px solid #ccc;
                        }
                    }
                }
            }
    }
    .comment{
        width: 100%;
        height: 50px;
        .left{
            width: 15%;
            height: 50px;
            background:#ccc;
            float:left;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .right{
            width: calc(85% - 10px);
            height: 50px;
            float:right;
            padding-left:10px;
            h4{
                width: 100%;
                height: 20px;
                padding:0;
                margin:0;
            }
            p{
                // padding-top:5px ;
            }
        }
    }
    .footer{
        width: 100%;
        height: 1.3333rem;
        line-height: 1.3333rem;
        text-align:center;
        background:#f55110;
        color:#fff;
        font-size:14px;
        font-weight:300;
        position:fixed;
        bottom:0;
        left:0;
        z-index:3;
    }
    .swiper {
     height: 300px;
    }
   
    .tabs{
        width: 100%;
        height: 80px;
    }
</style>


