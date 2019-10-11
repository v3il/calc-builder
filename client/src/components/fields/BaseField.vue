<template>
    <div :style="{
        width: `${field.params.width}%`,
    }" class="field-wrapper">
        <fields-params-toolbar>
            <slot name="toolbar"></slot>
        </fields-params-toolbar>

        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';

    import ContainerSizes from '../../constants/ContainerSizes';

    export default {
        components: {
            FieldsParamsToolbar,
        },

        props: {
            field: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                commonDefaultOptions: {
                    width: ContainerSizes.default,
                },

                commonDefaultStyle: {
                    color: '#2c2e32',
                    backgroundColor: '#ffffff',
                    borderColor: '#e0e2e6',
                },
            }
        },

        created() {
            this.$set(this.field, 'params', { ...this.commonDefaultOptions, ...this.defaultOptions, ...this.field.params });
            this.$set(this.field, 'style', { ...this.commonDefaultStyle, ...this.defaultStyle, ...this.field.style });
        },
    };
</script>

<style lang="scss">
    .field-wrapper {
        border: 1px solid #eee;
        /*margin: 1px 0;*/
        padding: 12px 18px;
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
