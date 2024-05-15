import Layout from '@/layout/LayoutPage.vue'

export default {
  path: '/article',
  component: Layout,
  redirect: '/article/ranking',
  name: 'articleRanking',
  meta: { title: 'article', icon: 'article' },
  children: [
    {
      path: '/article/ranking',
      component: () => import('@/views/Article/ArticleRanking/ArticleRanking'),
      meta: {
        title: 'articleRanking',
        icon: 'article-ranking',
      },
    },
    {
      path: '/article/:id',
      component: () => import('@/views/Article/ArticleDetail/ArticleDetail'),
      meta: {
        title: 'articleDetail',
      },
    },
    {
      path: '/article/create',
      component: () => import('@/views/Article/ArticleCreate/ArticleCreate'),
      meta: {
        title: 'articleCreate',
        icon: 'article-create',
      },
    },
    {
      path: '/article/editor/:id',
      component: () => import('@/views/Article/ArticleCreate/ArticleCreate'),
      meta: {
        title: 'articleEditor',
      },
    },
  ],
}
