<template>
  <div>
    <div class="main">
      <ul class="m-list">
        <li v-for="list in freeList">
          <list-item :params="list"></list-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import ListItem from './base/listItem';

export default {
  data() {
    return {
      title: '限时免费',
      text: 'nihao',
      freeList: []
    }
  },
  created() {
    console.log('created');

    this.myStroeTitle();
    this.request();
  },
  methods: {
    request() {
      console.log('request');
      this.$http.get('/m/free').then(res => {
        console.log(res);
        this.freeList = res.list;
      });
    },
    myStroeTitle() {
      this.$store.commit('changeTitle', {
        browserHeaderTitle: '限时免费',
        headerBack: false,
        headerMenu: true
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
