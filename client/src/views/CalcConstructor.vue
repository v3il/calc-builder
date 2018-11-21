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
                layout: [{"id":1,"type":"TextField","params":{"text":"","label":"Label for input","placeholder":"Placeholder for input","width":50,"float":true,"marginLeft":50,"borderColor":"rgb(207, 119, 24)"}},{"id":2,"type":"SliderField","params":{"label":"Label for slider","value":5,"min":0,"max":10,"step":1,"width":50,"float":true,"marginLeft":0}}],


            }
        }
    }
</script>

<style scoped>

</style>