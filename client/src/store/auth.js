import axios from 'axios';

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
        async login(context, user) {
            const { login, password } = user;

            try {
                /*const r = */ await axios.post('http://localhost:3000/login', {
                    login,
                    password,
                });

                // context.commit('AUTH', user);
                // return true;
            } catch (e) {
                console.log(e);
                return false;
            }

            // const isValidUser = [login, password].every(item => item === 'admin');
            //
            // if (isValidUser) {
            //     context.commit('AUTH', user);
            //     return true;
            // }
            //
            // return false;
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
