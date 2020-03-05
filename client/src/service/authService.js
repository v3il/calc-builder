import axios from '../axios';

import googleAuthService from './googleAuthService';
import facebookAuthService from './facebookAuthService';

const tokenLocalStorageKey = 'forms_builder_token';
const userLocalStorageKey = 'forms_builder_user';

class AuthService {
    constructor() {
        try {
            this.tokenData = JSON.parse(localStorage.getItem(tokenLocalStorageKey)) || {};
            this.userData = JSON.parse(localStorage.getItem(userLocalStorageKey)) || {};
        } catch (error) {
            this.tokenData = {};
            this.userData = {};
        }
    }

    _saveData(tokenData, userData) {
        this.tokenData = tokenData;
        this.userData = userData;

        localStorage.setItem(tokenLocalStorageKey, JSON.stringify(tokenData));
        localStorage.setItem(userLocalStorageKey, JSON.stringify(userData));
    }

    _removeData() {
        this.tokenData = {};
        this.userData = {};

        localStorage.removeItem(tokenLocalStorageKey);
        localStorage.removeItem(userLocalStorageKey);
    }

    getUser() {
        return this.userData;
    }

    getToken() {
        return this.tokenData.token;
    }

    isAuthorized() {
        return this.tokenData.expires && this.tokenData.expires * 1000 > Date.now();
    }

    login(user) {
        return this._authRequest('/login/local', user);
    }

    register(user) {
        return this._authRequest('/register', user);
    }

    loginWithGoogle(googleIdToken) {
        return this._authRequest('/login/google', { token: googleIdToken });
    }

    loginWithFacebook(accessToken, userId) {
        return this._authRequest('/login/facebook', { accessToken, userId });
    }

    async logout() {
        this._removeData();

        const instance = await googleAuthService.getInstance();
        instance.disconnect();

        const facebookInstance = facebookAuthService.getInstance();
        facebookInstance.logout();
    }

    async _authRequest(url, data) {
        const response = await axios.post(url, data);
        const { tokenData, userData } = response.data;

        this._saveData(tokenData, userData);
    }
}

export default new AuthService();
