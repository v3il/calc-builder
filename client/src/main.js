import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/store';

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
