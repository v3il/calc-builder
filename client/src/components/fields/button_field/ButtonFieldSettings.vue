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
            v-model="fieldOptions.params.text"
            title="Текст кнопки"
        ></TextField>

        <!--<Slider-->
            <!--title="Окружность углов"-->
            <!--:min="1"-->
            <!--:max="10"-->
            <!--v-model="fieldOptions.params.borderRadius"-->
        <!--&gt;</Slider>-->
    </div>
</template>

<script>
import BaseFieldSettings from '../BaseFieldSettings';

export default {
  name: 'ButtonFieldSettings',

  extends: BaseFieldSettings,
};
</script>

<style scoped>

</style>
