<template>
    <base-field-values :field="field" class="field-values--checkbox">
        <div class="field-values__values-editor">
            <div class="field-values__label-input-wrapper">
                <input-element
                    v-model="field.params.label"
                    class="field-values__label-input"
                    :options="{
                        minLength: 1,
                    }"
                />
            </div>

            <!--            <label class="field-values__value-block">-->
            <!--                <span class="field-values__value-label">-->
            <!--                    {{ uSign('translate', 'Вкл.') }}-->
            <!--                </span>-->

            <!--                <input-element-->
            <!--                    class="field-values__value-input"-->
            <!--                    v-model.number="field.params.activatedValue"-->
            <!--                    :options="{-->
            <!--                        type: 'number',-->
            <!--                    }"-->
            <!--                />-->
            <!--            </label>-->

            <!--            <label class="field-values__value-block">-->
            <!--                <span class="field-values__value-label">-->
            <!--                    {{ uSign('translate', 'Выкл.') }}-->
            <!--                </span>-->

            <!--                <input-element-->
            <!--                    class="field-values__value-input text-input"-->
            <!--                    v-model.number="field.params.deactivatedValue"-->
            <!--                    :options="{-->
            <!--                        type: 'number',-->
            <!--                    }"-->
            <!--                />-->
            <!--            </label>-->

            <!--            <i @click="$emit('remove-field')" class="material-icons field-values__remove-field"-->
            <!--                >clear</i-->
            <!--            >-->
        </div>
    </base-field-values>
</template>

<script>
import InputElement from '@/components/ui_elements/InputElement';
import BaseFieldValues from '../BaseFieldValues';

export default {
    name: 'CheckBoxFieldValues',

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
    &--checkbox {
        background-color: $checkbox_widget_light;
    }

    &--checkbox &__field-letter,
    &--checkbox &__field-letter::after,
    &--checkbox &__label-input-wrapper::before,
    &--checkbox &__option::before,
    &--checkbox &__remove-field {
        background-color: $checkbox_widget;
    }
}
</style>
