<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "TextField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-form-item>
                    <label for="a1" class="el-form-item__label">{{fieldObject.params.label}}</label>
                    <input
                        type="text"
                        v-model="fieldObject.params.text"
                        id="a1"
                        :style="{'border-color': fieldObject.params.borderColor}"
                        class="el-input__inner"
                    >
                </el-form-item>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    label: 'Label for input',
                    borderColor: '#0000ff',
                },
            }
        },

        created() {
            console.log(this.fieldObject.id)
        }
    }
</script>

<style scoped  lang="scss">
    input {
        width: 100%;
    }
</style>