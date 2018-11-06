<script>
    import FieldBase from './BaseField.vue';

    import getTemplateForComponent from './getTemplateForComponent';

    export default {
        name: "ButtonField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-button @click="action" size="medium">123</el-button>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    text: 'Button',
                    borderColor: 'red',

                    label: 'Button',
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

    button {
        width: 100%;
    }
</style>