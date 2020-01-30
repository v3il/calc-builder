<template>
    <div class="page">
        <div class="header">
            <div class="header_title">{{ uSign('translate', 'Список созданных форм') }}</div>
        </div>

        <div class="content">
            <div class="calculators">
                <div class="calculators__item" v-for="form in createdForms" :key="form.id">
                    <div class="calculators__preview"></div>

                    <div class="calculators__name">{{ form.name || '' }}</div>

                    <div class="calculators__actions">
                        <button
                            class="button button--success calculators__edit"
                            @click="editForm(form)"
                        >
                            {{ uSign('translate', 'Редактировать') }}
                        </button>

                        <button
                            class="button button--danger calculators__remove"
                            @click="removeForm(form)"
                        >
                            {{ uSign('translate', 'Удалить') }}
                        </button>
                    </div>
                </div>

                <div class="calculators__item calculators__item--prompt">
                    <div class="calculators__actions">
                        <button class="button button--primary" @click="addForm">
                            {{ uSign('translate', 'Создать') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapState } = createNamespacedHelpers('forms');

export default {
    name: 'FormsList',

    computed: {
        ...mapState(['createdForms']),
    },

    methods: {
        ...mapActions(['addForm', 'removeForm']),

        editForm(selectedForm) {
            const { id } = selectedForm;

            this.$router.push({
                name: 'formLayout',
                params: { id },
            });
        },
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 64px;
    background-color: #263238;
    border-color: #263238;
    color: #fff;
    align-items: center;
    display: flex;
    padding: 0 24px;
    box-shadow:
 0 2px 4px -1px rgba(0, 0, 0, 0.2),
 0 4px 5px 0 rgba(0, 0, 0, 0.14),
        0 1px 10px 0 rgba(0, 0, 0, 0.12);
    z-index: 3;
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
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
