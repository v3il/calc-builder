import axios from '../axios';

import authTokenService from '../service/authTokenService';

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
                const response = await axios.post('/login', {
                    login,
                    password,
                });

                const { token, user } = response.data;

                authTokenService.setToken(token);

                context.commit('AUTH', user);
                return true;
            } catch (error) {
                throw error;
            }
        },

        async register(context, user) {
            const { login, password } = user;

            try {
                return axios.post('/register', {
                    login,
                    password,
                });
            } catch (error) {
                throw error;
            }
        },

        logout(context) {
            context.commit('LOGOUT');
        },
    },
};
