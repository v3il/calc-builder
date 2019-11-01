<template>
    <field-base :field="field" @edit-field="$emit('edit-field')" @remove-field="$emit('remove-field')">
        <transition name="fade">
            <label class="label" v-if="this.field.params.label" :for="field.id" :style="{ color: field.style.labelColor }">
                {{field.params.label}}
            </label>
        </transition>

        <select type="text"
            :style="styles"
            :id="field.id"
            class="select"
            :disabled="field.internal.readonly"
        >
            <option v-for="option in field.params.options" :value="option" :selected="option.id === field.params.selectedOption.id">
                {{option.label}}
            </option>
        </select>
    </field-base>
</template>

<script>
    import FieldBase from '../BaseField.vue';

    export default {
        name: 'SelectField',

        components: {
            FieldBase,
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
                    id: Math.random(),
                },
                {
                    activatedValue: 200,
                    deactivatedValue: 0,
                    isDefault: false,
                    isSelected: false,
                    label: 'Значение 2',
                    id: Math.random(),
                },
            ];

            return {
                defaultOptions: {
                    value: 100,
                    label: 'Заголовок поля',
                    options: defaultOptions,
                    selectedOption: defaultOptions[0],
                },

                defaultStyle: {
                    labelColor: '#2c2e32',
                    borderRadius: 6,
                },
            };
        },

        watch: {
            'field.params.selectedOption'(value) {
                this.field.params.value = value.activatedValue;
            }
        },
    };
</script>

<style scoped lang="scss">
</style>
