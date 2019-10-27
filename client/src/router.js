import Vue from 'vue';
import Router from 'vue-router';

import FormsList from './views/FormsList';
import FormEditor from './views/FormEditor';

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
            component: FormsList,
        },
        {
            path: '/constructor/:id',
            component: FormEditor,
            children: [
                // { path: 'common', name: 'formCommonSettings', component: CommonSettings },
                { path: 'layout', name: 'formLayout', component: LayoutBuilder },
                { path: 'results', name: 'formResults', component: ResultsBuilder },
                { path: '', redirect: { name: 'formCommonSettings' } },
            ]

        },
    ],
});
