<template>
    <field-base :field="field" @edit-field="$emit('edit-field')" @remove-field="$emit('remove-field')">
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
