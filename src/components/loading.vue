<template>
  <div class="mock">
    <div class="main">

      <div>
        <div class="spinner new-spinner" role="spinner">
          <div class="spinner-icon"></div>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.mock {
  position: fixed;
  display: flex;
  align-items: center;
  top: rem(44px);
  width: 100%;
  height: 100%;
  // background-color: rgba(255, 255, 255, .8);
  justify-content: center;
}
.mock .main {
  position: relative;
  padding: 20px;
  background-color: rgba(0, 0, 0, .6);
  border-radius: 5px;
  color: #fff;
}

.new-spinner {
  position: absolute;
  top: 10px;
  right: 10px;
  display: block;
  z-index: 1031;
}
.spinner-icon {
  width: 18px;
  height: 18px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: solid 2px transparent;
  border-top-color: #08b295;
  border-left-color: #08b295;
  border-radius: 50%;
  -webkit-animation: nprogress-spinner 400ms linear infinite;
  animation: nprogress-spinner 400ms linear infinite;
}
</style>