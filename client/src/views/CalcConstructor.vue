<template>
    <LayoutBuilder :layout="layout"></LayoutBuilder>
</template>

<script>
    import LayoutBuilder from '../components/LayoutBuilder';

    export default {
        name: "CalcConstructor",

        components: {
            LayoutBuilder,
        },

        data() {
            return {
                layout: [{"id":1,"type":"TextField","params":{"label":"Label for input","borderColor":"rgb(207, 119, 24)","width":50,"float":true,"marginLeft":50}}],


            }
        }
    }
</script>

<style scoped>

</style>