<template>
    <field-base
        :field="field"
        @edit-field="$emit('edit-field')"
        @remove-field="$emit('remove-field')"
    >
        <transition name="fade">
            <label
                class="label"
                v-if="this.field.params.label"
                :for="field.id"
                :style="{ color: field.style.labelColor }"
            >
                {{ field.params.label }} | {{ value }}
            </label>
        </transition>

        <select type="text" :style="styles" :id="field.id" class="select" @change="triggerChange">
            <option
                v-for="(option, index) in field.params.options"
                :key="index"
                :selected="option.isSelected"
                >{{ option.label }}</option
            >
        </select>
    </field-base>
</template>

<script>
import FieldBase from '../BaseField.vue';

export default {
    name: 'SelectField',

    components: {
        FieldBase,
    },

    extends: FieldBase,

    computed: {
        styles() {
            return {
                ...this.field.style,
                ...{ borderRadius: `${this.field.style.borderRadius}px` },
            };
        },

        value() {
            let selectedOption = this.field.params.options.find(item => item.isSelected);

            if (!selectedOption) {
                selectedOption = this.field.params.options[0];
                selectedOption.isSelected = true;
            }

            return selectedOption.activatedValue;
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
                label: 'Заголовок поля',
                options: defaultOptions,
            },

            defaultStyle: {
                labelColor: '#2c2e32',
                borderRadius: 6,
            },
        };
    },

    methods: {
        triggerChange({ target }) {
            const { selectedIndex } = target;

            this.field.params.options.forEach((item, index) => {
                item.isSelected = index === selectedIndex;
            });
        },
    },
};
</script>
