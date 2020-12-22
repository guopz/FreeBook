<template>
  <div class="head-bar" :style="{ display: !menu && !back ? 'none' : 'block' }">
    <div class="head-fixed">
      <div
        class="bar-left"
        @click="myGotoBack"
        :style="{ display: back ? 'block' : 'none' }"
      >
        <a class="goback"></a>
      </div>
      <div class="head-title">{{ title }}</div>
      <div
        class="bar-right"
        @click="myGotoMenu"
        :style="{ display: menu ? 'block' : 'none' }"
      >
        <a href="javascript:;" class="bar-more"></a>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '../utils/global'
export default {
  data() {
    return {
      header: "限时免费",
    };
  },
  created() {
    this.header = this.$store.state.header;
  },
  computed: {
    back() {
      return this.$store.state.header.headerBack;
    },
    menu() {
      return this.$store.state.header.headerMenu;
    },
    title() {
      return this.$store.state.header.browserHeaderTitle;
    },
  },
  methods: {
    myGotoBack() {
      this.$router.push({ name: "free" });
    },
    myGotoMenu: debounce(() => {
      console.log("nihao123123", this);
    }, 200)
  },
};
</script>

<style scoped>
.head-bar {
  padding: 0;
  margin: 0;
  height: 44px;
  line-height: 44px;
}
.head-fixed {
  position: fixed;
  top: 0;
  background: #fff;
  display: -webkit-box;
  z-index: 101;
  width: 100%;
  max-width: 768px;
}
.head-fixed:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #eaeaea;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.head-bar .head-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  font-size: 15px;
  color: #535353;
  text-align: center;
  width: 60%;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.head-bar .goback {
  background: url(../assets/image/goback.png) no-repeat center;
  -webkit-background-size: 10px;
  background-size: 10px;
  display: block;
  height: 44px;
  width: 44px;
}

.head-bar .home {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  padding: 0 5px;
  border: 1px solid #dfdfdf;
  border-radius: 3px;
  font-size: 13px;
  color: #999;
}

.head-bar .bar-left {
  position: absolute;
}

.head-bar .bar-right {
  position: absolute;
  /* right: 15px;*/
  top: 50%;
  margin-top: -8px;
  line-height: 0;
  height: 16px;
  width: 50px;
}

.head-bar .bar-more {
  position: absolute;
  right: 16px;
  display: inline-block;
  height: 16px;
  width: 16px;
  background: url(../assets/image/open_more.png) no-repeat center;
  background-size: 16px;
  /* vertical-align: text-bottom */
}

.head-bar .close-icon {
  background: url(../assets/image/open_more.png) no-repeat center;
  background-size: 16px;
}
</style>
