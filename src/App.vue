<template>
  <div id="app">
    <headerTop></headerTop>
    <router-view/>
    <!--<index></index>-->
  </div>
</template>

<script>
import index from './views/index'
import headerTop from './layout/header'
export default {
  name: 'App',
  data() {
    return {
      title: '限时免费'
    }
  },
  components: {
    index,
    headerTop
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
header {
  min-height: 50px;
  line-height: 50px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
</style>
