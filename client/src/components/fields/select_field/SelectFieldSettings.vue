<template>
    <div>
        <h3>{{ propsCategoriesNames.MODEL }}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            :options="{
                title: uSign('translate', 'Заголовок поля'),
                description: uSign('translate', 'Оставьте пустым, чтобы скрыть элемент надписи'),
            }"
            class="field-settings__property-component"
        ></text-field-component>

        <select-options-manager
            v-model="fieldData.params.options"
            :options="{ title: uSign('translate', 'Пункты') }"
        ></select-options-manager>
    </div>
</template>

<script>
import BaseFieldSettings from '../BaseFieldSettings';

export default {
    name: 'SelectSettings',
    extends: BaseFieldSettings,
};
</script>
