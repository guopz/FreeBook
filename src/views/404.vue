<template>
  <div class="error">
      <div class="text">
        <p>{{ text }}</p>
        <p class="btn" @click="myGotoHome">阅读更多的文章</p>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: '您访问的页面走失了！'
      }
    },
    created() {
      console.log('404');
    },
    methods: {
      myGotoHome() {
        this.$router.push('/free');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .error {
     height: 100%;
     width: 100%;
     background-color: #f0f9eb;
     display: flex;
     align-items: center;
     justify-content: center;
  }
  .text {
    text-align: center;
    P {
      font-size: 20px;
    }
  }
  p.btn {
    font-size: 15px;
    margin-top: 10px;
    border-bottom: 1px solid #67c23a;
    padding: 5px 0;
    color: #67c23a;
  }
</style>
