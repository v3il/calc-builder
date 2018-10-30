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
                layout: [{"id":2,"type":"TextAreaField","params":{"text":"Input","borderColor":"red","label":"Label for input","width":100,"float":true,"marginLeft":0}},{"id":3,"type":"SliderField","params":{"text":"Button","borderColor":"red","value":5,"min":0,"max":10,"step":1,"width":50,"float":true,"marginLeft":0}},{"id":4,"type":"SelectField","params":{"text":"Button","borderColor":"red","value":0,"min":0,"max":10,"step":1,"width":50,"float":true,"marginLeft":0}},{"id":10,"type":"TextField","params":{"label":"Label for input","width":50,"float":true,"marginLeft":0}},{"id":9,"type":"TextField","params":{"label":"Label for input","width":50,"float":true,"marginLeft":0}},{"id":7,"type":"ImageField","params":{"text":"Button","borderColor":"red","value":0,"min":0,"max":10,"step":1,"width":50,"float":true,"marginLeft":0}},{"id":11,"type":"ImageField","params":{"text":"Button","borderColor":"red","value":0,"min":0,"max":10,"step":1,"width":50,"float":true,"marginLeft":0}},{"id":8,"type":"ButtonField","params":{"text":"Button","borderColor":"red","label":"Button","width":25,"float":false,"marginLeft":75}}],


            }
        }
    }
</script>

<style scoped>

</style>