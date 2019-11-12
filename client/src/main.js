import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import KeenUI from 'keen-ui';
import App from './App.vue';
import router from './router';
import store from './store/store';

import 'keen-ui/dist/keen-ui.css';

import 'vue-slider-component/theme/default.css';

Vue.use(KeenUI);
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.mixin({
    methods: {
        uSign(signId, defaultValue, replacements = []) {
            let sign = defaultValue;

            replacements.forEach(replacement => {
                sign = sign.replace('%s', replacement);
            });

            return sign;
        },
    },
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
