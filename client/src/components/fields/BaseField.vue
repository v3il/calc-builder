<template>
    <div :style="{
        width: field.params.float ? field.params.width + '%' : '100%',
    }" class="field-wrapper">
        <fields-params-toolbar>
            <slot name="toolbar"></slot>
        </fields-params-toolbar>

        <div :style="{
            width: field.params.float ? '100%' : field.params.width + '%',
            'margin-left': field.params.float ? '0' : field.params.marginLeft + '%',
        }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';

    import ContainerSizes from '../../constants/ContainerSizes';

    export default {
        data() {
            return {
                // fieldObject: this.field,

                // defaultOptions: {
                //     width: ContainerSizes.default,
                //     float: true,
                //     marginLeft: 0,
                // },
            };
        },

        components: {
            FieldsParamsToolbar,
        },

        props: {
            field: {
                type: Object,
                required: true,
            },
        },

        methods: {
            // emitFieldRemove() {
            //     this.$emit('removeField');
            // },
            //
            // emitFieldEdit() {
            //     this.$emit('editField');
            // },

            generateFieldId() {
                return `${this.$options.name.toLowerCase()}-${this.field.id}`;
            },
        },

        created() {
            this.field.params = { ...this.defaultOptions, ...this.field.params };
            this.field.style = { ...this.defaultStyle, ...this.field.style };
        },
    };
</script>

<style lang="scss">
    .field-wrapper {
        border: 1px solid #555;
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
