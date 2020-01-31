<template>
    <div class="auth-form">
        <form class="form-signin">
            <div class="text-center mb-4">
                <h1 class="h3 mb-3 font-weight-normal">
                    {{ uSign('translate', 'Регистрация') }}
                </h1>
            </div>

            <div class="form-label-group">
                <label for="inputEmail">{{ uSign('translate', 'Email') }}</label>

                <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    :placeholder="uSign('translate', 'Email')"
                    autocomplete="off"
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
                    autocomplete="off"
                    required
                />
            </div>

            <button class="btn btn-lg btn-primary btn-block" type="submit">
                {{ uSign('translate', 'Зарегистрироваться') }}
            </button>

            <div class="text-center auth-form__register-link">
                <router-link :to="{ name: 'login' }">
                    {{ uSign('translate', 'Войти') }}
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterPage',
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
