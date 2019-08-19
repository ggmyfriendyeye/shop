<template>
    <div class="main">
        <div class="content">
            <h3>欢迎，来到这里！！！</h3>
            <div class="link"  @mouseover="enter()" @mouseleave="leave()" :class="{hover: seen}">
                <span @click="goPath">go</span>
            </div>
        </div>
      
    </div>
</template>
<script>
export default {
    name:'toDo',
    data() {
        return {
            seen:false
        }
    },
    methods: {
        goPath() {
            this.$router.push({name: 'Login'})
        },
        enter(){
        this.seen = true;
      },
      leave(){
        this.seen = false;
      }
    }
}
</script>
<style scoped>

.content{
    height: 2.6666rem;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin: auto;
}
.content h3{
    text-align:center;
}
.link{
    width: 5.3333rem;
    height: 1.0666rem;
    background:rgba(204, 204, 204, 0);
    margin: 0 auto;
    border-radius:1.1333rem;
    text-align:center;
    line-height:1.0666rem;
    border:0.0266rem solid #fff;
}
.hover{
     background:rgba(204, 204, 204, 0.6);
}
</style>


