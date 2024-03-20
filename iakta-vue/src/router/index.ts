import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../pages/Home.vue'), name: 'home' },
  { path: '/about', component: () => import('../pages/About.vue'), name: 'about' },
  {
    path: '/posts',
    component: () => import('../pages/posts.vue'),
    name: 'posts',
  },
  // {
  //   path: '/posts/:postId',
  //   component: () => import('../pages/PostAndComment.vue'),
  //   props: true,
  // },
  {
    path: '/posts/:postId',
    component: () => import('../pages/PostPage.vue'),
    props: true,
    name: 'post',
    children: [
      {
        path: 'comments',
        component: () => import('../pages/Comment.vue'),
        props: true,
      },
      {
        path: 'comments/:commentId',
        component: () => import('../pages/Comment.vue'),
        props: true,
        name: 'postAndComment',
      },
    ],
  },
  {
    path: '/test-provide-inject',
    component: () => import('../pages/TestProvideInject.vue'),
    name: 'testProvideInject',
  },
  {
    path: '/test-transition',
    component: () => import('../pages/TestTransition.vue'),
    name: 'testTransition',
  },
  {
    path: '/movies',
    component: () => import('../pages/MoviesPage.vue'),

  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
