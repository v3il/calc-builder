<template>
    <div class="field-wrapper-toolbar">
        <i class="material-icons js-drag-field">drag_indicator</i>
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
                this.$emit('fieldEdit');
                console.log('ed')
            }
        }
    }
</script>

<style lang="scss">
    .field-wrapper-toolbar {
        transition: opacity 0.3s;
        opacity: 0;
        position: absolute;
        right: 0;
        top: -18px;
        margin: 0;
        background: #000;
        color: white;

        align-items: center;
        border-radius: 28px;
        cursor: default;
        display: inline-flex;
        height: 32px;
        justify-content: space-between;
        padding: 0 12px;
        vertical-align: middle;
        white-space: nowrap;
        z-index: 1;

        i {
            font-size: 20px;
            cursor: pointer;
            margin-left: 6px;

            &:hover {
                opacity: 0.8;
            }

            &:first-child {
                margin-left: 0;
            }
        }
    }
</style>