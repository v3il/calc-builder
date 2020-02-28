import axios from '../axios';

import authTokenService from '../service/authTokenService';

export default {
    namespaced: true,

    state: {
        isAuthorized: false,
        currentUser: {},
    },

    getters: {},

    mutations: {
        // AUTH(state, user) {
        //     // state.isAuthorized = true;
        //     // state.currentUser = user;
        // },
        //
        // LOGOUT(state) {
        //     authTokenService.removeToken();
        //
        //     // state.isAuthorized = false;
        //     // state.currentUser = null;
        // },
    },

    actions: {
        async login(context, user) {
            const { login, password } = user;

            try {
                const response = await axios.post('/login', {
                    login,
                    password,
                });

                const { token } = response.data;

                authTokenService.saveToken(token);

                // context.commit('AUTH', user);
                return true;
            } catch (error) {
                throw error;
            }
        },

        async register(context, user) {
            const { login, password } = user;

            try {
                const response = await axios.post('/register', {
                    login,
                    password,
                });

                const { token } = response.data;

                authTokenService.saveToken(token);

                // context.commit('AUTH', user);
            } catch (error) {
                throw error;
            }
        },

        logout() {
            authTokenService.removeToken();
            // context.commit('LOGOUT');
        },
    },
};
