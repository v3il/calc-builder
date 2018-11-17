<template>
    <div>
        <h3>{{propsCategoriesNames.SIZE_AND_POSITION}}</h3>

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

        <h3>{{propsCategoriesNames.MODEL}}</h3>

        <SelectOptionsManager
            :selectOptions="fieldOptions.params.selectOptions"
        ></SelectOptionsManager>
    </div>
</template>

<script>
    import BaseFieldSettings from '../BaseFieldSettings';

    export default {
        name: "SelectSettings",

        extends: BaseFieldSettings,
    }
</script>

<style scoped>

</style>