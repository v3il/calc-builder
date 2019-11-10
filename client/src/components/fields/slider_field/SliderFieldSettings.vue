<template>
    <div class="field-settings">
        <h3 class="field-settings__title">{{ propsCategoriesNames.MODEL }}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            class="field-settings__property-component"
            :options="{
                title: 'Заголовок поля',
                description: 'Оставьте пустым, чтобы скрыть элемент надписи',
            }"
        ></text-field-component>

        <text-field-component
            v-model.number="fieldData.params.min"
            class="field-settings__property-component"
            :options="{
                title: 'Минимальное значение',
                type: 'number',
                validator: validateMinValue,
            }"
            @value-changed="updateStep"
        ></text-field-component>

        <text-field-component
            v-model.number="fieldData.params.max"
            class="field-settings__property-component"
            :options="{
                title: 'Максимальное значение',
                type: 'number',
                validator: validateMaxValue,
            }"
            @value-changed="updateStep"
        ></text-field-component>

        <text-field-component
            v-model.number="fieldData.params.step"
            class="field-settings__property-component"
            :options="{
                title: 'Значение шага',
                type: 'number',
                validator: validateStep,
            }"
        ></text-field-component>
    </div>
</template>

<script>
import BaseFieldSettings from '../BaseFieldSettings';

export default {
    name: 'SliderFieldSettings',
    extends: BaseFieldSettings,

    methods: {
        validateMinValue(value) {
            const { lowerBound, upperBound } = this.getValuesBounds();
            const numericValue = value.length ? parseInt(value) : 0;

            if (numericValue < lowerBound) {
                return lowerBound;
            }

            if (numericValue > upperBound - 1) {
                return upperBound - 1;
            }

            if (numericValue >= this.fieldData.params.max) {
                this.fieldData.params.max = numericValue + 1;
            }

            return numericValue;
        },

        validateMaxValue(value) {
            const { lowerBound, upperBound } = this.getValuesBounds();
            const numericValue = value.length ? parseInt(value) : 0;

            if (numericValue < lowerBound + 1) {
                return lowerBound + 1;
            }

            if (numericValue > upperBound) {
                return upperBound;
            }

            if (numericValue <= this.fieldData.params.min) {
                this.fieldData.params.min = numericValue - 1;
            }

            return numericValue;
        },

        validateStep(value) {
            const numericValue = typeof value === 'string' ? parseInt(value) : value;

            if (numericValue < 1) {
                return 1;
            }

            const { min, max } = this.fieldData.params;
            const valuesDiff = Math.abs(max - min);

            if (numericValue >= valuesDiff) {
                return valuesDiff;
            }

            return numericValue;
        },

        getValuesBounds() {
            return {
                lowerBound: -100000,
                upperBound: 100000,
            };
        },

        updateStep() {
            this.$nextTick(() => {
                this.fieldData.params.step = this.validateStep(this.fieldData.params.step);
            });
        },
    },
};
</script>
