<template>
    <br>
</template>

<script>
    export default {
        name: "PropertyValueChangerBase",

        data() {
            return {
                options: this.componentParams,
            }
        },

        props: {
            params: Object,
            componentParams: Object,
        }
    }
</script>

<style scoped>

</style>