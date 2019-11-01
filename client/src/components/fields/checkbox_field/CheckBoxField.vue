<template>
    <field-base :field="field" @edit-field="$emit('edit-field')" @remove-field="$emit('remove-field')">
        <div>
            <label class="checkbox">
                <input
                    v-if="field.internal.readonly"
                    class="checkbox__input"
                    type="checkbox"
                    :name="field.id"
                    :checked="field.params.value"
                    disabled
                    readonly
                >

                <input
                    v-else
                    class="checkbox__input"
                    type="checkbox"
                    :name="field.id"
                    v-model="field.params.value"
                >

                <span class="checkbox__check"></span>
                <span class="checkbox__label">{{field.params.label}}</span>
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
            return {
                defaultOptions: {
                    value: true,
                    label: 'Заголовок поля',
                    activatedValue: 100,
                    deactivatedValue: 0,
                },

                defaultStyle: {
                    labelColor: '#2c2e32',
                },
            };
        },
    };
</script>

<style scoped lang="scss">
</style>
