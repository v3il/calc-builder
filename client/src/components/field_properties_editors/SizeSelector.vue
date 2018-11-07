<template>
    <div>
        <h4>{{options.title}}</h4>

        <el-button-group>
            <el-button
                size="small"
                v-for="value in options.values"
                :type="options.value === value ? 'primary' : 'info'"
                @click="onValueChanged(value)"
            >
                {{value}}%
            </el-button>
        </el-button-group>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "Slider",

        extends: PropertyValueChangerBase,
    }
</script>

<style scoped>

</style>