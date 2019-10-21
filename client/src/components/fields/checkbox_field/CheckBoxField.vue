<template>
    <field-base :field="field">
        <div>
            <label>
                <input class="checkbox" type="checkbox" :name="field.id" v-model="field.params.value">
                {{field.params.label}}
            </label>
        </div>

        <template slot="toolbar">
            <toolbar-drag-button/>
            <toolbar-edit-button @click="$emit('edit-field')"/>
            <toolbar-remove-button @click="$emit('remove-field')"/>
        </template>
    </field-base>
</template>

<script>
    import ToolbarDragButton from '../../fields_toolbar/ToolbarDragButton';
    import ToolbarEditButton from '../../fields_toolbar/ToolbarEditButton';
    import ToolbarRemoveButton from '../../fields_toolbar/ToolbarRemoveButton';

    import FieldBase from '../BaseField.vue';

    export default {
        name: 'RadioButtonField',

        components: {
            FieldBase,
            ToolbarDragButton,
            ToolbarEditButton,
            ToolbarRemoveButton,
        },

        extends: FieldBase,

        computed: {
            styles() {
                return {
                    ...this.field.style,
                };
            }
        },

        data() {
            return {
                defaultOptions: {
                    value: true,
                    label: 'Заголовок поля',
                },

                defaultStyle: {
                    labelColor: '#2c2e32',
                },
            };
        },
    };
</script>

<style scoped lang="scss">
</style>
