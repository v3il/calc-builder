<template>
    <div class="field-wrapper" :class="{
        'field-wrapper--disabled': field.internal.disabled,
        'field-wrapper--selected': field.internal.selected,
    }">
        <fields-params-toolbar v-if="!field.internal.disabled">
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
                internalOptions: {
                    disabled: false,
                    selected: false,
                },

                commonDefaultOptions: {},

                commonDefaultStyle: {
                    color: '#2c2e32',
                    backgroundColor: '#ffffff',
                    borderColor: '#e0e2e6',
                },
            }
        },

        created() {
            this.$set(this.field, 'internal', { ...this.internalOptions });
            this.$set(this.field, 'params', { ...this.commonDefaultOptions, ...this.defaultOptions, ...this.field.params });
            this.$set(this.field, 'style', { ...this.commonDefaultStyle, ...this.defaultStyle, ...this.field.style });
        },
    };
</script>

<style lang="scss">
    .field-wrapper {
        /*border: 1px solid #eee;*/
        padding: 6px 12px;
        position: relative;
        display: inline-block;
        vertical-align: top;
        flex: 1;
        transition: opacity 0.3s;

        &--disabled {
            opacity: 0.2;
        }

        &--selected {
            background-color: lighten($bright_color6, 55%);
        }

        &:hover {
            .field-wrapper-toolbar {
                opacity: 1;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
