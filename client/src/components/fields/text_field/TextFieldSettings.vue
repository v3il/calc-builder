<template>
    <div class="field-settings-component">
        <h3 class="category-title">{{propsCategoriesNames.SIZE_AND_POSITION}}</h3>

        <ButtonsGroup
            :value="fieldData.params.width"
            :variants="sizeVariants"
            title="Ширина элемента"
            @valueChanged="fieldData.params.width = $event"
        ></ButtonsGroup>

        <h3 class="category-title">{{propsCategoriesNames.MODEL}}</h3>

        <TextField
            v-model="fieldData.params.label"
            title="Заголовок поля"
            description="Оставьте пустым, чтобы скрыть элемент надписи"
        ></TextField>

        <TextField
            v-model="fieldData.params.placeholder"
            title="Подсказка поля"
        ></TextField>

        <h3 class="category-title">{{propsCategoriesNames.STYLE}}</h3>

        <ColorSelector
            v-model="fieldData.style.labelColor"
            :options="{
            title: 'Цвет надписи поля',
        }"></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.color"
            :options="{
            title: 'Цвет текста',
        }"></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.borderColor"
            :options="{
            title: 'Цвет границы поля',
        }"></ColorSelector>

        <ColorSelector
            v-model="fieldData.style.backgroundColor"
            :options="{
            title: 'Цвет фона поля',
        }" ></ColorSelector>
    </div>
</template>

<script>
    import BaseFieldSettings from '../BaseFieldSettings';

    export default {
        name: 'TextFieldSettings',

        extends: BaseFieldSettings,
    };
</script>

<style scoped>

</style>
