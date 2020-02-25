import axios from '../axios';

const localStorageKey = 'jwt_token';

export default {
    namespaced: true,

    state: {
        isAuthorized: false,
        currentUser: null,
        token: localStorage.getItem(localStorageKey),
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

                const { auth, token } = response.data;

                console.log(auth, token);

                const r = await axios.get('/forms', {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });

                console.log(r.data);

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
