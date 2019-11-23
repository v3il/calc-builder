<template>
    <base-field-values :field="field" field-class="radio">
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

<style scoped lang="scss">
.radiobutton-values {
    /* padding: 12px 24px;
    background-color: $radio_widget_light;

    &__values-editor {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    &__option {
        margin: 12px 0;
        position: relative;

        &:last-child {
            margin-bottom: 0;
        }

        &:before {
            content: "";
            position: absolute;
            top: 50%;
            left: -45px;
            width: 45px;
            height: 1px;
            background-color: $radio_widget;
        }
    }

    &__option-label-input {
        flex: 1;
    }

    &__label-input-wrapper {
        width: 100%;
        position: relative;

        &:before {
            content: "";
            position: absolute;
            top: 50%;
            left: -45px;
            width: 45px;
            height: 1px;
            background-color: $radio_widget;
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
