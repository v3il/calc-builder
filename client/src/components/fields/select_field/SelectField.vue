<template>
    <field-base :field="field">
        <transition name="fade">
            <label class="label" v-if="this.field.params.label" :for="field.id" :style="{ color: field.style.labelColor }">
                {{field.params.label}}
            </label>
        </transition>

        <select type="text"
            v-model="field.params.value"
            :style="styles"
            :id="field.id"
            class="select"
        >
            <option v-for="option in field.params.options" :value="option">{{option.label}}</option>
        </select>

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
        name: 'SelectField',

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
                    ...{ borderRadius: `${this.field.style.borderRadius}px` },
                };
            }
        },

        data() {
            const defaultOptions = [
                {
                    activatedValue: 100,
                    deactivatedValue: 0,
                    isDefault: true,
                    isSelected: true,
                    label: 'Значение 1',
                },
                {
                    activatedValue: 200,
                    deactivatedValue: 0,
                    isDefault: false,
                    isSelected: false,
                    label: 'Значение 2',
                },
            ];

            return {
                defaultOptions: {
                    value: defaultOptions[0],
                    label: 'Заголовок поля',
                    options: defaultOptions,
                },

                defaultStyle: {
                    labelColor: '#2c2e32',
                    borderRadius: 6,
                },
            };
        },
    };
</script>

<style scoped lang="scss">
</style>
