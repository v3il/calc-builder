<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    import EventBus from '@/EventBus';

    export default {
        name: "CheckBoxField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <label>
                    {{fieldObject.params.label}}
                </label>

                <ui-checkbox-group
                    vertical
                    :options="fieldObject.params.options"
                    v-model="fieldObject.params.value"
                ></ui-checkbox-group>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    value: [1],
                    label: 'Заголовок поля',
                    options: [
                        {
                            value: 1,
                            label: 'Значение 1'
                        },
                        {
                            value: 2,
                            label: 'Значение 2'
                        },
                    ],
                },
            }
        },

        methods: {},

        created() {
            console.log(`removeOption${this.fieldObject.id}`)

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
        }
    }
</script>

<style lang="scss">
    .field-wrapper {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    .field-wrapper .el-checkbox__inner {
        width: 20px;
        height: 20px;

        &:after {
            top: 2px;
            height: 10px;
            left: 7px;
        }
    }
</style>