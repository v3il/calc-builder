const localStorageKey = 'jwt_token';

let jwtToken = localStorage.getItem(localStorageKey);

export default {
    getToken() {
        return jwtToken;
    },

    setToken(token) {
        jwtToken = token;
    },
};
