<template>
    <br>
</template>

<script>
    export default {
        name: "PropertyValueChangerBase",

        data() {
            return {
                options: this.componentProperties,
            }
        },

        props: {
            componentProperties: Object,
        },

        methods: {
            onValueChanged(value) {
                console.log(1, value)
                this.options.value = value;
                this.$emit('valueChanged', value)
            }
        }
    }
</script>

<style scoped>

</style>