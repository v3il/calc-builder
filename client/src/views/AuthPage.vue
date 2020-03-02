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

            <div class="g-signin2" data-onsuccess="onSignIn"></div>

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
        </form>
    </div>
</template>

<script>
import authService from '../service/authService';

export default {
    name: 'AuthPage',

    data() {
        return {
            isLoginAction: true,
            userLogin: '',
            userPassword: '',
            authError: '',

            clientId: '1007870238067-9deqefc58jldns02l90tg93ehbagi9d7.apps.googleusercontent.com',
            clientSecret: 'fzFcjMw2OkEF81_9XAbawyU8',
        };
    },

    created() {
        this.isLoginAction = this.$route.name === 'login';

        window.onSignIn = function(googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        };
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

        loginButton() {},
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
