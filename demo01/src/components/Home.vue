<template>
    <div class="hello">
        <div class="header">
            <span class="lanb">
                <img src="../assets/images/菜单.png" alt="">
            </span>
            <div class="header-content">
                <h3>我的账号</h3>
            </div>
            <span class="rig-img">
                <img src="../assets/images/搜索.png" alt="">
            </span>
        </div>
        <div class="content">
            <div class="nav">
                <div class="left">
                    <div class="tu-img">
                        <img src="../assets/images/头像-实.png" alt="">
                    </div>
                    <div class="text-right">
                        <p>14717895091</p>
                        <p>开通会员享受高品质套餐服务 ></p>
                    </div>
                </div>
                <div class="right">
                    <div class="qian">
                        签到
                    </div>
                    <span>签到领取VIP</span>
                </div>
            </div>
            <div class="item-log">
                <div class="ben">
                    <div class="left sb">
                            <img src="../assets/images/文件.png" alt="">
                    </div>
                    <div class="right sb">
                        <span class="ben-text sb">本地音乐</span>
                        <div class="right-cover r">
                            <div class="right-btn sb">
                                <img src="../assets/images/播放.png" alt="">
                            </div>
                            <span class="right-test r" style="color:#FF1493;">随机播放(2)</span>
                        </div>
                    </div>
                </div>
                <div class="ben">
                    <div class="left sb">
                        <img src="../assets/images/最近播放.png" alt="">
                    </div>
                    <div class="right sb">
                        <span class="ben-text sb">最近播放</span>
                        <div class="right-cover r">
                            <span class="right-test r"><big>></big></span>
                        </div>
                    </div>
                </div>
                <div class="ben">
                    <div class="left sb">
                        <img src="../assets/images/歌单.png" alt="">
                    </div>
                    <div class="right sb">
                        <span class="ben-text sb">我的歌单</span>
                        <div class="right-cover r">
                            <span class="right-test r"><big>></big></span>
                        </div>
                    </div>
                </div>
                <div class="ben">
                    <div class="left sb">
                        <img src="../assets/images/电台直播.png" alt="">
                    </div>
                    <div class="right sb">
                        <span class="ben-text sb">收听的电台</span>
                        <div class="right-cover r">
                            <span class="right-test r"><big>></big></span>
                        </div>
                    </div>
                </div>
                <div class="ben">
                    <div class="left sb">
                            <img src="../assets/images/收藏.png" alt="">
                    </div>
                    
                    <div class="right sb">
                        <span class="ben-text sb">收藏夹</span>
                        <div class="right-cover r">
                            <span class="right-test r"><big>></big></span>
                        </div>
                    </div>
                </div>
                <div class="ben">
                    <div class="left sb">
                            <img src="../assets/images/下载.png" alt="">
                    </div>
                    <div class="right sb">
                        <span class="ben-text sb">下载管理</span>
                        <div class="right-cover r">
                            <span class="right-test r"><big>></big></span>
                        </div>
                    </div>
                </div>
                <div class="jingDong">
                    <div class="jingDong-content">
                        <div class="left sb">
                            <span class="ben-img sb">
                                <img src="../assets/images/京东.png" alt="">
                            </span>
                        </div>
                        
                        <div class="right sb">
                            <div class="right-te sb">
                                <span class="span-top" style="font-size:16px;font-weight:400;">京东</span><br>
                                <span>新人送188元购物礼包</span>
                            </div>
                            <div class="right-cover r">
                                <img src="../assets/images/下载1.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="songer">
                <div class="songer-title">
                    <div class="left">
                        无收藏歌单&nbsp;&nbsp;先听听这些个
                    </div>
                    <div class="right">
                        <span class="r">更多&nbsp;></span>
                    </div>
                </div>
                <div class="songer-content">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Home'
}
</script>
<style lang="less" scoped>

