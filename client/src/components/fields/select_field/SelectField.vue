<template>
    <field-base :field="field" @edit-field="$emit('edit-field')" @remove-field="$emit('remove-field')">
        <transition name="fade">
            <label class="label" v-if="this.field.params.label" :for="field.id" :style="{ color: field.style.labelColor }">
                {{field.params.label}}
            </label>
        </transition>

        <select type="text" :style="styles" :id="field.id" class="select" @change="triggerChange">
            <option
                v-for="option in field.params.options"
                :selected="option.isSelected"
            >{{option.label}}</option>
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
            },

            value() {

            }
        },

        data() {
            const defaultOptions = [
                {
                    activatedValue: 100,
                    deactivatedValue: 0,
                    isSelected: true,
                    label: 'Значение 1',
                    id: Math.random(),
                },
                {
                    activatedValue: 200,
                    deactivatedValue: 0,
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
                },

                defaultStyle: {
                    labelColor: '#2c2e32',
                    borderRadius: 6,
                },
            };
        },

        methods: {
            triggerChange({ target }) {
                const { selectedIndex } = target;

                this.field.params.options.forEach((item, index) => {
                    item.isSelected = index === selectedIndex;
                });
            }
        },
    };
</script>

<style scoped lang="scss">
</style>
