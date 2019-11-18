<template>
    <vue-slider
        :value="value"
        @change="$emit('change', $event)"
        :id="options.id"
        :interval="options.step"
        :min="options.min"
        :max="options.max"
        class="slider-element"
    ></vue-slider>
</template>

<script>
import VueSlider from 'vue-slider-component';

export default {
    name: 'SliderElement',

    model: {
        prop: 'value',
        event: 'change',
    },

    components: {
        VueSlider,
    },

    props: {
        value: {
            type: Number,
        },

        options: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
