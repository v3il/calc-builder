<template>
    <div class="field-settings-component">
        <h3 class="category-title">{{propsCategoriesNames.SIZE_AND_POSITION}}</h3>

        <ButtonsGroup
            :value="fieldOptions.params.width"
            :variants="sizeVariants"
            title="Ширина элемента"
            @valueChanged="fieldOptions.params.width = $event"
        ></ButtonsGroup>

        <CheckBoxSelector
            v-model="fieldOptions.params.float"
            title="Обтекаемый элемент"
        ></CheckBoxSelector>

        <Slider
            title="Сдвиг элемента"
            description="Применимо только к необтекаемым элементам"
            :min="0"
            :max="100 - fieldOptions.params.width"
            :disabled="fieldOptions.params.float"
            v-model="fieldOptions.params.marginLeft"
        ></Slider>

        <h3 class="category-title">{{propsCategoriesNames.MODEL}}</h3>

        <TextField
            v-model="fieldOptions.params.label"
            title="Заголовок поля"
            description="Оставьте пустым, чтобы скрыть элемент надписи"
        ></TextField>

        <TextFieldNumber
            title="Минимальное значение"
            v-model="fieldOptions.params.min"
            :min="0"
            :max="fieldOptions.params.max"
        ></TextFieldNumber>

        <TextFieldNumber
            title="Максимальное значение"
            v-model="fieldOptions.params.max"
            :min="fieldOptions.params.min"
            :max="1000"
        ></TextFieldNumber>

        <!--<TextFieldNumber-->
            <!--title="Значение шага"-->
            <!--v-model="fieldOptions.params.step"-->
            <!--:min="0.5"-->
            <!--:max="1000"-->
        <!--&gt;</TextFieldNumber>-->
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
