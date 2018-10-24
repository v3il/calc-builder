<template>
    <div></div>
</template>

<script>
    export default {
        name: "FieldBase",

        data() {
            return {
                params: {},
            }
        },

        props: {
            options: Object,
        },

        methods: {
            emitFieldRemove() {
                this.$emit('removeField');
            }
        },

        created() {
            this.params = Object.assign({}, this.defaultOptions, this.options);
            this.$emit('optionsUpdate', this.params);
        },
    }
</script>

<style lang="scss">
    .field-wrapper {
        border: 1px solid violet;
        padding: 18px 18px;
        position: relative;
    }
</style>