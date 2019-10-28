<template>
    <field-base :field="field">
        <transition name="fade">
            <label v-if="field.params.label" :for="field.id" :style="{ color: field.style.labelColor }">
                {{field.params.label}}
            </label>
        </transition>

        <div>
            <label v-for="option in field.params.options" class="radio">
                <input class="radio__input" type="radio" :name="field.id" :value="option.value" v-model="field.params.value">
                <span class="radio__check"></span>
                <span class="radio__label">{{option.label}}</span>
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
                    value: 1,
                    label: 'Заголовок поля',
                    options: [
                        { label: 'Значение 1', value: 1 },
                        { label: 'Значение 2', value: 2 },
                    ]
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
