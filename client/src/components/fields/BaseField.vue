<template>
    <div
        class="field-wrapper"
        :class="{
            'field-wrapper--disabled': disabled,
            'field-wrapper--selected': selected,
        }"
    >
        <fields-params-toolbar v-if="!disabled">
            <slot name="toolbar">
                <toolbar-drag-button />
                <toolbar-edit-button @click="$emit('edit-field')" />
                <slot name="additionalButtons"></slot>
                <toolbar-remove-button @click="$emit('remove-field')" />
            </slot>
        </fields-params-toolbar>

        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';

import ToolbarDragButton from '../fields_toolbar/ToolbarDragButton';
import ToolbarEditButton from '../fields_toolbar/ToolbarEditButton';
import ToolbarRemoveButton from '../fields_toolbar/ToolbarRemoveButton';

export default {
    components: {
        FieldsParamsToolbar,
        ToolbarDragButton,
        ToolbarEditButton,
        ToolbarRemoveButton,
    },

    props: {
        field: {
            type: Object,
            required: true,
        },

        fieldsList: {
            type: Array,
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        selected: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            commonDefaultOptions: {
                letter: '',
            },

            commonDefaultStyle: {
                color: '#2c2e32',
                backgroundColor: '#ffffff',
                borderColor: '#e0e2e6',
            },
        };
    },

    created() {
        this.$set(this.field, 'params', {
            ...this.commonDefaultOptions,
            ...this.defaultOptions,
            ...this.field.params,
        });

        this.$set(this.field, 'style', {
            ...this.commonDefaultStyle,
            ...this.defaultStyle,
            ...this.field.style,
        });

        console.log('created');
    },
};
</script>

<style lang="scss">
.field-wrapper {
    /* border: 1px solid #eee; */
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
        background-color: lightcyan;
    }

    &:hover {
        .field-wrapper-toolbar {
            opacity: 1;
        }
    }
}
</style>
