import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import store from '../store';

const listBase = () => import(/* webpackChunkName: "group-foo" */ '../views/index.vue');
const chapter = () => import(/* webpackChunkName: "group-foo" */ '../views/chapter.vue');
const article = () => import(/* webpackChunkName: "group-foo" */ '../views/article.vue');
const ERROR = () => import(/* webpackChunkName: "group-foo" */ '../views/404.vue');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/free'
    },{
      path: '/free',
      component: listBase,
      name: 'free',
      meta: {
        title: '限时免费',
        menu: 'showMenuRight'
      }
    },{
      path: '/chapter/:bookId',
      component: chapter,
      name: 'chapter',
      meta: {
        title: '目录',
        menu: 'showMenuLeft'
      }
    },{
      path: '/article/:bookId/:articleId',
      component: article,
      name: 'article',
      meta: {
        title: '文章',
        menu: 'hideMenu'
      }
    },{
      path: '/404',
      component: ERROR,
      name: 'error',
      meta: {
        title: 'ERROR'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // console.log(savedPosition);
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

// Set title
let setTitle = function(title: string) {
  title = title ? `${title}` : 'welcome';
  window.document.title = title + '-免费小说阅读';
};

// Global preset hook
router.beforeEach((to, from, next) => {
  // Start animation
  NProgress.start();
  store.commit('flagLoading', { show: true });

  // Settings menu display
  store.commit('changeTitle', {
    browserHeaderTitle: to.meta.title
  });
  store.commit(to.meta.menu);

  // Continue
  next();
});

// Global rear hook (Next is invalid)
router.afterEach((to, from) => {
  // Finsh animation
  NProgress.done();
  setTimeout(function() {
     store.commit('flagLoading', { show: false });
     setTitle(store.state.header.browserHeaderTitle);
  }, 500);

});

export default router;
