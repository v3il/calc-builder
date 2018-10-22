export default {
    name: "FieldBase",

    data() {
        return {
            params: {},
        }
    },

    props: {
        options: Object,
    },

    created() {
        this.params = Object.assign({}, this.defaultOptions, this.options);
        this.$emit('optionsUpdate', this.params);
    },
}
