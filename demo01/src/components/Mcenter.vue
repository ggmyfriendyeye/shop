<template>
   <div class="Member">
        <div class="header">
            <img src="../assets/返 回 2.png" @click="goPath({name:'Mine'})" alt="">
            <span>会员中心</span>
        </div>
        <div class="main">
            <div class="main-content">
                 <div class="top">
                     <div class="left">
                          <img src="../assets/头像.jpeg" @click="goPath({name:'Mine'})" alt="">
                          <span>我的积分</span>
                     </div>
                     <div class="right">
                        <span> 如何赚取积分</span>
                     </div>
                 </div>
                 <div class="integral">
                     0
                 </div>
            </div>
        </div>
        <div class="banner">
            <div class="banner-content">
                <div class="banner-top">
                    <div class="item">
                        <div class="item-img">
                           <div class="b1">
                               <img src="../assets/成就.png" alt="">
                           </div>
                        </div>
                        <p>会员成就</p>
                    </div>
                    <div class="item">
                         <div class="item-img">
                           <div class="b2">
                                <img src="../assets/积分.png" alt="">
                           </div>
                        </div>
                        <p>积分商城</p>
                    </div>
                    <div class="item">
                         <div class="item-img">
                           <div class="b3">
                                 <img src="../assets/明细.png" alt="">
                           </div>
                        </div>
                        <p>积分明细</p>
                    </div>
                    <div class="item">
                         <div class="item-img">
                           <div class="b4">
                                 <img src="../assets/二维码.png" alt="">
                           </div>
                        </div>
                        <p>会员码</p>
                    </div>
                </div>
                <div class="banner-bottom">
                    <img src="../assets/gg.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="empty"></div>
        <div class="active">
             <div class="active-content">
                 <div class="title">
                     <h3>会员活动</h3>
                 </div>
                <div class="top">
                    <div class="item1">
                        <div class="img-s">
                            <img class="auto-img" src="../assets/宝箱.png" alt="">
                        </div>
                        <div class="text-p">
                            <p class="text1">积分夺宝</p>
                            <p class="text2">小积分大抽奖</p>
                        </div>
                    </div>
                    <div class="item2">
                         <div class="img-s">
                            <img class="auto-img" src="../assets/签到.png" alt="">
                        </div>
                        <div class="text-p">
                            <p class="text1">早期签到</p>
                            <p class="text2">瓜分懒人积分</p>
                        </div>
                    </div>
                </div>
                <div class="bottom">

                </div>
             </div>
        </div>
   </div>
