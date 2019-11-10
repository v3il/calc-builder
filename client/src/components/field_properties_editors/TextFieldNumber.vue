<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">{{ title }}</h4>

        <el-input-number
            class="property-editor-field_field-element"
            @input="$emit('input', $event)"
            v-model="val"
            :min="min"
            :max="max"
            :step="step"
        ></el-input-number>

        <p class="property-editor-field_field-description" v-if="description">{{ description }}</p>
    </div>
</template>

<script>
// import PropertyValueChangerBase from './PropertyValueChangerBase';

export default {
    name: 'TextFieldNumber',

    props: {
        value: Number,

        title: String,
        description: String,

        min: {
            type: Number,
            default: 1,
        },

        max: {
            type: Number,
            default: 10,
        },

        step: {
            type: Number,
            default: 1,
        },
    },

    data() {
        return {
            val: this.value,
        };
    },
};
</script>

<style>
@import 'settings-component-base.scss';

.el-input-number__decrease,
.el-input-number__increase {
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 1px;
}
</style>
