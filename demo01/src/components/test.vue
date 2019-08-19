<template>
   <div class="prompt_text">
	   <div class="move_time">
         <span id="num">{{count}}</span>秒后转至首页
	   </div>
   </div>
</template>
<script>
    
	export default {
		name:'test',
		 data() {
			return {
			       count:"",//倒计时
					}

			 },
			 created(){
//根据需求确定在哪里调用
        this.goGrdoupRecor();
},
methods: {
	goGrdoupRecor(){
		const TIME_COUNT = 3;
		if(!this.timer){
			 this.count = TIME_COUNT;
			 this.show = false;
			this.timer = setInterval(() => {
				   if(this.count > 0 && this.count <= TIME_COUNT){
                   this.count--;
        }else{
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
          //跳转的页面写在此处
          this.$router.push({name:'goods'})
        }
			  },1000)
		}
	}
}
	}
		

</script>
<style lang="less" scoped>
.prompt_text{
	position:absolute;
	left:0;
	top:0;
	bottom:0;
	right:0;
	margin:auto;
    background-image:url('../assets/timg (1).jpg');
	background-repeat: no-repeat;
	background-position: 0 0;
	background-size: cover;
}	
.move_time{
	display:block;
	position:absolute;
	right:10px;
	bottom:20px;
	font-size:20px;
	color:#fff;
}
</style>
