<template>
    <base-field-values :field="field" field-class="checkbox">
        <div class="checkbox-values__values-editor">
            <label class="checkbox-values__value-block">
                <span class="checkbox-values__value-label">
                    {{ uSign('translate', 'Вкл.') }}
                </span>

                <input-element
                    class="checkbox-values__value-input"
                    v-model.number="field.params.activatedValue"
                />
            </label>

            <label class="checkbox-values__value-block">
                <span class="checkbox-values__value-label">
                    {{ uSign('translate', 'Выкл.') }}
                </span>

                <input-element
                    class="checkbox-values__value-input text-input"
                    v-model.number="field.params.deactivatedValue"
                />
            </label>
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

<style scoped lang="scss">
.checkbox-values {
    background-color: $checkbox_widget_light;
    padding: 12px 24px;

    &__values-editor {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 -12px;
    }

    &__value-block {
        min-width: 300px;
        margin: 6px 12px;
        flex: 1;
        display: flex;
        align-items: center;
    }

    &__value-label {
        display: block;
        margin-bottom: 6px;
        flex: 0 auto;
        margin-right: 12px;
    }
}
</style>
