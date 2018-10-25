<template>
    <div class="field-wrapper-toolbar">
        <slot></slot>
    </div>
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