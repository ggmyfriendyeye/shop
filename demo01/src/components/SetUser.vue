<template>
    <div class="set">
        <div class="header">
            <img src="../assets/返 回 2.png" @click="goPath({name:'Mine'})" alt="">
            <span>设置</span>
        </div>
        <div class="user-control">
            <div class="top">
                <p>账号管理</p>
            </div>
            <div class="wrap">
                <div class="user">
                    <span class="left">个人资料</span>
                    <span class="right">
                        <img src="../assets/返 回 (1).png" alt="">
                    </span>
                </div>
            </div>
             <div class="wrap">
                <div class="user">
                    <span class="left">收货地址</span>
                    <span class="right">
                        <img src="../assets/返 回 (1).png" alt="">
                    </span>
                </div>
            </div>
             <div class="message">
                <p>消息</p>
            </div>
            
        </div>
        <div class="message-show">
            <div class="content-left">
                <p>消息推送</p>
                <p>免打扰时间: 23:00-次日8:00</p>
            </div>
            <div class="content-right">
                <div class="content">
                    <span v-if="checked">已开启</span>
                    <span v-if="!checked">已关闭</span>
                    <span>
                         <van-switch v-model="checked"  size="14px"/>
                    </span>
                </div>
            </div>
        </div>
        <div class="user-exit">
           
            <div class="content" @click="Exit()">
                退出账号
            </div>
        </div>
    </div>
</template>
<script>
import { Dialog, Switch } from 'vant';

export default {
    name: 'SetUser',
     data() {
    return {
      show: false,
      checked: true
    }
  },

     components: {
    [ Dialog.name]:  Dialog,
    [ Switch.name]:  Switch
    },

    methods:{
         goPath(path) {
      this.$router.push(path);
    },

    // 退出账号
    Exit() {
    Dialog.confirm({
    title: '退出账号',
    message: '你确定要退出该账号吗?'
    }).then(() => {
     console.log('退出登陆')
     var userLogin = localStorage.getItem('userLogin');
     userLogin = userLogin === undefined ? [] : JSON.parse(userLogin);
     userLogin.loginStatus = false;
     localStorage.setItem('userLogin', JSON.stringify(userLogin));
    }).catch(() => {
    console.log('取消退出')
    });

    
    }

    }
}
</script>
<style scoped lang='less' >
.set{
    width: 100%;
    box-sizing: border-box;
    .header{
        width:100%;
        height: 1.3333rem;
         position: relative;
         color:#555;
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
    .user-control{
        width: 100%;
        height: auto;
        .top{
            width: 100%;
            height: 1.3333rem;
            background:#f4f4f4;
            font-size:14px;
            color:black;
            font-weight:300;
            position:relative;
            p{
                position: absolute;
                bottom:0.2666rem;
                left:0.4rem;
            }
        }
        .wrap{
            width: 100%;
            .user{
            width: 95%;
            height: 1.0666rem;
            border-bottom:1px solid #ccc;
            margin:0 auto;
            .left{
                display:block;
                height: 1.0666rem;
                line-height:1.0666rem;
                float:left;
                font-size:13px;
                 font-weight:300;
            }
            .right{
                display:block;
                height: 1.0666rem;
                line-height:1.0666rem;
                float:right;
                font-size:13px;
                font-weight:300;
                // > img{
                //   position: absolute;
                //   left:0;
                //   top:0;
                //   left:0;
                //   bottom:0;
                //   margin:auto;
                // }
            }
        }
        }
        .message{
            width: 100%;
            height: 1.0666rem;
            background:#f4f4f4;
            font-size:14px;
            color:black;
            font-weight:300;
            position:relative;
            margin-top:0.1333rem;
            p{
                position: absolute;
                bottom:0.2666rem;
                left:0.4rem;
            }
        }
    }
     .message-show{
            width: 100%;
            height:60px;
            .content-left{
                width: 50%;
                height: 60px;
                float:left;
                p{
                    font-size:12px;
                    font-weight: 300;
                    padding:0 5px;
                    margin-top:10px;
                }
            }
            .content-right{
                width: 50%;
                height: 60px;
                float:right;
                position:relative;
                .content{
                    width: 2.1333rem;
                    height: 0.8rem;
                    position:absolute;
                    top:0;
                    bottom:0;
                    right:10px;
                    margin:auto;
                     span{
                        margin-left:10px;
                        font-size:12px;
                        font-weight: 300;
                }
                }
               
            }
        }
        .user-exit{
            width: 100%;
            height: 2.1333rem;
            background:#f4f4f4;
            position:fixed;
            bottom:0;
            left:0;
            .content{
                width: 90%;
                height: 0.8rem;
                background:#fff;
                border-radius: 12px;
                position:absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                margin:auto;
                line-height: 0.8rem;
                text-align:center;
                font-size:13px;
                font-weight: 300;
            }
        }
}
</style>


