<template>
    <field-base
        :field="field"
        :disabled="disabled"
        :selected="selected"
        @edit-field="$emit('edit-field')"
        @remove-field="$emit('remove-field')"
    >
        <transition name="fade">
            <label
                class="label"
                v-if="field.params.label"
                :for="field.id"
                :style="{ color: field.style.labelColor }"
            >
                {{ field.params.label }}
            </label>
        </transition>

        <radiobutton-element
            v-for="(option, index) in field.params.options"
            :key="index"
            :value="option.isSelected"
            @change="triggerChange(option)"
            :options="{
                name: field.id,
                label: option.label,
            }"
            class="radiobutton-element"
        />
    </field-base>
</template>

<script>
import FieldBase from '../BaseField.vue';
import RadiobuttonElement from '@/components/ui_elements/RadiobuttonElement';

import RadioButtonOption from '../../../models/RadioButtonOption';

export default {
    name: 'RadioButtonField',

    components: {
        FieldBase,
        RadiobuttonElement,
    },

    extends: FieldBase,

    computed: {
        styles() {
            return {
                ...this.field.style,
            };
        },

        value() {
            return this.field.params.options.find(item => item.isSelected).activatedValue;
        },
    },

    data() {
        const defaultOptions = [
            new RadioButtonOption({
                activatedValue: 100,
                isSelected: true,
                label: 'Новая опция 1',
            }),
            new RadioButtonOption({
                activatedValue: 200,
                isSelected: false,
                label: 'Новая опция 2',
            }),
        ];

        return {
            defaultOptions: {
                label: this.uSign('translate', 'Заголовок поля'),
                options: defaultOptions,
            },

            defaultStyle: {
                labelColor: '#2c2e32',
            },
        };
    },

    methods: {
        triggerChange(option) {
            this.field.params.options.forEach(item => {
                item.isSelected = item === option;
            });
        },
    },

    watch: {
        'field.params': {
            deep: true,
            immediate: true,
            handler(newValue) {
                if (newValue) {
                    const { options } = newValue;
                    const fieldValue = options.reduce((total, currentOption) => {
                        const { activatedValue, deactivatedValue, isSelected } = currentOption;
                        const optionValue = isSelected ? activatedValue : deactivatedValue;

                        return total + optionValue;
                    }, 0);

                    this.$set(this.field.params, 'value', fieldValue);
                }
            },
        },
    },
};
</script>

<style scoped lang="scss">
.radiobutton-element {
    margin-bottom: 12px;
}
</style>
