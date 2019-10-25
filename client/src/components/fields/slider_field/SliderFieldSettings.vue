<template>
    <div class="field-settings">
        <h3 class="field-settings__title">{{propsCategoriesNames.MODEL}}</h3>

        <TextFieldComponent
            v-model="fieldData.params.label"
            class="field-settings__property-component"
            :options="{
                title: 'Заголовок поля',
                description: 'Оставьте пустым, чтобы скрыть элемент надписи',
            }"
        ></TextFieldComponent>

        <TextFieldComponent
            v-model.number="fieldData.params.min"
            class="field-settings__property-component"
            :options="{
                title: 'Минимальное значение',
                type: 'number',
            }"
        ></TextFieldComponent>

        <TextFieldComponent
            v-model.number="fieldData.params.max"
            class="field-settings__property-component"
            :options="{
                title: 'Максимальное значение',
                type: 'number',
            }"
        ></TextFieldComponent>

        <TextFieldComponent
            v-model.number="fieldData.params.step"
            class="field-settings__property-component"
            :options="{
                title: 'Значение шага',
                type: 'number',
            }"
        ></TextFieldComponent>
    </div>
</template>

<script>
import BaseFieldSettings from '../BaseFieldSettings';

export default {
  name: 'SliderFieldSettings',

  extends: BaseFieldSettings,
};
</script>

<style scoped>

</style>
