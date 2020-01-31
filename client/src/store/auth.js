export default {
    namespaced: true,

    state: {
        isAuthorized: false,
        currentUser: null,
    },

    getters: {},

    mutations: {
        AUTH(state, user) {
            state.isAuthorized = true;
            state.currentUser = user;
        },

        LOGOUT(state) {
            state.isAuthorized = false;
            state.currentUser = null;
        },
    },

    actions: {
        login(context, user) {
            const { login, password } = user;
            const isValidUser = [login, password].every(item => item === 'admin');

            if (isValidUser) {
                context.commit('AUTH', user);
                return true;
            }

            return false;
        },

        register(context, user) {
            const { login, password } = user;
            console.log(login, password);
        },

        logout(context) {
            context.commit('LOGOUT');
        },
    },
};
