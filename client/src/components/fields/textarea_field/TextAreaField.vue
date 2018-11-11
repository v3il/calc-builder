<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "TextAreaField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-form-item>
                    <transition name="fade">
                        <label v-if="this.fieldObject.params.label" :for="'textarea' + this.fieldObject.id" class="el-form-item__label">
                            {{fieldObject.params.label}}
                        </label>
                    </transition>

                    <textarea
                        class="el-textarea__inner"
                        rows="2"
                        v-model="fieldObject.params.text"
                        :id="'textarea' + this.fieldObject.id"
                        :placeholder="this.fieldObject.params.placeholder"
                    ></textarea>
                </el-form-item>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    text: '',
                    label: 'Label for input',
                    placeholder: 'Placeholder for input',
                },
            }
        },

        computed: {
            styleObject() {
                return {
                    // 'border-color': this.fieldObject.params.borderColor,
                }
            }
        },
    }
</script>

<style scoped  lang="scss">
    textarea {
        width: 100%;
    }
</style>