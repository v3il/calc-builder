<template>
    <div class="auth-form" :key="$route.name">
        <form class="form-signin" @submit.prevent="auth">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">
                    {{
                        isLoginAction
                            ? uSign('translate', 'Вход на сайт')
                            : uSign('translate', 'Регистрация')
                    }}
                </h1>
            </div>

            <div class="form-label-group">
                <label for="inputEmail">{{ uSign('translate', 'Email') }}</label>

                <input
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    :placeholder="uSign('translate', 'Email')"
                    v-model="userLogin"
                    required
                    autofocus
                />
            </div>

            <div class="form-label-group">
                <label for="inputPassword">{{ uSign('translate', 'Пароль') }}</label>

                <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    :placeholder="uSign('translate', 'Пароль')"
                    v-model="userPassword"
                    required
                />
            </div>

            <div class="alert alert-danger" role="alert" v-if="authError">{{ authError }}</div>

            <button class="btn btn-lg btn-primary btn-block" type="submit">
                {{
                    isLoginAction
                        ? uSign('translate', 'Войти')
                        : uSign('translate', 'Зарегистрироваться')
                }}
            </button>

            <div class="text-center auth-form__register-link">
                <router-link :to="{ name: 'register' }" v-if="isLoginAction">
                    {{ uSign('translate', 'Зарегистрироваться') }}
                </router-link>

                <router-link :to="{ name: 'login' }" v-else>
                    {{ uSign('translate', 'Войти') }}
                </router-link>
            </div>

            <font-awesome-icon class="js-google" :icon="['fab', 'google']" />
        </form>
    </div>
</template>

<script>
import authService from '../service/authService';
import googleAuthService from '../service/googleAuthService';

export default {
    name: 'AuthPage',

    data() {
        return {
            isLoginAction: true,
            userLogin: '',
            userPassword: '',
            authError: '',

            googleSignInParams: {
                client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
            },
        };
    },

    async mounted() {
        this.isLoginAction = this.$route.name === 'login';

        const instance = await googleAuthService.getInstance();

        instance.attachClickHandler(
            document.querySelector('.js-google'),
            {},
            this.onSignInSuccess,
            this.onSignInError,
        );
    },

    methods: {
        async auth() {
            try {
                this.authError = '';

                const requestData = {
                    login: this.userLogin,
                    password: this.userPassword,
                };

                if (this.isLoginAction) {
                    await authService.login(requestData);
                } else {
                    await authService.register(requestData);
                }

                this.$router.replace({ name: 'home' });
            } catch (error) {
                console.error(error);
                this.authError = error.response.data.error;
            }
        },

        async onSignInSuccess(googleUser) {
            try {
                const idToken = googleUser.getAuthResponse().id_token;
                await authService.loginWithGoogle(idToken);
                this.$router.replace({ name: 'home' });
            } catch (error) {
                this.authError = error.message;
            }
        },

        onSignInError(error) {
            this.authError = error.message;
        },
    },
};
</script>

<style scoped lang="scss">
.auth-form {
    display: flex;
    align-items: center;
    min-height: 100vh;

    &__register-link {
        margin-top: 12px;
    }
}

.form-signin {
    width: 100%;
    max-width: 420px;
    padding: 15px;
    margin: auto;
}

.form-label-group {
    position: relative;
    margin-bottom: 1rem;
}

.form-label-group > label {
    font-weight: bold;
}
</style>
