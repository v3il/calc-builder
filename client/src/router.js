import Vue from 'vue';
import Router from 'vue-router';

import MainPage from './views/MainPage';

import CommonSettings from './components/CommonSettings.vue';
import LayoutBuilder from './components/LayoutBuilder.vue';
import ResultsBuilder from './components/ResultsBuilder.vue';

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
            children: [
                { path: 'common', name: 'formCommonSettings', component: CommonSettings },
                { path: 'layout', name: 'formLayout', component: LayoutBuilder },
                { path: 'results', name: 'formResults', component: ResultsBuilder },
            ]

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
