<template>
    <div class="property-editor-field">
        <el-checkbox
            v-model="options.value"
            @change="onValueChanged(options.value)"
            class="property-editor-field_field-element"
        >
            {{options.title}}
        </el-checkbox>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "CheckBoxSelector",

        extends: PropertyValueChangerBase,
    }
</script>

<style scoped>

</style>