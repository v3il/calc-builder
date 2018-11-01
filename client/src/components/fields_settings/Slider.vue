<template>
    <el-slider
        v-model="options[name]"
    ></el-slider>
</template>

<script>
    export default {
        name: "Slider",

        data() {
            return {
                options: this.params,
            }
        },

        computed: {
            val() {
                return this.value
            }
        },

        props: {
            params: Object,
            name: String,
        }
    }
</script>

<style scoped>

</style>