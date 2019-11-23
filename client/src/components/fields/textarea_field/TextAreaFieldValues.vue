<template>
    <base-field-values :field="field" class="field-values--textarea">
        <div class="field-values__label-input-wrapper">
            <textarea-element v-model="field.params.label" class="field-values__label-input" />
        </div>
    </base-field-values>
</template>

<script>
import TextareaElement from '@/components/ui_elements/TextareaElement';
import BaseFieldValues from '../BaseFieldValues';

export default {
    name: 'SelectFieldValues',

    components: {
        TextareaElement,
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
    &--textarea {
        background-color: $textarea_widget_light;
    }

    &--textarea &__field-letter::after {
        display: none;
    }

    &--textarea &__field-letter,
    &--textarea &__field-letter::after,
    &--textarea &__label-input-wrapper::before,
    &--textarea &__option::before {
        background-color: $textarea_widget;
    }
}
</style>
