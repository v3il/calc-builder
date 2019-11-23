<template>
    <base-field-values :field="field" field-class="checkbox">
        <div class="field-values__values-editor">
            <div class="field-values__label-input-wrapper">
                <input-element v-model="field.params.label" class="field-values__label-input" />
            </div>

            <label class="field-values__value-block">
                <span class="field-values__value-label">
                    {{ uSign('translate', 'Вкл.') }}
                </span>

                <input-element
                    class="field-values__value-input"
                    v-model.number="field.params.activatedValue"
                />
            </label>

            <label class="field-values__value-block">
                <span class="field-values__value-label">
                    {{ uSign('translate', 'Выкл.') }}
                </span>

                <input-element
                    class="field-values__value-input text-input"
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
    //background-color: $checkbox_widget_light;

    /* padding: 12px 24px; */

    /* &__values-editor {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    &__option {
        margin: 12px 0;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__label-input-wrapper {
        flex: 1;
        position: relative;

        &:before {
            content: "";
            position: absolute;
            top: 50%;
            left: -45px;
            width: 45px;
            height: 1px;
            background-color: $checkbox_widget;
        }
    }

    &__value-block {
        display: flex;
        align-items: center;
        flex-basis: 200px;
    }

    &__value-label {
        display: block;
        flex: 0 auto;
        margin: 0 12px;
    } */
}
</style>
