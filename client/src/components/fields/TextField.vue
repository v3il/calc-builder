<script>
    import FieldBase from './BaseField.vue';

    import getTemplateForComponent from './getTemplateForComponent';

    export default {
        name: "TextField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-form-item>
                    <label for="a1" class="el-form-item__label">{{params.label}}</label>
                    <el-input v-model="params.text" id="a1"></el-input>
                </el-form-item>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    text: 'Input',
                    borderColor: 'red',

                    label: 'Label for input',

                    width: 100,
                    float: true,
                    marginLeft: 0,
                },
            }
        },
    }
</script>

<style scoped  lang="scss">
    input {
        width: 100%;
    }
</style>