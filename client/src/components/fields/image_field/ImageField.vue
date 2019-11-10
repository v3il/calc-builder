<script>
import FieldBase from '../BaseField.vue';

import getTemplateForComponent from '../getTemplateForComponent';

export default {
    name: 'ImageField',

    extends: FieldBase,

    template: getTemplateForComponent({
        default: `
                <img src="https://beebom.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg" />
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
        };
    },

    methods: {
        action() {
            console.log(123, this.params, this.options);
        },
    },
};
</script>

<style scoped lang="scss">
.field-wrapper {
    padding-top: 6px;
    padding-bottom: 6px;
}

img {
    max-width: 100%;
    max-height: 300px;
    display: block;
    margin: 0 auto;
}
</style>
