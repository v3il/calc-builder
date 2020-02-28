const localStorageKey = 'jwt_token';

let jwtTokenData;

try {
    const tokenData = localStorage.getItem(localStorageKey);
    jwtTokenData = tokenData ? JSON.parse(tokenData) : {};
} catch (error) {
    jwtTokenData = {};
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
    );

    return JSON.parse(jsonPayload);
}

export default {
    getToken() {
        return jwtTokenData;
    },

    saveToken(token) {
        const { exp } = parseJwt(token);

        jwtTokenData = { token, expires: exp };
        localStorage.setItem(localStorageKey, JSON.stringify(jwtTokenData));

        console.log(jwtTokenData);
    },

    removeToken() {
        jwtTokenData = {};
        localStorage.removeItem(localStorageKey);
    },

    isTokenExpired() {
        const { expires } = jwtTokenData;
        return Date.now() / 1000 > expires;
    },

    tokenExists() {
        return jwtTokenData.hasOwnProperty('token');
    },

    isAuthorized() {
        return this.tokenExists() && !this.isTokenExpired();
    },
};
