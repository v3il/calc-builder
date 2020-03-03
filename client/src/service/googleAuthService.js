class GoogleAuthService {
    constructor() {
        this.instance = null;
    }

    getInstance() {
        if (this.instance) {
            return Promise.resolve(this.instance);
        }

        return new Promise(resolve => {
            window.gapi.load('auth2', () => {
                this.instance = window.gapi.auth2.init({
                    client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
                });

                resolve(this.instance);
            });
        });
    }
}

export default new GoogleAuthService();
