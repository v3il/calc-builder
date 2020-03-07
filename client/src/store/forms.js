export default {
    namespaced: true,

    state: {
        createdForms: [],
    },

    getters: {},

    mutations: {
        SET_FORMS(state, payload) {
            state.createdForms = payload;
        },

        ADD_FORM(state, form) {
            state.createdForms.push(form);
        },

        REMOVE_FORM(state, formToRemove) {
            state.createdForms = state.createdForms.filter(item => item.id !== formToRemove.id);
        },
    },

    actions: {
        loadForms() {},

        addForm(context, payload) {
            context.commit('ADD_FORM', payload);
        },

        removeForm(context, payload) {
            context.commit('REMOVE_FORM', payload);
        },

        saveForms() {
            // context.commit('SAVE_FORMS');
        },
    },
};
