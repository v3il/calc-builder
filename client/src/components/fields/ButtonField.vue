<template>
    <button>{{params.text}}</button>
</template>

<script>
    import FieldBase from './FieldBase.js';

    export default {
        name: "ButtonField",

        extends: FieldBase,

        data() {
            return {
                defaultOptions: {
                    text: 'Button',
                    borderColor: 'red'
                },
            }
        },
    }
</script>

<style scoped>

</style>