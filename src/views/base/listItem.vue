<template>
  <div class="m-list-box" @click="myTabTo(params.articleid)">
    <p class="img"><img :src="params.cover" alt="bg"></p>
    <div class="m-content">
      <p class="u-1">{{ params.articlename }}</p>
      <p class="u-2">{{ params.intro }}</p>
      <p class="u-3">
        <!--<span class="u-gray">{{  }}</span>-->
        <span class="u-red">{{ params.fullflag_text }}</span>
        <span class="u-green">{{ params.size_text }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['params'],
  data() {
    return {
      id: ''
    }
  },
  created() {
    // console.log('listItem');
  },
  methods: {
    myTabTo(id) {
      this.id = id;
      this.$router.push({ name: 'chapter', params: { bookId: id }});
      // this.request();
    },
    request() {
      let id = this.id;
      console.log(id);
      this.$http.get('/m/detail',{ params: { id }}).then(res => {
        console.log(res);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
/* list */
.m-list-box {
  display: flex;
  padding: rem(15px);
  border-bottom: 1px solid #f0f1f2;
  .img {
    width: rem(80px);
    height: rem(120px);
  }
  img {
    width: rem(80px);
    height: rem(120px);
    box-shadow: 0.078125rem 0.078125rem 0.078125rem #e1e1e1;
  }
  .u-1 {
    max-width: 80%;
    overflow: hidden;
    height: 0.546875rem;
    font-size: rem(17px);
    color: #6e6e6e;
    margin: rem(5px);
    margin-left: 0;
    line-height: 0.546875rem;
  }
  .u-2 {
    font-size: rem(13px);
    color: #999999;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }
  .u-3 {
    position: absolute;
    right: 0;
    bottom: 0;

    span {
      display: inline-block;
      padding: 1px 3px;
      font-size: rem(12px);
    }
  }
  .u-gray {
    color: #999999;
    border: 1px solid #999999;
  }
  .u-green {
    color: #08b295;
    border: 1px solid #08b295;
  }
  .u-red {
    color: #fc5e50;
    border: 1px solid #fc5e50;
  }

  .m-content {
    flex: 1;
    margin-left: 15px;
    position: relative;
  }
}
</style>
