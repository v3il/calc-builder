export default {
    namespaced: true,

    store: {
        calculators: [],
        selectedCalculator: [123, 321],
    },

    getters: {
        selectedCalc(state) {
            console.log(state)
            return state.calculators;
        }
    },

    mutations: {

    },

    actions: {

    },
}