<template>
    <div>
        <h3>{{propsCategoriesNames.MODEL}}</h3>

        <TextField
            v-model="fieldOptions.params.label"
            title="Заголовок поля"
            description="Оставьте пустым, чтобы скрыть элемент надписи"
        ></TextField>

        <TextField
            v-model="fieldOptions.params.placeholder"
            title="Подсказка поля"
        ></TextField>
    </div>
</template>

<script>
    import BaseFieldSettings from '../BaseFieldSettings';

    export default {
        name: "TextFieldSettings",

        extends: BaseFieldSettings,
    }
</script>

<style scoped>

</style>