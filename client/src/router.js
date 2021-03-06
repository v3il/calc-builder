import Vue from 'vue';
import Router from 'vue-router';

import FormsList from './views/FormsList';
import FormEditor from './views/FormEditor';
import AuthPage from './views/AuthPage';

import LayoutBuilder from './components/LayoutBuilder.vue';
import ResultsBuilder from './components/ResultsBuilder.vue';

import authTokenService from './service/authService';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: AuthPage,
        },
        {
            path: '/register',
            name: 'register',
            component: AuthPage,
        },
        {
            path: '/',
            name: 'home',
            component: FormsList,
            meta: { requiresAuth: true },
        },
        {
            path: '/constructor/:id',
            component: FormEditor,
            meta: { requiresAuth: true },
            children: [
                // { path: 'common', name: 'formCommonSettings', component: CommonSettings },
                { path: 'layout', name: 'formLayout', component: LayoutBuilder },
                { path: 'results', name: 'formResults', component: ResultsBuilder },
                { path: '', redirect: { name: 'formLayout' } },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const isAuthorized = authTokenService.isAuthorized();

    if (['login', 'register'].includes(to.name) && isAuthorized) {
        return next({ name: 'home' });
    }

    if (to.meta.requiresAuth) {
        if (isAuthorized) {
            next();
        } else {
            next({ name: 'login' });
        }
    } else {
        next();
    }
});

export default router;
