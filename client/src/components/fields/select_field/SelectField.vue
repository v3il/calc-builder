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
                v-if="this.field.params.label"
                :for="field.id"
                :style="{ color: field.style.labelColor }"
            >
                {{ field.params.label }}
            </label>
        </transition>

        <select-element
            @change="triggerChange"
            :options="{
                id: field.id,
                options: field.params.options,
                style: styles,
            }"
        />
    </field-base>
</template>

<script>
import FieldBase from '../BaseField.vue';
import SelectElement from '@/components/ui_elements/SelectElement';

export default {
    name: 'SelectField',

    components: {
        FieldBase,
        SelectElement,
    },

    model: {
        prop: 'value',
        event: 'change',
    },

    extends: FieldBase,

    computed: {
        styles() {
            return {
                ...this.field.style,
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
                label: this.uSign('translate', 'Значение 1'),
                id: Math.random(),
            },
            {
                activatedValue: 200,
                deactivatedValue: 0,
                isSelected: false,
                label: this.uSign('translate', 'Значение 2'),
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
        triggerChange({ target }) {
            const { selectedIndex } = target;

            this.field.params.options.forEach((item, index) => {
                item.isSelected = index === selectedIndex;
            });
        },
    },
};
</script>
