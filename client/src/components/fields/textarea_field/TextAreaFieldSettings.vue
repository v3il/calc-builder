<template>
    <div class="field-settings">
        <h3 class="field-settings__title">{{ propsCategoriesNames.MODEL }}</h3>

        <TextFieldComponent
            v-model="fieldData.params.label"
            :options="{
                title: uSign('translate', 'Заголовок поля'),
                description: uSign('translate', 'Оставьте пустым, чтобы скрыть элемент надписи'),
            }"
            class="field-settings__property-component"
        ></TextFieldComponent>

        <TextFieldComponent
            v-model="fieldData.params.placeholder"
            :options="{
                title: uSign('translate', 'Подсказка поля'),
                description: uSign('translate', 'Будет отображаться при пустом поле'),
            }"
            class="field-settings__property-component"
        ></TextFieldComponent>

        <h3 class="field-settings__title">{{ propsCategoriesNames.STYLE }}</h3>

        <ColorSelector
            v-model="fieldData.style.labelColor"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Цвет надписи поля'),
            }"
        ></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.color"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Цвет текста'),
            }"
        ></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.borderColor"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Цвет границы поля'),
            }"
        ></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.backgroundColor"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Цвет фона поля'),
            }"
        ></ColorSelector>

        <Slider
            v-model="fieldData.style.borderRadius"
            :options="{
                title: uSign('translate', 'Закруглённость углов'),
                min: 0,
                max: 20,
                valueTransformer: value => `${value}px`,
            }"
        ></Slider>

        <CheckBoxSelector
            v-model="fieldData.style.resizable"
            :options="{
                title: uSign('translate', 'Размер поля можно изменять'),
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
