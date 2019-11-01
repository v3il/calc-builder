<template>
    <field-base :field="field" @edit-field="$emit('edit-field')" @remove-field="$emit('remove-field')">
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
                    :checked="option.id === field.params.selectedOption.id"
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
    </field-base>
</template>

<script>
    import FieldBase from '../BaseField.vue';

    export default {
        name: 'RadioButtonField',

        components: {
            FieldBase,
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
    .radio {
        margin-bottom: 12px;
    }
</style>