.header{
    width: 100%;
    height: 1.3333rem;
    background: #fdfdfd;
    border-bottom: 1px solid #ccc;
    position:fixed;
    top:0;
    left:0;
    z-index:10;
    .lanb{
        display: block;
        width: 20%;
        height: 1.3333rem;
        float:left;
        position:relative;
        img{
            position: absolute;
            left:0;
            top:0; 
            bottom:0;
            margin:auto;
        }
    }
    .rig-img{
        display: block;
        width: 20%;
        height: 1.3333rem;
        float:left;
        position:relative;
        img{
            position: absolute;
            top:0;
            bottom:0;
            right:0;
            margin:auto;
        }
    }
    .header-content{
        width: 60%;
        height: 1.3333rem;
        float:left;
        h3{
            text-align:center;
        }
    }

}
.content{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    padding-top:1.3333rem;
    padding-bottom:1.3333rem;
    .nav{
        width: 100%;
        height: 1.6rem;
        border-bottom:0.0266rem solid #ccc;
        .left{
            width: 80%;
            height: 1.6rem;
            float:left;
            .tu-img{
                width: 20%;
                height: 1.6rem;
               position:relative;
               float:left;
                img{
                    position: absolute;
                    left:0;
                    top:0;
                    right:0;
                    bottom:0;
                    margin:auto;
                }
            }
            .text-right{
                width: 80%;
                height: 1.6rem;
                float:left;
                p{
                    margin-top:0.1866rem;
                    color:black;
                    font-size:0.32rem;
                    font-weight:300;
                }
            }
        }
        .right{
            width: 20%;
            height: 1.6rem;
            float:right;
            position:relative;
            .qian{
                width: 1.0666rem;
                height: 0.6666rem;
                border:0.0266rem solid #FF1493;
                border-radius: 0.1333rem;
                margin:  0.1333rem auto;
                line-height:0.6666rem;
                text-align:center;
                color:#FF1493;
            }
            span{
                font-size:0.32rem;
                font-weight:300;
                color:black;
                text-align:center;
                display:inline-block;
                position: absolute;
                left:0;
                right:0;
                bottom:0.2666rem;
                margin:auto;
            }
        }
    }
    .item-log{
        width: 100%;
        height: auto;
       
        .ben{
            width: 100%;
            height: 1.3333rem;
            .left{
                width: 15%;
                height: 1.3333rem;
                 position:relative;
                img{
                    position: absolute;
                    left:0;
                    top:0;
                    right:0;
                    bottom:0;  
                    margin:auto; 
                }
                }
            .right{
             width: 85%;
              border-bottom:0.0266rem solid #ccc;
             .ben-text{
                    display:block;
                    height: 1.3333rem;
                    line-height:1.3333rem;
                    text-align:center;
                    color:black;
                    font-size:0.32rem;
                    font-weight:300;
                }
             .right-btn{
              width: 0.8rem;
              height: 1.3333rem;
               position:relative;
              img{
                   position: absolute;
                    left:0;
                    top:0;
                    right:0;
                    bottom:0;  
                    margin:auto; 
              }
             }
             .right-test{
              display:block;
              height: 1.3333rem;
              line-height:1.3333rem;
              color:black;
              font-size:0.32rem;
              font-weight:300;
              padding:0 0.2666rem;
             }
            }
        }
    }
    .jingDong{
        width: 100%;
        height: 2.6666rem;
        background:#ccc;
        overflow: hidden;
        .jingDong-content{
            width: 100%;
            height: 2.1333rem;
            background:#fff;
            margin-top:0.266rem;
            .left{
                width: 20%;
                height: 2.1333rem;
                position:relative;
                img{
                    position: absolute;
                    left:0;
                    top:0;
                    right:0;
                    bottom:0; 
                    margin:auto; 
                }
            }
            .right{
                width: 80%;
                height: 2.1333rem;
                .right-te{
                    height: 2.1333rem;
                    span{
                        display:inline-block;
                        color:black;
                        font-size: 0.32rem;
                        font-weight: 300;
                    }
                }
                .right-cover{
                    height: 2.1333rem;
                    width:1.0666rem ;
                    position:relative;
                    img{
                        position:absolute;
                        left:0;
                        top:0;
                        right:0;
                        bottom:0;
                        margin:auto;
                    }
                }
            }
        }
    }
    .songer{
        width: 100%;
        height: auto;
        .songer-title{
          width: 100%;
          height: 1.3333rem;
         border-bottom:0.0266rem solid #ccc;
         color:black;
         font-size:0.3466rem;
         font-weight:400;
         .left{
             height: 1.3333rem;
             width: 70%;
             line-height:1.3333rem;
             float:left;
             padding-left:0.2666rem;
         }
         .right{
             width: 20%;
             height: 1.3333rem;
             line-height:1.3333rem;
             float:right;
             padding-left:0.2666rem;
         }

        }
    }
}
.sb{
    float:left;
}
.r{
    float:right;
}
.span-top{
    margin-top:0.5333rem;
}
</style>

