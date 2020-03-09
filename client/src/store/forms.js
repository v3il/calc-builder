import axios from '../axios';

export default {
    namespaced: true,

    state: {
        createdForms: [],
        loading: false,
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

        START_LOADING(state) {
            state.loading = true;
        },

        STOP_LOADING(state, forms) {
            state.createdForms = forms;
            state.loading = false;
        },
    },

    actions: {
        async loadForms(context) {
            context.commit('START_LOADING');
            const response = await axios.get('/forms');
            context.commit('STOP_LOADING', response.data);
        },

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
