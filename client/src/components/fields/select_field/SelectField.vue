<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "SelectField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-select v-model="fieldObject.params.value">
                    <el-option
                        v-for="(option, index) in fieldObject.params.selectOptions"
                        :value="option.value"
                        :key="option.text + index"
                    >{{option.text}}</el-option>
                </el-select>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    value: 1,
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

        methods: {}
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