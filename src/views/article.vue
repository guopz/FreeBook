<template>
  <div class="content chapter-content">
    <div class="chapter-head">
        <div class="title" data-name="title"> {{ page.title }}</div>
    </div>
    <div class="chapter-text" data-act="read_text" id="contentText" v-html="page.content">
    </div>
    <div class="m-button-bar">
        <ul class="u-tab">
            <li id="perv_button">上一章</li>
            <li id="next_button">下一章</li>
        </ul>
    </div>

    <!-- layer -->
    <div class="m-artical-action">
        <div class="artical-action-mid" id="action_mid" @click="myPageTab"></div>
    </div>
    <!-- top -->
    <div id="top-nav" class="top-nav" :style="{ display: show?'block':'none' }">
        <div class="icon-back"></div>
        <div class="nav-title">返回书架</div>
    </div>
    <!-- buttom -->
    <div id="button-nav" class="button-nav" :style="{ display: show?'block':'none' }">
        <ul class="u-tab-li">
            <li @click="myGotoList">目录</li>
            <li><span @click="myPageTabFont">字体</span></li>
            <li><span id="night-button">白天</span></li>
        </ul>
    </div>

    <div class="nav-pannel" id="font-container" :style="{ display: fontFlag?'block':'none' }">
        <div class="child-mod">
            <span>字号</span>
            <button  class="font-size-button">大</button>
            <button id="small-font" class="font-size-button">小</button>
        </div>
        <div class="child-mod">
            <span>背景</span>
            <div class="bk-container">
                <div class="bk-container-current"></div>
            </div>
        </div>
    </div>
    <!-- end -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        fontFlag: false,
        bookId: '',
        articleId: '',
        page: {}
      }
    },
    created() {
      console.log(this.$route);
      this.bookId = this.$route.params.bookId;
      this.articleId = this.$route.params.articleId;
      this.myStroeTitle();
      this.request();
    },
    methods: {
      request() {
        let bookId = this.bookId,
            articleId = this.articleId;
            console.log(bookId, articleId);
        this.$http.get('/m/article',{ params: { bookId, articleId }}).then(res => {
          // console.log(res);
          this.page = res;
        });
      },
      myPageTab() {
        console.log('myPageTab');
        this.show = !this.show;
        this.fontFlag = false;
      },
      myPageTabFont() {
        console.log('myPageTabFont');
        this.fontFlag = !this.fontFlag;
      },
      myGotoList() {
        this.$router.push({ name: 'chapter', params: {bookId:this.bookId} });
      },
      myStroeTitle() {
        this.$store.commit('changeTitle', {
          browserHeaderTitle: '目录',
          headerBack: false,
          headerMenu: false
        });
      }
    }
  }
</script>

<style>

.chapter-content {
    background: #E9DEC6;
    overflow: hidden;
}

.chapter-content .chapter-head {
    margin: 15px;
    padding-bottom: 15px;
    font-size: 20px;
    color:#736557;
    border-bottom: 1px solid #736557;
    letter-spacing: 2px;
    font-weight: bold;
}

.chapter-content .chapter-head .title {
    font-size: 18px;
    color: #333
}

.chapter-content .chapter-text {
    margin: 10px 15px;
    font-size: 16px;
    line-height: 27px;
    color: #333
}

.chapter-content .chapter-text p {
    text-indent: 2em;
    margin: 2px 0;
    text-align: justify;
}
/* new */
.u-tab{
    height: 34px;
    margin: 10px auto;
    line-height: 34px;
    border-radius: 3px;
    border:1px solid #858382;
    font-size: 12px;
    background: #000;
    opacity: 0.9;
}
.u-tab li{
    display: inline-block;
    width: 49%;
    text-align: center;
    border-radius: 5px;
    border-right: 1px solid #fff;
    color: #fff;
}
.u-tab li:last-child{border:none;}
.m-button-bar{
  width: 70%;
  max-width: 800px;
  padding:5px;
  margin:10px;
  margin: 0 auto;
}
.artical-action-mid{
    position: fixed;
    z-index: 10002;
    width: 100%;
    height: 30%;
    top:30%;
}

.button-nav{
    width: 100%;
    position: fixed;
    bottom:0;
    z-index: 9999;
}
.u-tab-li{
    height: 70px;
    background:rgba(0,0,0,.9);
}
.u-tab-li li{
  display: inline-block;
  width: 32%;
  text-align: center;
  color: #fff;
  line-height: 70px;
}
.top-nav{
    position: fixed;
    top:0;
    height: 50px;
    width: 100%;
    z-index: 9999;
    background:rgba(0,0,0,.9);
}
.icon-back{
    position: absolute;
    top:14px;
    left: 10px;
    width: 23px;
    height: 23px;
    background: url();
    color: #fff;
}
.nav-title{
    position: absolute;
    color: #fff;
    top:14px;
    left: 30px;
}
.nav-pannel{
  position: fixed;
  bottom: 70px;
  height: 135px;
  width: 100%;
  background: rgba(0,0,0,.9);
  z-index: 10000;
  color:#fff;
}
.child-mod{
  padding: 5px 10px;
  margin: 15px;
}
.child-mod span{
  display: inline-block;
  padding-right: 20px;
  padding-left: 10px;
}
.font-size-button{
  background: none;
  border:1px solid #8c8c8c;
  border-radius: 20px;
  color: #fff;
  padding: 5px 30px;
  margin-right: 10px;
}
.bk-container{
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #fff;
    display: inline-block;
    vertical-align: -12px;
  }
.bk-container-current{
    position: absolute;
    top:-2px;
    left:-2px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-block;
}
</style>
