<template>
    <button @click="emitFieldRemove">
        <i class="material-icons">delete</i>
    </button>
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