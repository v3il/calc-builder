<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">{{title}}</h4>

        <el-button-group class="property-editor-field_field-element">
            <el-button
                size="small"
                v-for="valueObject in variants"
                :type="value === valueObject.value ? 'primary' : 'info'"
                @click="onValueChanged(valueObject.value)"
            >
                {{valueObject.label}}
            </el-button>
        </el-button-group>
    </div>
</template>

<script>
export default {
  name: 'ButtonsGroup',

  props: {
    value: [String, Number, Boolean],
    variants: Array,
    title: String,
  },

  methods: {
    onValueChanged(newValue) {
      this.$emit('valueChanged', newValue);
    },
  },
};
</script>

<style scoped>
    @import "settings-component-base.scss";
</style>
