<template>
    <base-field-values :field="field" class="field-values--text">
        <div class="field-values__label-input-wrapper">
            <input-element v-model="field.params.label" class="field-values__label-input" />
            <i @click="$emit('remove-field')" class="material-icons field-values__remove-field"
                >clear</i
            >
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
    &--text {
        background-color: $input_widget_light;
    }

    &--text &__field-letter,
    &--text &__field-letter::after,
    &--text &__label-input-wrapper::before,
    &--text &__option::before,
    &--text &__remove-field {
        background-color: $input_widget;
    }
}
</style>
