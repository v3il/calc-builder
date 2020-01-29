<template>
    <field-base
        :field="field"
        :disabled="disabled"
        :selected="selected"
        @edit-field="$emit('edit-field')"
        @remove-field="$emit('remove-field')"
    >
        <checkbox-element
            v-model="field.params.isSelected"
            :options="{
                id: field.id,
                label: field.params.label,
            }"
        />
    </field-base>
</template>

<script>
import FieldBase from '../BaseField.vue';
import CheckboxElement from '@/components/ui_elements/CheckboxElement';

export default {
    name: 'RadioButtonField',

    components: {
        FieldBase,
        CheckboxElement,
    },

    extends: FieldBase,

    computed: {
        styles() {
            return {
                ...this.field.style,
            };
        },
    },

    data() {
        return {
            defaultOptions: {
                label: this.uSign('translate', 'Заголовок поля'),
                activatedValue: 100,
                deactivatedValue: 0,
                isSelected: true,
            },

            defaultStyle: {
                labelColor: '#2c2e32',
            },
        };
    },

    created() {
        this.$set(this.field.params, 'value', 0);
    },

    watch: {
        'field.params': {
            deep: true,
            handler(newValue) {
                const { isSelected, activatedValue, deactivatedValue } = newValue;
                this.field.params.value = isSelected ? activatedValue : deactivatedValue;
            },
        },
    },
};
</script>
