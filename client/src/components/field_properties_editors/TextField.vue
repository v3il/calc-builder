<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">{{options.title}}</h4>

        <el-input
            class="property-editor-field_field-element"
            @input="onValueChanged($event)"
            v-model="options.value"
            clearable
        ></el-input>

        <p class="property-editor-field_field-description" v-if="options.description">{{options.description}}</p>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "TextField",

        extends: PropertyValueChangerBase,
    }
</script>

<style scoped>

</style>