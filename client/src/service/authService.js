import axios from '../axios';

const localStorageKey = 'jwt_token';

let jwtTokenData = readJWTData();

export default {
    isAuthorized,

    login,
    logout,
    register,

    getTokenData() {
        return jwtTokenData;
    },
};

function readJWTData() {
    try {
        const tokenData = localStorage.getItem(localStorageKey);
        return tokenData ? JSON.parse(tokenData) : {};
    } catch (error) {
        return {};
    }
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

function saveToken(token) {
    jwtTokenData = parseJwt(token);
    localStorage.setItem(localStorageKey, JSON.stringify(jwtTokenData));

    console.log(jwtTokenData);
}

function removeToken() {
    jwtTokenData = {};
    localStorage.removeItem(localStorageKey);
}

function isAuthorized() {
    const { exp: expires } = jwtTokenData;
    return jwtTokenData.hasOwnProperty('token') && Date.now() / 1000 <= expires;
}

async function login(user) {
    const response = await axios.post('/login', user);
    const { token } = response.data;

    saveToken(token);
}

async function register(user) {
    const response = await axios.post('/register', user);
    const { token } = response.data;

    saveToken(token);
}

function logout() {
    removeToken();
}
