<template>
  <div class="login">
   <div class="nav">
     <router-link :to="{name: 'Register'}" class="register-text">注册</router-link>
   </div>
    <!-- <div class="logo">
			<img class="auto-img" src="../assets/img/mi_load.png" />
		</div> -->
        <van-row>
            <van-col offset="2" span="20">
                <van-cell-group>
                    <van-field class="label" label="手机号"  placeholder="请输入手机号" v-model="userInfo.phone"/>
                    <van-field class="label" type="password" label="密码"  placeholder="请输入密码" v-model="userInfo.pwd" />
                </van-cell-group>
                <van-button class="register-btn" size="large"  @click="login">登陆</van-button>
            </van-col>
       </van-row>
  </div>
</template>


<script>

import {Field, CellGroup, Button} from 'vant';
import validForm from '../Utils/vaidform.js'
import tip from '../Utils/tip.js'


export default {
  name: 'Login',
  data() {
    return {
      // 用户列表
      users: [],

      // 用户信息
      userInfo: {
        phone:'',
        pwd:''
      }
    };
  },

  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button 
  },

  methods: {

    login() {
      // 验证手机号
      if(!validForm.validPhone(this.userInfo.phone)) {

        tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');
      }else if(!validForm.validPwd(this.userInfo.pwd, 8, 16)){
        //验证密码
        tip.dialogTip('密码只支持!@._字母数字组合', true, this.userInfo, 'pwd');
      }else {
        var userData = localStorage.getItem('users');

        if(userData) {
          // 用户存在
          this.users = JSON.parse(userData);
       
          for(var i =0; i< this.users.length; i++) {
            if(this.users[i].phone == this.userInfo.phone) {
               //如果手机号匹配, 验证密码
               if(this.users[i].pwd == this.userInfo.pwd) {
                 //保存用户登录状态{userId: 手机号, loginStatus: true}
                localStorage.setItem('userLogin', JSON.stringify({userId: this.userInfo.phone, loginStatus: true}));


                 return this.$router.push({name: 'goods'});

               }else {

              return tip.dialogTip('手机号或密码不正确');

            }
            }
          }

           // 不存在用户
           tip.dialogTip('该用户不存在')

        }
      }
    },

    //跳转函数
    goPath() {
      this.$router.push({name: 'Register'})
    }
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


.login-btn{
    margin-top: 1.3333rem;
	}
.logo{
  width: 3.5rem;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
}
	.nav{
		height: 360px;
    // background:#FBC395;
    background:url('../assets/login_concept.png');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100%;
		margin-bottom:  1.3333rem;
		.register-text{
			float: right;
			font-size: 14PX;
			color: #fff;
			line-height: 1.3333rem;
      margin-right: 0.5333rem;
		}
  }
  .register-btn{
    background:#FA5463;
    color:#fff;
    margin-top:70px;
  }
 
</style>


