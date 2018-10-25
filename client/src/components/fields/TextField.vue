<template>
    <div :style="{
        width: params.size.float ? params.size.width * 100 + '%' : '100%',
    }" class="field-wrapper">
        <FieldsParamsToolbar>
            <FieldSizeAndPositionSelector @editField="emitFieldEdit"></FieldSizeAndPositionSelector>
            <RemoveFieldToolbarItem @fieldRemove="emitFieldRemove"></RemoveFieldToolbarItem>
        </FieldsParamsToolbar>

        <div :style="{
            width: params.size.float ? '100%' : params.size.width * 100 + '%',
        }" :class="{
            'at-left': !params.size.float && params.size.position === 'left',
            'at-center': !params.size.float && params.size.position === 'center',
            'at-right': !params.size.float && params.size.position === 'right',
        }">
            <input type="text" v-model="params.text">
        </div>
    </div>
</template>

<script>
    import FieldBase from './FieldBase.vue';

    import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';
    import RemoveFieldToolbarItem from '../fields_toolbar/RemoveFieldToolbarItem';
    import FieldSizeAndPositionSelector from '../fields_toolbar/FieldSizeAndPositionSelector';

    export default {
        name: "TextField",

        extends: FieldBase,

        components: {
            FieldsParamsToolbar,
            RemoveFieldToolbarItem,
            FieldSizeAndPositionSelector,
        },

        data() {
            return {
                defaultOptions: {
                    text: 'Input',
                    borderColor: 'red',

                    size: {
                        width: 0.5,
                        float: true,
                        position: 'left',
                    }
                },
            }
        },
    }
</script>

<style scoped  lang="scss">
    input {
        width: 100%;
    }

    .at-left {
        float: left;
    }

    .at-center {
        margin: 0 auto;
    }

    .at-right {
        float: right;
    }
</style>