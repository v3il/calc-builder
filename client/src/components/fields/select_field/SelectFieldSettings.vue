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

        <select-options-manager v-model="fieldData.params.options" :options="{
            title: 'Пункты',
        }"></select-options-manager>
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
