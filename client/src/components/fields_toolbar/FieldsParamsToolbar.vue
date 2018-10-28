<template>
    <div class="field-wrapper-toolbar">
        <i class="material-icons" @click="emitFieldEdit">settings</i>
        <i class="material-icons" @click="emitFieldRemove">delete</i>
    </div>
</template>

<script>
    export default {
        name: "FieldsToolbar",

        methods: {
            emitFieldRemove() {
                this.$emit('fieldRemove');
                console.log('re')
            },

            emitFieldEdit() {
                this.$emit('editField');
                console.log('ed')
            }
        }
    }
</script>

<style lang="scss">
    .field-wrapper-toolbar {
        position: absolute;
        right: 0;
        top: -18px;
        margin: 0;
        background: #000;

        .v-btn {
            margin: 0 2px;
        }
    }
</style>