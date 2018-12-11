import Vue from 'vue';
import Vuex from 'vuex';

import getNextId from '@/utils/getNextId';

Vue.use(Vuex);

export default new Vuex.Store({
    // strict: true,

    state: {
        calculators: JSON.parse(localStorage.getItem('Calcs')) || [],
        selectedCalculator: null,
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
        },

        updateData(state) {
            console.log(state.calculators)
            localStorage.setItem('Calcs', JSON.stringify(state.calculators));
        },

        addCalculator(state) {
            const id = getNextId(state.calculators);

            state.calculators.push({
                id,
                name: `Calc${id}`,
                layout: []
            });

            localStorage.setItem('Calcs', JSON.stringify(state.calculators));
        },

        removeCalculator(state, calc) {
            state.calculators = state.calculators.filter(item => item !== calc);
            localStorage.setItem('Calcs', JSON.stringify(state.calculators));
        },
    },

    actions: {
        selectCalc(context, payload) {
            context.commit('selectCalc', payload);
        },

        updateData(context) {
            context.commit('updateData');
        },

        addCalculator(context) {
            context.commit('addCalculator');
        },

        removeCalculator(context, payload) {
            context.commit('removeCalculator', payload);
        }
    }
});
