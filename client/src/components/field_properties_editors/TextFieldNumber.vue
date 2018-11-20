<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">{{options.title}}</h4>

        <el-input-number
            class="property-editor-field_field-element"
            @input="onValueChanged($event)"
            v-model="options.value"
            :min="options.min || 1"
            :max="options.max || Infinity"
            :step="options.step || 1"
        ></el-input-number>

        <p class="property-editor-field_field-description" v-if="options.description">{{options.description}}</p>
    </div>
</template>

<script>
    // import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "TextFieldNumber",

        // extends: PropertyValueChangerBase,
    }
</script>

<style scoped>
    @import "settings-component-base.scss";
</style>