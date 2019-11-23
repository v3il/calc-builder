<template>
    <base-field-values :field="field" class="field-values--slider">
        <div class="field-values__label-input-wrapper">
            <input-element v-model="field.params.label" class="field-values__label-input" />
        </div>
    </base-field-values>
</template>

<script>
import InputElement from '@/components/ui_elements/InputElement';
import BaseFieldValues from '../BaseFieldValues';

export default {
    name: 'SelectFieldValues',

    components: {
        InputElement,
        BaseFieldValues,
    },

    props: {
        field: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.field-values {
    &--slider {
        background-color: $slider_widget_light;
    }

    &--slider &__field-letter,
    &--slider &__field-letter::after,
    &--slider &__label-input-wrapper::before,
    &--slider &__option::before {
        background-color: $slider_widget;
    }
}
</style>
