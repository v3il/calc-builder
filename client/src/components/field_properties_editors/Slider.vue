<template>
    <div class="property-editor-field">
        <h4 class="property-editor-field_field-title">
            {{options.title}}

            <p>[{{options.min}} - {{options.max}}]</p>
        </h4>

        <el-slider
            :min="options.min"
            :max="options.max"
            :step="options.step || 1"
            :disabled="options.disabled"
            v-model="options.value"
            class="property-editor-field_field-element"
        ></el-slider>

        <p class="property-editor-field_field-description" v-if="options.description">{{options.description}}</p>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "Slider",

        extends: PropertyValueChangerBase,

        watch: {
            // Fix: When current value is changing, because "max" value has become lesser,
            // slider does not trigger "change" event
            'options.value'(newValue) {
                // Fix: When click on slider and "max" value is 0, newValue === NaN
                const value = isNaN(newValue) ? 0 : newValue;
                this.onValueChanged(value);
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