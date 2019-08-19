<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app{
 	/* max-width: 640PX; */
	 font-family: "微软雅黑";
	 margin: 0 auto;
}

.auto-img{
	width: 100%;
	display: block;
}

p{
	margin: 0;
}
</style>

