import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const listBase = () => import(/* webpackChunkName: "group-foo" */ '../views/index.vue');
const chapter = () => import(/* webpackChunkName: "group-foo" */ '../views/chapter.vue');
const article = () => import(/* webpackChunkName: "group-foo" */ '../views/article.vue');
const ERROR = () => import(/* webpackChunkName: "group-foo" */ '../views/404.vue');

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/free'
    },{
      path: '/free',
      component: listBase,
      name: 'free'
    },{
      path: '/chapter/:bookId',
      component: chapter,
      name: 'chapter'
    },{
      path: '/article/:bookId/:articleId',
      component: article,
      name: 'article'
    },{
      path: '/404',
      component: ERROR,
      name: 'error'
    }
  ]
})

export default router;
