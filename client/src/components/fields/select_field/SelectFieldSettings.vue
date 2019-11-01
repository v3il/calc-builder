<template>
    <div>
        <h3>{{propsCategoriesNames.MODEL}}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            :options="{
                title: 'Заголовок поля',
                description: 'Оставьте пустым, чтобы скрыть элемент надписи',
            }"
            class="field-settings__property-component"
        ></text-field-component>

        <select-options-manager
            v-model="fieldData.params.options"
            @default-option-change="({ option }) => fieldData.params.selectedOption = option"
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
        name: 'SelectSettings',
        extends: BaseFieldSettings,
    };
</script>

<style scoped lang="scss">

</style>
