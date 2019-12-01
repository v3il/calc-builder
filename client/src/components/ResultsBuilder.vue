<template>
    <div class="results-builder">
        <aside class="results-builder__sidebar">
            <formula-builder
                v-for="(resultField, index) in results"
                :result-field="resultField"
                :key="index"
                class="results-builder__formula-editor"
            ></formula-builder>
        </aside>

        <main class="results-builder__content">
            <div class="results-builder__components-wrapper">
                <template v-for="(row, index) in form.layout">
                    <div class="results-builder__row" v-if="row.fields.length" :key="index">
                        <component
                            v-for="field in row.fields"
                            :is="`${field.type}Values`"
                            class="results-builder__item"
                            :field="field"
                            :key="field.id"
                            @remove-field="removeField(field)"
                            @remove-option="removeOption(field, $event)"
                            @add-option="addOption(field)"
                        ></component>
                    </div>
                </template>
            </div>
        </main>
    </div>
</template>

<script>
import { SelectFieldValues } from './fields/select_field';
import { RadioButtonFieldValues } from './fields/radiobutton_field';
import { CheckBoxFieldValues } from './fields/checkbox_field';
import { SliderFieldValues } from './fields/slider_field';
import { TextFieldValues } from './fields/text_field';
import { TextAreaFieldValues } from './fields/textarea_field';
import { ResultFieldValues } from './fields/result_field';
import RadioButtonOption from '../models/RadioButtonOption';
import SelectOption from '../models/SelectOption';
import FormulaBuilder from './FormulaBuilder';

export default {
    name: 'ResultsBuilder',

    components: {
        SelectFieldValues,
        RadioButtonFieldValues,
        CheckBoxFieldValues,
        SliderFieldValues,
        TextFieldValues,
        TextAreaFieldValues,
        ResultFieldValues,
        FormulaBuilder,
    },

    props: {
        form: {
            type: Object,
            required: true,
        },
    },

    computed: {
        fieldsList() {
            return this.form.layout.reduce((result, current) => result.concat(current.fields), []);
        },

        results() {
            return this.fieldsList.filter(({ type }) => type === 'ResultField');
        },
    },

    methods: {
        removeField(removedField) {
            console.log('Remove');

            const row = this.form.layout.find(row => row.fields.includes(removedField));
            row.fields = row.fields.filter(field => field !== removedField);
            this.updateLayout();
        },

        updateLayout() {
            console.log('Update');
            this.$store.dispatch('updateData');
        },

        removeOption(field, optionToRemove) {
            field.params.options = field.params.options.filter(option => option !== optionToRemove);
            this.updateLayout();
        },

        addOption(field) {
            const { type } = field;

            if (type === 'RadioButtonField') {
                field.params.options.push(new RadioButtonOption());
            }

            if (type === 'SelectField') {
                field.params.options.push(new SelectOption());
            }
        },
    },
};
</script>

<style scoped lang="scss">
.results-builder {
    display: flex;
    height: 100%;
    overflow-y: hidden;

    // Sidebar
    &__sidebar {
        width: 450px;
        padding: 24px;
        background-color: #fff;
        border-right: 1px solid rgba(0, 0, 0, 0.12);
        overflow-x: hidden;
        flex-shrink: 0;
    }

    // Content
    &__content {
        width: 100%;
        padding: 24px;
        overflow-y: auto;
    }

    &__components-wrapper {
        max-width: 1600px;
        margin: 0 auto;
    }

    &__row {
        border: 1px #ccc dashed;
        padding: 6px 12px;
        margin: 12px 0;
        border-radius: 6px;
    }

    &__item {
        margin: 6px 0;
    }
}
</style>
