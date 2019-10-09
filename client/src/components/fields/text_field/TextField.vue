<template>
    <field-base :field="field">
        <transition name="fade">
            <label v-if="this.field.params.label" :for="generateFieldId()">
                {{field.params.label}}
            </label>
        </transition>

        <ui-textbox
            type="text"
            v-model="field.params.value"
            :placeholder="field.params.placeholder"
            :id="generateFieldId()"
            :style="field.style"
        ></ui-textbox>

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
                    value: '',
                    label: 'Заголовок поля',
                    placeholder: 'Подсказка поля',
                    width: ContainerSizes.default,
                    float: true,
                    marginLeft: 0,
                },

                defaultStyle: {

                },
            };
        },
    };
</script>

<style scoped lang="scss">
    input {
        width: 100%;
    }
</style>
