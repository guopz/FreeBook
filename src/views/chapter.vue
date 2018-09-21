<template>
  <div class="chapter">
    <ul>
      <li @click="myTabTo(item.articleId)" v-for="item in chapters" :article-id="item.articleId">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bookId: '',
        chapters: []
      }
    },
    created() {
      console.log(this.$route.params);
      this.bookId = this.$route.params.bookId;
      this.myStroeTitle();
      this.request();

    },
    methods: {
      request() {
        let bookId = this.bookId;
        this.$http.get('/m/chapter',{ params: { bookId }}).then(res => {
          // console.log(res);
          this.chapters = res.list;
        });
      },
      myTabTo(id) {
        this.$router.push({ name: 'article', params: { bookId: this.bookId, articleId: id }, query: { name: 'nihao' }});
      },
      myStroeTitle() {
        this.$store.commit('changeTitle', {
          browserHeaderTitle: '目录',
          headerBack: true,
          headerMenu: false
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
.chapter {
  padding: rem(10px);
  li {
    padding: rem(10px) 0;
    border-bottom: rem(0.5px) solid #F5F5F5;
    color: #7b7a7b;
    font-size: rem(14px);
  }
}
</style>
