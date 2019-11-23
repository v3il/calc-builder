<template>
    <base-field-values :field="field" class="field-values--select">
        <div class="field-values__label-input-wrapper">
            <input-element v-model="field.params.label" class="field-values__label-input" />
            <i @click="$emit('remove-field')" class="material-icons field-values__remove-field"
                >clear</i
            >
        </div>

        <div
            class="field-values__option"
            v-for="(option, index) in field.params.options"
            :key="index"
        >
            <div class="field-values__values-editor">
                <input-element v-model="option.label" class="field-values__option-label-input" />

                <label class="field-values__value-block">
                    <span class="field-values__value-label">
                        {{ uSign('translate', 'Вкл.') }}
                    </span>

                    <input-element
                        class="field-values__value-input"
                        v-model.number="option.activatedValue"
                    />
                </label>

                <label class="field-values__value-block">
                    <span class="field-values__value-label">{{ uSign('translate', 'Выкл.') }}</span>

                    <input-element
                        class="field-values__value-input"
                        v-model.number="option.deactivatedValue"
                    />
                </label>
            </div>

            <i
                v-if="index > 1"
                @click="$emit('remove-option', option)"
                class="material-icons field-values__remove-option"
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
    &--select {
        background-color: $select_widget_light;
    }

    &--select &__field-letter,
    &--select &__field-letter::after,
    &--select &__label-input-wrapper::before,
    &--select &__option::before,
    &--select &__remove-field,
    &--select &__remove-option {
        background-color: $select_widget;
    }
}
</style>
