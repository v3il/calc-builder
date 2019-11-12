<template>
    <field-base
        :field="field"
        :disabled="disabled"
        :selected="selected"
        class="textarea-component"
        @edit-field="$emit('edit-field')"
        @remove-field="$emit('remove-field')"
    >
        <transition name="fade">
            <label
                class="textarea-component__label label"
                v-if="this.field.params.label"
                :for="field.id"
                :style="{ color: field.style.labelColor }"
            >
                {{ field.params.label }}
            </label>
        </transition>

        <textarea
            type="text"
            v-model="field.params.value"
            :placeholder="field.params.placeholder"
            :style="styles"
            :id="field.id"
            class="textarea textarea-component__textarea"
        ></textarea>
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
                ...{ resize: this.field.style.resizable ? 'vertical' : 'none' },
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
                resizable: false,
            },
        };
    },
};
</script>

<style scoped lang="scss">
.textarea-component {
    &__label {
        display: block;
        margin-bottom: 0.8rem;
    }
}
</style>
