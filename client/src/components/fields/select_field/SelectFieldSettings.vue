<template>
    <div>
        <h3>{{propsCategoriesNames.SIZE_AND_POSITION}}</h3>

        <ButtonsGroup
            v-model="fieldData.params.width"
            :variants="sizeVariants"
            class="field-settings__property-component"
            :options="{
                title: 'Ширина элемента'
            }"
        ></ButtonsGroup>

        <h3>{{propsCategoriesNames.MODEL}}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            :options="{
                title: 'Заголовок поля',
                description: 'Оставьте пустым, чтобы скрыть элемент надписи',
            }"
            class="field-settings__property-component"
        ></text-field-component>

        <div class="field-settings__property-component options-manager">
            <h4 class="options-manager__title">Пункты</h4>

            <div v-for="option in fieldData.params.options" class="options-manager__option-item">
                <text-field-component v-model="option.label" class="options-manager__label-input" />
                <text-field-component v-model="option.value" :options="{ type: 'number' }" class="options-manager__value-input" />
                <i class="material-icons options-manager__remove-option" @click="removeOption(option)">remove_circle</i>
            </div>

            <button @click="addOption" class="options-manager__add-option button">Добавить</button>
        </div>
    </div>
</template>

<script>
    import BaseFieldSettings from '../BaseFieldSettings';

    export default {
        name: 'SelectSettings',

        extends: BaseFieldSettings,

        methods: {
            addOption() {
                this.fieldData.params.options.push({
                    value: 1,
                    label: 'Значение',
                });
            },

            removeOption(option) {
                this.fieldData.params.options = this.fieldData.params.options.filter(item => item !== option);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../../../common-styles/button';

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
