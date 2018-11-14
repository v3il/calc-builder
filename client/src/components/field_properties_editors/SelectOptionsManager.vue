<template>
    <div>
        <div v-for="option in options.selectOptions">
            123
            <el-input type="text" v-model="option.text"></el-input>
        </div>
    </div>
</template>

<script>
    import PropertyValueChangerBase from './PropertyValueChangerBase';

    export default {
        name: "SelectOptionsManager",

        extends: PropertyValueChangerBase,

        // props: {
            // selectOptions: Array,
        // },

        // data() {
        //     return {
        //         // selectOpts: this.options.selectOptions,
        //     }
        // }
    }
</script>

<style scoped>

</style>