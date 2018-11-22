<script>
    import FieldBase from '../BaseField.vue';

    import EventBus from '../../../EventBus';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "RadioButtonField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-radio
                    v-for="option in fieldObject.params.selectOptions"
                    v-model="fieldObject.params.value"
                    :label="option.value"
                >{{option.text}}</el-radio>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    value: 1,
                    label: '',
                    selectOptions: [
                        {
                            value: 1,
                            text: 'Option 1'
                        },
                        {
                            value: 2,
                            text: 'Option 2'
                        }
                    ],
                },
            }
        },

        methods: {},

        created() {
            EventBus.$on('removeOption', (option) => {
                this.fieldObject.params.selectOptions = this.fieldObject.params
                    .selectOptions.filter(opt => opt !== option);
            });

            EventBus.$on('addOption', () => {
                this.fieldObject.params.selectOptions.push({
                    value: 1,
                    text: 'Option',
                });
            });
        }
    }
</script>

<style scoped lang="scss">
    .field-wrapper {
        padding-top: 6px;
        padding-bottom: 6px;
    }

    img {
        max-width: 100%;
        max-height: 300px;
        display: block;
        margin: 0 auto;
    }
</style>