<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "CheckBoxField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-checkbox v-model="fieldObject.params.value">Option</el-checkbox>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    text: 'Button',
                    borderColor: 'red',

                    value: true,
                },
            }
        },

        methods: {
            action() {
                console.log(123, this.params, this.options);
            }
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