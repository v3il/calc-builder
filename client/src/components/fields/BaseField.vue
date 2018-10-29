<script>
    import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';

    export default {
        data() {
            return {
                params: {},
            }
        },

        template: '',

        components: {
            FieldsParamsToolbar,
        },

        props: {
            options: Object,
        },

        methods: {
            emitFieldRemove() {
                console.log(1)
                this.$emit('removeField');
            },

            emitFieldEdit() {
                console.log(2)
                this.$emit('editField');
            }
        },

        created() {
            this.params = Object.assign({}, this.defaultOptions, this.options);
            this.$emit('optionsUpdate', this.params);
        },
    }
</script>

<style lang="scss">
    .field-wrapper {
        border: 1px solid royalblue;
        margin: 1px;
        padding: 0 18px;
        position: relative;
        display: inline-block;

        &:hover {
            .field-wrapper-toolbar {
                opacity: 1;
            }
        }
    }
</style>