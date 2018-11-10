<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "ButtonField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <button
                    class="el-button el-button--default el-button--medium"
                    :style="styleObject"
                    @click="action"
                >{{fieldObject.params.text}}</button>
            `,
        }),

        computed: {
            styleObject() {
                return {
                    'border-radius': `${this.fieldObject.params.borderRadius}px`,
                }
            }
        },

        data() {
            return {
                defaultOptions: {
                    text: 'Button',
                    borderRadius: 1,
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