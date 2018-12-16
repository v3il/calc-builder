<script>
    import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';

    import ContainerSizes from '../../constants/ContainerSizes';

    export default {
        data() {
            return {
                fieldObject: this.field,

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
            field: Object,
        },

        methods: {
            emitFieldRemove() {
                this.$emit('removeField');
            },

            emitFieldEdit() {
                this.$emit('editField');
            },

            generateFieldId() {
                return `${this.$options.name.toLowerCase()}-${this.fieldObject.id}`
            }
        },

        created() {
            this.fieldObject.params = Object.assign({}, this.defaultOptions, this.fieldObject.params);
        },
    }
</script>

<style lang="scss">
    .field-wrapper {
        border: 1px solid transparent;
        /*margin: 1px 0;*/
        padding: 0 18px;
        position: relative;
        display: inline-block;
        vertical-align: top;

        &:hover {
            .field-wrapper-toolbar {
                opacity: 1;
            }

            border: 1px solid #ccc;
        }
    }

    .el-form-item {
        padding: 9px 0;
        margin-bottom: 0;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>