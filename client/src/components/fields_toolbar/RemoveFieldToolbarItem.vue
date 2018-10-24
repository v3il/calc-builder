<template>
    <v-btn small icon @click="emitFieldRemove">
        <v-icon>delete</v-icon>
    </v-btn>
</template>

<script>
    export default {
        name: "RemoveFieldToolbarItem",

        methods: {
            emitFieldRemove() {
                this.$emit('fieldRemove');
            }
        }
    }
</script>

<style scoped>

</style>