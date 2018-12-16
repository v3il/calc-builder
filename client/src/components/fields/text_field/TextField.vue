<script>
    import FieldBase from '../BaseField.vue';

    import getTemplateForComponent from '../getTemplateForComponent';

    export default {
        name: "TextField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <transition name="fade">
                    <label v-if="this.fieldObject.params.label" :for="generateFieldId()">
                        {{fieldObject.params.label}}
                    </label>
                </transition>

                <ui-textbox
                    type="text"
                    v-model="fieldObject.params.value"
                    :placeholder="fieldObject.params.placeholder"
                    :id="generateFieldId()"
                    :style="styleObject"
                ></ui-textbox>
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
                    value: '',
                    label: 'Заголовок поля',
                    placeholder: 'Подсказка поля',
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