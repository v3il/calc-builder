<template>
    <v-flex v-bind="{
        [`xs3`]: params.size.width === 0.33,
        [`xs6`]: params.size.width === 0.5,
        [`xs9`]: params.size.width === 0.66,
        [`xs12`]: params.size.width === 1.0,
    }" class="field-wrapper">
        <FieldsParamsToolbar>
            <FieldSizeAndPositionSelector :options="params.size"></FieldSizeAndPositionSelector>
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
    </v-flex>
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
                        position: 'left',
                    }
                },
            }
        },
    }
</script>

<style scoped  lang="scss">
</style>