<template>
  <div class="content chapter-content" :class="[initTime ? 'chapter-back' : '']" >
    <div class="chapter-head">
        <div class="title" data-name="title"> {{ page.title }}</div>
    </div>
    <div class="chapter-text" data-act="read_text" id="contentText" v-html="page.content" :style="{fontSize: initFontSize + 'px'}">
    </div>
    <div class="m-button-bar">
        <ul class="u-tab">
            <li @click="myGotoPrev">上一章</li>
            <li @click="myGotoNext">下一章</li>
        </ul>
    </div>

    <!-- layer -->
    <div class="m-artical-action">
        <div class="artical-action-mid" id="action_mid" @click="myPageTab"></div>
    </div>
    <!-- top -->
    <div id="top-nav" class="top-nav" :style="{ display: show?'block':'none' }">
        <div class="icon-back"></div>
        <div class="nav-title" @click="myGotoList">返回书架</div>
    </div>
    <!-- buttom -->
    <div id="button-nav" class="button-nav" :style="{ display: show?'block':'none' }">
        <ul class="u-tab-li">
            <li @click="myGotoList">目录</li>
            <li><span @click="myPageTabFont">字体</span></li>
            <li><span @click="myPageTabTime">{{ initTime? '夜晚': 
            '白天' }}</span></li>
        </ul>
    </div>

    <div class="nav-pannel" id="font-container" :style="{ display: fontFlag?'block':'none' }">
        <div class="child-mod">
            <span>字号</span>
            <button @click="myPageFontLarge" class="font-size-button">大</button>
            <button @click="myPageFontSmall" class="font-size-button">小</button>
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
        page: {},
        scrollTop: '',
        initFontSize: 16,
        initTime: false
      }
    },
    created() {
      this.bookId = parseInt(this.$route.params.bookId);
      this.articleId = parseInt(this.$route.params.articleId);
      this.request();
    },
    methods: {
      request() {
        let bookId = this.bookId,
            articleId = this.articleId;
        this.$http.get('/m/article',{ params: { bookId, articleId }}).then(res => {
          this.page = res;
          this.myStroeTitle();
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
        let self = this;
        this.$store.commit('changeTitle', {
          browserHeaderTitle: self.page.title
        });
      },
      myGotoBase(articleId) {
        this.$router.push({ name: 'article', params: { bookId: this.bookId, articleId }});
      },
      myGotoNext() {
        console.log('myGotoNext');
        let lastPage = sessionStorage.getItem('H5_CHAPTER_TANGE').split(',');

        if (this.articleId >= lastPage[1])  return alert('已经到是最后一章了！');
        this.myGotoBase(this.articleId + 1);
          
      },
      myGotoPrev() {
        console.log('myGotoPrev');
        let lastPage = sessionStorage.getItem('H5_CHAPTER_TANGE').split(',');

        if (this.articleId <= lastPage[0]) return  alert('现在是第一章！');
        this.myGotoBase(this.articleId - 1);
      },
      myPageFontBase() {
        var initFontSize = sessionStorage.getItem('font_size');
        initFontSize = parseInt(initFontSize);
        if(!initFontSize){
            initFontSize = 16;
        }
        this.initFontSize = initFontSize;
      },
      myPageFontLarge() {
        console.log('myPageFontLarge');
        if(this.initFontSize > 19){
            return;
        }
        this.initFontSize += 1;
        sessionStorage.setItem('font_size', this.initFontSize);
      },
      myPageFontSmall() {
         console.log('myPageFontSmall');
         if(this.initFontSize < 13){
              return;
          }
          this.initFontSize -= 1;
          sessionStorage.setItem('font_size', this.initFontSize);
      },
      myPageTabTime() {
        // console.log('myPageTabTime');
        this.initTime = !this.initTime;
      }
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          this.articleId = val.params.articleId;
          this.request();
        },
        deep: true
      }
    }
  }
</script>

<style>

.chapter-content {
    background: #E9DEC6;
    overflow: hidden;
    color: #333;
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
}

.chapter-content .chapter-text {
    margin: 10px 15px;
    font-size: 16px;
    line-height: 27px;
    min-height: 100vh;
    line-height: 1.6;
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
    font-size: 0;
    height: 70px;
    background:rgba(0,0,0,.9);
}
.u-tab-li li{
  display: inline-block;
  width: 32%;
  text-align: center;
  color: #fff;
  line-height: 70px;
  font-size: 16px;
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
    font-size: 16px;
}
.nav-pannel{
  position: fixed;
  bottom: 70px;
  height: 70px;
  width: 100%;
  background: rgba(0,0,0,.9);
  z-index: 10000;
  color:#fff;
}
.child-mod{
  font-size: 16px;
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
.chapter-back {
  background-color: #0F3756;
  color: #84b9e5;
}
</style>
