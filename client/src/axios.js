import axios from 'axios';

import authService from './service/authService';

import router from './router';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${authService.getToken()}`;
    return config;
});

instance.interceptors.response.use(
    response => response,
    error => {
        if (403 === error.response.status) {
            authService.logout();
            router.replace({ name: 'login' });
        } else {
            return Promise.reject(error);
        }
    },
);

export default instance;
