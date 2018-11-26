<template>

    <div>
        <div style="text-align: right">
            <button v-for="calc in allCalculators" @click="sc(calc)">
                {{calc.name}}
            </button>

            <br>

            {{selectedCalculator}}
        </div>

        <br>
        <br>
        <br>

        <LayoutBuilder :layout="selectedCalculator.layout"></LayoutBuilder>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    import LayoutBuilder from '../components/LayoutBuilder';

    export default {
        name: "CalcConstructor",

        computed: {
            ...mapGetters([
                'allCalculators',
                'selectedCalculator',
            ]),
        },

        components: {
            LayoutBuilder,
        },

        methods: {
            ...mapActions([
                'selectCalc',
            ]),

            sc(calc) {
                console.log(1)
                this.selectCalc(calc);
            }
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