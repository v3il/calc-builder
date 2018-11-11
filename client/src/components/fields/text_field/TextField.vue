<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "TextField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-form-item>
                    <transition name="fade">
                        <label v-if="this.fieldObject.params.label" :for="'textfield' + this.fieldObject.id" class="el-form-item__label">
                            {{fieldObject.params.label}}
                        </label>
                    </transition>

                    <input
                        type="text"
                        v-model="fieldObject.params.text"
                        :placeholder="fieldObject.params.placeholder"
                        :id="'textfield' + this.fieldObject.id"
                        :style="styleObject"
                        class="el-input__inner"
                        readonly
                    >
                </el-form-item>
            `,
        }),

        computed: {
            styleObject() {
                return {
                    // 'border-color': this.fieldObject.params.borderColor,
                }
            }
        },

        data() {
            return {
                defaultOptions: {
                    text: '',
                    label: 'Label for input',
                    placeholder: 'Placeholder for input',
                    // borderColor: '#0000ff',
                },
            }
        },

        created() {
            // console.log(this.fieldObject.id)
        }
    }
</script>

<style scoped lang="scss">
    input {
        width: 100%;
    }
</style>