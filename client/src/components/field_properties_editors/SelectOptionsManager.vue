<template>
    <div class="field-settings__property-component options-manager">
        <h4 class="options-manager__title">{{options.title}}</h4>

        <div v-for="option in value" class="options-manager__option-item">
            <text-field-component v-model="option.label" class="options-manager__label-input" />
            <text-field-component v-model="option.value" :options="{ type: 'number' }" class="options-manager__value-input" />
            <i class="material-icons options-manager__remove-option" @click="removeOption(option)">remove_circle</i>
        </div>

        <button @click="addOption" class="options-manager__add-option button">Добавить</button>
    </div>
</template>

<script>
    import TextFieldComponent from "./TextFieldComponent";

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

                optionsListCopy.push({
                    value: 1,
                    label: 'Значение',
                });

                this.$emit('input', optionsListCopy);
            },
        },
    };
</script>

<style scoped lang="scss">
    .options-manager {
        &__option-item {
            display: flex;
            align-items: center;
            margin: 6px 0;
        }

        &__label-input {
            flex: 1;
        }

        &__value-input {
            flex: 80px 0;
            margin: 0 12px;
        }

        &__remove-option {
            color: darkred;
            cursor: pointer;
        }
    }
</style>
