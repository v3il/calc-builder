<template>
    <div class="auth-form">
        <form class="form-signin">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">
                    {{ uSign('translate', 'Вход на сайт') }}
                </h1>
            </div>

            <div class="form-label-group">
                <label for="inputEmail">{{ uSign('translate', 'Email') }}</label>

                <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    :placeholder="uSign('translate', 'Email')"
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
                    required
                />
            </div>

            <div class="checkbox mb-3">
                <label
                    ><input type="checkbox" value="remember-me" />{{
                        uSign('translate', 'Запомнить меня')
                    }}</label
                >
            </div>

            <button class="btn btn-lg btn-primary btn-block" type="submit">
                {{ uSign('translate', 'Войти') }}
            </button>

            <div class="text-center auth-form__register-link">
                <router-link :to="{ name: 'register' }">
                    {{ uSign('translate', 'Зарегистрироваться') }}
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
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
