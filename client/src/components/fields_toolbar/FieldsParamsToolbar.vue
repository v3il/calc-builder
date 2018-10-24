<template>
    <v-chip color="blue-grey darken-4" text-color="white" dark class="field-wrapper-toolbar">
        <slot></slot>
    </v-chip>
</template>

<script>
    export default {
        name: "FieldsToolbar"
    }
</script>

<style lang="scss">
    .field-wrapper-toolbar {
        position: absolute;
        right: 0;
        top: -18px;
        margin: 0;

        .v-btn {
            margin: 0 2px;
        }
    }
</style>