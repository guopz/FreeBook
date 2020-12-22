<template>
  <div class="chapter" :key="$route.path">
    <ul>
      <li @click="myTabTo(item.articleId)" v-for="item in chapters" :key="item.articleId" :article-id="item.articleId">{{ item.name }}</li>
    </ul>
    <div class="page-turn">
        <div class="page-last"><a @click="myCurPrev">上一页</a></div>
        <div class="page-select">
          <select @change="myGotoPage" v-model="curIndex">
              <option v-for="(item, index) in totals" :key="index">{{ item }}</option>
          </select>
        </div>
        <div class="page-next"><a @click="myCurNext">下一页</a></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bookId: '',
        chapters: [],
        totals: [],
        curIndex: '1'
      }
    },
    created() {
      console.log(this.$route.query);
      this.bookId = this.$route.params.bookId;
      this.curIndex = this.$route.query.page;
      this.request();
    },
    methods: {
      request() {
        let bookId = this.bookId,
            curIndex = this.curIndex;
        this.$http.get('/m/chapter',{ params: { bookId, curIndex }}).then(res => {
          // The assignment
          this.chapters = res.list;
          this.totals = res.totals;
          this.curIndex = res.curIndex;
          // Memory section scope
          if (this.curIndex == 1) {
            sessionStorage.setItem('H5_CHAPTER_TANGE', res.chapterRange);
          }
        });
      },
      myTabTo(id) {
        this.$router.push({ name: 'article', params: { bookId: this.bookId, articleId: id }});
      },
      myStroeTitle() {
        this.$store.commit('changeTitle', {
          browserHeaderTitle: '目录',
          headerBack: true,
          headerMenu: false
        });
      },
      myGotoPage(ele) {
        this.curIndex = ele.target.value;
        this.myGotoBase(this.curIndex);
      },
      myGotoBase(id) {
        this.$router.push({ name: 'chapter', params: { bookId: this.bookId }, query: { page: id }});
      },
      myCurPrev() {
        if (this.curIndex <= 1) return alert('已经是首页了！');
        this.curIndex = parseInt(this.curIndex) - 1;
        this.myGotoBase(this.curIndex);
      },
      myCurNext() {
        if (this.curIndex >= this.totals) return alert('已经是最后了！');
        this.curIndex = parseInt(this.curIndex) + 1;
        this.myGotoBase(this.curIndex);
      }
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          this.request();
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.chapter {
  padding: rem(10px);
  ul {
    min-height: 100vh;
  }
  li {
    padding: rem(10px) 0;
    border-bottom: rem(0.5px) solid #F5F5F5;
    color: #7b7a7b;
    font-size: rem(14px);
  }
}
// 分页
.page-turn {
    // height: 33px;
    display: -webkit-box;
    padding: 10px 0;
}

.page-turn .page-last,.page-turn .page-next {
    height: 33px;
    line-height: 33px;
    border: 1px solid #b4b4b4;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    text-align: center;
    color: #b4b4b4;
    padding: 0 15px;
    display: block;
    font-size: 16px;
}

.page-turn a {
    color: #b4b4b4
}

.page-turn .page-select {
    text-align: center;
    color: #b4b4b4;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0 10px;
    height: 33px;
    border: 1px solid #b4b4b4;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    display: block;
    font-size: 16px;
    min-width: rem(165px);
}

.page-turn .page-select select {
    color: #b4b4b4;
    width: 100%;
    height: 100%;
    border: none;
    outline: 0;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    background-color: #fff;
}

.page-turn .page-select select option {
    color: #b4b4b4
}

.page-turn .page-select a.back {
    line-height: 33px
}
</style>
