<template>
    <div>
        <h4>{{options.title}}</h4>

        <el-slider
            :min="options.min"
            :max="options.max"
            :step="options.step || 1"
            :disabled="options.disabled"
            v-model="options.value"
        ></el-slider>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "MarginSelector",

        extends: PropertyValueChangerBase,

        watch: {
            // Fix: When current value is changing, because "max" value has become lesser,
            // slider does not trigger "change" event
            'options.value'(newValue) {
                // When click on slider and "max" value is 0, newValue === NaN
                const value = isNaN(value) ? 0 : newValue;
                this.onValueChanged(value);
            }
        }
    }
</script>

<style scoped>

</style>