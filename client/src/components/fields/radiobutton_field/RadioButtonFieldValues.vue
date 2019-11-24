<template>
    <base-field-values :field="field" class="field-values--radio">
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
                <input-element
                    v-model="option.label"
                    class="field-values__option-label-input"
                    :options="{
                        minLength: 1,
                    }"
                />

                <label class="field-values__value-block">
                    <span class="field-values__value-label">
                        {{ uSign('translate', 'Вкл.') }}
                    </span>

                    <input-element
                        class="field-values__value-input"
                        v-model.number="option.activatedValue"
                        :options="{
                            type: 'number',
                        }"
                    />
                </label>

                <label class="field-values__value-block">
                    <span class="field-values__value-label">{{ uSign('translate', 'Выкл.') }}</span>

                    <input-element
                        class="field-values__value-input"
                        v-model.number="option.deactivatedValue"
                        :options="{
                            type: 'number',
                        }"
                    />
                </label>
            </div>

            <i
                v-if="index > 1"
                class="material-icons field-values__remove-option"
                @click="$emit('remove-option', option)"
                >clear</i
            >
        </div>

        <button class="button field-values__add-option" @click="$emit('add-option')">
            {{ uSign('translate', 'Добавить опцию') }}
        </button>
    </base-field-values>
</template>

<script>
import InputElement from '@/components/ui_elements/InputElement';
import BaseFieldValues from '../BaseFieldValues';

export default {
    name: 'RadioFieldValues',

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
    &--radio {
        background-color: $radio_widget_light;
    }

    &--radio &__field-letter,
    &--radio &__field-letter::after,
    &--radio &__label-input-wrapper::before,
    &--radio &__option::before,
    &--radio &__remove-field,
    &--radio &__remove-option {
        background-color: $radio_widget;
    }
}
</style>
