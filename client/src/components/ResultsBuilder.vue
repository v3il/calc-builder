<template>
    <div class="results-builder">
        <aside class="results-builder__sidebar"></aside>

        <main class="results-builder__content">
            <div class="results-builder__components-wrapper">
                <component
                    v-for="field in statefulFields"
                    :is="`${field.type}Values`"
                    class="results-builder__item"
                    :field="field"
                    :key="field.id"
                ></component>
            </div>
        </main>
    </div>
</template>

<script>
import { SelectFieldValues } from './fields/select_field';
import { RadioButtonFieldValues } from './fields/radiobutton_field';
import { CheckBoxFieldValues } from './fields/checkbox_field';

export default {
    name: 'ResultsBuilder',

    components: {
        SelectFieldValues,
        RadioButtonFieldValues,
        CheckBoxFieldValues,
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

        statefulFields() {
            return this.fieldsList.filter(({ type }) =>
                ['RadioButtonField', 'CheckBoxField', 'SelectField'].includes(type),
            );
        },
    },

    methods: {
        changeValue(field, fieldName, fieldValue) {
            console.log(fieldName, fieldValue);

            this.$set(field.params, fieldName, fieldValue);

            // field.params[fieldName] = fieldValue;
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

    &__item {
        margin: 12px 0;
    }
}
</style>
