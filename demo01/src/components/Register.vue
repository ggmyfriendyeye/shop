<template>
    <div class="hello">
        <div class="nav">
           <router-link :to="{name: 'Login'}" class="login-text">登录</router-link>
        </div>
      <!-- <div class="logo">
			<img class="auto-img" src="../assets/t.jpg" />
		</div> -->
        <van-row class="xxx">
            <van-col offset="2" span="20">
                <van-cell-group>
                    <van-field label="手机号" v-model="userInfo.phone" placeholder="请输入手机号" />
                    <van-field type="password" label="密码" v-model="userInfo.pwd" placeholder="请输入密码" />
                    <van-field type="password" label="确认密码" v-model="userInfo.repwd" placeholder="请确认密码" />
                    <van-field label="验证码" v-model="userInfo.validcode">
                        <van-button slot="button" size="small" type="primary" @click="sendValidCode" :disabled="isDisabled">{{validCodeText}}</van-button>
                    </van-field>
                </van-cell-group>
                <van-button class="register-btn" size="large" @click="register">注册</van-button>
            </van-col>
       </van-row>
        
      
        
    </div>
</template>
<script>

import Vue from 'vue'
import { CellGroup, Field, Icon, Button, Dialog} from 'vant';
import validForm from '../Utils/vaidform.js'
import tip from '../Utils/tip.js'
import tool from '../Utils/tool.js'
Vue.use( Dialog)
export default {
    name: 'Register',
    data() {
        return {
         
				//随机生成验证码
				validCode: '',

				validCodeText: '发送验证码',

				isDisabled: false,
                users: null,
				//用户信息
				userInfo: {
					phone: '',
					pwd: '',
					repwd: '',
					validcode: ''
				}
        }
    },
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Icon.name]: Icon,
        [Button.name]: Button 
    },

    methods: {
        register() {
           

            if(!validForm.validPhone(this.userInfo.phone)) {
                Dialog.alert({
                            title: '手机号不正确'
                }).then(() => {
                this.userInfo.phone = '';
                });
            }else if(!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
                Dialog.alert({
                                    title: '密码只支持!@._字母数字组合'
                                }).then(() => {
                                    this.userInfo.pwd = '';
                                })
            }else if(!validForm.validEqual(this.userInfo.pwd, this.userInfo.repwd)) {
               
               Dialog.alert({
                                    title: '两次密码不一致'
                                }).then(() => {
                                    this.userInfo.repwd = '';
                                })
            }else if (this.userInfo.validcode.length == 6 && !validForm.validEqual(this.userInfo.validcode, this.validCode)) {

						//验证密码
						Dialog.alert({
							title: '验证码不正确'
						}).then(() => {
							this.userInfo.validcode = '';
						})


				}else {
                    // 存储之前需要验证是否存在该用户

                    for(var i =0; i< this.users.length; i++) {
                        if(this.users[i].phone == this.userInfo.phone) {
                            tip.dialogTip('该手机号已被注册');
                            return;
                        }
                    }
                    // 如果不存在该用户，则添加一个用户到用户列表
                    // 生成用户id
                    var time = new Date();
                    var uid = 'vue' + time.getTime();
                    var phone = this.userInfo.phone;
                    var pwd = this.userInfo.pwd;
                    var registerTime = tool.format(time,'yyyy-MM-dd hh:mm:ss');

                    var user = {
                        uid,
                        phone,
                        pwd,
                        registerTime
                    };

                    this.users.push(user);
                    var usersData = JSON.stringify(this.users);

                    // 写入本地储存
                    localStorage.setItem('users', usersData);

                    // 跳转到登陆组件
                    this.$router.push({name: 'Login'})
                }
           
        },

        // 发送验证码
        sendValidCode() {
            if(!validForm.validPhone(this.userInfo.phone)) {
                Dialog.alert({
						title: '手机号码不正确'
					}).then(() => {
						this.userInfo.phone = '';
					})
            }else {
                this.isDisabled = true;
                // 60s后自动恢复
                var time = 5;

                this.validCodeText = time + 's后重新发送';

                var timer = setInterval(() => {
                    if(time <= 0) {
                        this.isDisabled = false;
                        this.validCodeText = '发送验证码';

                        // 清除定时器
                        clearInterval(timer);
                        time = null;
                    }else {
                        this.validCodeText = --time + 's后重新发送';
                    }
                }, 1000)
            }

            // 发送验证码

        this.validCode = validForm.generateValidCode();
          console.log(this.validCode);
        }
    },

    created() {
        var userData = localStorage.getItem('users');
        this.users = userData == undefined ? [] : JSON.parse(userData);


    }
}
</script>
<style  lang="less" scoped>
.hello{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background:url('../assets/register.jpg') no-repeat 0 0;
  background-size:100% 100%;
//   opacity: 0.6;
}
.register-btn{
        margin-top: 1.3333rem;
        background: #DBA;
	}
	.logo{
		width: 3.5rem;
		margin: 0 auto;
	}
	.nav{
        height: 1.3333rem;
        border:none;
        // background-image: linear-gradient(to right, #62AAF5 0%, #1989FA 100%);
        background:transparent;
		margin-bottom:  1.3333rem;
		.login-text{
			float: right;
			font-size: 14PX;
			color: #F97;
			line-height: 1.3333rem;
			margin-right: 0.5333rem; 
		}
    }
    .xxx{
        margin-top:100px;
    }
    .van-cell{
        background-color:#FD8;
    }
</style>

