<template>
    <base-field-values :field="field" field-class="select">
        <div class="field-values__label-input-wrapper">
            <input-element v-model="field.params.label" class="field-values__label-input" />
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

<style scoped lang="scss">
.select-values {
    /* &__values-editor {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0 -12px;
    }

    &__option {
        margin: 6px 0;
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
    } */
}
</style>
