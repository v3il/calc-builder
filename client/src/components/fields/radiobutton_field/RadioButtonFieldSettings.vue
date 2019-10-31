<template>
    <div>
        <h3>{{propsCategoriesNames.MODEL}}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            class="field-settings__property-component"
            :options="{
                title: 'Заголовок поля',
                description: 'Оставьте пустым, чтобы скрыть элемент надписи',
            }"
        ></text-field-component>

        <select-options-manager
            v-model="fieldData.params.options"
            @default-option-change="fieldData.params.value = $event"
            :options="{ title: 'Пункты' }"
        ></select-options-manager>

        <pre>
            {{JSON.stringify(fieldData, null, 2)}}
        </pre>
    </div>
</template>

<script>
    import BaseFieldSettings from '../BaseFieldSettings';

    export default {
        name: 'RadioButtonFieldSettings',
        extends: BaseFieldSettings,
    };
</script>

<style scoped lang="scss">

</style>
