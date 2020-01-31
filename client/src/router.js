import Vue from 'vue';
import Router from 'vue-router';

import store from './store';

import FormsList from './views/FormsList';
import FormEditor from './views/FormEditor';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';

// import CommonSettings from "./components/CommonSettings.vue";
import LayoutBuilder from './components/LayoutBuilder.vue';
import ResultsBuilder from './components/ResultsBuilder.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage,
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
    if (to.meta.requiresAuth) {
        if (store.state.auth.isAuthorized) {
            next();
        } else {
            next({ name: 'login' });
        }
    } else {
        next();
    }
});

export default router;
