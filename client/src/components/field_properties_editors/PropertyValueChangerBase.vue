<template>
    <br>
</template>

<script>
    export default {
        name: "PropertyValueChangerBase",

        data() {
            return {
                options: this.componentProperties,
            }
        },

        props: {
            componentProperties: Object,
        },

        methods: {
            onValueChanged(value) {
                console.log(1, value)
                this.options.value = value;
                this.$emit('valueChanged', value)
            }
        }
    }
</script>

<style>
    .property-editor-field {
        margin: 18px 0;
    }

    .property-editor-field .property-editor-field_field-element {
        margin: 6px 0;
    }

    .property-editor-field_field-description {
        font-size: 14px;
        color: #909399;
    }
</style>