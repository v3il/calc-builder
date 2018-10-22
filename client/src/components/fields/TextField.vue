<template>
    <div>
        <input type="text" v-model="params.text">
    </div>
</template>

<script>
    import FieldBase from './FieldBase.js';

    export default {
        name: "TextField",

        extends: FieldBase,

        data() {
            return {
                defaultOptions: {
                    text: 'Input',
                    borderColor: 'red'
                },
            }
        },
    }
</script>

<style scoped>

</style>