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
            {
                activatedValue: 100,
                deactivatedValue: 0,
                isSelected: true,
                label: 'Значение 1',
                id: Math.random(),
            },
            {
                activatedValue: 200,
                deactivatedValue: 0,
                isSelected: false,
                label: 'Значение 2',
                id: Math.random(),
            },
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
};
</script>

<style scoped lang="scss">
.radiobutton-element {
    margin-bottom: 12px;
}
</style>
