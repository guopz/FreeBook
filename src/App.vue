<template>
  <div id="app">
    <headerTop></headerTop>
    <router-view />
    <loading v-if="LOADING" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { mapGetters } from "vuex";

import headerTop from "./layout/header.vue";
import loading from "./components/loading.vue";
export default Vue.extend({
  name: "App",
  data() {
    return {
      title: "限时免费",
    };
  },
  computed: {
    // ...mapGetters(["LOADING"]),
    'LOADING'() {
      return this.$store.getters.LOADING;
    }
  },
  created() {
    console.log("loading", this.LOADING);
  },
  components: {
    headerTop,
    loading,
  },
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  max-width: 768px;
  min-width: 320px;
  margin: 0 auto;
}

#nprogress .spinner {
  display: none !important;
}

#nprogress .bar {
  background: #08b295;
}
</style>
