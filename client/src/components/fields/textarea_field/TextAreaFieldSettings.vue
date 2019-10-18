<template>
    <div class="field-settings">
        <h3 class="field-settings__title">{{propsCategoriesNames.SIZE_AND_POSITION}}</h3>

        <ButtonsGroup
            v-model="fieldData.params.width"
            :variants="sizeVariants"
            class="field-settings__property-component"
            :options="{
                title: 'Ширина элемента'
            }"
        ></ButtonsGroup>

        <h3 class="field-settings__title">{{propsCategoriesNames.MODEL}}</h3>

        <TextFieldComponent
            v-model="fieldData.params.label"
            :options="{
                title: 'Заголовок поля',
                description: 'Оставьте пустым, чтобы скрыть элемент надписи',
            }"
            class="field-settings__property-component"
        ></TextFieldComponent>

        <TextFieldComponent
            v-model="fieldData.params.placeholder"
            :options="{
                title: 'Подсказка поля',
            }"
            class="field-settings__property-component"
        ></TextFieldComponent>

        <h3 class="field-settings__title">{{propsCategoriesNames.STYLE}}</h3>

        <ColorSelector
            v-model="fieldData.style.labelColor"
            class="field-settings__property-component"
            :options="{
                title: 'Цвет надписи поля',
            }"
        ></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.color"
            class="field-settings__property-component"
            :options="{
                title: 'Цвет текста',
            }"
        ></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.borderColor"
            class="field-settings__property-component"
            :options="{
                title: 'Цвет границы поля',
            }"
        ></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.backgroundColor"
            class="field-settings__property-component"
            :options="{
                title: 'Цвет фона поля',
            }"
        ></ColorSelector>

        <Slider
            v-model="fieldData.style.borderRadius"
            :options="{
                title: 'Закруглённость углов',
                min: 0,
                max: 20,
                valueTransformer: (value) => `${value}px`,
            }"
        ></Slider>

        <CheckBoxSelector
            v-model="fieldData.style.resizable"
            :options="{
                title: 'Размер поля можно изменять',
            }"
        ></CheckBoxSelector>
    </div>
</template>

<script>
    import BaseFieldSettings from '../BaseFieldSettings';

    export default {
        name: 'TextFieldSettings',

        extends: BaseFieldSettings,
    };
</script>

<style scoped lang="scss">

</style>
