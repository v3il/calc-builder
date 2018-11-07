import Vue from 'vue';
import Vuex from 'vuex';

import Calculators from './Calculators';

Vue.use(Vuex);

export default new Vuex.Store({
    // strict: true,

    // state: {
    //     selectedCalculator: [123, 321],
    // },
    //
    // mutations: {},
    // actions: {},

    modules: {
        calc: Calculators,
    }
});
