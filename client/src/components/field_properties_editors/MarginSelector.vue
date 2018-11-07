<template>
    <div>
        <h4>{{componentParams.title}}</h4>
        <el-slider v-model="params[componentParams.propertyName]" :disabled="params.float"></el-slider>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "MarginSelector",
        extends: PropertyValueChangerBase,
    }
</script>

<style scoped>

</style>