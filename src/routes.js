import PollList from './views/PollList.vue';
import PollDetail from './views/PollDetail.vue';
import News from './views/News.vue';
import About from './views/About.vue';
import NotFound from './views/NotFound.vue';

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: PollList, meta: { title: 'Poll list' } },
  { path: '/poll/:id', component: PollDetail, meta: { title: 'Poll detail' } },
  {
    path: '/search',
    component: News,
    meta: { title: 'Search News' },
  },
  {
    path: '/search/:keyword/:topic',
    component: News,
    meta: { title: 'Search News' },
  },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./views/About.vue')
  },
  { path: '/:path(.*)', component: NotFound },
];