</template>
<script>
export default {
    name:'Mcenter',
      methods:{
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
        background:rgb(250, 232, 232);
         position: fixed;
         top:0;
         bottom:0;
         z-index:10;
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
        width: 100%;
        height: 250px;
        margin-top:1.3333rem;
        position: relative;
        .main-content{
            width: 95%;
            height: 220px;
            background:-webkit-linear-gradient(left,rgb(255, 196, 0),rgb(233, 130, 13));
            border-radius: 0.16rem;
            position: absolute;
            left:0;
            top:0;
            bottom:0;
            right:0;
            margin:auto;
            .top{
                width: 100%;
                height: 50px;
                .left{
                    width: 70%;
                    height: 50px;
                     position: relative;
                    float:left;
                     span{
                        position:absolute;
                        left:50px;
                        top:0;
                        bottom:0;
                        margin:auto;
                        display:inline-block;
                        font-size:15px;
                        height: 1.3333rem;
                        line-height:1.3333rem;
                        color:rgba(229, 233, 232, 0.959);
                        font-size:12px;
                        font-weight: 300;
                    }
                    img{
                        width: 32px;
                        height: 32px;
                        display:block;
                        border-radius: 50%;
                        position:absolute;
                        left:0;
                        top:0;
                        bottom:0;
                        margin:auto;
                        display:block;
                        padding:0.1333rem;
                    }
                }
                .right{
                    width: 30%;
                    height: 1.3333rem;
                    float:right;
                    position: relative;
                    span{
                        display:inline-block;
                        width: 90%;
                        height: 30px;
                        line-height:30px;
                        text-align: center;
                        border-radius: 10px 0rem 0rem 10px;
                        background:rgba(255,255,255,0.6);
                        position:absolute;
                        right:0;
                        top:0;
                        bottom:0;
                        margin:auto;
                        color:#fff;
                        font-weight: 300;
                        font-size:12px;
                    }

                }
            }
            .integral{
                width: 100%;
                height: 150px;
                line-height: 150px;
                text-align:center;
                font-size:32px;
                font-weight: 500;
                color:#fff;
            }
        }
    }
    .banner{
        width: 100%;
        height: 250px;
        position: relative;
        .banner-content{
            width: 95%;
            height: 220px;
            position: absolute;
            left:0;
            top:0;
            bottom:0;
            right:0;
            margin: auto;
            // border:1px solid red;
            .banner-top{
                width: 100%;
                height: 120px;
                display:flex;
                .item{
                    height: 120px;
                    flex: 1;
                    div.item-img{
                        width: 100%;
                        height: 80px;
                        overflow: hidden;
                        div{
                            width: 60px;
                            height: 60px;
                            border-radius: 50%;
                            // border:1px solid red;
                            margin: 10px auto;
                            position:relative;
                            img{
                                position: absolute;
                                left:0;
                                top:0;
                                right:0;
                                bottom:0;
                                margin:auto;
                            }
                            // background: url(../assets/成就.png) no-repeat center center;
                        }
                    }
                    p{
                        text-align:center;
                        font-size:12px;
                        font-weight:300;
                        color:#333;
                    }
                }
            }
            .banner-bottom{
                width: 100%;
                height: 100px;
                border-radius: 8px;
                background:#ccc;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                }
            }
        }
    }

     .b1{
          background:linear-gradient(rgb(233, 191, 100) ,rgb(233, 130, 13));
     }
    .b2{
        background: linear-gradient(top,rgb(197, 190, 196),purple);
    }
     .b3{
        background: linear-gradient(top,rgb(233, 152, 152),red);
    }
     .b4{
        background: linear-gradient(top,rgb(181, 185, 214),rgb(10, 152, 218));
    }
    .empty{
        width: 100%;
        height: 10px;
        background:#ddd;
    }
    .active{
        width: 100%;
        height: 300px;
        position:relative;
        .active-content {
            width: 95%;
            height: 300px;
            position: absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            margin:auto;
            .title{
                width: 100%;
                h3{
                   color:#333;
                   font-weight: 400;
                }
            }
            .top{
                width: 100%;
                height: 180px;
                display:flex;
                div{
                    height: 180px;
                    flex:1;
                }
                .item1{
                    background: linear-gradient(rgb(69, 228, 122),rgb(70, 240, 70));
                    margin-right:5px;
                     border-radius: 8px;
                     .img-s{
                         width: 100px;
                         height: 120px;
                         margin:0 auto;
                     }
                     .text-p{
                         text-align:center;
                         .text1{
                             font-size: 15px;
                             color:#fff;
                             font-weight:400;
                         }
                         .text2{
                             font-size:12px;
                             color:#ddd;
                         }
                     }


                }
                .item2{
                    background:linear-gradient(rgb(244, 248, 4),rgb(247, 173, 14));
                    margin-left:5px;
                    border-radius: 8px;
                    .img-s{
                         width: 100px;
                         height: 120px;
                         margin:0 auto;
                     }
                      .text-p{
                         text-align:center;
                         .text1{
                             font-size: 15px;
                             color:#fff;
                             font-weight:400;
                         }
                         .text2{
                             font-size:12px;
                             color:#ddd;
                         }
                     }
                }
            }
            .bottom{
                width: 100%;
                height: 140px;
                border-radius: 8px;
                margin-top:20px;
                background:url(../assets/日.jpg) no-repeat;
                background-size:100% 100%;
            }
        }
    }
</style>


