<template>
    <div>
        <h3>{{propsCategoriesNames.MODEL}}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            class="field-settings__property-component"
            :options="{
                title: 'Заголовок поля',
            }"
        ></text-field-component>

        <buttons-group
            v-model="fieldData.params.isSelected"
            :variants="[
                { value: true, label: 'Отмечен' },
                { value: false, label: 'Снят' },
            ]"
            :options="{
                title: 'Состояние по умолчанию',
            }"
        ></buttons-group>
    </div>
</template>

<script>
    import BaseFieldSettings from '../BaseFieldSettings';

    export default {
        name: 'CheckBoxFieldSettings',
        extends: BaseFieldSettings,
    };
</script>

<style scoped lang="scss">

</style>
