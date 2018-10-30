<script>
    import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';

    import ContainerSizes from '../../constants/ContainerSizes';

    export default {
        data() {
            return {
                params: {},

                defaultOptions: {
                    width: ContainerSizes.default,
                    float: true,
                    marginLeft: 0,
                },
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
                this.$emit('removeField');
            },

            emitFieldEdit() {
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
        /*margin: 1px;*/
        padding: 0 18px;
        position: relative;
        display: inline-block;
        vertical-align: top;

        &:hover {
            .field-wrapper-toolbar {
                opacity: 1;
            }
        }
    }
</style>