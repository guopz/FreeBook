<template>
  <div id="app">
    <headerTop></headerTop>
    <router-view />
    <loading v-if="LOADING" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Action, Mutation, State, Getter, namespace } from "vuex-class";
import headerTop from "./layout/header.vue";
import loading from "./components/loading.vue";

@Component({
  components: {
    headerTop,
    loading
  }
})
export default class extends Vue {
  private title:string =  "限时免费";
  @Getter('LOADING') private LOADING: any;

  created() {
    console.log("created ==>", this.LOADING);
  }
  mounted() {
     console.log("mounted ==>", this.LOADING);
  }
};
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
