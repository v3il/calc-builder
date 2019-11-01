<template>
    <field-base :field="field">
        <div>
            <label class="checkbox">
                <input
                    v-if="field.internal.readonly"
                    class="checkbox__input"
                    type="checkbox"
                    :name="field.id"
                    :checked="field.params.defaultValue"
                    disabled
                    readonly
                >

                <input
                    v-else
                    class="checkbox__input"
                    type="checkbox"
                    :name="field.id"
                    v-model="field.params.value"
                >

                <span class="checkbox__check"></span>
                <span class="checkbox__label">{{field.params.label}}</span>
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
                    activatedValue: 100,
                    deactivatedValue: 0,
                    defaultValue: false,
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
