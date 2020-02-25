import axios from 'axios';

import authTokenService from './service/authTokenService';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${authTokenService.getToken()}`;
    return config;
});

export default instance;
