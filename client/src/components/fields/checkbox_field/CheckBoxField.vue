<template>
    <field-base
        :field="field"
        :disabled="disabled"
        :selected="selected"
        @edit-field="$emit('edit-field')"
        @remove-field="$emit('remove-field')"
    >
        <div>
            <label class="checkbox">
                <input
                    class="checkbox__input"
                    type="checkbox"
                    :name="field.id"
                    v-model="field.params.isSelected"
                />

                <span class="checkbox__check"></span>
                <span class="checkbox__label">{{ field.params.label }}</span>
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
        },

        value() {
            const { isSelected, activatedValue, deactivatedValue } = this.field.params;
            return isSelected ? activatedValue : deactivatedValue;
        },
    },

    data() {
        return {
            defaultOptions: {
                label: 'Заголовок поля',
                activatedValue: 100,
                deactivatedValue: 0,
                isSelected: false,
            },

            defaultStyle: {
                labelColor: '#2c2e32',
            },
        };
    },
};
</script>
