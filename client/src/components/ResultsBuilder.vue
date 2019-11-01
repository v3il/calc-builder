<template>
    <div class="results-builder">
        <aside class="results-builder__sidebar">
            <pre>
                {{JSON.stringify(statefulFields, null, 2)}}
            </pre>
        </aside>

        <main class="results-builder__content">
            <component
                v-for="field in statefulFields"
                :is="`${field.type}Values`"
                class="results-builder__item"
                :field="field"
                :key="field.id"
            ></component>
        </main>
    </div>
</template>

<script>
    import { SelectFieldValues } from './fields/select_field';
    import { RadioButtonFieldValues } from './fields/radiobutton_field';
    import { CheckBoxFieldValues } from './fields/checkbox_field';

    export default {
        name: "ResultsBuilder",

        components: {
            SelectFieldValues,
            RadioButtonFieldValues,
            CheckBoxFieldValues,
        },

        props: {
            form: {
                type: Object,
                required: true,
            }
        },

        computed: {
            fieldsList() {
                return this.form.layout.reduce((result, current) => {
                    return result.concat(current.fields);
                }, []);
            },

            statefulFields() {
                return this.fieldsList
                    .filter(({ type }) =>  ['RadioButtonField', 'CheckBoxField', 'SelectField'].includes(type));
            },
        },

        methods: {
            changeValue(field, fieldName, fieldValue) {
                console.log(fieldName, fieldValue)

                this.$set(field.params, fieldName, fieldValue);

                // field.params[fieldName] = fieldValue;
            }
        }
    }
</script>

<style scoped lang="scss">
    .results-builder {
        display: flex;
        height: 100%;

        // Sidebar
        &__sidebar {
            width: 450px;
            padding: 24px;
            background-color: #fff;
            border-right: 1px solid rgba(0, 0, 0, 0.12);
            overflow-x: hidden;
        }

        // Content
        &__content {
            width: 100%;
            padding: 24px;
        }
    }
</style>