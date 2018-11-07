<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "ButtonField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-button @click="action" size="medium">{{fieldObject.params.text}}</el-button>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    text: 'Button',
                    borderColor: 'red',
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