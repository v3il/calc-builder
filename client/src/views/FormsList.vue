<template>
    <div class="page">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top header">
            <h1 class="navbar-brand">{{ uSign('translate', 'Список созданных форм') }}</h1>
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
            {{ forms }}

            <div class="calculators">
                <div class="calculators__item" v-for="form in forms" :key="form.id">
                    <div class="calculators__preview"></div>

                    <div class="calculators__name">{{ form.name }} #{{ form.id }}</div>

                    <div class="calculators__actions">
                        <button
                            class="btn btn-success btn-sm calculators__edit"
                            @click="editForm(form)"
                        >
                            {{ uSign('translate', 'Редактировать') }}
                        </button>

                        <button
                            class="btn btn-danger btn-sm calculators__remove"
                            @click="removeForm(form)"
                        >
                            {{ uSign('translate', 'Удалить') }}
                        </button>
                    </div>
                </div>

                <div class="calculators__item calculators__item--prompt">
                    <div class="calculators__actions">
                        <button class="btn btn-primary btn-sm" @click="createForm">
                            {{ uSign('translate', 'Создать') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios';

import authService from '../service/authService';

export default {
    name: 'FormsList',

    data() {
        return {
            userLogin: authService.getUser().email,
            forms: [],
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

        async createForm() {
            try {
                const response = await axios.post('/forms/create');

                this.forms.push(response.data.form);
            } catch (error) {
                console.log(error);
            }
        },

        editForm(selectedForm) {
            const { id } = selectedForm;

            this.$router.push({
                name: 'formLayout',
                params: { id },
            });
        },

        async removeForm(form) {
            if (confirm(`Удалить форму ${form.name} #${form.id}?`)) {
                try {
                    await axios.delete(`/forms/${form.id}`);
                    this.forms = this.forms.filter(item => item.id !== form.id);
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },

    async created() {
        try {
            const response = await axios.get('/forms');
            this.forms = response.data;
        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<style lang="scss">
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

.content {
    margin-top: 64px;
    height: calc(100vh - 64px);
}

.calculators {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-column-gap: 18px;
    grid-row-gap: 18px;
    padding: 24px;

    .calculators__item {
        display: flex;
        flex-direction: column;
        flex-basis: 350px;
        border: 1px solid #ccc;
        border-radius: 6px;
        overflow: hidden;
        min-height: 250px;

        &--prompt {
            justify-content: center;
        }

        .calculators__preview {
            width: 100%;
            height: 150px;
            background-color: darkblue;
        }

        .calculators__name {
            margin: 12px 6px;
        }

        .calculators__actions {
            display: flex;
            justify-content: center;
            margin: 0 6px 12px;
        }

        .calculators__edit {
            margin-right: 12px;
        }
    }
}
</style>
