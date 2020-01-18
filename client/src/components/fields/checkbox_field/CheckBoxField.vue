<template>
    <field-base
        :field="field"
        :disabled="disabled"
        :selected="selected"
        @edit-field="$refs.settingsDialog.open()"
        @remove-field="$emit('remove-field')"
    >
        <checkbox-element
            v-model="field.params.isSelected"
            :options="{
                id: field.id,
                label: field.params.label,
            }"
        />

        <v-dialog ref="settingsDialog">
            <template slot="header">
                {{ uSign('translate', 'Редактирование настроек поля') }}
            </template>

            <check-box-field-values :field="field" />

            <template slot="footer">
                <button class="button button--primary">
                    {{ uSign('translate', 'Сохранить') }}
                </button>

                <button class="button" @click="$refs.settingsDialog.triggerClose()">
                    {{ uSign('translate', 'Закрыть') }}
                </button>
            </template>
        </v-dialog>
    </field-base>
</template>

<script>
import FieldBase from '../BaseField.vue';
import CheckboxElement from '@/components/ui_elements/CheckboxElement';

import CheckBoxFieldValues from './CheckBoxFieldValues';

import VDialog from '../../Dialog';

export default {
    name: 'RadioButtonField',

    components: {
        FieldBase,
        CheckboxElement,
        VDialog,
        CheckBoxFieldValues,
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
        return {
            defaultOptions: {
                label: this.uSign('translate', 'Заголовок поля'),
                activatedValue: 100,
                deactivatedValue: 0,
                isSelected: false,
            },

            defaultStyle: {
                labelColor: '#2c2e32',
            },
        };
    },

    created() {
        this.$set(this.field.params, 'value', 0);

        console.log(this.$refs);
    },

    mounted() {
        // console.log(this.$refs.settingsDialog.open())
    },

    watch: {
        'field.params': {
            deep: true,
            immediate: true,
            handler(newValue) {
                const { isSelected, activatedValue, deactivatedValue } = newValue;
                this.field.params.value = isSelected ? activatedValue : deactivatedValue;
            },
        },
    },
};
</script>
