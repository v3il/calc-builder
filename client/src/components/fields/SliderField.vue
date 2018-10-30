<script>
    import FieldBase from './BaseField.vue';

    import getTemplateForComponent from './getTemplateForComponent';

    export default {
        name: "SliderField",

        extends: FieldBase,

        template: getTemplateForComponent({
            'default': `
                <el-slider
                    v-model="params.value"
                    :step="params.step"
                    :min="params.min"
                    :max="params.max"
                ></el-slider>
            `,
        }),

        data() {
            return {
                defaultOptions: {
                    text: 'Button',
                    borderColor: 'red',

                    value: 0,
                    min: 0,
                    max: 10,
                    step: 1,
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