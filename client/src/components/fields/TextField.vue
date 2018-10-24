<template>
    <div class="field-wrapper">
        <FieldsParamsToolbar>
            <FieldSizeAndPositionSelector></FieldSizeAndPositionSelector>
            <RemoveFieldToolbarItem @fieldRemove="emitFieldRemove"></RemoveFieldToolbarItem>
        </FieldsParamsToolbar>

        <v-text-field
            single-line
            full-width
            label="Outline"
            outline
            hide-details
            v-model="params.text"
        ></v-text-field>
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
                    borderColor: 'red'
                },
            }
        },
    }
</script>

<style scoped  lang="scss">
</style>