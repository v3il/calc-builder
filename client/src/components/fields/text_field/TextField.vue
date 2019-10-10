<template>
    <field-base :field="field">
        <transition name="fade">
            <label v-if="this.field.params.label" :for="generateFieldId()" :style="{ color: field.style.labelColor }">
                {{field.params.label}}
            </label>
        </transition>

        <input type="text" v-model="field.params.value"
               :placeholder="field.params.placeholder"
               :id="generateFieldId()"
               :style="field.style">

        <template slot="toolbar">
            <toolbar-drag-button />
            <toolbar-edit-button @click="$emit('edit-field')" />
            <toolbar-remove-button @click="$emit('remove-field')" />
        </template>
    </field-base>
</template>

<script>
    import ToolbarDragButton from '../../fields_toolbar/ToolbarDragButton';
    import ToolbarEditButton from '../../fields_toolbar/ToolbarEditButton';
    import ToolbarRemoveButton from '../../fields_toolbar/ToolbarRemoveButton';

    import FieldBase from '../BaseField.vue';

    import ContainerSizes from '@/constants/ContainerSizes';

    export default {
        name: 'TextField',

        components: {
            FieldBase,
            ToolbarDragButton,
            ToolbarEditButton,
            ToolbarRemoveButton,
        },

        extends: FieldBase,

        data() {
            return {
                defaultOptions: {
                    value: 'Какое-то значение',
                    label: 'Заголовок поля',
                    placeholder: 'Подсказка поля',
                    width: ContainerSizes.default,
                    float: true,
                    marginLeft: 0,
                },

                defaultStyle: {
                    color: '#2c2e32',
                    backgroundColor: '#ffffff',
                    borderColor: '#e0e2e6',
                    labelColor: '#2c2e32',
                },
            };
        },
    };
</script>

<style scoped lang="scss">
    input {
        padding: 0 18px;
        font-size: 14px;
        outline: none;
        height: 36px;
        color: #2c2e32;
        border: 2px solid #e0e2e6;
        background-color: #fff;
        border-radius: 10px;
        margin: 0;
        z-index: 1;
        position: relative;
        transition: border .3s linear;
        box-sizing: border-box;
        width: 100%;
    }
</style>
