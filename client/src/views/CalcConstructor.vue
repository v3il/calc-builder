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
                layout: [],


            }
        }
    }
</script>

<style scoped>

</style>