<template>
    <div class="field-settings__property-component options-manager">
        <h4 class="options-manager__title">{{ options.title }}</h4>

        <div v-for="(option, index) in value" :key="index" class="options-manager__option-item">
            <div class="options-manager__option-data">
                <text-field-component
                    v-model="option.label"
                    class="options-manager__label-input"
                    :options="{
                        minLength: 1,
                    }"
                />

                <i
                    class="material-icons options-manager__remove-option"
                    @click="removeOption(option)"
                    v-if="index > 1"
                    >remove_circle</i
                >
            </div>
        </div>

        <button @click="addOption" class="options-manager__add-option button">
            {{ uSign('translate', 'Добавить') }}
        </button>
    </div>
</template>

<script>
import TextFieldComponent from './TextFieldComponent';

export default {
    name: 'SelectOptionsManager',

    components: {
        TextFieldComponent,
    },

    props: {
        value: {
            type: Array,
        },

        options: {
            type: Object,
        },
    },

    methods: {
        removeOption(option) {
            const optionsListCopy = [...this.value].filter(item => item !== option);
            this.$emit('input', optionsListCopy);
        },

        addOption() {
            const optionsListCopy = [...this.value];
            optionsListCopy.push(this.options.createNewOption());

            this.$emit('input', optionsListCopy);
        },
    },
};
</script>

<style scoped lang="scss">
.options-manager {
    &__option-item {
        margin: 6px 0;
    }

    &__option-data {
        display: flex;
        align-items: center;
    }

    &__option-actions {
        font-size: 0.9rem;
    }

    &__label-input {
        flex: 1;
    }

    &__remove-option {
        margin-left: 12px;
        color: $error;
        cursor: pointer;
    }
}
</style>
