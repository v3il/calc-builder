<template>
    <field-base :field="field" class="text-component" @edit-field="$emit('edit-field')" @remove-field="$emit('remove-field')">
        <transition name="fade">
            <label
                class="text-component__label label"
                v-if="field.params.label"
                :for="field.id"
                :style="{ color: field.style.labelColor }"
            >
                {{field.params.label}}
            </label>
        </transition>

        <input type="text"
           v-if="field.internal.readonly"
           :value="field.params.value"
           :placeholder="field.params.placeholder"
           :style="styles"
           :id="field.id"
           class="text-input text-component__input"
           readonly
           disabled
        >

        <input type="text"
            v-else
            v-model="field.params.value"
            :placeholder="field.params.placeholder"
            :style="styles"
            :id="field.id"
            class="text-input text-component__input"
        >
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
            }
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

<style scoped lang="scss">
    .text-component {

    }
</style>
