<script>
    import EventBus from '../../../EventBus';

    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "SelectField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <label v-if="this.fieldObject.params.label">
                    {{fieldObject.params.label}}
                </label>

                <ui-select
                    :options="fieldObject.params.options"
                    v-model="fieldObject.params.value"
                ></ui-select>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    value: {
                        value: 1,
                        label: 'Option 1'
                    },
                    label: 'Заголовок поля',
                    options: [
                        {
                            value: 1,
                            label: 'Option 1'
                        },
                        {
                            value: 2,
                            label: 'Option 2'
                        }
                    ],
                },
            }
        },

        methods: {},

        created() {
            EventBus.$on(`removeOption${this.fieldObject.id}`, (option) => {
                this.fieldObject.params.options = this.fieldObject.params
                    .options.filter(opt => opt !== option);
            });

            EventBus.$on(`addOption${this.fieldObject.id}`, () => {
                this.fieldObject.params.options.push({
                    value: 1,
                    label: 'Option',
                });
            });
        },

        destroyed() {
            EventBus.$off(`addOption${this.fieldObject.id}`);
            EventBus.$off(`removeOption${this.fieldObject.id}`);
        }
    }
</script>

<style scoped lang="scss">
    .field-wrapper {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .el-select {
        width: 100%;
    }
</style>