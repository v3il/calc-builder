<template>
    <div class="base-field-values" :class="`base-field-values--${fieldClass}`">
        <h3 class="base-field-values__field-title">{{ field.params.label }} ({{ fieldClass }})</h3>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'BaseFieldValues',

    props: {
        field: {
            type: Object,
            required: true,
        },

        fieldClass: {
            type: String,
        },
    },
};
</script>

<style scoped lang="scss">
.base-field-values {
    padding: 12px 24px;
    border-radius: 6px;

    &--select {
        background-color: $select_widget_light;
    }

    &--checkbox {
        background-color: $checkbox_widget_light;
    }

    &--radio {
        background-color: $radio_widget_light;
    }
}
</style>
