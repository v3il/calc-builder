import Vue from 'vue';
import Router from 'vue-router';

import MainPage from './views/MainPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/constructor/:id',
      name: 'constructor',
      component: () => import('./views/CalcConstructor.vue'),
    },
    {
      path: '/formula',
      name: 'formula',
      component: () => import('./views/FormulaConstructor.vue'),
    },
    {
      path: '/relations',
      name: 'relations',
      component: () => import('./views/FieldsRelationShips.vue'),
    },
  ],
});
