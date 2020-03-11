<template>
    <div class="page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top header">
            <h1 class="navbar-brand">
                <slot name="title"></slot>
            </h1>

            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item disabled">
                        <span class="navbar-text">{{
                            uSign('translate', 'Здравствуйте, %s!', [userLogin])
                        }}</span>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="javascript://" @click="triggerLogout">{{
                            uSign('translate', 'Выйти')
                        }}</a>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import authService from '../service/authService';

export default {
    name: 'BasePageLayout',

    data() {
        return {
            userLogin: authService.getUser().email,
        };
    },

    methods: {
        async triggerLogout() {
            try {
                authService.logout();
                this.$router.replace({ name: 'login' });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header {
    background-color: #263238 !important;
}

.header_title {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.navbar-brand {
    margin-bottom: 0;
}

.content {
    margin-top: 64px;
    height: calc(100vh - 64px);
}
</style>
