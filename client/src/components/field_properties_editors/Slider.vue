<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title" v-if="options.title">
            {{ options.title }}

            <p>{{ currentValue }}</p>
        </h4>

        <el-slider
            :min="options.min || 0"
            :max="options.max || 100"
            :step="options.step || 1"
            :disabled="options.disabled"
            :value="value"
            @input="emitValueChange"
            class="property-editor-field_field-element"
        ></el-slider>

        <p class="property-editor-field_field-description" v-if="options.description">
            {{ options.description }}
        </p>
    </div>
</template>

<script>
export default {
    name: "Slider",

    props: {
        value: {
            type: Number
        },

        options: {
            type: Object
        }
    },

    computed: {
        currentValue() {
            return this.options.valueTransformer
                ? this.options.valueTransformer(this.value)
                : this.value;
        }
    },

    methods: {
        emitValueChange(value) {
            this.$emit("input", value);
        }
    }
};
</script>

<style>
@import "settings-component-base.scss";

.property-editor-field_field-element {
    margin: 0;
}

.el-slider__runway {
    margin: 9px 0;
}

.el-slider__bar {
    background-color: #263238;
}

.el-slider__button {
    border-color: #263238;
}
</style>
