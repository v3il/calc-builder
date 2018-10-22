<template>
    <v-app dark>
        <router-view/>
    </v-app>
</template>


<script>
    export default {
        data() {
            return {
                drawer: true
            };
        },

        props: {
            source: String
        },
    }
</script>


<style>
    @import '../node_modules/vuetify/dist/vuetify.min.css';

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
