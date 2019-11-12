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

        <vue-slider
            v-model="field.params.value"
            :id="field.id"
            :interval="field.params.step"
            :min="field.params.min"
            :max="field.params.max"
        ></vue-slider>
    </field-base>
</template>

<script>
import VueSlider from 'vue-slider-component';
import FieldBase from '../BaseField.vue';

export default {
    name: 'SliderField',

    components: {
        FieldBase,
        VueSlider,
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
                value: 0,
                label: 'Заголовок поля',
                min: 0,
                max: 10,
                step: 1,
            },

            defaultStyle: {
                labelColor: '#2c2e32',
            },
        };
    },
};
</script>
