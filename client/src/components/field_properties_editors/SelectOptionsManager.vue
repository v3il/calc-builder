<template>
    <div class="field-settings__property-component options-manager">
        <h4 class="options-manager__title">{{options.title}}</h4>

        <div
            v-for="option in value"
            class="options-manager__option-item"
            :class="{ 'options-manager__option-item--default': option.isDefault }"
        >
            <div class="options-manager__option-data">
                <text-field-component v-model="option.label" class="options-manager__label-input" />
                <i class="material-icons options-manager__remove-option" @click="removeOption(option)">remove_circle</i>
            </div>

            <div class="options-manager__option-actions">
                <span v-if="option.isDefault">Значение по умолчанию</span>
                <a href="javascript://" @click="makeDefault(option)" v-else>Сделать значением по умолчанию</a>
            </div>
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
                    activatedValue: /*(this.value.length + 1) * */100,
                    deactivatedValue: 0,
                    isDefault: false,
                    isSelected: false,
                    label: 'Значение',
                });

                this.$emit('input', optionsListCopy);
            },

            makeDefault(option) {
                this.value.forEach((item) => {
                    item.isDefault = false;
                    item.isSelected = false;
                });

                option.isDefault = true;
                option.isSelected = true;

                this.$emit('default-option-change', option);
            }
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

        &--default &__label-input {
            border-color: $bright_color1;
        }

        &__remove-option {
            margin-left: 12px;
            color: darkred;
            cursor: pointer;
        }
    }
</style>
