<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">
            {{title}}

            <p>[{{min}} - {{max}}]</p>
        </h4>

        <el-slider
            :min="min"
            :max="max"
            :step="step"
            :disabled="disabled"
            v-model="val"
            class="property-editor-field_field-element"
        ></el-slider>

        <p class="property-editor-field_field-description" v-if="description">{{description}}</p>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "Slider",

        props: {
            title: String,
            value: Number,
            description: String,

            min: {
                type: Number,
                default: 1,
            },

            max: {
                type: Number,
                default: 10,
            },

            step: {
                type: Number,
                default: 1,
            },

            disabled: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                val: this.value,
            }
        },

        watch: {
            // Fix: When current value is changing, because "max" value has become lesser,
            // slider does not trigger "change" event
            val(newValue) {
                // Fix: When click on slider and "max" value is 0, newValue === NaN
                const value = Number.isNaN(newValue) ? 0 : newValue;
                this.$emit('input', value);
            }
        },
    }
</script>

<style>
    .property-editor-field_field-element {
        margin: 0;
    }

    .el-slider__runway {
        margin: 9px 0;
    }
</style>