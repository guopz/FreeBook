<template>
  <div>
    <div class="main">
      <ul class="m-list">
        <li v-for="(list, index) in freeList" :key="index">
          <list-item :params="list"></list-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import ListItem from './base/listItem.vue';

export default {
  data() {
    return {
      title: '限时免费',
      text: 'nihao',
      freeList: []
    }
  },
  created() {
    this.request();
  },
  methods: {
    request() {
      this.$http.get('/m/free').then(res => {
        this.freeList = res.list;
      });
    }
  },
  components: {
    ListItem
  }
}
</script>

<style lang="scss" scoped>

  .main {
    // background-color: #ddd;
    border-radius: 5px;
    display: flex;
    min-height: 100px;
    align-items: center;
    justify-content: center;
    white-space: normal;
  }


</style>
