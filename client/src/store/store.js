import Vue from 'vue';
import Vuex from 'vuex';

import Calculators from './Calculators';

Vue.use(Vuex);

export default new Vuex.Store({
    // strict: true,

    state: {
        calculators: [
            {id: 1, layout: [], name: 'Calc 1'},
            {id: 2, layout: [], name: 'Calc 2'},
            {id: 3, layout: [], name: 'Calc 3'},
        ],

        selectedCalculator: {id: 1, layout: [], name: 'Calc 1'},
    },

    getters: {
        allCalculators(state) {
            return state.calculators;
        },

        selectedCalculator(state) {
            return state.selectedCalculator;
        },
    },

    mutations: {
        selectCalc(state, calc) {
            state.selectedCalculator = calc;
            console.log(3, state.selectedCalculator)
        },

        updateLayout(state, layout) {
            state.selectedCalculator.layout = layout;
        }
    },

    actions: {
        selectCalc(context, payload) {
            context.commit('selectCalc', payload);
        },

        updateLayout(context, payload) {
            context.commit('updateLayout', payload);
        }
    }

    // modules: {
    //     calc: Calculators,
    // }
});
