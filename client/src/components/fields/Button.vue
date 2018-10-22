<template>
    <button>Button 1</button>
</template>

<script>
    export default {
        name: "Button",

        props: {
            options: Object,
        },

        methods: {
            getData() {
                return {
                    data: 1,
                }
            }
        },
    }
</script>

<style scoped>

</style>