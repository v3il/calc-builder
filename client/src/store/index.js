import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import forms from './forms';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        forms,
    },
});
