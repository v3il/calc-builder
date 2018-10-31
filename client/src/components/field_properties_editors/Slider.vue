<template>
    <div>
        Slider, {{params}} {{params[propertyName]}} {{propertyName}}

        <el-slider :min="25" :max="100" :step="25" v-model="params[propertyName]"></el-slider>

        <!--<input type="number" v-model="params[propertyName]">-->
    </div>
</template>

<script>
    export default {
        name: "Slider",

        props: {
            params: Object,
            propertyName: String,
        }
    }
</script>

<style scoped>

</style>