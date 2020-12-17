import Vue from 'vue';
import VueRouter from 'vue-router';

import LandingPage from './components/LandingPage';
import MtnPage from './components/MtnPage';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'landingpage', component: LandingPage },
  { path: '/:slug', name: 'mtnpage', component: MtnPage },
];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
});

export default router;
