<template>
    <div class="page">
        <div class="header">
            <div class="header_title">Редактирование калькулятора</div>
            <button class="btn btn--primary save-button" @click="saveCalcData">Сохранить</button>
        </div>

        <div class="content">
            <LayoutBuilder @layoutUpdate="updateLayout($event)" :calculator="selectedCalculator"></LayoutBuilder>
        </div>
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
            ]),
        },

        components: {
            LayoutBuilder,
        },

        methods: {
            saveCalcData() {
                this.$store.dispatch('updateData');
                this.$router.back();
            },

            updateLayout(layout) {
                this.selectedCalculator.layout = layout;
                this.$store.dispatch('updateData');
            }
        },

        data() {
            return {
                selectedCalculator: null,
            }
        },

        created() {
            this.selectedCalculator = this.allCalculators
                .find(calc => calc.id === +this.$route.params.id)
        }
    }
</script>

<style scoped>

</style>