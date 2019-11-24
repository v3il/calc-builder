<template>
    <div class="field-settings">
        <h3 class="field-settings__title">{{ propsCategoriesNames.MODEL }}</h3>

        <text-field-component
            v-model="fieldData.params.label"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Заголовок поля'),
                description: uSign('translate', 'Оставьте пустым, чтобы скрыть элемент надписи'),
            }"
        ></text-field-component>

        <text-field-component
            v-model.number="fieldData.params.min"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Минимальное значение'),
                type: 'number',
                validator: validateMinValue,
            }"
            @value-changed="updateStep"
        ></text-field-component>

        <text-field-component
            v-model.number="fieldData.params.max"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Максимальное значение'),
                type: 'number',
                validator: validateMaxValue,
            }"
            @value-changed="updateStep"
        ></text-field-component>

        <text-field-component
            v-model.number="fieldData.params.step"
            class="field-settings__property-component"
            :options="{
                title: uSign('translate', 'Значение шага'),
                type: 'number',
                validator: validateStep,
                description: uSign(
                    'translate',
                    '(max - min) должно нацело делиться на значение шага',
                ),
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
            const intValue = parseInt(value);

            if (intValue < lowerBound) {
                return lowerBound;
            }

            if (intValue > upperBound - 1) {
                return upperBound - 1;
            }

            if (intValue >= this.fieldData.params.max) {
                this.fieldData.params.value = intValue;
                this.fieldData.params.max = intValue + 1;
            }

            return intValue;
        },

        validateMaxValue(value) {
            const { lowerBound, upperBound } = this.getValuesBounds();
            const intValue = parseInt(value);

            if (intValue < lowerBound + 1) {
                return lowerBound + 1;
            }

            if (intValue > upperBound) {
                return upperBound;
            }

            if (intValue <= this.fieldData.params.min) {
                this.fieldData.params.value = intValue;
                this.fieldData.params.min = intValue - 1;
            }

            return intValue;
        },

        // todo: step should be divided by (max - min)
        validateStep(value) {
            const intValue = parseInt(value);

            if (intValue < 1) {
                return 1;
            }

            const { min, max } = this.fieldData.params;
            const valuesDiff = Math.abs(max - min);

            if (intValue >= valuesDiff) {
                return valuesDiff;
            }

            return intValue;
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
