<script>
    import FieldBase from './BaseField.vue';

    import getTemplateForComponent from './getTemplateForComponent';

    export default {
        name: "TextAreaField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-form-item>
                    <label for="a1" class="el-form-item__label">{{params.label}}</label>
                    <el-input type="textarea" :rows="2" v-model="params.text" id="a1"></el-input>
                </el-form-item>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    text: 'Input',
                    borderColor: 'red',

                    label: 'Label for input',
                },
            }
        },
    }
</script>

<style scoped  lang="scss">
    textarea {
        width: 100%;
    }
</style>