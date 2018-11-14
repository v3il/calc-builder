<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "CheckBoxField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-checkbox v-model="fieldObject.params.value">{{fieldObject.params.label}}</el-checkbox>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    label: 'Checkbox',
                    value: true,
                },
            }
        },

        methods: {}
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