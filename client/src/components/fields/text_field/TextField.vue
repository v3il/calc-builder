<template>
    <field-base
        :field="field"
        :disabled="disabled"
        :selected="selected"
        class="text-component"
        @edit-field="$emit('edit-field')"
        @remove-field="$emit('remove-field')"
    >
        <transition name="fade">
            <label
                class="text-component__label label"
                v-if="field.params.label"
                :for="field.id"
                :style="{ color: field.style.labelColor }"
            >
                {{ field.params.label }}
            </label>
        </transition>

        <input
            type="text"
            v-model="field.params.value"
            :placeholder="field.params.placeholder"
            :style="styles"
            :id="field.id"
            class="text-input text-component__input"
        />
    </field-base>
</template>

<script>
import FieldBase from '../BaseField.vue';

export default {
    name: 'TextField',

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
        },

        value() {
            return this.field.params.value;
        },
    },

    data() {
        return {
            defaultOptions: {
                value: '',
                label: 'Заголовок поля',
                placeholder: 'Подсказка поля',
            },

            defaultStyle: {
                labelColor: '#2c2e32',
                borderRadius: 6,
            },
        };
    },
};
</script>
