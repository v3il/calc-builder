<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">{{options.title}}</h4>

        <el-button-group class="property-editor-field_field-element">
            <el-button
                size="small"
                v-for="value in options.values"
                :type="options.value === value ? 'primary' : 'info'"
                @click="onValueChanged(value)"
            >
                {{value}}%
            </el-button>
        </el-button-group>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "Slider",

        extends: PropertyValueChangerBase,
    }
</script>

<style scoped>

</style>