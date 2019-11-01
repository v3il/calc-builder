<template>
    <field-base :field="field">
        <transition name="fade">
            <label class="label" v-if="field.params.label" :for="field.id" :style="{ color: field.style.labelColor }">
                {{field.params.label}}
            </label>
        </transition>

        <div>
            <label v-for="option in field.params.options" class="radio">
                <input
                    v-if="field.internal.readonly"
                    class="radio__input"
                    type="radio"
                    :name="field.id"
                    :checked="option.isDefault"
                    readonly
                    disabled
                >

                <input
                    v-else
                    class="radio__input"
                    type="radio"
                    :name="field.id"
                    :value="option"
                    v-model="field.params.value"
                >

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
                },
            };
        },
    };
</script>

<style scoped lang="scss">
    .radio {
        margin-bottom: 12px;
    }
</style>
