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
            <option v-for="option in field.params.options" :value="option.value">{{option.label}}</option>
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
            return {
                defaultOptions: {
                    value: 1,
                    label: 'Заголовок поля',
                    options: [
                        { label: 'Значение 1', value: 1 },
                        { label: 'Значение 2', value: 2 },
                    ]
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
