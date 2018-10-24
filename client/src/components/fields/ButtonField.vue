<template>
    <v-flex class="field-wrapper">
        <FieldsParamsToolbar>
            <RemoveFieldToolbarItem @fieldRemove="emitFieldRemove"></RemoveFieldToolbarItem>
        </FieldsParamsToolbar>

        <v-btn block>{{params.text}}</v-btn>
    </v-flex>
</template>

<script>
    import FieldBase from './FieldBase.vue';

    import FieldsParamsToolbar from '../fields_toolbar/FieldsParamsToolbar';
    import RemoveFieldToolbarItem from '../fields_toolbar/RemoveFieldToolbarItem';

    export default {
        name: "ButtonField",

        extends: FieldBase,

        components: {
            FieldsParamsToolbar,
            RemoveFieldToolbarItem,
        },

        data() {
            return {
                defaultOptions: {
                    text: 'Button',
                    borderColor: 'red'
                },
            }
        },
    }
</script>

<style scoped lang="scss">
</style>