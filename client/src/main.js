import Vue from 'vue';
import VTooltip from 'v-tooltip';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VTooltip);
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
