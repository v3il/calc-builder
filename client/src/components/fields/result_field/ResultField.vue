<template>
    <field-base
        :field="field"
        :disabled="disabled"
        :selected="selected"
        @edit-field="$emit('edit-field')"
        @remove-field="$emit('remove-field')"
    >
        <div class="result" :style="style">{{ value }}</div>

        <template v-slot:additionalButtons>
            <toolbar-edit-formula-button @click="$emit('edit-formula')" />
        </template>
    </field-base>
</template>

<script>
import FieldBase from '../BaseField.vue';

import ToolbarEditFormulaButton from '../../fields_toolbar/ToolbarEditFormulaButton';

export default {
    name: 'RadioButtonField',

    components: {
        FieldBase,
        ToolbarEditFormulaButton,
    },

    extends: FieldBase,

    computed: {
        value() {
            let result = 0;

            const processedFormula = this.field.params.formula.replace(/[A-Z]\d+/g, fieldLetter => {
                const field = this.getFieldByLetter(fieldLetter);
                return field ? field.params.value : 0;
            });

            console.log(processedFormula);

            try {
                result = eval(processedFormula);
            } catch (error) {
                result = 0;
            }

            /* eslint-disable-next-line */
            this.field.params.value = result;

            return this.field.params.template.replace('$RESULT$', result);
        },

        style() {
            return {
                textAlign: this.field.params.textAlign,
                color: this.field.style.labelColor,
            };
        },
    },

    data() {
        return {
            defaultOptions: {
                template: 'Итог: $$RESULT$',
                formula: '2 + 2',
                textAlign: 'right',
            },

            defaultStyle: {
                labelColor: '#2c2e32',
            },
        };
    },

    methods: {
        getFieldByLetter(fieldLetter) {
            return this.fieldsList.find(({ letter }) => fieldLetter === letter);
        },
    },

    created() {
        this.$set(this.field.params, 'value', 0);
    },
};
</script>
