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
            },

            emitFieldEdit() {
                this.$emit('editField');
            }
        },

        created() {
            const params = Object.assign({}, this.defaultOptions, this.options);
            this.params = params;
            this.$emit('optionsUpdate', this.params);
        },
    }
</script>

<style lang="scss">
    .field-wrapper {
        border: 1px solid violet;
        padding: 0 18px;
        position: relative;
        display: inline-block;
    }
</style>