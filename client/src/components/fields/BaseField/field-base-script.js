export default {
    data() {
        return {
            params: {},
        }
    },

    props: {
        options: Object,
    },

    methods: {
        emitFieldRemove() {
            this.$emit('removeField');
        },

        emitFieldEdit() {
            this.$emit('editField');
        }
    },

    created() {
        const params = Object.assign({}, this.defaultOptions, this.options);
        this.params = params;
        this.$emit('optionsUpdate', this.params);
    },
}