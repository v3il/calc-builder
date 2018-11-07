<template>
    <div>
        <h4>{{options.title}}</h4>

        <el-input @input="onValueChanged($event)" v-model="options.value"></el-input>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "TextField",

        extends: PropertyValueChangerBase,
    }
</script>

<style scoped>

</style>