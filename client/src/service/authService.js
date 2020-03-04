import axios from '../axios';

import googleAuthService from './googleAuthService';
import facebookAuthService from './facebookAuthService';

const localStorageKey = 'jwt';

class AuthService {
    constructor() {
        try {
            const tokenData = localStorage.getItem(localStorageKey);
            this.jwtTokenData = tokenData ? JSON.parse(tokenData) : {};
        } catch (error) {
            this.jwtTokenData = {};
        }
    }

    _saveToken(token) {
        this.jwtTokenData = { token, ...this._parseJwt(token) };

        console.log(this.jwtTokenData);

        localStorage.setItem(localStorageKey, JSON.stringify(this.jwtTokenData));
    }

    _removeToken() {
        this.jwtTokenData = {};
        localStorage.removeItem(localStorageKey);
    }

    getTokenData() {
        return this.jwtTokenData;
    }

    isAuthorized() {
        const { exp: expires } = this.jwtTokenData;

        console.log(this.jwtTokenData);

        return this.jwtTokenData.id && Date.now() / 1000 <= expires;
    }

    async _authRequest(url, user) {
        const response = await axios.post(url, user);
        const { token } = response.data;

        this._saveToken(token);
    }

    login(user) {
        return this._authRequest('/login', user);
    }

    register(user) {
        return this._authRequest('/register', user);
    }

    async logout() {
        this._removeToken();

        const instance = await googleAuthService.getInstance();
        instance.disconnect();

        const facebookInstance = facebookAuthService.getInstance();
        facebookInstance.logout(response => {
            console.log(response);
        });
    }

    async loginWithGoogle(googleIdtoken) {
        const response = await axios.post('/login/google', { token: googleIdtoken });
        const { token } = response.data;

        this._saveToken(token);
    }

    async loginWithFacebook(accessToken, userId) {
        const response = await axios.post('/login/facebook', { accessToken, userId });
        const { token } = response.data;

        this._saveToken(token);
    }

    _parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join(''),
        );

        return JSON.parse(jsonPayload);
    }
}

export default new AuthService();
