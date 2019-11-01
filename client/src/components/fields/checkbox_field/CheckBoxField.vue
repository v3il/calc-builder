<template>
    <field-base :field="field" @edit-field="$emit('edit-field')" @remove-field="$emit('remove-field')">
        <div>
            <label class="checkbox">
                <input
                    v-if="field.internal.readonly"
                    class="checkbox__input"
                    type="checkbox"
                    :name="field.id"
                    :checked="field.params.isSelected"
                    disabled
                    readonly
                >

                <input
                    v-else
                    class="checkbox__input"
                    type="checkbox"
                    :name="field.id"
                    v-model="field.params.isSelected"
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
                    value: 100,
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

        mounted() {
            this.refreshValue();
        },

        methods: {
            refreshValue() {
                this.field.params.value = this.field.params.isSelected
                    ? this.field.params.activatedValue
                    : this.field.params.deactivatedValue;
            }
        },

        watch: {
            'field.params.isSelected'(v) {
                console.log('i', v)
                this.refreshValue();
            },

            'field.params.activatedValue'(v) {
                console.log('a', v)
                this.refreshValue();
            },

            'field.params.deactivatedValue'(v) {
                console.log('d', v)
                this.refreshValue();
            },
        }
    };
</script>

<style scoped lang="scss">
</style>
