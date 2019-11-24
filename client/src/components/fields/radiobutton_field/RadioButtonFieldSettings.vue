<template>
    <div>
        <h3>{{ propsCategoriesNames.MODEL }}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Заголовок поля'),
                description: uSign('translate', 'Оставьте пустым, чтобы скрыть элемент надписи'),
            }"
        ></text-field-component>

        <select-options-manager
            v-model="fieldData.params.options"
            :options="{
                createNewOption,
                title: uSign('translate', 'Пункты'),
            }"
        ></select-options-manager>
    </div>
</template>

<script>
import BaseFieldSettings from '../BaseFieldSettings';
import RadioButtonOption from '../../../models/RadioButtonOption';

export default {
    name: 'RadioButtonFieldSettings',
    extends: BaseFieldSettings,

    methods: {
        createNewOption() {
            return new RadioButtonOption();
        },
    },
};
</script>
