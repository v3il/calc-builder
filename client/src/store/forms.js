import getNextId from '@/utils/getNextId';

const localStorageKey = 'forms';

function saveFormsList(formsList) {
    localStorage.setItem(localStorageKey, JSON.stringify(formsList));
}

export default {
    namespaced: true,

    state: {
        createdForms: JSON.parse(localStorage.getItem(localStorageKey)) || [],
    },

    getters: {},

    mutations: {
        ADD_FORM(state) {
            const id = getNextId(state.createdForms);

            state.createdForms.push({
                id,
                name: `Form ${id}`,
                layout: [{ fields: [] }],
                contentMaxWidth: 750,
            });

            saveFormsList(state.createdForms);
        },

        REMOVE_FORM(state, formToRemove) {
            state.createdForms = state.createdForms.filter(item => item !== formToRemove);
            saveFormsList(state.createdForms);
        },

        SAVE_FORMS(state) {
            saveFormsList(state.createdForms);
        },
    },

    actions: {
        addForm(context) {
            context.commit('ADD_FORM');
        },

        removeForm(context, payload) {
            context.commit('REMOVE_FORM', payload);
        },

        saveForms(context) {
            context.commit('SAVE_FORMS');
        },
    },
};
