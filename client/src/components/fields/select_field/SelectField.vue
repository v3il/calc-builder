<template>
    <field-base
        :field="field"
        :disabled="disabled"
        :selected="selected"
        @edit-field="$emit('edit-field')"
        @remove-field="$emit('remove-field')"
    >
        <transition name="fade">
            <label
                class="label"
                v-if="this.field.params.label"
                :for="field.id"
                :style="{ color: field.style.labelColor }"
            >
                {{ field.params.label }}
            </label>
        </transition>

        <select-element
            @change="triggerChange"
            :options="{
                id: field.id,
                options: field.params.options,
                style: styles,
            }"
        />
    </field-base>
</template>

<script>
import FieldBase from '../BaseField.vue';
import SelectElement from '@/components/ui_elements/SelectElement';
import SelectOption from '../../../models/SelectOption';

export default {
    name: 'SelectField',

    components: {
        FieldBase,
        SelectElement,
    },

    model: {
        prop: 'value',
        event: 'change',
    },

    extends: FieldBase,

    computed: {
        styles() {
            return {
                ...this.field.style,
            };
        },
    },

    data() {
        const defaultOptions = [
            new SelectOption({
                isSelected: true,
                label: this.uSign('translate', 'Значение 1'),
            }),

            new SelectOption({
                activatedValue: 200,
                label: this.uSign('translate', 'Значение 2'),
            }),
        ];

        return {
            defaultOptions: {
                label: this.uSign('translate', 'Заголовок поля'),
                options: defaultOptions,
            },

            defaultStyle: {
                labelColor: '#2c2e32',
            },
        };
    },

    methods: {
        triggerChange({ target }) {
            const { selectedIndex } = target;

            this.field.params.options.forEach((item, index) => {
                item.isSelected = index === selectedIndex;
            });
        },
    },

    created() {
        this.$set(this.field.params, 'value', 0);
    },

    watch: {
        'field.params.options': {
            deep: true,
            // immediate: true,
            handler(options) {
                this.field.params.value = options.reduce((total, currentOption) => {
                    const { activatedValue, deactivatedValue, isSelected } = currentOption;
                    const optionValue = isSelected ? activatedValue : deactivatedValue;

                    return total + optionValue;
                }, 0);
            },
        },
    },
};
</script>
