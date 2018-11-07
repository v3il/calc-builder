<template>
    <div>
        <el-checkbox v-model="options.value" @change="onValueChanged(options.value)">
            {{options.title}}
        </el-checkbox>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "CheckBoxSelector",

        extends: PropertyValueChangerBase,
    }
</script>

<style scoped>

</style>