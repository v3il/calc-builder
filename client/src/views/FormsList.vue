<template>
    <base-page-layout>
        <template v-slot:title>
            {{ uSign('translate', 'Список созданных форм') }}
        </template>

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
    </base-page-layout>
</template>

<script>
import axios from '../axios';

import BasePageLayout from './BasePageLayout';

export default {
    name: 'FormsList',

    components: {
        BasePageLayout,
    },

    data() {
        return {
            forms: [],
        };
    },

    methods: {
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
