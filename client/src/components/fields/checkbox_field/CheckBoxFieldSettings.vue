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
            class="field-settings__property-component"
            :options="{
                title: 'Заголовок поля',
            }"
        ></text-field-component>
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
