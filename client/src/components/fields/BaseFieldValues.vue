<template>
    <div class="base-field-values" :class="`base-field-values--${fieldClass}`">
        <div class="base-field-values__letter-column">
            <span class="base-field-values__field-letter">{{ field.letter }}</span>
        </div>

        <div class="base-field-values__properties-column">
            <input-element v-model="field.params.label" />
            <slot></slot>
        </div>
    </div>
</template>

<script>
import InputElement from '../ui_elements/InputElement';

export default {
    name: 'BaseFieldValues',

    components: {
        InputElement,
    },

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
    display: flex;

    &__letter-column {
        flex: auto 0;
        margin-right: 24px;
    }

    &__properties-column {
        flex: 1;
    }

    &__field-letter {
        padding: 9px 12px;
        display: inline-block;
        border-radius: 6px;
        color: $white;
    }

    &--select {
        background-color: $select_widget_light;
    }

    &--select &__field-letter {
        background-color: $select_widget;
    }

    &--checkbox {
        background-color: $checkbox_widget_light;
    }

    &--checkbox &__field-letter {
        background-color: $checkbox_widget;
    }

    &--radio {
        background-color: $radio_widget_light;
    }

    &--radio &__field-letter {
        background-color: $radio_widget;
    }
}
</style>
