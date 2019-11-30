<template>
    <base-field-values :field="field" class="field-values--result">
        <div class="field-values__label-input-wrapper">
            <input-element v-model="field.params.template" class="field-values__label-input" />
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
    &--result {
        background-color: $result_widget_light;
    }

    &--result &__field-letter,
    &--result &__field-letter::after,
    &--result &__label-input-wrapper::before,
    &--result &__option::before,
    &--result &__remove-field {
        background-color: $result_widget;
    }
}
</style>
